
package com.school.xnew.persistence.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.lost.commons.lang.BusinessException;

import com.school.xnew.persistence.entity.CoreUserModel;
import com.school.xnew.sys.service.PasswordReset;
import com.school.xnew.sys.service.User;

public interface CoreUserDao extends GenericDao<CoreUserModel> {
	public List<User> findAll() throws BusinessException;

	public List<User> getUsersByModel(CoreUserModel userModel);

	public void deleteById(@Param(value = "id") Integer userId) throws BusinessException;

	public CoreUserModel getUserByUsername(String username);

	public User getLoginUser(CoreUserModel userModel);

	public void resetPassword(PasswordReset passwordReset) throws BusinessException;

	public void updateUser(User user) throws BusinessException;
}
