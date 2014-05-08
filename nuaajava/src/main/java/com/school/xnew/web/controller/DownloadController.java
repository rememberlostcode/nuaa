
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.school.xnew.persistence.entity.DownloadModel;
import com.school.xnew.sys.service.AuthService;
import com.school.xnew.sys.service.DownloadService;
import com.school.xnew.sys.util.WebTable;
import com.school.xnew.util.JsonUtil;

/**
 * 下载区
 * 
 * @author zhangb 2014年5月6日 上午10:23:05
 * 
 */
@Controller
@RequestMapping(value = "/sys/download")
public class DownloadController {
	@Resource
	@Value(value = "${nuaa.upload.fileType.file}")
	public String			fileType_file;
	@Resource
	private DownloadService	downloadService;
	@Resource
	private AuthService		authService;

	/**
	 * 下载区列表
	 * 
	 * @param downloadModel
	 * @param model
	 * @return
	 * @throws BusinessException
	 */
	@RequestMapping(value = "/list")
	public String list(DownloadModel downloadModel, Model model, HttpServletRequest request,
			HttpServletResponse response) throws BusinessException {
		WebTable<DownloadModel> webTable = WebTable.getInstance(DownloadModel.class, new String[] {
				"id", "name", "user_name", "create_time", "ids" });

		setJsonTable("/sys/download/listJson.json", downloadModel, webTable, model);

		Integer userId = authService.recognize(request, response);
		if (-1 == userId) {
			model.addAttribute("isAdmin", 1);
		}
		return "download/list";
	}

	private void setJsonTable(String urlJson, DownloadModel downloadModel,
			WebTable<DownloadModel> webTable, Model model) {
		Map<String, String> databaseNames = new HashMap<String, String>();
		databaseNames.put("id", "id");
		StringBuffer condition = new StringBuffer();
		if (downloadModel != null) {
			if (StringUtils.isNotBlank(downloadModel.getUser_name())) {
				if (condition.length() > 0) {
					condition.append("&user_name=" + downloadModel.getUser_name());
				} else {
					condition.append("?user_name=" + downloadModel.getUser_name());
				}
			}
			if (StringUtils.isNotBlank(downloadModel.getName())) {
				if (condition.length() > 0) {
					condition.append("&name=" + downloadModel.getName());
				} else {
					condition.append("?name=" + downloadModel.getName());
				}
			}
			if (StringUtils.isNotBlank(downloadModel.getBeginDate())) {
				if (condition.length() > 0) {
					condition.append("&beginDate=" + downloadModel.getBeginDate());
				} else {
					condition.append("?beginDate=" + downloadModel.getBeginDate());
				}
			}
			if (StringUtils.isNotBlank(downloadModel.getEndDate())) {
				if (condition.length() > 0) {
					condition.append("&endDate=" + downloadModel.getEndDate());
				} else {
					condition.append("?endDate=" + downloadModel.getEndDate());
				}
			}
		}
		webTable.setUrl(urlJson + condition.toString());
		webTable.setDatabaseNames(databaseNames);
		model.addAttribute("tableInfo", JsonUtil.getEntity2Json(webTable));
	}

	/**
	 * jqGrid下载区列表
	 * 
	 * @param downloadModel
	 * @param model
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST, value = "/listJson", produces = "text/html;charset=UTF-8")
	public String listJson(DownloadModel downloadModel, Model model, HttpServletRequest request,
			HttpServletResponse response) {
		Pager pager = Pager.currentPager();
		if (pager != null) {
			Integer userId = authService.recognize(request, response);
			if (userId == null) {
				downloadModel.setCreate_user_id(-2);// 未登录的设置个不存在的用户ID
			} else if (-1 == userId) {// 超级管理员不用加条件
			} else {
				downloadModel.setCreate_user_id(userId);
			}

			List<DownloadModel> downloadList = downloadService.findAllDownload(downloadModel);
			model.addAttribute("griddata", JsonUtil.getEntity2Json(downloadList));
			model.addAttribute("totalPages", pager.getTotalPages());
			model.addAttribute("currentPage", pager.getCurrentPage());
			model.addAttribute("totalRecords", pager.getTotalRowsAmount());
			model.addAttribute("pageSize", pager.getPageSize());
		}
		return "download/list";
	}

	/**
	 * 编辑下载区
	 * 
	 * @param downloadModel
	 * @param model
	 * @return
	 * @throws BusinessException
	 */
	@RequestMapping(value = "/edit")
	public String edit(DownloadModel downloadModel, Model model) throws BusinessException {
		DownloadModel download = null;
		if (downloadModel.getId() != null) {
			download = downloadService.getModelById(downloadModel.getId());
		}
		model.addAttribute("fileType_file", fileType_file);
		model.addAttribute("downloadModel", download);
		return "download/edit";
	}

	/**
	 * 保存下载区
	 * 
	 * @param downloadModel
	 * @param model
	 * @param request
	 * @param response
	 * @throws BusinessException
	 */
	@RequestMapping(value = "/save")
	public void save(DownloadModel downloadModel, Model model, HttpServletRequest request,
			HttpServletResponse response) throws BusinessException {
		Integer userId = authService.recognize(request, response);
		String res = "0";
		if (userId != null) {
			if (downloadModel.getId() == null) {
				downloadModel.setCreate_user_id(userId);
			}
			downloadModel.setModify_user_id(userId);
			res = downloadService.saveDownload(downloadModel) ? "1" : "0";
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
	 * 删除下载区
	 * 
	 * @param downloadModel
	 * @param model
	 * @param request
	 * @param response
	 * @throws BusinessException
	 */
	@RequestMapping(value = "/delete")
	public void delete(DownloadModel downloadModel, Model model, HttpServletRequest request,
			HttpServletResponse response) throws BusinessException {
		Integer userId = authService.recognize(request, response);
		String res = "0";
		if (userId != null) {
			downloadModel.setDelete_user_id(userId);
			res = downloadService.delete(downloadModel) ? "1" : "0";
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
		downloadService.build();
		return "news/build";
	}
}
