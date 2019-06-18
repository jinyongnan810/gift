package service.impl;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import mapper.TbUserMapper;
import pojo.TbUser;
import pojo.TbUserExample;
import pojo.TbUserExample.Criteria;
import pojo.custom.GiftResult;
import service.UserService;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private TbUserMapper userMapper;
	public GiftResult userLogin(Long id, String password,HttpSession session) {
		TbUserExample example=new TbUserExample();
		Criteria criteria = example.createCriteria();
		criteria.andIdEqualTo(id);
		criteria.andPasswordEqualTo(DigestUtils.md5DigestAsHex(password.getBytes()));
		List<TbUser> list = userMapper.selectByExample(example);
		if(list.size()==1) {
			session.setAttribute("manager", id);
			return GiftResult.ok();
		}
		else return GiftResult.build(400, "wrong id");
	}
	public GiftResult userLogout(HttpSession session) {
		session.removeAttribute("manager");
		return GiftResult.ok();
	}
	
}
