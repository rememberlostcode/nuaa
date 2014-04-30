package com.school.xnew.sys.service;

import java.io.Serializable;
import java.util.Date;

public class LoginLog implements Serializable {

	private static final long	serialVersionUID	= 6447400964059231946L;
	private Long				id;
	private Date				loginTime;
	private Integer				userId;
	private String				loginIp;

	public String getLoginIp() {
		return loginIp;
	}

	public void setLoginIp(String loginIp) {
		this.loginIp = loginIp;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Date getLoginTime() {
		return loginTime;
	}

	public void setLoginTime(Date loginTime) {
		this.loginTime = loginTime;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
