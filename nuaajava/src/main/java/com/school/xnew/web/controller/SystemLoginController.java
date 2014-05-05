
package com.school.xnew.web.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.lost.commons.lang.BusinessException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

import com.school.xnew.biz.dto.RtnMenuDto;
import com.school.xnew.biz.dto.RtnMenuValue;
import com.school.xnew.biz.dto.RtnUserDto;
import com.school.xnew.biz.dto.RtnValueDto;
import com.school.xnew.persistence.entity.CoreUserModel;
import com.school.xnew.sys.service.AccountService;
import com.school.xnew.sys.service.AdminService;
import com.school.xnew.sys.service.AuthService;
import com.school.xnew.sys.service.User;
import com.school.xnew.util.JsonUtil;

/**
 * 
 * 类说明：登录Controller
 * 
 * @author robin 2014-3-14下午1:41:02
 * 
 */
@Controller
@RequestMapping(value = "/")
public class SystemLoginController {
	private Logger			log		= LoggerFactory.getLogger(SystemLoginController.class);
	@Resource
	private AccountService	accountService;
	@Resource
	private AuthService		authService;
	@Resource
	private AdminService	adminService;

	@Resource
	@Value(value = "${com.nuaa.url}")
	private String			url;

	protected Logger		logger	= LoggerFactory.getLogger(getClass());

	@RequestMapping(method = RequestMethod.POST, value = "/LoginAuth")
	public String loginAuth(@RequestParam(value = "oid") String oid,
			@RequestParam(value = "key") String key, HttpServletRequest request,
			HttpServletResponse response, Model model) {
		boolean errorFlag = false;
		RtnValueDto rtnValueDto = new RtnValueDto();
		String tempUrl = url;
		try {
			// 设置用户参数
			User user = new User();
			user.setUsername(oid);
			user.setPassword(key);
			// 校验用户登录
			Integer userId = accountService.loginVerify(user);
			if (userId != null) {
				authService.mark(userId, request, response);
				rtnValueDto.setCode(1);
				rtnValueDto.setMessage("登录成功!");
				// tempUrl += "home.html";
			} else {
				errorFlag = true;
				rtnValueDto.setCode(0);
				rtnValueDto.setMessage("登录失败，用户名或密码错误!");
			}
		} catch (BusinessException e) {
			if (e.getCode() == null)
				rtnValueDto.setCode(2);// 登录异常，请您联系管理员！
			errorFlag = true;
			rtnValueDto.setCode(e.getCode());
			rtnValueDto.setMessage(e.getMessage());
			log.info("登录失败：{}", new Object[] { e.getMessage() });
		}
		if (errorFlag) {
			tempUrl += "login.html?code=" + rtnValueDto.getCode();
		}
		// model.addAttribute("result", JsonUtil.getEntity2Json(rtnValueDto));
		Cookie cookie = new Cookie("JSESSIONID", request.getSession().getId());
		cookie.setPath("/nuaa");
		response.addCookie(cookie);
		return UrlBasedViewResolver.REDIRECT_URL_PREFIX + tempUrl;
	}

	@RequestMapping(method = RequestMethod.GET, value = "/menus")
	public String getSystemMenu(HttpServletRequest request, HttpServletResponse response,
			Model model) {
		Integer userId = authService.recognize(request, response);
		RtnMenuDto rtnMenuDto = new RtnMenuDto();
		try {
			List<RtnMenuValue> menuList = adminService.getMenuValuesByUserId(userId);
			if (menuList != null && !menuList.isEmpty()) {
				rtnMenuDto.setMenus(menuList);
			}
			if (userId != null) {
				CoreUserModel user = adminService.getUserById(userId);
				if (user != null) {
					RtnUserDto userDto = new RtnUserDto();
					userDto.setId(userId);
					userDto.setName(user.getFullname());
					rtnMenuDto.setUser(userDto);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		model.addAttribute("data", JsonUtil.getEntity2Json(rtnMenuDto));
		return "";
	}

	@RequestMapping(value = "/exit")
	public String exit(HttpServletRequest request, HttpServletResponse response, Model model) {
		authService.removeMark(request, response);
		// RtnValueDto rtnValueDto = new RtnValueDto();
		// rtnValueDto.setCode(1);
		// model.addAttribute("result", JsonUtil.getEntity2Json(rtnValueDto));
		return UrlBasedViewResolver.REDIRECT_URL_PREFIX + url;
	}
}
