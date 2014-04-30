
package com.school.xnew.biz.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.lost.commons.lang.BusinessException;
import org.springframework.stereotype.Service;

import com.school.xnew.biz.dto.UserApplyDto;
import com.school.xnew.biz.service.UserApplyService;
import com.school.xnew.persistence.dao.CoreUserDao;
import com.school.xnew.persistence.dao.UserApplyDao;
import com.school.xnew.persistence.entity.CoreUserModel;
import com.school.xnew.util.StringUtil;

/**
 * 
 * 类说明：用户注册申请Service
 * 
 * @author robin 2014-3-13下午2:44:27
 * 
 */
@Service
public class UserApplyServiceImpl implements UserApplyService {
	@Resource
	private UserApplyDao	userApplyDao;
	@Resource
	private CoreUserDao		coreUserDao;

	@Override
	public void registerUser(UserApplyDto userApplyDto) throws BusinessException {
		if (userApplyDto != null && StringUtils.isNotBlank(userApplyDto.getUsername())) {
			if (StringUtil.stringLength(userApplyDto.getUsername()) > 25) {
				throw new BusinessException("用户名长度不能超过25个字符！");
			}
			if (StringUtils.isNotBlank(userApplyDto.getRealname())) {
				UserApplyDto applyData = userApplyDao.getUserApplyByUsername(userApplyDto.getUsername());
				if (applyData == null) {// 先判断是否已申请过了
					CoreUserModel user = coreUserDao.getUserByUsername(userApplyDto.getUsername());
					if (user == null) {// 用户不存在，则添加一个用户信息到用户表;存在就更新用户信息
						userApplyDto.setStatus(1);
						userApplyDto.setApplyDate(new Date());
						userApplyDao.registerUser(userApplyDto);
					} else {
						throw new BusinessException("用户名已存在,请换一个！");
					}
				} else {
					throw new BusinessException("用户名已存在,请换一个！");
				}
			} else {
				throw new BusinessException("真实姓名不能为空！");
			}
		} else {
			throw new BusinessException("用户名不能为空！");
		}
	}

	@Override
	public List<UserApplyDto> listRegisterUsers(UserApplyDto userApplyDto) {
		if (userApplyDto == null)
			return null;
		List<UserApplyDto> userList = userApplyDao.findRegisterUsersByModel(userApplyDto);
		return userList;
	}

	@Override
	public void checkUser(UserApplyDto userApplyDto) throws BusinessException {
		if (userApplyDto != null && userApplyDto.getCheckUserId() != null) {
			UserApplyDto userDto = userApplyDao.getUserApplyByModel(userApplyDto);
			if (userDto == null || StringUtils.isBlank(userDto.getUsername()))
				throw new BusinessException("审核失败，数据不存在！");

			if (userApplyDto.getStatus() == null)
				userApplyDto.setStatus(2);

			if (userApplyDto.getStatus() == 2) {
				CoreUserModel user = coreUserDao.getUserByUsername(userDto.getUsername());
				if (user == null) {// 用户不存在，则添加一个用户信息到用户表;
					user = new CoreUserModel();
					user.setUsername(userDto.getUsername());
					user.setFullname(userDto.getRealname());
					user.setPassword(userDto.getPassword());
					user.setPhoneNumber(userDto.getPhoneNumber());
					user.setMobileNumber(userDto.getMobileNumber());
					user.setEmail(userDto.getEmail());
					coreUserDao.insert(user);
				} else {
					throw new BusinessException("该用户已存在，不能通过审核！");
				}
			}
			userApplyDto.setCheckDate(new Date());
			userApplyDao.checkUser(userApplyDto);

		} else {
			throw new BusinessException("您还没有登录，不能审核！");
		}
	}

	@Override
	public void batchCheckUser(Integer checkUserId, Integer status, String ids)
			throws BusinessException {
		if (StringUtils.isNotBlank(ids)) {
			String[] idArr = ids.split(",");
			for (String id : idArr) {
				if (StringUtils.isNotBlank(id)) {
					UserApplyDto userApplyDto = new UserApplyDto();
					userApplyDto.setId(Integer.parseInt(id));
					userApplyDto.setCheckUserId(checkUserId);
					userApplyDto.setStatus(status);
					checkUser(userApplyDto);
				}
			}
		} else {
			throw new BusinessException("ID不能为空！");
		}
	}

	@Override
	public List<UserApplyDto> listCheckUserLogs(UserApplyDto userApplyDto) {
		return userApplyDao.listCheckUserLogs(userApplyDto);
	}

}
