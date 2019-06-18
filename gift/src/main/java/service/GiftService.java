package service;

import javax.servlet.http.HttpSession;

import pojo.TbGift;
import pojo.TbOrder;
import pojo.custom.GiftResult;

public interface GiftService {
	GiftResult getList();
	GiftResult getGift(Long id);
	GiftResult lockGift(HttpSession session,Long id);
	GiftResult unlockGift(HttpSession session,Long id);
	GiftResult createOrder(TbOrder order,HttpSession session);
	//GiftResult getTTLs(String gifts);
	GiftResult getMyLockedGifts(HttpSession session);
	GiftResult getMyOrders(Long userid);
	GiftResult getSurprise();
	
	//manager
	GiftResult getGiftListManager();
	GiftResult getGiftManager(Long id);
	GiftResult addGift(TbGift gift);
	GiftResult changeGift(TbGift gift);
	GiftResult removeGift(Long id);
	GiftResult getOrders();
	GiftResult changeOrderStatus(Long id,Integer status);
}
