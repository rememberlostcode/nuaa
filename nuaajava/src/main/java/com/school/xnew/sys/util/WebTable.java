
package com.school.xnew.sys.util;

import java.util.Map;

import com.school.xnew.util.ReflectHelper;

/**
 * 
 * 类说明：表格(封装)DTO
 * 
 * @author robin 2014-3-10下午3:10:35
 * 
 */
public class WebTable<T> {
	private String						url;																		// 表格获取数据的URL
	private String						daoPageSqlId;																// 表格分页时指定DAO层的方法，默认为null，即全部分页
	private String[]					fieldNames;																// 表格数据列属性名
	private Map<String, String>			databaseNames;																// 表格列属性名对应的数据库字段名
	private Class<T>					clazz;
	static Map<Class<?>, WebTable<?>>	map	= new java.util.concurrent.ConcurrentHashMap<Class<?>, WebTable<?>>();

	private WebTable(Class<T> clazz) {
		this.clazz = clazz;
		setExcludeFieldNames(null);
	}

	private WebTable(Class<T> clazz, String[] excludeFieldNames) {
		this.clazz = clazz;
		setExcludeFieldNames(excludeFieldNames);
	}

	@SuppressWarnings("unchecked")
	public static <T> WebTable<T> getInstance(Class<T> clazz) {
		WebTable<T> webTable = (WebTable<T>) map.get(clazz);
		if (webTable == null) {
			webTable = new WebTable<T>(clazz);
			map.put(clazz, webTable);
		}
		return webTable;
	}

	@SuppressWarnings("unchecked")
	public static <T> WebTable<T> getInstance(Class<T> clazz, String[] excludeFieldNames) {
		WebTable<T> webTable = (WebTable<T>) map.get(clazz);
		if (webTable == null) {
			webTable = new WebTable<T>(clazz, excludeFieldNames);
			map.put(clazz, webTable);
		}
		return webTable;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getDaoPageSqlId() {
		return daoPageSqlId;
	}

	public void setDaoPageSqlId(String daoPageSqlId) {
		this.daoPageSqlId = daoPageSqlId;
	}

	public String[] getFieldNames() {
		return fieldNames;
	}

	public void setCustomerFieldNames(String[] fieldNames) {
		this.fieldNames = fieldNames;
	}

	public void setExcludeFieldNames(String[] excludeFieldNames) {
		this.fieldNames = ReflectHelper.getFiledNames(clazz, excludeFieldNames);
	}

	public Map<String, String> getDatabaseNames() {
		return databaseNames;
	}

	public void setDatabaseNames(Map<String, String> databaseNames) {
		this.databaseNames = databaseNames;
	}
}
