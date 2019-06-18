package service;

import pojo.custom.GiftResult;

public interface AdService {
	GiftResult getAds();
	
	//manager
	GiftResult addAd(String content);
	GiftResult delAd(Long id);
}
