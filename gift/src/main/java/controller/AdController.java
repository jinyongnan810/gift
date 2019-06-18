package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import pojo.custom.GiftResult;
import service.AdService;

@Controller
public class AdController {
	@Autowired
	private AdService service;
	@RequestMapping("/ad/list")
	@ResponseBody
	public GiftResult getAdList() {
		return service.getAds();
	}
	@RequestMapping("/management/addad")
	@ResponseBody
	public GiftResult addAd(String content) {
		return service.addAd(content);
	}
	@RequestMapping("/management/delad")
	@ResponseBody
	public GiftResult delAd(Long id) {
		return service.delAd(id);
	}
}
