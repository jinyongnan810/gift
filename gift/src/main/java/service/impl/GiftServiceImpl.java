package service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.locks.ReentrantLock;

import javax.servlet.http.HttpSession;

import org.apache.ibatis.javassist.expr.NewArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import dao.JedisClient;
import mapper.TbGiftMapper;
import mapper.TbOrderMapper;
import pojo.TbGift;
import pojo.TbGiftExample;
import pojo.TbOrder;
import pojo.TbOrderExample;
import pojo.TbOrderExample.Criteria;
import pojo.custom.GiftResult;
import pojo.custom.MiniGift;
import service.GiftService;
import service.MailService;
import utils.IDUtils;
import utils.JsonUtils;

@Service
public class GiftServiceImpl implements GiftService {
	@Autowired
	private TbGiftMapper mapper;
	@Autowired
	private TbOrderMapper orderMapper;
	@Autowired
	private JedisClient jedisClient;
	@Autowired
	private MailService mailService;
	@Value("${giftkey}")
	private String giftkey;
	@Value("${listkey}")
	private String listkey;
	@Value("${lockkey}")
	private String lockkey;
	private ReentrantLock orderlock=new ReentrantLock();
	private ReentrantLock locklock=new ReentrantLock();
	public GiftResult getList() {
		List<TbGift> giftlist = null;
		try {
			String listjson = jedisClient.get(listkey);
			if (listjson != null && listjson != "") {
				giftlist = JsonUtils.jsonToList(listjson, TbGift.class);

			}
		} catch (Exception e) {
			System.out.println("redis获取礼品列表失败");
		}
		if (giftlist == null) {
			TbGiftExample example = new TbGiftExample();
			pojo.TbGiftExample.Criteria criteria = example.createCriteria();
			ArrayList<Integer> list = new ArrayList<Integer>();
			list.add(2);
			list.add(77);
			criteria.andTypeNotIn(list);
			criteria.andStatusNotEqualTo(2);
			example.setOrderByClause("status desc,id desc");
			giftlist = mapper.selectByExample(example);
		}
		try {
			jedisClient.set(listkey, JsonUtils.objectToJson(giftlist));
		} catch (Exception e) {
			System.out.println("redis保存礼品列表失败");
		}
		for (int i = 0; i < giftlist.size(); i++) {
			TbGift tbGift = giftlist.get(i);
			if (tbGift.getStatus() == 1) {
				String cache = jedisClient.get(lockkey + tbGift.getId());
				if (cache == null || cache == "")
					continue;
				else {
					Long ttl = jedisClient.ttl(lockkey + tbGift.getId());
					tbGift.setStatus(ttl.intValue());// 设置为被锁定,status为锁定剩余秒数
				}
			}
		}

		return GiftResult.ok(giftlist);
	}

	public GiftResult getGift(Long id) {
		// 从redis中找
		try {
			String giftjson = jedisClient.get(giftkey + id);
			if (giftjson != null && giftjson != "") {
				TbGift tbGift = JsonUtils.jsonToPojo(giftjson, TbGift.class);
				if (tbGift.getStatus() == 1) {
					String cache = jedisClient.get(lockkey + tbGift.getId());
					if (cache != null && cache != "") {
						Long ttl = jedisClient.ttl(lockkey + tbGift.getId());
						tbGift.setStatus(ttl.intValue());// 设置为被锁定,status为锁定剩余秒数
					}
				}
				return GiftResult.ok(tbGift);
			}
		} catch (Exception e) {
			System.out.println("redis获取礼品失败");
		}
		// 查数据库
		TbGift gift = mapper.selectByPrimaryKey(id);
		if (gift == null || gift.getStatus() == 2)// 被删除的不能被查到
			return GiftResult.build(400, "没找到该礼物哦");
		// 保存redis
		try {
			jedisClient.set(giftkey + id, JsonUtils.objectToJson(gift));
		} catch (Exception e) {
			System.out.println("redis保存礼品列表失败");
		}
		// 查看锁定状态
		if (gift.getStatus() == 1) {
			String cache = jedisClient.get(lockkey + gift.getId());
			if (cache != null && cache != "") {
				Long ttl = jedisClient.ttl(lockkey + gift.getId());
				gift.setStatus(ttl.intValue());// 设置为被锁定,status为锁定剩余秒数
			}
		}
		return GiftResult.ok(gift);
	}

