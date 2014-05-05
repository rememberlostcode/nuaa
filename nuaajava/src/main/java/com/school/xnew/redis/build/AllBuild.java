
package com.school.xnew.redis.build;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

import com.school.xnew.redis.CacheRepository;
import com.school.xnew.sys.service.NewsService;
import com.school.xnew.sys.service.ReportService;

public class AllBuild extends QuartzJobBean {

	public AllBuild() {

	}

	@Override
	public void executeInternal(JobExecutionContext arg0) throws JobExecutionException {
		NewsService newsService = (NewsService) arg0.getMergedJobDataMap().get("newsService");
		ReportService reportService = (ReportService) arg0.getMergedJobDataMap().get(
				"reportService");
		CacheRepository cacheRepository = (CacheRepository) arg0.getMergedJobDataMap().get(
				"cacheRepository");
		String server_url = (String) arg0.getMergedJobDataMap().get("server_url");
		System.out.println("======org.quartz.Job start======");
		new NewsBuilder(newsService, cacheRepository, server_url).build();

		new ReportBuilder(reportService, cacheRepository, server_url).build();
		System.out.println("======org.quartz.Job end======");
	}

	public static void main(String[] args) {
		System.out.println(Integer.valueOf("11001000", 2));

	}
}
