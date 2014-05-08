
package com.school.xnew.redis.build;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.school.xnew.biz.service.SolrRedisData;
import com.school.xnew.persistence.entity.NewsModel;
import com.school.xnew.redis.Builder;
import com.school.xnew.sys.service.NewsService;

/**
 * 新闻通知Builder
 * 
 * @author zhangb 2014年5月7日 下午4:27:25
 * 
 */
@Repository
public class NewsBuilder implements Builder {
	private NewsService		newsService;
	private SolrRedisData	solrRedisData;

	public NewsBuilder(NewsService newsService, SolrRedisData solrRedisData) {
		this.newsService = newsService;
		this.solrRedisData = solrRedisData;
	}

	@Override
	public void build() {
		System.out.println("新闻通知定时器开始....");

		try {
			int maxIdCount = newsService.getCountOfAll();
			// 500条数据查询一次并插入数据库
			int resultSize = 500;
			int thisNum = 0;
			List<NewsModel> newsList = null;
			while (thisNum < maxIdCount) {
				newsList = newsService.findAll(thisNum, resultSize);
				solrRedisData.submitNewsList(newsList);
				// 设置新的分页查询参数
				thisNum += resultSize;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("新闻通知定时器结束");
	}
}
