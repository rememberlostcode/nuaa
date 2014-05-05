/**
 * 
 */

package com.school.xnew.sys.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.lost.commons.lang.BusinessException;
import org.springframework.stereotype.Service;

import com.school.xnew.biz.dto.RtnMenuDto;
import com.school.xnew.persistence.dao.CoreMenuDao;
import com.school.xnew.persistence.dao.CoreUserDao;
import com.school.xnew.persistence.dao.User2MenuDao;
import com.school.xnew.persistence.entity.CoreUserModel;
import com.school.xnew.sys.service.AccountService;
import com.school.xnew.sys.service.PasswordReset;
import com.school.xnew.sys.service.User;

/**
 * 
 * 类说明：
 * 
 * @author robin 2014-3-12上午10:49:14
 * 
 */
@Service
public class AccountServiceImpl implements AccountService {

	@Resource
	private CoreUserDao		coreUserDao;

	@Resource
	private CoreMenuDao		coreMenuDao;

	@Resource
	private User2MenuDao	user2MenuDao;

	@Override
	public Integer loginVerify(User user) throws BusinessException {

		if (user == null || StringUtils.isBlank(user.getUsername())
				|| StringUtils.isBlank(user.getPassword())) {
			throw new BusinessException(3);// 用户名与密码不能空
		}
		// 校验的token是否正确
		// String token = DESPlus.;
		// if (StringUtil.isBlank(token) || !Constant.TOKEN_KEY.equals(token)) {
		// throw loginFailException;
		// }
		// 校验是否登录成功
		CoreUserModel userModel = new CoreUserModel();
		userModel.setUsername(user.getUsername());
		userModel.setPassword(user.getPassword());
		User loginUser = coreUserDao.getLoginUser(userModel);
		if (loginUser != null) {
			// 用户已被管理员删除
			if (loginUser.getIsDel() != null && loginUser.getIsDel().equals('1')) {
				throw new BusinessException(4);
			}
			return loginUser.getId();
		} else {
			return null;
		}
	}

	/**
	 * 取得菜单信息
	 * 
	 * @return
	 */
	public List<RtnMenuDto> getMenusByUserId(Integer userId) {
		return null;
	}

	@Override
	public void resetPassword(PasswordReset passwordReset) throws BusinessException {
		if (passwordReset != null && passwordReset.getUserId() != null) {
			CoreUserModel user = new CoreUserModel();
			user.setId(passwordReset.getUserId());
			user.setPassword(passwordReset.getOldPw());

			CoreUserModel dataUser = coreUserDao.getModel(user);
			if (dataUser != null) {
				if (StringUtils.isNotBlank(passwordReset.getNewPw())) {
					try {
						coreUserDao.resetPassword(passwordReset);
					} catch (Exception e) {
						throw new BusinessException("修改密码异常!");
					}
				} else {
					throw new BusinessException("新密码不能为空!");// 新密码为空
				}
			} else {
				throw new BusinessException("原始密码输入不正确!");// 原始密码为空
			}
		} else {
			throw new BusinessException("您还没有登录,请先登录后再修改!");// 没有登录
		}

	}

	@Override
	public String getUserNameById(Integer userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<User> getAllUserByCreateBy(String ownerId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User getUserById(Integer userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delUserById(Integer userId) {
		// TODO Auto-generated method stub

	}

	@Override
	public void modifyUser(User user) throws BusinessException {
		CoreUserModel coreUser = new CoreUserModel();
		coreUser.setId(user.getId());
		coreUser.setMobileNumber(user.getMobileNumber());
		coreUser.setEmail(user.getEmail());
		coreUserDao.update(coreUser);
	}

	@Override
	public boolean resetPassword(Integer userid, String newPassword) {
		// coreUserDao.update(t);
		return false;
	}

	@Override
	public List<User> findUserByName(String username, String name, String createBy)
			throws BusinessException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void activeUser(Integer userId) {
		// TODO Auto-generated method stub

	}

}
