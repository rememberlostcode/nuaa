
package com.school.xnew.web.controller;

import java.util.List;

import javax.annotation.Resource;

import org.lost.commons.lang.BusinessException;
import org.lost.commons.util.StringUtil;
import org.lost.finder.core.id.Menu;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

import com.school.xnew.sys.service.AdminService;

@Controller
@RequestMapping("/admin")
public class MenuController {

	@Resource
	private AdminService	adminService;

	@RequestMapping("/menu/query")
	public String query(@RequestParam(value = "id", required = true) String id,
			@RequestParam(value = "name", required = true) String name, Model model)
			throws BusinessException {

		Menu menu = new Menu();

		if (StringUtil.isNotBlank(id) && StringUtil.isNumeric(id)) {
			menu.setId(Integer.valueOf(id.trim()));
			model.addAttribute("id", id);
		}

		if (name != null && StringUtil.isNotBlank(name)) {
			menu.setName(name.trim());
			model.addAttribute("name", name.trim());
		}

		model.addAttribute("isQuery", true);

		model.addAttribute("menus", adminService.findMenusByExample(menu));
		return UrlBasedViewResolver.FORWARD_URL_PREFIX + "/admin/listMenu";
	}

	@RequestMapping(value = "/menu/detail")
	public String getMenuDetail(@RequestParam(value = "id") String id,
			@RequestParam(value = "to") String to, Model model) throws BusinessException {
		Menu menu = new Menu();
		menu.setId(Integer.valueOf(id));
		List<Menu> menus = null;
		menus = adminService.findMenusByExample(menu);

		if (menus != null && menus.size() >= 1) {
			escape(menus.get(0));
			model.addAttribute("menu", menus.get(0));
		}
		if ("modify".equals(to)) {
			return UrlBasedViewResolver.FORWARD_URL_PREFIX + "/admin/modifyMenu";
		} else {
			return UrlBasedViewResolver.FORWARD_URL_PREFIX + "/admin/menuDetail";
		}

	}

	@RequestMapping(value = "/menu/modify")
	public String modifyMenu(@ModelAttribute Menu menu) throws BusinessException {
		if (menu.getParentId() == null) {
			menu.setParentId(0);
		}
		adminService.modifyMenu(menu);

		return UrlBasedViewResolver.FORWARD_URL_PREFIX + "/admin/listMenu.vm";
	}

	@RequestMapping(value = "/menu/new")
	public String newMenu(@ModelAttribute Menu menu) throws BusinessException {

		if (menu.getParentId() == null) {
			menu.setParentId(0);
		}
		adminService.newMenu(menu);

		return UrlBasedViewResolver.FORWARD_URL_PREFIX + "/admin/listMenu.vm";
	}

	@RequestMapping(value = "/menu/del")
	public String delMenu(@RequestParam(value = "id") String id) throws BusinessException {

		Menu menu = new Menu();
		menu.setId(Integer.valueOf(id));

		adminService.removeMenu(menu);

		return UrlBasedViewResolver.FORWARD_URL_PREFIX + "/admin/listMenu.vm";
	}

	private void escape(Menu menu) {
		menu.setName(menu.getName().replaceAll("\"", "&#34;").replace("\'", "&#39;"));
		if (menu.getTip() != null && menu.getTip().trim().length() != 0) {
			menu.setTip(menu.getTip().replaceAll("\"", "&#34;").replace("\'", "&#39;"));
		}
		if (menu.getAction() != null && menu.getAction().trim().length() != 0) {
			menu.setAction(menu.getAction().replaceAll("\"", "&#34;").replace("\'", "&#39;"));
		}
		if (menu.getImg() != null && menu.getImg().trim().length() != 0) {
			menu.setImg(menu.getImg().replaceAll("\"", "&#34;").replace("\'", "&#39;"));
		}
	}
}
