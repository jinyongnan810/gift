package service.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.Properties;

import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import service.MailService;
@Service
public class MailServerImpl implements MailService{
	@Value("${mail.address}")
	private String mailAddress;
	@Value("${mail.pwd}")
	private String mailPwd;
	@Value("${mail.stmpserver}")
	private String mailStmpServer;
	private Session session;	
	public void sendMail(String msg,String title, String targetMail) throws Exception {
		Properties props = new Properties();
		props.setProperty("mail.transport.protocol", "smtp");
		props.setProperty("mail.smtp.host", mailStmpServer);
		props.setProperty("mail.smtp.auth", "true");
		if (session == null) {
			session = Session.getDefaultInstance(props);
			session.setDebug(false);
		}
		String greeting="你好，";
		String message=greeting+msg;
		MimeMessage mimeMessage = createMimeMessage(session, mailAddress,title, targetMail, message);
		Transport transport = session.getTransport();
		transport.connect(mailAddress, mailPwd);
		transport.sendMessage(mimeMessage, mimeMessage.getAllRecipients());
		transport.close();
		
	}
	private  MimeMessage createMimeMessage(Session session, String sendMail,String title, String receiveMail, String msg)
			throws Exception {
		MimeMessage message = new MimeMessage(session);
		message.setFrom(new InternetAddress(sendMail, "公司管理系统CMS", "UTF-8"));
		message.setRecipient(MimeMessage.RecipientType.TO, new InternetAddress(receiveMail, "用户", "UTF-8"));
		message.setSubject(title, "UTF-8");
		message.setContent(msg, "text/html;charset=UTF-8");
		message.setSentDate(new Date());
		message.saveChanges();

		return message;
	}

}
