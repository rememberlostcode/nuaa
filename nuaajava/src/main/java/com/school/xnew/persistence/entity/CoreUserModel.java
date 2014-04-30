
package com.school.xnew.persistence.entity;

import java.io.Serializable;

/**
 * The persistent class for the user database table.
 * 
 */
public class CoreUserModel implements Serializable {
	private static final long	serialVersionUID	= 1L;

	private Integer				id;						// 用户ID
	private String				userCode;					// 用户编码
	private String				username;					// 用户名
	private String				password;					// 密码
	private String				phoneNumber;				// 电话号码
	private String				mobileNumber;				// 手机号码
	private String				qqNumber;					// QQ号码
	private String				email;						// 用户邮箱
	private String				fullname;
	private String				menuIds;
	private String				createBy;
	private Character			isDel;

	public CoreUserModel() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFullname() {
		return this.fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public Character getIsDel() {
		return this.isDel;
	}

	public void setIsDel(Character isDel) {
		this.isDel = isDel;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getQqNumber() {
		return qqNumber;
	}

	public void setQqNumber(String qqNumber) {
		this.qqNumber = qqNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMenuIds() {
		return menuIds;
	}

	public void setMenuIds(String menuIds) {
		this.menuIds = menuIds;
	}
}