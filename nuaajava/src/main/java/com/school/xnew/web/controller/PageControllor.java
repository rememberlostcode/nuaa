
package com.school.xnew.web.controller;

import org.lost.finder.core.id.Identify;
import org.lost.finder.core.id.WebUser;
import org.lost.finder.tool.Pager;
import org.lost.finder.tool.Pagination;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

/**
 * 分页控制器
 */
@Controller
@RequestMapping(value = "/page")
public class PageControllor {
	@RequestMapping(value = "/commonPage")
	public String commonPage(@Identify WebUser webUser, @Pagination Pager pageDto, Model model) {
		model.addAttribute("page", pageDto);
		return UrlBasedViewResolver.FORWARD_URL_PREFIX + pageDto.getUserUrl();
	}
}
