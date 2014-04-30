
package com.school.xnew.persistence.dao;

import java.util.List;

import com.school.xnew.persistence.entity.User2MenuModel;

/**
 * 
 * 类说明：用户和菜单关联DAO接口
 * 
 * @author robin 2014-3-11下午3:16:53
 * 
 */
public interface User2MenuDao extends GenericDao<User2MenuModel> {
	/**
	 * 删除用户和用户组关联
	 * 
	 * @param model
	 * @return int
	 */
	public int deleteByModel(User2MenuModel user2MenuModel);

	/**
	 * 查询用户和用户组关联list
	 * 
	 * @param user2GroupModel
	 * @return list
	 */
	public List<User2MenuModel> getUser2MenuByModel(User2MenuModel user2GroupModel);
}
