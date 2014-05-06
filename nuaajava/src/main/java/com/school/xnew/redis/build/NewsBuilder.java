
package com.school.xnew.redis.build;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.school.xnew.persistence.entity.NewsModel;
import com.school.xnew.redis.Builder;
import com.school.xnew.redis.CacheRepository;
import com.school.xnew.sys.service.NewsService;
import com.school.xnew.sys.util.UrlUtil;

/**
 * 新闻通知Builder
 * 
 * @author silvermoon
 * 
 */
@Repository
public class NewsBuilder implements Builder {
	private CacheRepository	cacheRepository;
	private NewsService		newsService;
	private String			server_url;

	public NewsBuilder(NewsService newsService, CacheRepository cacheRepository, String server_url) {
		this.newsService = newsService;
		this.cacheRepository = cacheRepository;
		this.server_url = server_url;
	}

	@Override
	public void build() {
		System.out.println("新闻通知定时器开始....");

		try {

			System.out.println("redis start....");
			int maxIdCount = newsService.getCountOfAll();
			// 500条数据查询一次并插入数据库
			int resultSize = 500;
			int thisNum = 0;
			List<NewsModel> newsList = null;
			while (thisNum < maxIdCount) {
				newsList = newsService.findAll(thisNum, resultSize);
				NewsModel newsModel = null;
				for (int i = 0; i < newsList.size(); i++) {
					newsModel = newsList.get(i);
					cacheRepository.set(String.valueOf(newsModel.getId()), newsModel);
				}
				// 设置新的分页查询参数
				thisNum += resultSize;
			}
			System.out.println("redis end");

			System.out.println("solr start...");
			UrlUtil.sendGet(server_url + "/solr/nuaa_news/dataimport?full-import&commit=y&clean=y");
			System.out.println("solr end");

		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("新闻通知定时器结束");
	}
}
