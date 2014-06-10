package com.school.xnew.persistence.entity;

/**
 * 新闻通知
 * @author silvermoon
 *
 */
public class NewsModel {

	private Integer id;
	private String title;
	private String content;
	private Integer type;
	private String time;
	private Integer click_num;
	
	private Integer creater_id;//创建人
	private String creater_name;//创建时间；查询时的开始时间
	
	private Integer modify_user_id;//最后修改人
	private String modify_time;//最后修改时间
	
	private String isDel = "0";
	private String delete_time;
	
	private String	beginDate;		// 开始时间
	private String	endDate;		// 结束时间
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

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getIsDel() {
		return isDel;
	}

	public void setIsDel(String isDel) {
		this.isDel = isDel;
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

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
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

	public String getDelete_time() {
		return delete_time;
	}

	public void setDelete_time(String delete_time) {
		this.delete_time = delete_time;
	}

	public Integer getClick_num() {
		return click_num;
	}

	public void setClick_num(Integer click_num) {
		this.click_num = click_num;
	}

}
