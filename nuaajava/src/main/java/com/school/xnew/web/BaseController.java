
package com.school.xnew.web;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;

import com.school.xnew.persistence.entity.CoreUserModel;
import com.school.xnew.sys.service.AdminService;
import com.school.xnew.sys.service.AuthService;
import com.school.xnew.sys.service.User;

public class BaseController {
	@Resource
	public AdminService	adminService;
	@Resource
	public AuthService	authService;

	@Resource
	@Value(value = "${com.nuaa.url}")
	private String		url;

	/**
	 * 取得用户登录ID
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	public Integer getUserLoginId(HttpServletRequest request, HttpServletResponse response) {
		Integer userId = authService.recognize(request, response);
		CoreUserModel userModel = new CoreUserModel();
		userModel.setId(userId);
		return userId;
	}

	/**
	 * 取得登录用户
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	public User getLoginUser(HttpServletRequest request, HttpServletResponse response) {
		Integer userId = authService.recognize(request, response);
		CoreUserModel userModel = new CoreUserModel();
		userModel.setId(userId);
		List<User> users = adminService.getUsersByModel(userModel);

		if (users != null && users.size() >= 1) {
			return users.get(0);
		}
		return null;
	}

	/**
	 * 获取根路径
	 * 
	 * @return
	 */
	public String getRootUrl() {
		return url;
	}

}
