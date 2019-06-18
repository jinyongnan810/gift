package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import pojo.TbGift;
import pojo.custom.GiftResult;
import service.GiftService;

@Controller
@RequestMapping("/management")
public class ManagerController {
	@Autowired
	private GiftService giftService;
	@RequestMapping("/getgiftlist")
	@ResponseBody
	public GiftResult getGiftList() {
		return giftService.getGiftListManager();
	}
	@RequestMapping("/getgift")
	@ResponseBody
	public GiftResult getGift(Long id) {
		return giftService.getGiftManager(id);
	}
	@RequestMapping("/addgift")
	@ResponseBody
	public GiftResult addGift(TbGift gift) {
		return giftService.addGift(gift);
	}
	@RequestMapping("/changegift")
	@ResponseBody
	public GiftResult changeGift(TbGift gift) {
		return giftService.changeGift(gift);
	}
	@RequestMapping("/removegift")
	@ResponseBody
	public GiftResult removeGift(Long id) {
		return giftService.removeGift(id);
	}
	@RequestMapping("/getorders")
	@ResponseBody
	public GiftResult getOrders() {
		return giftService.getOrders();
	}
	@RequestMapping("/changestatus")
	@ResponseBody
	public GiftResult changeStatus(Long id,Integer status) {
		return giftService.changeOrderStatus(id, status);
	}
}
