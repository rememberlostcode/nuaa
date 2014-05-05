
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

import com.school.xnew.persistence.entity.ReportModel;
import com.school.xnew.sys.service.AuthService;
import com.school.xnew.sys.service.ReportService;
import com.school.xnew.sys.util.WebTable;
import com.school.xnew.util.JsonUtil;

/**
 * 报告
 * 
 * @author zhangb 2014年5月5日 上午9:13:02
 * 
 */
@Controller
@RequestMapping(value = "/sys/report")
public class ReportController {

	@Resource
	private ReportService	reportService;
	@Resource
	private AuthService		authService;

	/**
	 * 报告列表
	 * 
	 * @param reportModel
	 * @param model
	 * @return
	 * @throws BusinessException
	 */
	@RequestMapping(value = "/list")
	public String list(ReportModel reportModel, Model model) throws BusinessException {
		WebTable<ReportModel> webTable = WebTable.getInstance(ReportModel.class, new String[] {
				"id", "title", "time", "modify_time", "creater_name", "ids" });

		setJsonTable("/sys/report/listJson.json", reportModel, webTable, model);
		return "report/list";
	}

	private void setJsonTable(String urlJson, ReportModel reportModel,
			WebTable<ReportModel> webTable, Model model) {
		Map<String, String> databaseNames = new HashMap<String, String>();
		databaseNames.put("id", "id");
		StringBuffer condition = new StringBuffer();
		if (reportModel != null) {
			if (StringUtils.isNotBlank(reportModel.getCreater_name())) {
				if (condition.length() > 0) {
					condition.append("&creater_name=" + reportModel.getCreater_name());
				} else {
					condition.append("?creater_name=" + reportModel.getCreater_name());
				}
			}
			if (StringUtils.isNotBlank(reportModel.getTitle())) {
				if (condition.length() > 0) {
					condition.append("&title=" + reportModel.getTitle());
				} else {
					condition.append("?title=" + reportModel.getTitle());
				}
			}
			if (StringUtils.isNotBlank(reportModel.getBeginDate())) {
				if (condition.length() > 0) {
					condition.append("&beginDate=" + reportModel.getBeginDate());
				} else {
					condition.append("?beginDate=" + reportModel.getBeginDate());
				}
			}
			if (StringUtils.isNotBlank(reportModel.getEndDate())) {
				if (condition.length() > 0) {
					condition.append("&endDate=" + reportModel.getEndDate());
				} else {
					condition.append("?endDate=" + reportModel.getEndDate());
				}
			}
		}
		webTable.setUrl(urlJson + condition.toString());
		webTable.setDatabaseNames(databaseNames);
		model.addAttribute("tableInfo", JsonUtil.getEntity2Json(webTable));
	}

	/**
	 * jqGrid报告列表
	 * 
	 * @param reportModel
	 * @param model
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST, value = "/listJson", produces = "text/html;charset=UTF-8")
	public String listJson(ReportModel reportModel, Model model) {
		Pager pager = Pager.currentPager();
		if (pager != null) {
			List<ReportModel> reportList = reportService.findAllReport(reportModel);
			model.addAttribute("griddata", JsonUtil.getEntity2Json(reportList));
			model.addAttribute("totalPages", pager.getTotalPages());
			model.addAttribute("currentPage", pager.getCurrentPage());
			model.addAttribute("totalRecords", pager.getTotalRowsAmount());
			model.addAttribute("pageSize", pager.getPageSize());
		}
		return "report/list";
	}

	/**
	 * 编辑报告
	 * 
	 * @param reportModel
	 * @param model
	 * @return
	 * @throws BusinessException
	 */
	@RequestMapping(value = "/edit")
	public String edit(ReportModel reportModel, Model model) throws BusinessException {
		ReportModel report = null;
		if (reportModel.getId() != null) {
			report = reportService.getModelById(reportModel.getId());
		}
		model.addAttribute("reportModel", report);
		return "report/edit";
	}

	/**
	 * 保存报告
	 * 
	 * @param reportModel
	 * @param model
	 * @param request
	 * @param response
	 * @throws BusinessException
	 */
	@RequestMapping(value = "/save")
	public void save(ReportModel reportModel, Model model, HttpServletRequest request,
			HttpServletResponse response) throws BusinessException {
		Integer userId = authService.recognize(request, response);
		String res = "0";
		if (userId != null) {
			if (reportModel.getId() == null) {
				reportModel.setCreater_id(userId);
			}
			reportModel.setModify_user_id(userId);
			res = reportService.saveReport(reportModel) ? "1" : "0";
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
	 * 删除报告
	 * 
	 * @param reportModel
	 * @param model
	 * @param request
	 * @param response
	 * @throws BusinessException
	 */
	@RequestMapping(value = "/delete")
	public void delete(ReportModel reportModel, Model model, HttpServletRequest request,
			HttpServletResponse response) throws BusinessException {
		Integer userId = authService.recognize(request, response);
		String res = "0";
		if (userId != null) {
			reportModel.setCreater_id(userId);
			res = reportService.delete(reportModel) ? "1" : "0";
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
		reportService.build();
		return "report/build";
	}
}