	public GiftResult createOrder(TbOrder order, HttpSession session) {
		String giftsjson = session.getAttribute("gifts") == null ? "" : session.getAttribute("gifts").toString();
		String token = session.getAttribute("token") == null ? "" : session.getAttribute("token").toString();
		if (token == "") {
			return GiftResult.build(400, "没有选择礼品呀。");
		}
		List<MiniGift> gifts;
		if (giftsjson == "") {
			return GiftResult.build(400, "没有选择礼品呀。");
		} else {
			gifts = JsonUtils.jsonToList(giftsjson, MiniGift.class);
		}
		for (int i = gifts.size() - 1; i >= 0; i--) {
			String redistoken = jedisClient.get(lockkey + gifts.get(i).getId());
			if (redistoken == null || redistoken == "" || !redistoken.equals(token)) {
				gifts.remove(i);
			}
		}
		Long userid = order.getUserid();
		TbOrderExample example = new TbOrderExample();// 设置学号为判别同一人的方式
		// 判断是不是超过了3个
		Criteria idcriteria = example.createCriteria();
		idcriteria.andUseridEqualTo(userid);
		idcriteria.andStatusNotEqualTo(2);
		List<TbOrder> preOrders = orderMapper.selectByExample(example);
		int preorders = preOrders.size();
		if (gifts.size() + preorders > 3)
			return GiftResult.build(500, "一共只能获得3件礼品哦");
		// 判断结束
		// 添加order
		Date date = new Date();
		List<TbGift> tbgifts = new ArrayList<TbGift>();
		for (int i = 0; i < gifts.size(); i++) {
			TbGift gift = mapper.selectByPrimaryKey(gifts.get(i).getId());
			if (gift == null)
				return GiftResult.build(500, "某个礼物不是礼物");
			tbgifts.add(gift);
		}
		if(tbgifts.size()==0)return GiftResult.build(400, "木有礼物可以申请。");
		try {
			orderlock.lock();
			for (int i = 0; i < tbgifts.size(); i++) {
				TbGift thegift = tbgifts.get(i);
				TbOrder tbOrder = new TbOrder();
				tbOrder.setId(IDUtils.genId());
				tbOrder.setGiftid(tbgifts.get(i).getId());
				tbOrder.setGiftimg(thegift.getImg());
				tbOrder.setGifttitle(thegift.getTitle());
				tbOrder.setStatus(0);// 设为待送出
				tbOrder.setUserid(order.getUserid());
				tbOrder.setUsername(order.getUsername());
				tbOrder.setAddress(order.getAddress());
				tbOrder.setContact(order.getContact());
				tbOrder.setCreated(date);
				if (orderMapper.insert(tbOrder) != 1) {
					throw new Exception();
				}
			}
		} catch (Exception e) {
			return GiftResult.build(500, "非常抱歉，插入数据库失败了，联系我一下(919142075)，我看看我能做什么");
		} finally {
			orderlock.unlock();
		}
		session.setAttribute("gifts", null);
		String themsg="";
		for(int i=0;i<tbgifts.size();i++) {
			if(i==0) {
				themsg+=tbgifts.get(i).getTitle();
			}else if(i==tbgifts.size()-1) {
				themsg+="和"+tbgifts.get(i).getTitle();
			}else {
				themsg+="、"+tbgifts.get(i).getTitle();
			}
			tbgifts.get(i).setStatus(0);
			mapper.updateByPrimaryKey(tbgifts.get(i));
			clearGift(tbgifts.get(i).getId());
		}
		clearGiftList();
//		try {
//			mailService.sendMail("来新的订单了，"+order.getUsername()+"想要的有"+themsg+"，快来看看吧。", "来新的订单了", "919142075@qq.com");
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		return GiftResult.ok(gifts);
	}

