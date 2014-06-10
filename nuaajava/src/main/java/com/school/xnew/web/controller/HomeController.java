
package com.school.xnew.web.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

import com.school.xnew.sys.service.NewsService;
import com.school.xnew.sys.service.ReportService;
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
	@Resource
	private NewsService newsService;
	@Resource
	private ReportService reportService;

	@RequestMapping(value = "home")
	public String home(Model model) {
		return UrlBasedViewResolver.REDIRECT_URL_PREFIX + getRootUrl();
	}

	@RequestMapping(value = "login")
	public String login(String error, Model model) {
		model.addAttribute("error", error);
		return UrlBasedViewResolver.REDIRECT_URL_PREFIX + getRootUrl() + "login.html";
	}
	
	@RequestMapping(value = "updateClickOrDownloadNum")
	public void updateClickOrDownloadNum(String type,Integer id, Model model,HttpServletResponse response){
		int res = 0;
		if(id != null && "news".equals(type)){
			newsService.updateClickNum(id);
			res = 1;
		} else if(id != null && "notice".equals(type)){
			newsService.updateClickNum(id);
			res = 1;
		} else if(id != null && "report".equals(type)){
			reportService.updateClickNum(id);
			res = 1;
		}
		
		try {
			PrintWriter writer = response.getWriter();
			response.reset();
			response.setCharacterEncoding("UTF-8");
			response.setContentType("text/html");
			writer.println(res);
			return;
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
