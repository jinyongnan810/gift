package service;

import javax.servlet.http.HttpSession;

import pojo.custom.GiftResult;

public interface ResourceService {
	GiftResult getBG(HttpSession session);
}