	public GiftResult lockGift(HttpSession session, Long id) {
		String redisToken = jedisClient.get(lockkey + id);
		if (redisToken == null || redisToken == "") {
			String token = (String) session.getAttribute("token");
			if (token == null) {
				token = Long.valueOf(IDUtils.genId()).toString();
				session.setAttribute("token", token);
			}
			String giftsjson = session.getAttribute("gifts") == null ? "" : session.getAttribute("gifts").toString();
			List<MiniGift> gifts;
			if (giftsjson == "") {
				gifts = new ArrayList<MiniGift>();
			} else {
				gifts = JsonUtils.jsonToList(giftsjson, MiniGift.class);
			}
			locklock.lock();
			for (int i = gifts.size() - 1; i >= 0; i--) {
				if (!isLockedByMe(gifts.get(i).getId(), token)) {
					gifts.remove(i);
				}
			}
			if (gifts.size() >= 3) {
				return GiftResult.build(400, "你已经锁定了3个礼物啦，不能再多了哦。");
			}
			MiniGift miniGift = new MiniGift();
			miniGift.setId(id);
			TbGift tbGift = mapper.selectByPrimaryKey(id);
			miniGift.setImg(tbGift.getImg());
			miniGift.setTitle(tbGift.getTitle());
			gifts.add(miniGift);
			session.setAttribute("gifts", JsonUtils.objectToJson(gifts));
			jedisClient.set(lockkey + id, token);
			jedisClient.expire(lockkey + id, 600);
			locklock.unlock();
			return GiftResult.ok();
		} else {
			return GiftResult.build(400, "该礼物已经被人锁定了哦。。");
		}
	}

	public GiftResult unlockGift(HttpSession session, Long id) {
		String redisToken = jedisClient.get(lockkey + id);
		if (redisToken == null || redisToken == "") {
			deleteGiftFromSession(session, id);
			return GiftResult.build(400, "该礼物没有被锁定。。");
		} else {
			String token = session.getAttribute("token") == null ? "" : (String) session.getAttribute("token");
			if (token.equals(redisToken)) {
				jedisClient.del(lockkey + id);
				deleteGiftFromSession(session, id);
				return GiftResult.ok();
			} else {
				return GiftResult.build(400, "你不能给别人的礼物解除锁定呀");
			}
		}
	}

	private void deleteGiftFromSession(HttpSession session, Long id) {
		String giftsjson = session.getAttribute("gifts") == null ? "" : (String) session.getAttribute("gifts");
		if (giftsjson == null || giftsjson == "") {
			return;
		}
		try {
			List<MiniGift> list = JsonUtils.jsonToList(giftsjson, MiniGift.class);
			for (MiniGift gift : list) {
				if (gift.getId().equals(id)) {
					list.remove(gift);
					break;
				}
			}
			session.setAttribute("gifts", JsonUtils.objectToJson(list));
		} catch (Exception e) {
			System.out.println("从session里删礼物出错了");
		}

	}

	// public GiftResult getTTLs(String gifts) {
	// // 得到giftlist
	// String[] giftStrs = gifts.split("|");
	// int giftcount = giftStrs.length;
	// List<Long> ttlList=new ArrayList<Long>();
	// try {
	// for(int i=0;i<giftcount;i++) {
	// Long id = Long.getLong(giftStrs[i]);
	// ttlList.add(jedisClient.ttl(lockkey+id));
	// }
	// return GiftResult.ok(ttlList);
	// }catch(Exception e) {
	// return GiftResult.build(400, "这是什么鬼。。");
	// }
	// }

	public GiftResult addGift(TbGift gift) {
		Long id = IDUtils.genId();
		gift.setId(id);
		gift.setStatus(1);
		if (mapper.insert(gift) == 1) {
			clearGiftList();
			return GiftResult.ok();
		}
		return GiftResult.build(500, "插入礼物失败了");
	}

	public GiftResult changeGift(TbGift gift) {
		if (mapper.updateByPrimaryKeyWithBLOBs(gift) == 1) {
			clearGift(gift.getId());
			return GiftResult.ok();
		}
		return GiftResult.build(500, "编辑礼物失败了");
	}

	public GiftResult removeGift(Long id) {
		TbGift tbGift = mapper.selectByPrimaryKey(id);
		tbGift.setStatus(2);// 设置为删除
		if (mapper.updateByPrimaryKey(tbGift) == 1) {
			clearGift(id);
			return GiftResult.ok();
		}
		return GiftResult.build(500, "删除礼物失败了");
	}

