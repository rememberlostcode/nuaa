
package com.school.xnew.persistence.entity;

/**
 * 报告
 * 
 * @author zhangb 2014年5月5日 上午9:15:31
 * 
 */
public class ReportModel {

	private Integer	id;
	private String	title;			// 报告题目
	private String	author;		// 报告人
	private String	institution;	// 报告人所在单位
	private String	time;			// 报告日期
	private String	address;		// 报告地点
	private String	introduction;	// 报告摘要

	private String	create_time;	// 创建时间
	private Integer	creater_id;	// 创建人
	private String	creater_name;	// 创建人名字

	private String	modify_time;	// 最后修改时间
	private Integer	modify_user_id; // 最后修改人

	private String	delete_time;
	private Integer	delete_user_id;
	private String	isDel	= "0";

	private String	beginDate;
	private String	endDate;
	private String	ids;			// id字符串

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getInstitution() {
		return institution;
	}

	public void setInstitution(String institution) {
		this.institution = institution;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getIntroduction() {
		return introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}

	public Integer getCreater_id() {
		return creater_id;
	}

	public void setCreater_id(Integer creater_id) {
		this.creater_id = creater_id;
	}

	public String getCreater_name() {
		return creater_name;
	}

	public void setCreater_name(String creater_name) {
		this.creater_name = creater_name;
	}

	public String getCreate_time() {
		return create_time;
	}

	public void setCreate_time(String create_time) {
		this.create_time = create_time;
	}

	public Integer getModify_user_id() {
		return modify_user_id;
	}

	public void setModify_user_id(Integer modify_user_id) {
		this.modify_user_id = modify_user_id;
	}

	public String getModify_time() {
		return modify_time;
	}

	public void setModify_time(String modify_time) {
		this.modify_time = modify_time;
	}

	public String getIsDel() {
		return isDel;
	}

	public void setIsDel(String isDel) {
		this.isDel = isDel;
	}

	public String getDelete_time() {
		return delete_time;
	}

	public void setDelete_time(String delete_time) {
		this.delete_time = delete_time;
	}

	public Integer getDelete_user_id() {
		return delete_user_id;
	}

	public void setDelete_user_id(Integer delete_user_id) {
		this.delete_user_id = delete_user_id;
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

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}
}
