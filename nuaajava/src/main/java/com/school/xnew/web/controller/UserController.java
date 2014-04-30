
package com.school.xnew.web.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.lost.commons.lang.BusinessException;
import org.lost.finder.tool.Pager;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

import com.school.xnew.persistence.entity.CoreMenuModel;
import com.school.xnew.persistence.entity.CoreUserModel;
import com.school.xnew.sys.service.AdminService;
import com.school.xnew.sys.service.User;
import com.school.xnew.sys.util.WebTable;
import com.school.xnew.util.JsonUtil;

@Controller
@RequestMapping(value = "/admin")
public class UserController {

	@Resource
	private AdminService	adminService;

	@RequestMapping(value = "/user/query")
	public String query(CoreUserModel user, Model model) throws BusinessException {
		if (user == null) {
			user = new CoreUserModel();
		}
		model.addAttribute("user", user);
		model.addAttribute("isQuery", true);
		model.addAttribute("users", adminService.getUsersByModel(user));
		return UrlBasedViewResolver.FORWARD_URL_PREFIX + "/admin/listUser";
	}

	/**
	 * 列表展示用户
	 */
	@RequestMapping(value = "/listUsers")
	public String listUser(@ModelAttribute CoreUserModel user, Model model) {
		WebTable<User> webTable = WebTable.getInstance(User.class, new String[] { "username",
				"fullname", "mobileNumber", "email" });
		Map<String, String> databaseNames = new HashMap<String, String>();
		databaseNames.put("id", "id");
		StringBuffer condition = new StringBuffer();
		if (user != null) {
			if (StringUtils.isNotBlank(user.getUsername())) {
				if (condition.length() > 0) {
					condition.append("&username=" + user.getUsername());
				} else {
					condition.append("?username=" + user.getUsername());
				}
			}
			if (StringUtils.isNotBlank(user.getMobileNumber())) {
				if (condition.length() > 0) {
					condition.append("&mobileNumber=" + user.getMobileNumber());
				} else {
					condition.append("?mobileNumber=" + user.getMobileNumber());
				}
			}
			if (StringUtils.isNotBlank(user.getEmail())) {
				if (condition.length() > 0) {
					condition.append("&email=" + user.getEmail());
				} else {
					condition.append("?email=" + user.getEmail());
				}
			}
		}
		model.addAttribute("user", user);
		webTable.setUrl("/admin/user/listUsersJson.json" + condition.toString());
		webTable.setDatabaseNames(databaseNames);
		model.addAttribute("tableInfo", JsonUtil.getEntity2Json(webTable));
		return "admin/listUser";
	}

	/**
	 * jqGrid列表展示用户
	 */
	@RequestMapping(method = RequestMethod.POST, value = "/user/listUsersJson", produces = "text/html;charset=UTF-8")
	public String listUsersJson(@ModelAttribute CoreUserModel user, Model model) {
		Pager pager = Pager.currentPager();
		if (pager != null) {
			List<User> users = adminService.getUsersByModel(user);
			model.addAttribute("griddata", JsonUtil.getEntity2Json(users));
			model.addAttribute("totalPages", pager.getTotalPages());
			model.addAttribute("currentPage", pager.getCurrentPage());
			model.addAttribute("totalRecords", pager.getTotalRowsAmount());
			model.addAttribute("pageSize", pager.getPageSize());
		}
		return "admin/listUser";
	}

	@RequestMapping(value = "/user/detail")
	public String getUserDetail(@RequestParam(value = "id") String id,
			@RequestParam(value = "to") String to, Model model) throws BusinessException {

		CoreUserModel userModel = new CoreUserModel();
		userModel.setId(Integer.valueOf(id));
		List<User> users = adminService.getUsersByModel(userModel);

		if (users != null && users.size() >= 1) {
			escape(users.get(0));
			model.addAttribute("user", users.get(0));
		}
		if ("modify".equals(to)) {
			return UrlBasedViewResolver.FORWARD_URL_PREFIX + "/admin/modifyUser";
		} else {
			return UrlBasedViewResolver.FORWARD_URL_PREFIX + "/admin/userDetail";
		}

	}

	@RequestMapping(value = "/user/modify")
	public String modifyUser2Menu(User user) throws BusinessException {
		adminService.modifyUser2Menu(user);
		return UrlBasedViewResolver.FORWARD_URL_PREFIX + "/admin/listUsers";
	}

	@RequestMapping(value = "/user/del")
	public String delUser(@RequestParam(value = "id") String id) throws BusinessException {
		adminService.deleteUser(Integer.valueOf(id));
		return UrlBasedViewResolver.FORWARD_URL_PREFIX + "/admin/listUsers";
	}

	private void escape(User user) {
		if (user == null || user.getId() == null)
			return;

		user.setUsername(user.getUsername().replaceAll("\"", "&#34;").replace("\'", "&#39;"));
		List<CoreMenuModel> menuList = adminService.getMenusByUserId(user.getId());
		if (menuList != null && !menuList.isEmpty()) {
			user.setMenuList(menuList);
		}

	}
}
