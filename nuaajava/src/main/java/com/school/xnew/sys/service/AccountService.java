
package com.school.xnew.sys.service;

import java.util.List;

import org.lost.commons.lang.BusinessException;

import com.school.xnew.biz.dto.RtnMenuDto;

public interface AccountService {

	/**
	 * 登录接口
	 * 
	 * @param user
	 * @throws BusinessException
	 */
	public Integer loginVerify(User user) throws BusinessException;

	public List<RtnMenuDto> getMenusByUserId(Integer userId) throws BusinessException;

	/**
	 * 重置密码
	 * 
	 * @param userId
	 * @param oldPw
	 * @param newPw
	 * @param reNewPw
	 * @return
	 */
	public void resetPassword(PasswordReset passwordReset) throws BusinessException;

	/**
	 * 根据id查询用户名
	 * 
	 * @param userId
	 * @return
	 */
	public String getUserNameById(Integer userId);

	/**
	 * 根据创建者查找所有用户
	 * 
	 * @param ownerId
	 * @return
	 */
	public List<User> getAllUserByCreateBy(String ownerId);

	/**
	 * 根据ID查找用户
	 * 
	 * @param userId
	 * @return
	 */
	public User getUserById(Integer userId);

	/**
	 * 逻辑删除用户
	 * 
	 * @param userId
	 */
	public void delUserById(Integer userId);

	/**
	 * 修改用户信息
	 * 
	 * @param user
	 * @throws BusinessException
	 */
	public void modifyUser(User user) throws BusinessException;

	/**
	 * 重设密码，不校验老密码，给admin用
	 * 
	 * @param userid
	 * @param newPassword
	 * @throws BusinessException
	 */
	public boolean resetPassword(Integer userid, String newPassword);

	/**
	 * 根据用户名和姓名查找用户
	 * 
	 * @return
	 * @throws BusinessException
	 */
	public List<User> findUserByName(String username, String name, String createBy)
			throws BusinessException;

	/**
	 * 重新激活用户
	 * 
	 * @param userId
	 */
	public void activeUser(Integer userId);
}
