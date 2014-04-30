
package com.school.xnew.persistence.entity;

import java.io.Serializable;

/**
 * 
 * 类说明：用户和菜单关系
 * 
 * @author robin 2014-3-11下午3:13:41
 * 
 */
public class User2MenuModel implements Serializable {
	private static final long	serialVersionUID	= 1L;

	private Integer				id;						// 用户和菜单关系ID
	private Integer				userId;					// 用户ID
	private Integer				menuId;					// 菜单ID

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getMenuId() {
		return menuId;
	}

	public void setMenuId(Integer menuId) {
		this.menuId = menuId;
	}

}
