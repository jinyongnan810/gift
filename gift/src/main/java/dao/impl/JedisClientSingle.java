package dao.impl;

import org.springframework.beans.factory.annotation.Autowired;

import dao.JedisClient;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

public class JedisClientSingle implements JedisClient{
	@Autowired
	private JedisPool pool;
	public String get(String key) {
		Jedis jedis=pool.getResource();
		String result=jedis.get(key);
		jedis.close();
		return result;
	}

	public String set(String key, String value) {
		Jedis jedis=pool.getResource();
		String result=jedis.set(key,value);
		jedis.close();
		return null;
	}

	public String geth(String hkey, String key) {
		Jedis jedis=pool.getResource();
		String result=jedis.hget(hkey,key);
		jedis.close();
		return result;
	}

	public long seth(String hkey, String key, String value) {
		Jedis jedis=pool.getResource();
		long result=jedis.hset(hkey,key,value);
		jedis.close();
		return result;
	}

	public long incr(String key) {
		Jedis jedis=pool.getResource();
		long result=jedis.incr(key);
		jedis.close();
		return result;
	}

	public long expire(String key, int sec) {
		Jedis jedis=pool.getResource();
		long result=jedis.expire(key, sec);
		jedis.close();
		return result;
	}

	public long ttl(String key) {
		Jedis jedis=pool.getResource();
		long result=jedis.ttl(key);
		jedis.close();
		return result;
	}
	public long del(String key) {
		Jedis jedis=pool.getResource();
		long result=jedis.del(key);
		jedis.close();
		return result;
	}

	public long delh(String hkey, String key) {
		Jedis jedis=pool.getResource();
		long result=jedis.hdel(hkey,key);
		jedis.close();
		return result;
	}

}
