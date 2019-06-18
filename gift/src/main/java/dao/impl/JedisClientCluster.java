package dao.impl;

import org.springframework.beans.factory.annotation.Autowired;
import dao.JedisClient;

import redis.clients.jedis.JedisCluster;


public class JedisClientCluster implements JedisClient{
	@Autowired
	private JedisCluster cluster;

	public String get(String key) {
		String result=cluster.get(key);
		return result;
	}

	public String set(String key, String value) {
		String result=cluster.set(key,value);
		return result;
	}

	public String geth(String hkey, String key) {
		String result=cluster.hget(hkey,key);
		return result;
	}

	public long seth(String hkey, String key, String value) {
		long result=cluster.hset(hkey,key,value);
		return result;
	}

	public long incr(String key) {
		long result=cluster.incr(key);
		return result;
	}

	public long expire(String key, int sec) {
		long result=cluster.expire(key,sec);
		return result;
	}

	public long ttl(String key) {
		long result=cluster.ttl(key);
		return result;
	}
	public long del(String key) {
		long result=cluster.del(key);
		return result;
	}

	public long delh(String hkey, String key) {
		long result=cluster.hdel(hkey, key);
		return result;
	}
	
}
