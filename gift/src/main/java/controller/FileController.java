package controller;

import java.util.ArrayList;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import pojo.custom.GiftResult;
import pojo.custom.UploadResult;
import service.FileService;

@Controller
public class FileController {
	@Autowired
	private FileService fileService;
	@RequestMapping("/file/upload")
	@ResponseBody
	public UploadResult uploadFile(MultipartHttpServletRequest request,HttpSession session) {
		String realPath = session.getServletContext().getRealPath("/files");
		MultiValueMap<String,MultipartFile> multiFileMap = request.getMultiFileMap();
		boolean fail=false;
		UploadResult uploadResult=new UploadResult();
		uploadResult.setData(new ArrayList<String>());
		uploadResult.setNames(new ArrayList<String>());
		Set<String> keySet = multiFileMap.keySet();
		for (String key : keySet) {
			String url=fileService.uploadFile(multiFileMap.get(key).get(0),key,realPath);
			if(url==null) {
				fail=true;
				break;
			}
			uploadResult.getData().add(url);
			uploadResult.getNames().add(key);
		}
		if(fail) {
			uploadResult.setErrno(1);
			uploadResult.setData(null);
			uploadResult.setNames(null);
		}else {
			uploadResult.setErrno(0);
		}
		return uploadResult;
	}
	@RequestMapping("/download")
	public void download(String filepath, String filename,HttpServletRequest request,HttpServletResponse response) {
		fileService.download(filepath, filename, request, response);
	}
	@RequestMapping("/file/delete")
	@ResponseBody
	public GiftResult deletefile(String filename,HttpSession session)
	{
		if(StringUtils.isBlank(filename)) {
			return GiftResult.ok();
		}
		return fileService.delete(filename, session);
	}
}
