
package com.school.xnew.redis.build;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

import com.school.xnew.biz.service.SolrRedisData;
import com.school.xnew.sys.service.DownloadService;
import com.school.xnew.sys.service.NewsService;
import com.school.xnew.sys.service.ReportService;

/**
 * build定时器
 * 
 * @author zhangb 2014年5月7日 下午4:36:18
 * 
 */
public class AllBuild extends QuartzJobBean {

	public AllBuild() {

	}

	@Override
	public void executeInternal(JobExecutionContext arg0) throws JobExecutionException {
		NewsService newsService = (NewsService) arg0.getMergedJobDataMap().get("newsService");
		DownloadService downloadService = (DownloadService) arg0.getMergedJobDataMap().get(
				"downloadService");
		ReportService reportService = (ReportService) arg0.getMergedJobDataMap().get(
				"reportService");
		SolrRedisData solrRedisData = (SolrRedisData) arg0.getMergedJobDataMap().get(
				"solrRedisData");

		System.out.println("======org.quartz.Job start======");
		new NewsBuilder(newsService, solrRedisData).build();

		new ReportBuilder(reportService, solrRedisData).build();

		new DownloadBuilder(downloadService, solrRedisData).build();
		System.out.println("======org.quartz.Job end======");
	}

	public static void main(String[] args) {
		System.out.println(Integer.valueOf("11001000", 2));

	}
}
