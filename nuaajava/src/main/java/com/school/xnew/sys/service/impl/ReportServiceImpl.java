
package com.school.xnew.sys.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.school.xnew.biz.service.SolrRedisData;
import com.school.xnew.persistence.dao.ReportDao;
import com.school.xnew.persistence.entity.PageModel;
import com.school.xnew.persistence.entity.ReportModel;
import com.school.xnew.redis.build.ReportBuilder;
import com.school.xnew.sys.service.ReportService;
import com.school.xnew.util.DateUtil;

/**
 * 报告实现类
 * 
 * @author zhangb 2014年5月5日 上午11:02:52
 * 
 */
@Service
public class ReportServiceImpl implements ReportService {
	@Resource
	private ReportDao		reportDao;
	@Resource
	private SolrRedisData	solrRedisData;

	public List<ReportModel> findAllReport(ReportModel report) {
		return reportDao.findAllReports(report);
	}

	public boolean saveReport(ReportModel report) {
		boolean res = false;
		int num = 0;
		String ctime = DateUtil.dateToStr(new Date());
		report.setModify_time(ctime);
		try {
			report.setTime(report.getReport_date() + " " + report.getReport_time_start());
			if (report.getId() == null) {
				report.setCreate_time(ctime);
				report.setBeginDate(ctime.substring(0, 4) + "-01-01");
				report.setEndDate(ctime.substring(0, 4) + "-12-31");
				num = reportDao.insert(report);
			} else {
				num = reportDao.update(report);
			}
			if (num == 1 && report.getId() != null) {
				report = reportDao.getModelById(report.getId());
				solrRedisData.submitReport(report);
				res = true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return res;
	}

	public ReportModel getModelById(Integer id) {
		return reportDao.getModelById(id);
	}

	public boolean delete(ReportModel report) {
		boolean res = false;
		if (report.getIds() != null && !"".equals(report.getIds())) {
			String[] ids = report.getIds().split(",");
			String ctime = DateUtil.dateToStr(new Date());
			for (int i = 0; i < ids.length; i++) {
				report.setDelete_time(ctime);
				report.setId(Integer.parseInt(ids[i]));
				if (reportDao.delete(report) == 1) {
					res = true;
					solrRedisData.removeReport(report);
				}
			}
		}
		return res;
	}

	public int getCountOfAll() {
		return reportDao.getCountOfAll();
	}

	public List<ReportModel> findAll(int start, int num) {
		PageModel page = new PageModel();
		page.setStart(start);
		page.setNum(num);
		return reportDao.findAll(page);
	}

	public void build() {
		new ReportBuilder(this, solrRedisData).build();
	}

	public void updateClickNum(int id) {
		this.reportDao.updateClickNum(id);
		ReportModel report = (ReportModel) this.reportDao.getModelById(Integer.valueOf(id));
		this.solrRedisData.submitReport(report);
	}
}
