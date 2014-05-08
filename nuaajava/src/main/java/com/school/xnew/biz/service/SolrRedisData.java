
package com.school.xnew.biz.service;

import java.util.List;

import com.school.xnew.persistence.entity.DownloadModel;
import com.school.xnew.persistence.entity.NewsModel;
import com.school.xnew.persistence.entity.ReportModel;

/**
 * SOLR操作接口
 * 
 * @author zhangb 2014年5月7日 下午4:18:57
 * 
 */
public interface SolrRedisData {

	public void submitNews(NewsModel newsModel);

	public void removeNews(NewsModel newsModel);

	public void submitNewsList(List<NewsModel> list);

	public void submitReport(ReportModel reportModel);

	public void removeReport(ReportModel reportModel);

	public void submitReportList(List<ReportModel> list);

	public void submitDownload(DownloadModel downloadModel);

	public void removeDownload(DownloadModel downloadModel);

	public void submitDownloadList(List<DownloadModel> list);
}
