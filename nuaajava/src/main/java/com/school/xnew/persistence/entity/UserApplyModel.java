
package com.school.xnew.persistence.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * 类说明：领域专家申请审核信息实体类
 * 
 * @author robin 2014-3-13下午2:26:20
 * 
 */
public class UserApplyModel implements Serializable {
	private static final long	serialVersionUID	= 1L;

	private Integer				id;						// 用户ID
	private String				userCode;					// 用户编码
	private String				username;					// 用户名
	private String				realname;					// 真实姓名
	private String				password;					// 密码
	private String				phoneNumber;				// 电话号码
	private String				mobileNumber;				// 手机号码
	private String				email;						// 用户邮箱
	private Date				applyDate;					// 申请时间
	private Date				checkDate;					// 申请时间
	private Integer				checkUserId;				// 审核人ID
	private Integer				status;					// 申请成为领域专家状态。1待审核，2审核通过，3审核不通过

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	public Date getApplyDate() {
		return applyDate;
	}

	public void setApplyDate(Date applyDate) {
		this.applyDate = applyDate;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Date getCheckDate() {
		return checkDate;
	}

	public void setCheckDate(Date checkDate) {
		this.checkDate = checkDate;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRealname() {
		return realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Integer getCheckUserId() {
		return checkUserId;
	}

	public void setCheckUserId(Integer checkUserId) {
		this.checkUserId = checkUserId;
	}

}
