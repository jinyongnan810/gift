package utils;

import java.io.PrintWriter;
import java.io.StringWriter;

public class ExceptionUtil {

	/**
	 * 
	 * @title:getStackTrace
	 * @description:異常からメッセージを取得。
	 * @param:@param t
	 * @param:@return
	 * @return:String
	 * @author:金勇男
	 * @date:2018/01/06
	 */
	public static String getStackTrace(Throwable t) {
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw);

		try {
			t.printStackTrace(pw);
			return sw.toString();
		} finally {
			pw.close();
		}
	}
}
