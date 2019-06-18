package controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import pojo.custom.GiftResult;
import service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;
	@RequestMapping("/login")
	@ResponseBody
	public GiftResult userLogin(Long id,String password,HttpSession session) {
		return userService.userLogin(id, password,session);
	}
	@RequestMapping("/logout")
	@ResponseBody
	public GiftResult userLogout(HttpSession session) {
		return userService.userLogout(session);
	}
}
