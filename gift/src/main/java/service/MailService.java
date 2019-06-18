package service;

public interface MailService {
	void sendMail(String msg,String title,String targetMail) throws Exception;
}
