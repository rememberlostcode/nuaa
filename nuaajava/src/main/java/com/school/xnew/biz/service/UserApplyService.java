
package com.school.xnew.biz.service;

import java.util.List;

import org.lost.commons.lang.BusinessException;

import com.school.xnew.biz.dto.UserApplyDto;

/**
 * 
 * 类说明：用户申请Service
 * 
 * @author robin 2014-3-13下午3:04:01
 * 
 */
public interface UserApplyService {
	/**
	 * 申请成为申请用户
	 * 
	 * @throws BusinessException
	 */
	public void registerUser(UserApplyDto userApplyDto) throws BusinessException;

	/**
	 * 申请用户审核列表
	 * 
	 * @throws BusinessException
	 */
	public List<UserApplyDto> listRegisterUsers(UserApplyDto userApplyDto);

	/**
	 * 审核申请用户
	 */
	public void checkUser(UserApplyDto userApplyDto) throws BusinessException;

	/**
	 * 批量审核申请用户
	 * 
	 * @param checkUserId
	 *            审核人ID
	 * @param status
	 *            审核状态
	 * @param ids
	 * @throws BusinessException
	 */
	public void batchCheckUser(Integer checkUserId, Integer status, String ids)
			throws BusinessException;

	/**
	 * 申请用户审核历史记录
	 */
	public List<UserApplyDto> listCheckUserLogs(UserApplyDto userApplyDto);

}
