/**
 * 
 */

package com.school.xnew.sys.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.lost.commons.lang.BusinessException;
import org.lost.finder.core.id.ManagementSystem;
import org.lost.finder.core.id.Menu;

import com.school.xnew.biz.dto.RtnMenuValue;
import com.school.xnew.persistence.entity.CoreMenuModel;
import com.school.xnew.persistence.entity.CoreUserModel;
import com.school.xnew.persistence.entity.User2MenuModel;

/**
 * 
 * 类说明：
 * 
 * @author robin 2014-3-12下午3:35:49
 * 
 */
public interface AdminService {

	/**
	 * 获得全部的管理系统列表
	 * 
	 * @return
	 */
	public List<ManagementSystem> getManagementSystems();

	/**
	 * 获得全部的菜单
	 * 
	 * @return
	 * @throws BusinessException
	 */

	public List<Menu> getMenus();

	/**
	 * 新增一个菜单
	 * 
	 * @throws BusinessException
	 */
	public void newMenu(Menu menu) throws BusinessException;

	/**
	 * 删除一个菜单
	 * 
	 * @throws BusinessException
	 */
	public void removeMenu(Menu menu) throws BusinessException;

	/**
	 * 修改一个菜单
	 * 
	 * @throws BusinessException
	 */
	public void modifyMenu(Menu menu) throws BusinessException;

	/**
	 * 获得全部的用户
	 * 
	 * @return
	 * @throws BusinessException
	 */
	public List<User> getUsers() throws BusinessException;

	/**
	 * 修改用户的权限
	 * 
	 * @param user
	 * @throws BusinessException
	 */
	public void modifyUser2Menu(User user) throws BusinessException;

	/**
	 * 查询用户与菜单关联的权限
	 * 
	 * @param user
	 * @throws BusinessException
	 */
	public List<User2MenuModel> getUser2MenuList(User2MenuModel user2MenuModel)
			throws BusinessException;

	/**
	 * 取得用户能操作的菜单
	 * 
	 * @param userId
	 * @return
	 * @throws BusinessException
	 */
	public List<CoreMenuModel> getMenusByUserId(Integer userId);

	/**
	 * 根据userId取得菜单
	 * 
	 * @param userId
	 * @return
	 * @throws BusinessException
	 */
	public List<RtnMenuValue> getMenuValuesByUserId(@Param(value = "id") Integer userId)
			throws BusinessException;

	/**
	 * 创建用户
	 * 
	 * @param user
	 */
	public void createUser(CoreUserModel user) throws BusinessException;

	/**
	 * 删除用户
	 * 
	 * @param userId
	 * 
	 */
	public void deleteUser(Integer userId) throws BusinessException;

	/**
	 * 查询用户
	 * 
	 * @param userId
	 * 
	 */
	public CoreUserModel getUserById(Integer userId) throws BusinessException;

	/**
	 * 查询用户
	 * 
	 * @param userModel
	 * 
	 */
	public CoreUserModel getUserByUsername(String username) throws BusinessException;

	/**
	 * 根据查询条件查找菜单
	 * 
	 * @param menu
	 * @return
	 * @throws BusinessException
	 */
	public List<Menu> findMenusByExample(Menu menu) throws BusinessException;

	public List<User> getUsersByModel(CoreUserModel userModel);

}
