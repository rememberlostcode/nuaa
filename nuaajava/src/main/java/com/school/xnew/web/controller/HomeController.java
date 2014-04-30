
package com.school.xnew.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

import com.school.xnew.web.BaseController;

/**
 * 
 * 类说明：
 * 
 * @author robin 2014-3-10下午4:18:56
 * 
 */
@Controller
@RequestMapping(value = "/")
public class HomeController extends BaseController {

	@RequestMapping(value = "home")
	public String home(Model model) {
		return UrlBasedViewResolver.REDIRECT_URL_PREFIX + getRootUrl();
	}

	@RequestMapping(value = "login")
	public String login(String error, Model model) {
		model.addAttribute("error", error);
		return UrlBasedViewResolver.REDIRECT_URL_PREFIX + getRootUrl() + "login.html";
	}

}
