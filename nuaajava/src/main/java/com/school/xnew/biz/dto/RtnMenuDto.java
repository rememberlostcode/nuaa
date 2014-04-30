
package com.school.xnew.biz.dto;

import java.util.List;

/**
 * 
 * 类说明：返回值对象
 * 
 * @author robin 2014-3-14下午1:38:23
 * 
 */
public class RtnMenuDto {
	private RtnUserDto			user;	// 返回数据(JSON格式)
	private List<RtnMenuValue>	menus;

	public RtnUserDto getUser() {
		return user;
	}

	public void setUser(RtnUserDto user) {
		this.user = user;
	}

	public List<RtnMenuValue> getMenus() {
		return menus;
	}

	public void setMenus(List<RtnMenuValue> menus) {
		this.menus = menus;
	}

}
