
package com.school.xnew.persistence.dao;

import java.util.List;

import com.school.xnew.biz.dto.UserApplyDto;
import com.school.xnew.persistence.entity.UserApplyModel;

public interface UserApplyDao extends GenericDao<UserApplyModel> {

	/**
	 * 注册申请用户
	 * 
	 * @param userApplyDto
	 */
	public void registerUser(UserApplyDto userApplyDto);

	/**
	 * 列表展示申请用户申请
	 * 
	 * @param userApplyDto
	 * @return
	 */
	public List<UserApplyDto> listRegisterUsers();

	/**
	 * 列表展示申请用户申请
	 * 
	 * @param userApplyDto
	 * @return
	 */
	public List<UserApplyDto> findRegisterUsersByModel(UserApplyDto userApplyDto);

	/**
	 * 审批申请用户申请
	 */
	public int checkUser(UserApplyDto userApplyDto);

	/**
	 * 取得申请用户申请
	 */
	public UserApplyDto getUserApplyByModel(UserApplyDto userApplyDto);

	/**
	 * 取得申请用户申请
	 */
	public UserApplyDto getUserApplyByUsername(String username);

	/**
	 * 列表展示申请用户审核历史记录
	 */
	public List<UserApplyDto> listCheckUserLogs(UserApplyDto userApplyDto);

	/**
	 * 按userId查询申请用户列表
	 * 
	 * @param userId
	 * @return
	 */
	public List<UserApplyDto> getApply2UserByCheckUserId(Integer userId);

	/**
	 * 根据status查询申请用户申请数
	 * 
	 * @return
	 */
	public int getApply2UserCountByStatus(Integer status);

	/**
	 * 删除申请用户
	 * 
	 * @param userApplyDto
	 */
	public void deleteUserApply(UserApplyDto userApplyDto);

}
