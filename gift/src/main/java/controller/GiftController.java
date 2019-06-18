package controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import pojo.TbOrder;
import pojo.custom.GiftResult;
import service.GiftService;

@Controller
@RequestMapping("/giftapis")
public class GiftController {
	@Autowired
	private GiftService giftService;
	@RequestMapping("/list")
	@ResponseBody
	public GiftResult getGiftList() {
		return giftService.getList();
	}
	@RequestMapping("/one")
	@ResponseBody
	public GiftResult getGift(Long id) {
		return giftService.getGift(id);
	}
	@RequestMapping("/lock")
	@ResponseBody
	public GiftResult lockGift(HttpSession session,Long id) {
		return giftService.lockGift(session, id);
	}
	@RequestMapping("/unlock")
	@ResponseBody
	public GiftResult unlockGift(HttpSession session,Long id) {
		return giftService.unlockGift(session, id);
	}
	@RequestMapping("/createorder")
	@ResponseBody
	public GiftResult createorder(TbOrder order,HttpSession session) {
		return giftService.createOrder(order, session);
	}
//	@RequestMapping("/getttls")
//	@ResponseBody
//	public GiftResult getTTLs(String gifts) {
//		return giftService.getTTLs(gifts);
//	}
	@RequestMapping("/mylockedgifts")
	@ResponseBody
	public GiftResult getMyLockedGifts(HttpSession session) {
		return giftService.getMyLockedGifts(session);
	}
	@RequestMapping("/myorders")
	@ResponseBody
	public GiftResult getMyOrders(Long userid) {
		return giftService.getMyOrders(userid);
	}
	@RequestMapping("/egg/{password}")
	@ResponseBody
	public GiftResult getSurprise(HttpSession session,@PathVariable String password) {
		if(password.equalsIgnoreCase("helloworld")||password.equalsIgnoreCase("hello world"))
			return giftService.getSurprise();
		else 
			return GiftResult.build(400, "nope");
	}
}
