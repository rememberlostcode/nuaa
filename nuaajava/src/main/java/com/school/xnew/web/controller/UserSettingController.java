
package com.school.xnew.web.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.lost.commons.lang.BusinessException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

import com.school.xnew.sys.service.AccountService;
import com.school.xnew.sys.service.PasswordReset;
import com.school.xnew.sys.service.User;
import com.school.xnew.web.BaseController;

@Controller
@RequestMapping(value = "/user")
public class UserSettingController extends BaseController {

	@Resource
	private AccountService	accountService;

	/**
	 * 个人设置
	 * 
	 * @return
	 * @throws BusinessException
	 */
	@RequestMapping(value = "/setting")
	public String setting(HttpServletRequest request, HttpServletResponse response, Model model)
			throws BusinessException {
		User loginUser = getLoginUser(request, response);
		if (loginUser != null) {
			escape(loginUser);
			model.addAttribute("user", loginUser);
		}
		return "user/setting";
	}

	@RequestMapping(value = "/modifyUser")
	public String getModifyUser(HttpServletRequest request, HttpServletResponse response,
			Model model) throws BusinessException {

		User loginUser = getLoginUser(request, response);
		if (loginUser != null) {
			escape(loginUser);
			model.addAttribute("user", loginUser);
		}
		return "user/modifyUser";
	}

	/**
	 * 保存用户修改信息
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws BusinessException
	 */
	@RequestMapping(value = "/modify")
	public String modify(@ModelAttribute User user, HttpServletRequest request,
			HttpServletResponse response, Model model) {
		boolean errorFlag = false;
		String msg = "";
		try {
			Integer userId = getUserLoginId(request, response);
			if (userId != null && user != null) {
				if (user.getId().equals(userId)) {
					accountService.modifyUser(user);
				} else {
					errorFlag = true;
					msg = "您没有权限修改别人的信息!";
				}
			}
		} catch (BusinessException e) {
			errorFlag = true;
			msg = "修改信息异常!";
		}

		if (errorFlag) {
			model.addAttribute("user", user);
			model.addAttribute("errorMsg", msg);
			return "user/modifyUser";
		}
		return UrlBasedViewResolver.REDIRECT_URL_PREFIX + getRootUrl() + "nanhang/user/setting";
	}

	/**
	 * 重置密码页面
	 * 
	 * @param id
	 * @param to
	 * @param model
	 * @return
	 * @throws BusinessException
	 */
	@RequestMapping(value = "/resetPwd")
	public String repeatPwd(HttpServletRequest request, HttpServletResponse response, Model model)
			throws BusinessException {

		User loginUser = getLoginUser(request, response);
		if (loginUser != null) {
			escape(loginUser);
			model.addAttribute("user", loginUser);
		}
		return "user/modifyPwd";

	}

	/**
	 * 保存重置密码
	 * 
	 * @param user
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws BusinessException
	 */
	@RequestMapping(value = "/modifyPwd")
	public String modifyPwd(@ModelAttribute PasswordReset passwordReset,
			HttpServletRequest request, HttpServletResponse response, Model model)
			throws BusinessException {
		boolean errorFlag = false;
		String msg = "";
		try {
			Integer userId = getUserLoginId(request, response);
			if (userId != null && passwordReset != null) {
				passwordReset.setUserId(userId);
				accountService.resetPassword(passwordReset);
			} else {
				errorFlag = true;
				msg = "您还没有登录,请先登录后再修改!";
			}
		} catch (BusinessException e) {
			errorFlag = true;
			msg = e.getMessage();
		}

		if (errorFlag) {
			model.addAttribute("errorMsg", msg);
			return "user/modifyPwd";
		}
		return UrlBasedViewResolver.REDIRECT_URL_PREFIX + getRootUrl() + "nanhang/user/setting";
	}

	private void escape(User user) {
		if (user == null || user.getId() == null)
			return;
		user.setUsername(user.getUsername().replaceAll("\"", "&#34;").replace("\'", "&#39;"));
		user.setFullname(user.getFullname().replaceAll("\"", "&#34;").replace("\'", "&#39;"));
	}
}
