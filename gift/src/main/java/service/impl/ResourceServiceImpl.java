package service.impl;

import java.io.File;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.JedisClient;
import pojo.custom.GiftResult;
import service.ResourceService;
import utils.JsonUtils;
@Service
public class ResourceServiceImpl implements ResourceService{
	@Autowired
	private JedisClient jedisClient;
	public GiftResult getBG(HttpSession session) {
		try {
			String images = jedisClient.get("bg");
			if(images!=null&&images!="")
				return GiftResult.ok(images);
		}catch(Exception e) {
			
		}
		String imgPath = session.getServletContext().getRealPath("/WEB-INF/images");
		File file=new File(imgPath);
		if(!file.exists()) {
			return GiftResult.build(400, "wrong");
		}
		String[] images = file.list();
		if(images.length==0)return GiftResult.build(400, "none");
		String imagesJson = JsonUtils.objectToJson(images);
		try {
			jedisClient.set("bg", imagesJson);
			jedisClient.expire("bg", 3600);
		}catch (Exception e) {
			
		}
		return GiftResult.ok(imagesJson);
	}

}
