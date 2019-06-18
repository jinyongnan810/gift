package controller;

import org.springframework.stereotype.Controller;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {
	@RequestMapping("/")
	public String getIndex() {
		return "index";
	}
	@RequestMapping("/page/{page}")
	public String getPage(@PathVariable String page) {
		return page;
	}
}
