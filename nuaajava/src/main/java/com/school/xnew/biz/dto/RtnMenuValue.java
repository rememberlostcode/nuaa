
package com.school.xnew.biz.dto;

import java.util.List;

/**
 * 
 * 类说明：返回值对象
 * 
 * @author robin 2014-3-14下午1:38:23
 * 
 */
public class RtnMenuValue {

	private Integer				id;
	private String				name;
	private boolean				now;
	private String				action;
	private List<RtnMenuValue>	subMenus;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public boolean isNow() {
		return now;
	}

	public void setNow(boolean now) {
		this.now = now;
	}

	public List<RtnMenuValue> getSubMenus() {
		return subMenus;
	}

	public void setSubMenus(List<RtnMenuValue> subMenus) {
		this.subMenus = subMenus;
	}

}
