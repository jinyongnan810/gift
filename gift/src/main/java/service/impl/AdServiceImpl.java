package service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import dao.JedisClient;
import mapper.TbAdMapper;
import pojo.TbAd;
import pojo.TbAdExample;
import pojo.TbAdExample.Criteria;
import pojo.custom.GiftResult;
import service.AdService;
import utils.IDUtils;
import utils.JsonUtils;
@Service
public class AdServiceImpl implements AdService{
	@Value("${adkey}")
	private String adkey;
	@Autowired
	private TbAdMapper mapper;
	@Autowired
	private JedisClient jedisClient;
	public GiftResult getAds() {
		try {
			String redisAd=jedisClient.get(adkey);
			if(redisAd==null||redisAd=="") {
				
			}else {
				List<TbAd> list = JsonUtils.jsonToList(redisAd, TbAd.class);
				return GiftResult.ok(list);
			}
		}catch (Exception e) {
			
		}
		TbAdExample example=new TbAdExample();
		example.setOrderByClause("id desc");
		List<TbAd> list = mapper.selectByExample(example);
		try {
			jedisClient.set(adkey, JsonUtils.objectToJson(list));
		}catch (Exception e) {
			
		}
		return GiftResult.ok(list);
	}

	public GiftResult addAd(String content) {
		TbAd ad=new TbAd();
		ad.setId(IDUtils.genId());
		ad.setContent(content);
		mapper.insert(ad);
		clearAd();
		return GiftResult.ok();
	}

	public GiftResult delAd(Long id) {
		TbAdExample example=new TbAdExample();
		Criteria criteria = example.createCriteria();
		criteria.andIdEqualTo(id);
		mapper.deleteByExample(example);
		clearAd();
		return GiftResult.ok();
	}
	private void clearAd() {
		try {
			jedisClient.del(adkey);
		}catch(Exception e) {
			
		}
		
	}

}
