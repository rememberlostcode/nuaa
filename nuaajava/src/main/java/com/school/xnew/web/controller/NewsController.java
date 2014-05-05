
package com.school.xnew.web.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.lost.commons.lang.BusinessException;
import org.lost.finder.tool.Pager;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.school.xnew.persistence.entity.NewsModel;
import com.school.xnew.sys.service.AuthService;
import com.school.xnew.sys.service.NewsService;
import com.school.xnew.sys.util.WebTable;
import com.school.xnew.util.JsonUtil;

/**
 * 新闻通知
 * 
 * @author silvermoon
 * 
 */
@Controller
@RequestMapping(value = "/sys/news")
public class NewsController {

	@Resource
	private NewsService	newsService;
	@Resource
	private AuthService	authService;

	/**
	 * 新闻列表
	 * 
	 * @param model
	 * @return
	 * @throws BusinessException
	 */
	@RequestMapping(value = "/list")
	public String list(NewsModel newsModel, Model model) throws BusinessException {
		WebTable<NewsModel> webTable = WebTable.getInstance(NewsModel.class, new String[] { "id",
				"title", "modify_time", "creater_name", "ids" });

		setJsonTable("/sys/news/listJson.json", newsModel, webTable, model);

		model.addAttribute("type", 0);
		return "news/list";
	}

	private void setJsonTable(String urlJson, NewsModel newsModel, WebTable<NewsModel> webTable,
			Model model) {
		Map<String, String> databaseNames = new HashMap<String, String>();
		databaseNames.put("id", "id");
		StringBuffer condition = new StringBuffer();
		if (newsModel != null) {
			if (StringUtils.isNotBlank(newsModel.getCreater_name())) {
				if (condition.length() > 0) {
					condition.append("&creater_name=" + newsModel.getCreater_name());
				} else {
					condition.append("?creater_name=" + newsModel.getCreater_name());
				}
			}
			if (StringUtils.isNotBlank(newsModel.getTitle())) {
				if (condition.length() > 0) {
					condition.append("&title=" + newsModel.getTitle());
				} else {
					condition.append("?title=" + newsModel.getTitle());
				}
			}
			if (StringUtils.isNotBlank(newsModel.getBeginDate())) {
				if (condition.length() > 0) {
					condition.append("&beginDate=" + newsModel.getBeginDate());
				} else {
					condition.append("?beginDate=" + newsModel.getBeginDate());
				}
			}
			if (StringUtils.isNotBlank(newsModel.getEndDate())) {
				if (condition.length() > 0) {
					condition.append("&endDate=" + newsModel.getEndDate());
				} else {
					condition.append("?endDate=" + newsModel.getEndDate());
				}
			}
		}
		webTable.setUrl(urlJson + condition.toString());
		webTable.setDatabaseNames(databaseNames);
		model.addAttribute("tableInfo", JsonUtil.getEntity2Json(webTable));
	}

	/**
	 * jqGrid新闻列表
	 */
	@RequestMapping(method = RequestMethod.POST, value = "/listJson", produces = "text/html;charset=UTF-8")
	public String listJson(NewsModel newsModel, Model model) {
		Pager pager = Pager.currentPager();
		if (pager != null) {
			List<NewsModel> newsList = newsService.findAllNews(newsModel);
			model.addAttribute("griddata", JsonUtil.getEntity2Json(newsList));
			model.addAttribute("totalPages", pager.getTotalPages());
			model.addAttribute("currentPage", pager.getCurrentPage());
			model.addAttribute("totalRecords", pager.getTotalRowsAmount());
			model.addAttribute("pageSize", pager.getPageSize());
		}
		return "news/list";
	}

	/**
	 * 通知列表
	 * 
	 * @param model
	 * @return
	 * @throws BusinessException
	 */
	@RequestMapping(value = "/listNotice")
	public String listNotice(NewsModel newsModel, Model model) throws BusinessException {
		WebTable<NewsModel> webTable = WebTable.getInstance(NewsModel.class, new String[] { "id",
				"title", "modify_time", "creater_name", "ids" });

		setJsonTable("/sys/news/listNoticeJson.json", newsModel, webTable, model);

		model.addAttribute("type", 1);
		return "news/list";
	}

	/**
	 * jqGrid通知列表
	 */
	@RequestMapping(method = RequestMethod.POST, value = "/listNoticeJson", produces = "text/html;charset=UTF-8")
	public String listNoticeJson(NewsModel newsModel, Model model) {
		Pager pager = Pager.currentPager();
		if (pager != null) {
			List<NewsModel> newsList = newsService.findAllNotice(newsModel);
			model.addAttribute("griddata", JsonUtil.getEntity2Json(newsList));
			model.addAttribute("totalPages", pager.getTotalPages());
			model.addAttribute("currentPage", pager.getCurrentPage());
			model.addAttribute("totalRecords", pager.getTotalRowsAmount());
			model.addAttribute("pageSize", pager.getPageSize());
		}
		return "news/list";
	}

	/**
	 * 编辑新闻/通知
	 * 
	 * @param id
	 * @param model
	 * @return
	 * @throws BusinessException
	 */
	@RequestMapping(value = "/edit")
	public String edit(NewsModel newsModel, Model model) throws BusinessException {
		NewsModel news = null;
		if (newsModel.getId() != null) {
			news = newsService.getModelById(newsModel.getId());
		}
		if (newsModel.getType() != null) {
			if (news == null) {
				news = new NewsModel();
			}
			news.setType(newsModel.getType());
		}
		model.addAttribute("news", news);
		model.addAttribute("type", news.getType());
		return "news/edit";
	}

	/**
	 * 保存新闻/通知
	 * 
	 * @param newsModel
	 * @param model
	 * @param response
	 * @throws BusinessException
	 */
	@RequestMapping(value = "/save")
	public void save(NewsModel newsModel, Model model, HttpServletRequest request,
			HttpServletResponse response) throws BusinessException {
		Integer userId = authService.recognize(request, response);
		String res = "0";
		if (userId != null) {
			if (newsModel.getId() == null) {
				newsModel.setCreater_id(userId);
			}
			newsModel.setModify_user_id(userId);
			res = newsService.saveNews(newsModel) ? "1" : "0";
		} else {
			res = "2";
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

	/**
	 * 删除新闻/通知
	 * 
	 * @param newsModel
	 * @param model
	 * @param response
	 * @throws BusinessException
	 */
	@RequestMapping(value = "/delete")
	public void delete(NewsModel newsModel, Model model, HttpServletRequest request,
			HttpServletResponse response) throws BusinessException {
		Integer userId = authService.recognize(request, response);
		String res = "0";
		if (userId != null) {
			newsModel.setCreater_id(userId);
			res = newsService.delete(newsModel) ? "1" : "0";
		} else {
			res = "2";
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

	@RequestMapping(value = "/build")
	public String build(Model model) throws BusinessException {
		newsService.build();
		return "news/build";
	}
}
