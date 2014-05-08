
package com.school.xnew.redis.build;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.school.xnew.biz.service.SolrRedisData;
import com.school.xnew.persistence.entity.ReportModel;
import com.school.xnew.redis.Builder;
import com.school.xnew.sys.service.ReportService;

/**
 * 报告Builder
 * 
 * @author zhangb 2014年5月5日 上午11:02:09
 * 
 */
@Repository
public class ReportBuilder implements Builder {
	private ReportService	reportService;
	private SolrRedisData	solrRedisData;

	public ReportBuilder(ReportService reportService, SolrRedisData solrRedisData) {
		this.reportService = reportService;
		this.solrRedisData = solrRedisData;
	}

	@Override
	public void build() {
		System.out.println("报告定时器开始....");

		try {
			int maxIdCount = reportService.getCountOfAll();
			// 500条数据查询一次并插入数据库
			int resultSize = 500;
			int thisNum = 0;
			List<ReportModel> reportList = null;
			while (thisNum < maxIdCount) {
				reportList = reportService.findAll(thisNum, resultSize);
				solrRedisData.submitReportList(reportList);
				// 设置新的分页查询参数
				thisNum += resultSize;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("报告定时器结束");
	}
}
