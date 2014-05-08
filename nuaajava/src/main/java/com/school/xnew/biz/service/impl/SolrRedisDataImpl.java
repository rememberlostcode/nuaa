
package com.school.xnew.biz.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.List;

import javax.annotation.Resource;

import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrServer;
import org.apache.solr.common.SolrInputDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.school.xnew.biz.service.SolrRedisData;
import com.school.xnew.persistence.entity.DownloadModel;
import com.school.xnew.persistence.entity.NewsModel;
import com.school.xnew.persistence.entity.ReportModel;
import com.school.xnew.redis.CacheRepository;
import com.school.xnew.util.DateUtil;

@Service
public class SolrRedisDataImpl implements SolrRedisData {
	private final String[]			SOLR_ID_PRE		= { "news", "report", "download" };
	private final String			TYPE_REPORT		= "10";
	private final String			TYPE_DOWNLOAD	= "20";
	Logger							log				= LoggerFactory.getLogger(getClass());
	@Resource
	@Value(value = "${new.admin.solr.url}")
	private String					solr_url;
	@Resource
	private CacheRepository			cacheRepository;
	private static HttpSolrServer	solrServer		= null;

	public HttpSolrServer getServer() {
		if (solrServer == null) {
			solrServer = new HttpSolrServer(solr_url);
			solrServer.setSoTimeout(3000); // socket read timeout
			solrServer.setConnectionTimeout(3000);
			solrServer.setDefaultMaxConnectionsPerHost(100);
			solrServer.setMaxTotalConnections(100);
			solrServer.setFollowRedirects(false); // defaults to false
			solrServer.setAllowCompression(true);
			solrServer.setMaxRetries(1);
		}
		return solrServer;
	}

	public void submitNews(NewsModel newsModel) {
		cacheRepository.set(newsModel.getId().toString(), newsModel);

		SolrInputDocument doc = new SolrInputDocument();
		doc.addField("id", SOLR_ID_PRE[0] + newsModel.getId());
		doc.addField("nuaaId", newsModel.getId());
		Calendar cal = Calendar.getInstance();
		cal.setTime(DateUtil.strToDateLong(newsModel.getModify_time()));
		cal.add(Calendar.HOUR_OF_DAY, 8);
		doc.addField("time", cal.getTime());
		doc.addField("userName", newsModel.getCreater_name());
		doc.addField("type", newsModel.getType());
		doc.addField("nuaaTitle", newsModel.getTitle());

		// 提交到solr
		HttpSolrServer solrServer = getServer();
		try {
			solrServer.add(doc);
			solrServer.commit();
		} catch (SolrServerException e) {
			log.error(e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage());
		} finally {
			// solrServer.shutdown();
		}
	}

	public void submitNewsList(List<NewsModel> list) {
		Collection<SolrInputDocument> docs = new ArrayList<SolrInputDocument>();

		NewsModel news = null;
		SolrInputDocument doc = null;
		Calendar cal = Calendar.getInstance();
		for (int i = 0; i < list.size(); i++) {
			news = list.get(i);
			cacheRepository.set(news.getId().toString(), news);
			doc = new SolrInputDocument();
			doc.addField("id", SOLR_ID_PRE[0] + news.getId());
			doc.addField("nuaaId", news.getId());
			cal.setTime(DateUtil.strToDateLong(news.getModify_time()));
			cal.add(Calendar.HOUR_OF_DAY, 8);
			doc.addField("time", cal.getTime());
			doc.addField("userName", news.getCreater_name());
			doc.addField("type", news.getType());
			doc.addField("nuaaTitle", news.getTitle());
			docs.add(doc);
		}

		// 提交到solr
		HttpSolrServer solrServer = getServer();
		try {
			solrServer.add(docs);
			solrServer.commit();
		} catch (SolrServerException e) {
			log.error(e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage());
		} finally {
			// solrServer.shutdown();
		}
	}

	@Override
	public void submitReport(ReportModel reportModel) {
		cacheRepository.set(reportModel.getId().toString(), reportModel);

		SolrInputDocument doc = new SolrInputDocument();
		doc.addField("id", SOLR_ID_PRE[1] + reportModel.getId());
		doc.addField("nuaaId", reportModel.getId());
		Calendar cal = Calendar.getInstance();
		cal.setTime(DateUtil.strToDateLong(reportModel.getTime()));
		cal.add(Calendar.HOUR_OF_DAY, 8);
		doc.addField("time", cal.getTime());
		doc.addField("address", reportModel.getAddress());
		doc.addField("userName", reportModel.getCreate_time());
		doc.addField("nuaaTitle", reportModel.getTitle());
		doc.addField("type", TYPE_REPORT);

		// 提交到solr
		HttpSolrServer solrServer = getServer();
		try {
			solrServer.add(doc);
			solrServer.commit();
		} catch (SolrServerException e) {
			log.error(e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage());
		} finally {
			// solrServer.shutdown();
		}
	}

