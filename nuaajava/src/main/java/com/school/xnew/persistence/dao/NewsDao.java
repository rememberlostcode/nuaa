package com.school.xnew.persistence.dao;

import java.util.List;

import com.school.xnew.persistence.entity.NewsModel;
import com.school.xnew.persistence.entity.PageModel;

/**
 * 新闻通知Dao接口
 * @author silvermoon
 *
 */
public interface NewsDao extends GenericDao<NewsModel> {


	public List<NewsModel> findAllNews(NewsModel news);
	
	public List<NewsModel> findAllNotice(NewsModel news);
	
	public int getCountOfAll();
	
	public List<NewsModel> findAll(PageModel page);
	
	public void updateClickNum(int id);
}
