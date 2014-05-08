
package com.school.xnew.sys.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.school.xnew.biz.service.SolrRedisData;
import com.school.xnew.persistence.dao.DownloadDao;
import com.school.xnew.persistence.entity.DownloadModel;
import com.school.xnew.persistence.entity.PageModel;
import com.school.xnew.redis.build.DownloadBuilder;
import com.school.xnew.sys.service.DownloadService;
import com.school.xnew.util.DateUtil;

/**
 * 下载区实现类
 * 
 * @author zhangb 2014年5月6日 上午10:22:17
 * 
 */
@Service
public class DownloadServiceImpl implements DownloadService {
	@Resource
	private DownloadDao		downloadDao;
	@Resource
	private SolrRedisData	solrRedisData;

	public List<DownloadModel> findAllDownload(DownloadModel download) {
		return downloadDao.findAllDownload(download);
	}

	public boolean saveDownload(DownloadModel download) {
		boolean res = false;
		int num = 0;
		String ctime = DateUtil.dateToStr(new Date());
		download.setModify_time(ctime);
		if (download.getId() == null) {
			download.setCreate_time(ctime);
			num = downloadDao.insert(download);
		} else {
			num = downloadDao.update(download);
		}
		if (num == 1 && download.getId() != null) {
			download = downloadDao.getModelById(download.getId());
			res = true;
		}
		return res;
	}

	public DownloadModel getModelById(Integer id) {
		return downloadDao.getModelById(id);
	}

	public boolean delete(DownloadModel download) {
		boolean res = false;
		if (download.getIds() != null && !"".equals(download.getIds())) {
			String[] ids = download.getIds().split(",");
			String ctime = DateUtil.dateToStr(new Date());
			for (int i = 0; i < ids.length; i++) {
				download.setDelete_time(ctime);
				download.setId(Integer.parseInt(ids[i]));
				if (downloadDao.delete(download) == 1) {
					res = true;
				}
			}
		}
		return res;
	}

	@Override
	public int getCountOfAll() {
		return downloadDao.getCountOfAll();
	}

	@Override
	public List<DownloadModel> findAll(int start, int num) {
		PageModel page = new PageModel();
		page.setStart(start);
		page.setNum(num);
		return downloadDao.findAll(page);
	}

	public void build() {
		new DownloadBuilder(this, solrRedisData).build();
	}
}
