
package com.school.xnew.biz.dto;

/**
 * 
 * 类说明：返回值对象
 * 
 * @author robin 2014-3-14下午1:38:23
 * 
 */
public class RtnValueDto {
	private Integer	code;		// 标识代码 0表示不成功，1表示成功
	private String	message;	// 提示信息

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