	public GiftResult getOrders() {
		TbOrderExample example = new TbOrderExample();
		example.setOrderByClause("created desc");
		List<TbOrder> list = orderMapper.selectByExample(example);
		return GiftResult.ok(list);
	}

	public GiftResult changeOrderStatus(Long id, Integer status) {
		TbOrder order = orderMapper.selectByPrimaryKey(id);
		order.setStatus(status);
		if (status != 0)
			order.setFinished(new Date());
		else
			order.setFinished(null);
		if (orderMapper.updateByPrimaryKey(order) == 1) {
			return GiftResult.ok();
		}
		return GiftResult.build(500, "改变状态失败了。");
	}

	// redis clear
	private void clearGift(Long id) {
		try {
			jedisClient.del(giftkey + id);
			jedisClient.del(lockkey + id);
		} catch (Exception exception) {
			System.out.println("redis failed");
		}

		clearGiftList();
	}

	private void clearGiftLock(Long id) {
		try {
			jedisClient.del(lockkey + id);
		} catch (Exception exception) {
			System.out.println("redis failed");
		}

	}

	private void clearGiftList() {
		try {
			jedisClient.del(listkey);
		} catch (Exception e) {

		}
	}

	private boolean isLockedByMe(Long id, String token) {
		return token.equals(jedisClient.get(lockkey + id));
	}

	public GiftResult getGiftListManager() {
		TbGiftExample example = new TbGiftExample();
		example.setOrderByClause("status asc,id desc");
		return GiftResult.ok(mapper.selectByExample(example));
	}

	public GiftResult getGiftManager(Long id) {
		TbGift gift = mapper.selectByPrimaryKey(id);
		if (gift != null)
			return GiftResult.ok(gift);
		return GiftResult.build(400, "没有啊");
	}

	public GiftResult getMyLockedGifts(HttpSession session) {
		String giftsjson = session.getAttribute("gifts") == null ? "" : (String) session.getAttribute("gifts");
		String token=session.getAttribute("token") == null ? "" : (String) session.getAttribute("token");
		if (giftsjson == null || giftsjson == "") {
			return GiftResult.ok();// 返回空结果
		}
		try {
			List<MiniGift> list = JsonUtils.jsonToList(giftsjson, MiniGift.class);
			for (int i = list.size() - 1; i >= 0; i--) {
				if(!token.equals(jedisClient.get(lockkey+list.get(i).getId()))) {
					deleteGiftFromSession(session, list.get(i).getId());
					list.remove(i);
				}
				long ttl = jedisClient.ttl(lockkey + list.get(i).getId());
				if (ttl > 0) {
					list.get(i).setTtl(ttl);
				} else {
					deleteGiftFromSession(session, list.get(i).getId());
					list.remove(i);
				}
			}
			session.setAttribute("gifts", JsonUtils.objectToJson(list));
			return GiftResult.ok(list);
		} catch (Exception e) {
			System.out.println("从session里删礼物出错了");
			return GiftResult.build(500, "查询失败了。。");
		}

	}

	public GiftResult getMyOrders(Long userid) {
		TbOrderExample example = new TbOrderExample();
		Criteria criteria = example.createCriteria();
		criteria.andUseridEqualTo(userid);
		example.setOrderByClause("id desc");
		List<TbOrder> list = orderMapper.selectByExample(example);

		return GiftResult.ok(list);
	}

	public GiftResult getSurprise() {
		TbGiftExample example = new TbGiftExample();
		pojo.TbGiftExample.Criteria criteria = example.createCriteria();
		criteria.andTypeEqualTo(77);
		criteria.andStatusNotEqualTo(2);
		
		List<TbGift> list = mapper.selectByExample(example);
		for (TbGift gift : list) {
			String cache = jedisClient.get(lockkey + gift.getId());
			if (cache == null || cache == "")
				continue;
			else {
				Long ttl = jedisClient.ttl(lockkey + gift.getId());
				gift.setStatus(ttl.intValue());// 设置为被锁定,status为锁定剩余秒数
			}
		}
		return GiftResult.ok(list);
	}

}
