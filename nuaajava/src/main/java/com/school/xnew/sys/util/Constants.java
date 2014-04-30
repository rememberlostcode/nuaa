
package com.school.xnew.sys.util;

/**
 * 
 * 类说明：常量工具类
 * 
 * @author robin 2014-3-10下午2:40:18
 * 
 */
public class Constants {
	public static final String	ADD				= "add";	// 增加
	public static final String	DELETE			= "delete"; // 删除
	public static final String	UPDATE			= "update"; // 修改

	public static final String	DESC			= "desc";	// 倒序排序
	public static final String	ASC				= "asc";	// 顺序排序

	public static final Integer	NOT_SUBMIT		= 0;		// 未提交审核
	public static final Integer	WAIT_AUDIT		= 1;		// 待审核
	public static final Integer	REBUT_AUDIT		= 2;		// 审核不通过
	public static final Integer	PASS_AUDIT		= 3;		// 审核通过

	public static final String	QUERY_ATTR_TYPE	= "query";	// 筛选属性类型
	
	public static final String REDIS_MENUS = "menus";
}
