package service;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.multipart.MultipartFile;


import pojo.custom.GiftResult;

public interface FileService {
	String uploadFile(MultipartFile file,String name,String realpath);
	void download(String path,String name,HttpServletRequest request,HttpServletResponse response);
	GiftResult delete(String filename,HttpSession session);
}
