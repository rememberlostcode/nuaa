package com.school.xnew.biz.dto;

import java.util.List;

/**
 * @author yj 2013-05-15 菜单
 */
public class MenuDto {

	private Integer id;

	private String action;

	private String img;

	private String name;

	private Integer parentId;

	private Integer sorting;

	private Integer systemId;

	private String tip;

	private String type;

	public List<MenuDto> childMenu;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public Integer getSorting() {
		return sorting;
	}

	public void setSorting(Integer sorting) {
		this.sorting = sorting;
	}

	public Integer getSystemId() {
		return systemId;
	}

	public void setSystemId(Integer systemId) {
		this.systemId = systemId;
	}

	public String getTip() {
		return tip;
	}

	public void setTip(String tip) {
		this.tip = tip;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<MenuDto> getChildMenu() {
		return childMenu;
	}

	public void setChildMenu(List<MenuDto> childMenu) {
		this.childMenu = childMenu;
	}

}
