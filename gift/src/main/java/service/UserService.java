package service;

import javax.servlet.http.HttpSession;

import pojo.custom.GiftResult;

public interface UserService {
	GiftResult userLogin(Long id,String password,HttpSession session);
	GiftResult userLogout(HttpSession session);
}
