
package com.school.xnew.biz.dto;

import java.util.Date;

/**
 * 
 * 类说明：
 * 
 * @author robin 2014-3-10下午2:25:59
 * 
 */
public class UserApplyDto {

	private Integer	id;			// 申请ID号
	private String	username;		// 用户名称
	private String	realname;		// 真实姓名
	private String	password;		// 密码
	private String	userCode;		// 用户编码
	private String	phoneNumber;	// 电话号码
	private String	mobileNumber;	// 手机号码
	private String	email;			// 邮箱

	private Date	applyDate;		// 申请时间
	private Integer	status;		// 申请状态。1待审核，2审核通过，3审核不通过
	private Integer	checkUserId;	// 审核人ID
	private String	checkUserName;	// 审核人
	private Date	checkDate;		// 审核时间

	private Integer	userId;		// 用户ID
	private Integer	groupId;		// 用户组ID
	private String	isRelatived;	// 用户和用户角色是否已关联 0-否 1-是

	private String	beginDate;		// 开始时间
	private String	endDate;		// 结束时间
	private String	ids;			// id字符串

	private String	codeImage;
	private String	code;

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

	public Integer getCheckUserId() {
		return checkUserId;
	}

	public void setCheckUserId(Integer checkUserId) {
		this.checkUserId = checkUserId;
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

	public Integer getGroupId() {
		return groupId;
	}

	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}

	public String getIsRelatived() {
		return isRelatived;
	}

	public void setIsRelatived(String isRelatived) {
		this.isRelatived = isRelatived;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getBeginDate() {
		return beginDate;
	}

	public void setBeginDate(String beginDate) {
		this.beginDate = beginDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getCheckUserName() {
		return checkUserName;
	}

	public void setCheckUserName(String checkUserName) {
		this.checkUserName = checkUserName;
	}

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}

	public String getCodeImage() {
		return codeImage;
	}

	public void setCodeImage(String codeImage) {
		this.codeImage = codeImage;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

}
