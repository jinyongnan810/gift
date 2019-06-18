package utils;

import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;


/**
 * 
 * @author:閲戝媷鐢�
 * @description:json鍏宠仈鐨勫伐鍏�
 */
public class JsonUtils {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    /**
     * 
     * @title:objectToJson
     * @description:鎶婂璞＄紪绋媕son
     * @param:@param data
     * @param:@return
     * @return:String
     * @author:閲戝媷鐢�
     * @date:2018/01/06
     */
    public static String objectToJson(Object data) {
    	try {
			String string = MAPPER.writeValueAsString(data);
			return string;
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
    	return null;
    }
    
    /**
     * 
     * @title:jsonToPojo
     * @description:鎶妀son缂栫▼瀵硅薄
     * @param:@param jsonData
     * @param:@param beanType
     * @param:@return
     * @return:T
     * @author:閲戝媷鐢�
     * @date:2018/01/06
     */
    public static <T> T jsonToPojo(String jsonData, Class<T> beanType) {
        try {
            T t = MAPPER.readValue(jsonData, beanType);
            return t;
        } catch (Exception e) {
        	e.printStackTrace();
        }
        return null;
    }
    
    /**
     * 
     * @title:jsonToList
     * @description:鎶妀son缂栫▼瀵硅薄鐨刲ist
     * @param:@param jsonData
     * @param:@param beanType
     * @param:@return
     * @return:List<T>
     * @author:閲戝媷鐢�
     * @date:2018/01/06
     */
    public static <T>List<T> jsonToList(String jsonData, Class<T> beanType) {
    	JavaType javaType = MAPPER.getTypeFactory().constructParametricType(List.class, beanType);
    	try {
    		List<T> list = MAPPER.readValue(jsonData, javaType);
    		return list;
		} catch (Exception e) {
			e.printStackTrace();
		}
    	
    	return null;
    }
    public static String getJsonP(Object data,String callback) {
    		String json=objectToJson(data);
    		return callback+"("+json+");";
    }
    
}
