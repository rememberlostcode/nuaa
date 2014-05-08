
package com.school.xnew.redis.build;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.school.xnew.biz.service.SolrRedisData;
import com.school.xnew.persistence.entity.DownloadModel;
import com.school.xnew.redis.Builder;
import com.school.xnew.sys.service.DownloadService;

/**
 * 下载区Builder
 * 
 * @author zhangb 2014年5月7日 下午4:27:25
 * 
 */
@Repository
public class DownloadBuilder implements Builder {
	private DownloadService	downloadService;
	private SolrRedisData	solrRedisData;

	public DownloadBuilder(DownloadService downloadService, SolrRedisData solrRedisData) {
		this.downloadService = downloadService;
		this.solrRedisData = solrRedisData;
	}

	@Override
	public void build() {
		System.out.println("下载区定时器开始....");

		try {
			int maxIdCount = downloadService.getCountOfAll();
			// 500条数据查询一次并插入数据库
			int resultSize = 500;
			int thisNum = 0;
			List<DownloadModel> downloadList = null;
			while (thisNum < maxIdCount) {
				downloadList = downloadService.findAll(thisNum, resultSize);
				solrRedisData.submitDownloadList(downloadList);
				// 设置新的分页查询参数
				thisNum += resultSize;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("下载区定时器结束");
	}
}
