package service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLDecoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.joda.time.DateTime;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import utils.IDUtils;
import pojo.custom.GiftResult;
import service.FileService;

@Service
public class FileServiceImpl implements FileService {

	public String uploadFile(MultipartFile file, String name,String realpath) {

		String newName = IDUtils.genImageName();
		//String oldName = file.getOriginalFilename();
		String ext = name.substring(name.lastIndexOf("."));
		if(!ext.equals(".jpg")&&!ext.equals(".png"))return null;
		newName += ext;
		String sub = new DateTime().toString("/yyyy/MM/dd/");

		byte[] bs = new byte[1024];
		int len;
		File tempFile = new File(realpath + sub);
		if (!tempFile.exists()) {
			tempFile.mkdirs();
		}

		try {
			OutputStream os = null;
			os = new FileOutputStream(tempFile.getPath() + File.separator + newName);
			InputStream inputStream = file.getInputStream();
			while ((len = inputStream.read(bs)) != -1) {
				os.write(bs, 0, len);
			}
			inputStream.close();
			os.close();
			
				return "/files"+sub+ newName;
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		catch (IOException e) {
			e.printStackTrace();
		}
		return null;
		

	}

	public void download(String path, String name, HttpServletRequest request, HttpServletResponse response) {
		try {
			name=URLDecoder.decode(name, "UTF-8"); 
			InputStream in = new FileInputStream(request.getSession().getServletContext().getRealPath(path));
			response.setContentType(request.getSession().getServletContext().getMimeType(name)); 
			response.setHeader("Content-Disposition", String.format("attachment;filename=\"%s\"", name)); 
	        response.setHeader("Content-Type","text/plain;charset=UTF-8");
	        response.setCharacterEncoding("UTF-8"); 
	        OutputStream out = response.getOutputStream();  
	        int b;  
	        while((b=in.read())!= -1)  
	        {  
	            out.write(b);  
	        }  
	          
	        in.close();  
	        out.close();  
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
		
	}

	public GiftResult delete(String filename, HttpSession session) {
		String realPath = session.getServletContext().getRealPath(filename);
		File file = new File(realPath);
        if (file.exists()) {
        	 if (file.isFile()) {
        		 file.deleteOnExit();
        		 return GiftResult.ok();
        	 }
        }
		return GiftResult.build(400, "没找到文件");
	}
}