	@Override
	public void submitReportList(List<ReportModel> list) {
		Collection<SolrInputDocument> docs = new ArrayList<SolrInputDocument>();

		ReportModel reportModel = null;
		SolrInputDocument doc = null;
		Calendar cal = Calendar.getInstance();
		for (int i = 0; i < list.size(); i++) {
			reportModel = list.get(i);
			cacheRepository.set(reportModel.getId().toString(), reportModel);
			doc = new SolrInputDocument();
			doc.addField("id", SOLR_ID_PRE[1] + reportModel.getId());
			doc.addField("nuaaId", reportModel.getId());
			cal.setTime(DateUtil.strToDateLong(reportModel.getTime()));
			cal.add(Calendar.HOUR_OF_DAY, 8);
			doc.addField("time", cal.getTime());
			doc.addField("address", reportModel.getAddress());
			doc.addField("userName", reportModel.getCreater_name());
			doc.addField("nuaaTitle", reportModel.getTitle());
			doc.addField("type", TYPE_REPORT);
			docs.add(doc);
		}

		// 提交到solr
		HttpSolrServer solrServer = getServer();
		try {
			solrServer.add(docs);
			solrServer.commit();
		} catch (SolrServerException e) {
			log.error(e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage());
		} finally {
			// solrServer.shutdown();
		}
	}

	@Override
	public void submitDownload(DownloadModel downloadModel) {
		SolrInputDocument doc = new SolrInputDocument();
		doc.addField("id", SOLR_ID_PRE[2] + downloadModel.getId());
		doc.addField("nuaaId", downloadModel.getId());
		doc.addField("nuaaTitle", downloadModel.getName());
		doc.addField("userName", downloadModel.getUser_name());
		doc.addField("path", downloadModel.getPath());
		Calendar cal = Calendar.getInstance();
		cal.setTime(DateUtil.strToDateLong(downloadModel.getCreate_time()));
		cal.add(Calendar.HOUR_OF_DAY, -8);
		doc.addField("time", cal.getTime());

		doc.addField("type", TYPE_DOWNLOAD);

		// 提交到solr
		HttpSolrServer solrServer = getServer();
		try {
			solrServer.add(doc);
			solrServer.commit();
		} catch (SolrServerException e) {
			log.error(e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage());
		} finally {
			// solrServer.shutdown();
		}

	}

	@Override
	public void submitDownloadList(List<DownloadModel> list) {
		Collection<SolrInputDocument> docs = new ArrayList<SolrInputDocument>();
		Calendar cal = Calendar.getInstance();
		DownloadModel downloadModel = null;
		SolrInputDocument doc = null;

		for (int i = 0; i < list.size(); i++) {
			downloadModel = list.get(i);
			doc = new SolrInputDocument();
			doc.addField("id", SOLR_ID_PRE[2] + downloadModel.getId());
			doc.addField("nuaaId", downloadModel.getId());
			doc.addField("nuaaTitle", downloadModel.getName());
			doc.addField("userName", downloadModel.getUser_name());
			doc.addField("path", downloadModel.getPath());
			cal.setTime(DateUtil.strToDateLong(downloadModel.getCreate_time()));
			cal.add(Calendar.HOUR_OF_DAY, 8);
			doc.addField("time", cal.getTime());
			doc.addField("type", TYPE_DOWNLOAD);
			docs.add(doc);
		}

		// 提交到solr
		HttpSolrServer solrServer = getServer();
		try {
			solrServer.add(docs);
			solrServer.commit();
		} catch (SolrServerException e) {
			log.error(e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage());
		} finally {
			// solrServer.shutdown();
		}

	}

	@Override
	public void removeNews(NewsModel newsModel) {
		cacheRepository.setNull(newsModel.getId().toString(), newsModel);

		// 提交到solr
		HttpSolrServer solrServer = getServer();
		try {
			solrServer.deleteById(SOLR_ID_PRE[0] + newsModel.getId());
			solrServer.commit();
		} catch (SolrServerException e) {
			log.error(e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage());
		} finally {
			// solrServer.shutdown();
		}
	}

	@Override
	public void removeReport(ReportModel reportModel) {
		cacheRepository.setNull(reportModel.getId().toString(), reportModel);

		// 提交到solr
		HttpSolrServer solrServer = getServer();
		try {
			solrServer.deleteById(SOLR_ID_PRE[1] + reportModel.getId());
			solrServer.commit();
		} catch (SolrServerException e) {
			log.error(e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage());
		} finally {
			// solrServer.shutdown();
		}
	}

	@Override
	public void removeDownload(DownloadModel downloadModel) {
		// 提交到solr
		HttpSolrServer solrServer = getServer();
		try {
			solrServer.deleteById(SOLR_ID_PRE[2] + downloadModel.getId());
			solrServer.commit();
		} catch (SolrServerException e) {
			log.error(e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage());
		} finally {
			// solrServer.shutdown();
		}
	}
}
