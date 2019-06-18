package dao;
/**
 * 
 * @author:金勇男
 * @description:redis関連の操作
 */
public interface JedisClient {
	public String get(String key);
	public String set(String key,String value);
	//hashで取得
	public String geth(String hkey,String key);
	//hashで保存
	public long seth(String hkey,String key,String value);
	//＋１
	public long incr(String key);
	//定期して消す
	public long expire(String key,int sec);
	//生存時間を調べる
	public long ttl(String key);
	//削除
	public long del(String key);
	//hashを削除
	public long delh(String hkey,String key);
}
