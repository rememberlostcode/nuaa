
package com.school.xnew.persistence.entity;

import org.codehaus.jackson.annotate.JsonIgnore;

/**
 * 下载区
 * 
 * @author zhangb 2014年5月6日 上午10:05:17
 * 
 */
public class DownloadModel {

	private Integer	id;
	private String	name;			// 文件名称
	private String	path;			// 文件路径

	private String	user_name;		// 用户名称
	private String	create_time;	// 创建时间
	@JsonIgnore
	private Integer	create_user_id; // 创建人

	private String	modify_time;	// 最后修改时间
	private Integer	modify_user_id; // 最后修改人

	@JsonIgnore
	private String	delete_time;
	@JsonIgnore
	private Integer	delete_user_id;
	@JsonIgnore
	private String	isDel	= "0";

	@JsonIgnore
	private String	beginDate;
	@JsonIgnore
	private String	endDate;
	@JsonIgnore
	private String	ids;			// id字符串

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public Integer getCreate_user_id() {
		return create_user_id;
	}

	public void setCreate_user_id(Integer create_user_id) {
		this.create_user_id = create_user_id;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
}
