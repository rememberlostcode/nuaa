package com.school.xnew.sys.service;

import java.util.List;

import com.school.xnew.persistence.entity.NewsModel;

/**
 * 新闻通知接口
 * @author silvermoon
 *
 */
public interface NewsService {

	/**
	 * 查找新闻
	 * @param news
	 * @return
	 */
	public List<NewsModel> findAllNews(NewsModel news);
	
	/**
	 * 查找通知
	 * @param news
	 * @return
	 */
	public List<NewsModel> findAllNotice(NewsModel news);
	
	/**
	 * 保存新闻/通知
	 * @param news
	 * @return
	 */
	public boolean saveNews(NewsModel news);
	
	/**
	 * 获取单条新闻/通知的详细信息
	 * @param id
	 * @return
	 */
	public NewsModel getModelById(Integer id);
	
	/**
	 * 删除新闻/通知
	 * @param news
	 * @return
	 */
	public boolean delete(NewsModel news);
	
	/**
	 * 获取新闻和通知的总数，用于build
	 * @return
	 */
	public int getCountOfAll();
	
	/**
	 * 分页查找新闻和通知，用于build
	 * @param start
	 * @param num
	 * @return
	 */
	public List<NewsModel> findAll(int start,int num);
	
	/**
	 * build新闻（solr和redits）
	 */
	public void build();
	
	/**
	 * 累加点击量
	 * @param id
	 */
	public void updateClickNum(int id);
}
