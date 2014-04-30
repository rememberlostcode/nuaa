
package com.school.xnew.web.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.lost.commons.lang.BusinessException;
import org.lost.finder.core.id.Identify;
import org.lost.finder.core.id.WebUser;
import org.lost.finder.tool.Pager;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

import com.school.xnew.biz.dto.RtnValueDto;
import com.school.xnew.biz.dto.UserApplyDto;
import com.school.xnew.biz.service.UserApplyService;
import com.school.xnew.persistence.entity.CoreUserModel;
import com.school.xnew.sys.service.AdminService;
import com.school.xnew.sys.service.AuthService;
import com.school.xnew.sys.util.WebTable;
import com.school.xnew.util.JsonUtil;
import com.school.xnew.util.StringUtil;

/**
 * 
 * 类说明：申请用户管理控制器
 * 
 * @author robin 2014-3-10下午2:48:05
 * 
 */
@Controller
@RequestMapping(value = "/user")
public class UserApplyController {
	@Resource
	private UserApplyService	userApplyService;
	@Resource
	private AdminService		adminService;
	@Resource
	private AuthService			authService;

	@Resource
	@Value(value = "${com.nuaa.url}")
	private String				url;

	/**
	 * 列表展示申请用户审核
	 */
	@RequestMapping(value = "/listCheckUser")
	public String listCheckUser(@Identify WebUser webUser,
			@ModelAttribute UserApplyDto userApplyDto, Model model) {
		WebTable<UserApplyDto> webTable = WebTable.getInstance(UserApplyDto.class, new String[] {
				"mobileNumber", "status", "checkUserId", "checkUserName", "checkDate", "userId",
				"isRelatived", "beginDate", "endDate", "ids" });
		Map<String, String> databaseNames = new HashMap<String, String>();
		databaseNames.put("id", "id");
		StringBuffer condition = new StringBuffer();
		if (userApplyDto != null) {
			if (StringUtils.isNotBlank(userApplyDto.getUsername())) {
				if (condition.length() > 0) {
					condition.append("&username=" + userApplyDto.getUsername());
				} else {
					condition.append("?username=" + userApplyDto.getUsername());
				}
			}
			if (StringUtils.isNotBlank(userApplyDto.getMobileNumber())) {
				if (condition.length() > 0) {
					condition.append("&mobileNumber=" + userApplyDto.getMobileNumber());
				} else {
					condition.append("?mobileNumber=" + userApplyDto.getMobileNumber());
				}
			}
			if (StringUtils.isNotBlank(userApplyDto.getEmail())) {
				if (condition.length() > 0) {
					condition.append("&email=" + userApplyDto.getEmail());
				} else {
					condition.append("?email=" + userApplyDto.getEmail());
				}
			}
		}
		webTable.setUrl("/user/checkUsersJson.json" + condition.toString());
		webTable.setDatabaseNames(databaseNames);
		model.addAttribute("tableInfo", JsonUtil.getEntity2Json(webTable));
		return "/user/listCheckUser";
	}

	/**
	 * jqGrid列表展示审核用户
	 */
	@RequestMapping(method = RequestMethod.POST, value = "/checkUsersJson", produces = "text/html;charset=UTF-8")
	public String checkUsersJson(@Identify WebUser webUser,
			@ModelAttribute UserApplyDto userApplyDto, Model model) {
		Pager pager = Pager.currentPager();
		if (pager != null) {
			List<UserApplyDto> users = userApplyService.listRegisterUsers(userApplyDto);
			model.addAttribute("griddata", JsonUtil.getEntity2Json(users));
			model.addAttribute("totalPages", pager.getTotalPages());
			model.addAttribute("currentPage", pager.getCurrentPage());
			model.addAttribute("totalRecords", pager.getTotalRowsAmount());
			model.addAttribute("pageSize", pager.getPageSize());
		}
		return "/user/listCheckUser";
	}

	/**
	 * 列表展示用户审核历史记录信息
	 */
	@RequestMapping(value = "/listCheckLog")
	public String listCheckLog(@Identify WebUser webUser,
			@ModelAttribute UserApplyDto userApplyDto, Model model) {
		WebTable<UserApplyDto> webTable = WebTable.getInstance(UserApplyDto.class, new String[] {
				"applyDate", "username", "realname", "mobileNumber", "status", "checkUserId",
				"checkUserName", "checkDate", "isRelatived", "beginDate", "endDate" });
		Map<String, String> databaseNames = new HashMap<String, String>();
		databaseNames.put("id", "id");
		StringBuffer condition = new StringBuffer();
		if (userApplyDto != null) {
			if (StringUtils.isNotBlank(userApplyDto.getUsername())) {
				if (condition.length() > 0) {
					condition.append("&username=" + userApplyDto.getUsername());
				} else {
					condition.append("?username=" + userApplyDto.getUsername());
				}
			}
			if (StringUtils.isNotBlank(userApplyDto.getMobileNumber())) {
				if (condition.length() > 0) {
					condition.append("&mobileNumber=" + userApplyDto.getMobileNumber());
				} else {
					condition.append("?mobileNumber=" + userApplyDto.getMobileNumber());
				}
			}
			if (StringUtils.isNotBlank(userApplyDto.getEmail())) {
				if (condition.length() > 0) {
					condition.append("&email=" + userApplyDto.getEmail());
				} else {
					condition.append("?email=" + userApplyDto.getEmail());
				}
			}
			if (StringUtils.isNotBlank(userApplyDto.getBeginDate())) {
				if (condition.length() > 0) {
					condition.append("&beginDate=" + userApplyDto.getBeginDate());
				} else {
					condition.append("?beginDate=" + userApplyDto.getBeginDate());
				}
			}
			if (StringUtils.isNotBlank(userApplyDto.getEndDate())) {
				if (condition.length() > 0) {
					condition.append("&endDate=" + userApplyDto.getEndDate());
					condition.append(" 23:59:59");
				} else {
					condition.append("?endDate=" + userApplyDto.getEndDate());
					condition.append(" 23:59:59");
				}
			}
		}
		webTable.setUrl("/user/checkUserLogsJson.json" + condition.toString());
		webTable.setDatabaseNames(databaseNames);
		model.addAttribute("tableInfo", JsonUtil.getEntity2Json(webTable));
		return "/user/listCheckLog";
	}

