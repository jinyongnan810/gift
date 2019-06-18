package controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import pojo.custom.GiftResult;
import service.ResourceService;

@Controller
@RequestMapping("/resource")
public class ResourceController {
	@Autowired
	private ResourceService resourceService;
	@RequestMapping("/getbg")
	@ResponseBody
	public GiftResult getBG(HttpSession session) {
		return resourceService.getBG(session);
	}
}
