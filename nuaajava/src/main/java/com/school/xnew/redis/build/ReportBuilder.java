
package com.school.xnew.redis.build;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.school.xnew.persistence.entity.ReportModel;
import com.school.xnew.redis.Builder;
import com.school.xnew.redis.CacheRepository;
import com.school.xnew.sys.service.ReportService;
import com.school.xnew.sys.util.UrlUtil;

/**
 * 报告Builder
 * 
 * @author zhangb 2014年5月5日 上午11:02:09
 * 
 */
@Repository
public class ReportBuilder implements Builder {
	private CacheRepository	cacheRepository;
	private ReportService	reportService;
	private String			server_url;

	public ReportBuilder(ReportService reportService, CacheRepository cacheRepository,
			String server_url) {
		this.reportService = reportService;
		this.cacheRepository = cacheRepository;
		this.server_url = server_url;
	}

	@Override
	public void build() {
		System.out.println("报告定时器开始....");

		try {

			System.out.println("redis start....");
			int maxIdCount = reportService.getCountOfAll();
			// 500条数据查询一次并插入数据库
			int resultSize = 500;
			int thisNum = 0;
			List<ReportModel> reportList = null;
			while (thisNum < maxIdCount) {
				reportList = reportService.findAll(thisNum, resultSize);
				ReportModel reportModel = null;
				for (int i = 0; i < reportList.size(); i++) {
					reportModel = reportList.get(i);
					cacheRepository.set(String.valueOf(reportModel.getId()), reportModel);
				}
				// 设置新的分页查询参数
				thisNum += resultSize;
			}
			System.out.println("redis end");

			System.out.println("solr start...");
			UrlUtil.sendGet(server_url
					+ "/solr/nuaa_report/dataimport?full-import&commit=y&clean=y");
			System.out.println("solr end");

		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("报告定时器结束");
	}
}