	/**
	 * jqGrid列表展审核用户历史记录信息
	 */
	@RequestMapping(method = RequestMethod.POST, value = "/checkUserLogsJson", produces = "text/html;charset=UTF-8")
	public String checkUserLogsJson(@Identify WebUser webUser, UserApplyDto userApplyDto,
			Model model) {

		Pager pager = Pager.currentPager();
		if (pager != null) {
			List<UserApplyDto> users = userApplyService.listCheckUserLogs(userApplyDto);
			model.addAttribute("griddata", JsonUtil.getEntity2Json(users));
			model.addAttribute("totalPages", pager.getTotalPages());
			model.addAttribute("currentPage", pager.getCurrentPage());
			model.addAttribute("totalRecords", pager.getTotalRowsAmount());
			model.addAttribute("pageSize", pager.getPageSize());
		}
		return "/user/listCheckLog";
	}

	/**
	 * 保存申请用户申请信息
	 */
	@RequestMapping(method = RequestMethod.POST, value = "/register")
	public String register(HttpServletRequest request, @ModelAttribute UserApplyDto userApplyDto,
			Model model) {
		boolean errorFlag = false;
		RtnValueDto rtnValue = new RtnValueDto();
		String tempUrl = url;
		try {
			// String codeImage = "";
			// String code = (String) request.getSession().getAttribute(
			// RandomValidateCode.RANDOMCODEKEY);
			// if (userApplyDto != null) {
			// codeImage = userApplyDto.getCodeImage();
			// }
			// if (StringUtils.isBlank(codeImage)) {
			// errorFlag = true;
			// model.addAttribute("errorMsg", "请输入验证码！");
			// } else {
			// DESPlus desplus = new DESPlus();
			// code = desplus.decrypt(code);// 解密后再比较
			// if (StringUtils.isNotBlank(code) &&
			// codeImage.equalsIgnoreCase(code)) {
			// userApplyService.registerUser(userApplyDto);
			// model.addAttribute("result", "您的申请用户申请已提交,请等待审核!");
			// } else {
			// errorFlag = true;
			// model.addAttribute("errorMsg", "验证码输入错误,请重新输入！");
			// }
			// }

			if (userApplyDto != null && StringUtils.isNotBlank(userApplyDto.getUsername())) {
				userApplyService.registerUser(userApplyDto);
				rtnValue.setCode(1);
				rtnValue.setMessage("您的申请已提交,请等待审核!");
				tempUrl += "home.html";
			} else {
				errorFlag = true;
				rtnValue.setMessage("用户名不能为空！");
			}
		} catch (Exception e) {
			errorFlag = true;
			rtnValue.setMessage(e.getMessage());
		}
		if (errorFlag) {
			tempUrl += "register.html";
			rtnValue.setCode(0);
		}
		// model.addAttribute("result", JsonUtil.getEntity2Json(rtnValue));
		return UrlBasedViewResolver.REDIRECT_URL_PREFIX + tempUrl + "?code=" + rtnValue.getCode();
	}

	/**
	 * 审核申请用户
	 */
	@RequestMapping(method = RequestMethod.POST, value = "/checkUser")
	public String checkUser(@ModelAttribute UserApplyDto userApplyDto, HttpServletRequest request,
			HttpServletResponse response, Model model) {
		try {
			Integer userId = authService.recognize(request, response);
			if (userId != null) {
				CoreUserModel user = adminService.getUserById(userId);// 得到登录用户信息
				if (user != null) {
					if (userApplyDto != null && !StringUtil.isEmpty(userApplyDto.getIds())) {
						userApplyDto.setCheckUserId(user.getId());
						userApplyService.batchCheckUser(userApplyDto.getCheckUserId(),
								userApplyDto.getStatus(), userApplyDto.getIds());
						model.addAttribute("result", true);
					} else {
						model.addAttribute("result", false);
						model.addAttribute("resultMsg", "该系统还没有您的身份信息，请稍后再试！");
					}
				}
			} else {
				model.addAttribute("result", false);
				model.addAttribute("resultMsg", "您还没有登录,请先登录后再审核！");
			}
		} catch (BusinessException e) {
			model.addAttribute("result", false);
			model.addAttribute("resultMsg", e.getMessage());
		}
		return UrlBasedViewResolver.FORWARD_URL_PREFIX + "/user/listCheckUser";
	}

}
