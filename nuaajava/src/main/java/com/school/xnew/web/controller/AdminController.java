
package com.school.xnew.web.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.lost.commons.lang.BusinessException;
import org.lost.commons.util.StringUtil;
import org.lost.finder.core.id.ManagementSystem;
import org.lost.finder.core.id.Menu;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.school.xnew.sys.service.AdminService;
import com.school.xnew.sys.service.User;

@Controller
@RequestMapping(value = "/admin")
public class AdminController {

	@Resource
	private AdminService	adminService;

	@RequestMapping(value = "/{path}")
	public void index(@PathVariable String path, Model model) {
		model.addAttribute("this", this);
	};

	public String getMenuName(Integer id) throws BusinessException {
		if (id != null) {
			Menu menu = new Menu();
			menu.setId(id);
			List<Menu> menus = adminService.findMenusByExample(menu);
			if (menus == null || menus.isEmpty()) {
				return StringUtil.EMPTY_STRING;
			} else {
				return menus.get(0).getName();
			}
		}
		return StringUtil.EMPTY_STRING;
	}

	public String getSystemName(Integer id) throws BusinessException {
		if (id != null) {
			List<ManagementSystem> systems = adminService.getManagementSystems();
			if (systems == null || systems.isEmpty()) {
				return StringUtil.EMPTY_STRING;
			} else {
				for (ManagementSystem system : systems) {
					if (id.equals(system.getId())) {
						return system.getName();
					}
				}
				return StringUtil.EMPTY_STRING;
			}
		}
		return StringUtil.EMPTY_STRING;
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/listMenu")
	public List<Menu> getMenus(Model model, HttpServletRequest request) throws BusinessException {
		List<Menu> result = null;
		if (request.getAttribute("isQuery") != null) {
			model.addAttribute("nohideList",
					createNoHideList((List<Menu>) request.getAttribute("menus")));
			result = sortMenus((List<Menu>) request.getAttribute("menus"));
		} else {
			result = sortMenus(adminService.getMenus());
		}
		model.addAttribute("this", this);
		return result;
	}

	private List<Integer> createNoHideList(List<Menu> menus) throws BusinessException {
		List<Integer> noskipist = new ArrayList<Integer>();
		for (Menu menu : menus) {
			noskipist.add(menu.getId());
		}
		return noskipist;
	}

	private List<Menu> sortMenus(List<Menu> menus) throws BusinessException {
		if (menus == null || menus.isEmpty()) {
			return new ArrayList<Menu>();
		}
		Set<Integer> idSet = new HashSet<Integer>();
		List<Menu> sortedResult = new ArrayList<Menu>();
		for (Menu menu : menus) {
			// 判断菜单：若已存在了就不加入
			if (!idSet.add(menu.getId()))
				continue;
			sortedResult.add(menu);
			if (menu.getSubMenus() != null && !menu.getSubMenus().isEmpty()) {
				for (Menu subMenu : menu.getSubMenus()) {
					// 判断菜单：若已存在了就不加入
					if (!idSet.add(subMenu.getId()))
						continue;
					sortedResult.add(subMenu);
					sortedResult.addAll(sortMenus(subMenu.getSubMenus()));
				}
			}
		}
		return sortedResult;
	}

	public List<ManagementSystem> getManagementSystems() throws BusinessException {
		return adminService.getManagementSystems();
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/listUser")
	public List<User> getUsers(HttpServletRequest request, Model model) throws BusinessException {
		model.addAttribute("this", this);
		if (request.getAttribute("isQuery") != null) {
			return (List<User>) request.getAttribute("user");
		} else {
			return adminService.getUsers();
		}
	}

	public List<Menu> getMenus() throws BusinessException {
		return adminService.getMenus();
	}

}
