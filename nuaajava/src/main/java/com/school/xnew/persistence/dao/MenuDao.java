
package com.school.xnew.persistence.dao;

import java.util.List;

import com.school.xnew.persistence.entity.MenuModel;

/**
 * 
 * 类说明：菜单
 * 
 * @author robin 2014-3-10下午3:03:41
 * 
 */
public interface MenuDao extends GenericDao<MenuModel> {

	public List<MenuModel> getMenu();
}
