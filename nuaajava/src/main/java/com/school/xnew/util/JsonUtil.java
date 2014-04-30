
package com.school.xnew.util;

import java.io.IOException;
import java.text.SimpleDateFormat;

import org.codehaus.jackson.JsonEncoding;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

@SuppressWarnings("deprecation")
public class JsonUtil {
	private static ObjectMapper	objectMapper	= new ObjectMapper();
	static {
		// jackson默认写出的时间数据为时间戳， 这里修改为相应模式的时间数据输出格式
		objectMapper.getSerializationConfig().setDateFormat(
				new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
	}

	/**
	 * JSON字符串转换为对象 JSON:"{\"type\":\"tom\"}"; resultSetClass:Metadata.class实体对象
	 */
	@SuppressWarnings("unchecked")
	public static <E> E getJson2Entity(String json, Class<E> resultSetClass) {
		Object obj = null;
		try {
			obj = objectMapper.readValue(json, resultSetClass);
			// System.out.println(obj);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return (E) obj;
	}

	/**
	 * 对象转换为 JSON字符串 obj 实体对象; 如需忽略属性，在实体类上加上注解：@JsonIgnoreProperties(value =
	 * "属性名")
	 */
	public static <E> String getEntity2Json(Object obj) {
		String json = null;
		try {
			objectMapper.getJsonFactory().createJsonGenerator(System.out, JsonEncoding.UTF8);
			json = objectMapper.writeValueAsString(obj);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json;
	}

	/**
	 * 
	 * @param json
	 *            "[{\"id\": 122},{\"id\":1}]";
	 * @param valueType
	 * @return
	 */
	public static <T> T getJson2Entitys(String content, Class<T> valueType) {
		try {
			return objectMapper.readValue(content, valueType);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
}
