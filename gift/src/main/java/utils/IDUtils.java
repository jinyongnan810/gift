package utils;

import java.util.Random;

/**
 * 
 * @author:金勇男
 * @description:idを作成するツール
 */
public class IDUtils {

	/**
	 * 
	 * @title:genImageName
	 * @description:画像idを作成
	 * @param:@return
	 * @return:String
	 * @author:金勇男
	 * @date:2018/01/06
	 */
	public static String genImageName() {
		long millis = System.currentTimeMillis();
		Random random = new Random();
		int end4 = random.nextInt(9999);
		String str = millis + String.format("%04d", end4);
		return str;
	}
	
	/**
	 * 
	 * @title:genItemId
	 * @description:商品のidを作成
	 * @param:@return
	 * @return:long
	 * @author:金勇男
	 * @date:2018/01/06
	 */
	public static long genItemId() {
		long millis = System.currentTimeMillis();
		Random random = new Random();
		int end3 = random.nextInt(999);
		String str = millis + String.format("%03d", end3);
		long id = new Long(str);
		return id;
	}
	public static long genId() {
		long millis = System.currentTimeMillis();
		Random random = new Random();
		int end2 = random.nextInt(99);
		String str = millis + String.format("%02d", end2);
		long id = new Long(str);
		return id;
	}
	public static String genNum6Id() {
		Random random = new Random();
		int end6 = random.nextInt(999999);
		String id = String.format("%06d", end6);
		return id;
	}
}
