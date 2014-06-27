
package com.school.xnew.sys.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.school.xnew.biz.service.SolrRedisData;
import com.school.xnew.persistence.dao.NewsDao;
import com.school.xnew.persistence.entity.NewsModel;
import com.school.xnew.persistence.entity.PageModel;
import com.school.xnew.redis.build.NewsBuilder;
import com.school.xnew.sys.service.NewsService;
import com.school.xnew.util.DateUtil;

/**
 * 新闻通知实现类
 * 
 * @author zhangb 2014年5月7日 下午4:28:05
 * 
 */
@Service
public class NewsServiceImpl implements NewsService {
	@Resource
	private NewsDao			newsDao;
	@Resource
	private SolrRedisData	solrRedisData;

	public List<NewsModel> findAllNews(NewsModel news) {
		return newsDao.findAllNews(news);
	}

	public List<NewsModel> findAllNotice(NewsModel news) {
		return newsDao.findAllNotice(news);
	}

	public boolean saveNews(NewsModel news) {
		boolean res = false;
		int num = 0;
		String ctime = DateUtil.dateToStr(new Date());
		news.setModify_time(ctime);
		if (news.getId() == null) {
			news.setTime(ctime);
			num = newsDao.insert(news);
		} else {
			num = newsDao.update(news);
		}
		if (num == 1 && news.getId() != null) {
			news = newsDao.getModelById(news.getId());
			solrRedisData.submitNews(news);
			res = true;
		}
		return res;
	}

	public NewsModel getModelById(Integer id) {
		return newsDao.getModelById(id);
	}

	public boolean delete(NewsModel news) {
		boolean res = false;
		if (news.getIds() != null && !"".equals(news.getIds())) {
			String[] ids = news.getIds().split(",");
			String ctime = DateUtil.dateToStr(new Date());
			for (int i = 0; i < ids.length; i++) {
				news.setDelete_time(ctime);
				news.setId(Integer.parseInt(ids[i]));
				if (newsDao.delete(news) == 1) {
					res = true;
					solrRedisData.removeNews(news);
				}
			}
		}
		return res;
	}

	public int getCountOfAll() {
		return newsDao.getCountOfAll();
	}

	public List<NewsModel> findAll(int start, int num) {
		PageModel page = new PageModel();
		page.setStart(start);
		page.setNum(num);
		return newsDao.findAll(page);
	}

	public void build() {
		new NewsBuilder(this, solrRedisData).build();
	}
}
