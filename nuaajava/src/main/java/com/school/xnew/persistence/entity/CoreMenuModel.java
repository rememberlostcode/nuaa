
package com.school.xnew.persistence.entity;

import java.io.Serializable;

import javax.persistence.Column;

/**
 * The persistent class for the core_menu database table.
 * 
 */
public class CoreMenuModel implements Serializable {
	private static final long	serialVersionUID	= 1L;
	private Integer				id;
	private String				action;
	private String				name;
	private Integer				parentId;
	private Integer				sorting;
	private Integer				systemId;
	private String				tip;
	private Character			type;
	private String				img;
	private Character			isIndex;

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAction() {
		return this.action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getParentId() {
		return this.parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public Integer getSorting() {
		return this.sorting;
	}

	public void setSorting(Integer sorting) {
		this.sorting = sorting;
	}

	public Integer getSystemId() {
		return this.systemId;
	}

	public void setSystemId(Integer systemId) {
		this.systemId = systemId;
	}

	public String getTip() {
		return this.tip;
	}

	public void setTip(String tip) {
		this.tip = tip;
	}

	public Character getType() {
		return this.type;
	}

	public void setType(Character type) {
		this.type = type;
	}

	/**
	 * @return the img
	 */
	public String getImg() {
		return img;
	}

	/**
	 * @param img
	 *            the img to set
	 */
	public void setImg(String img) {
		this.img = img;
	}

	@Column(name = "is_index")
	public Character getIsIndex() {
		return isIndex;
	}

	public void setIsIndex(Character isIndex) {
		this.isIndex = isIndex;
	}
}