
package com.school.xnew.persistence.dao;

import java.util.List;

import com.school.xnew.persistence.entity.DownloadModel;
import com.school.xnew.persistence.entity.PageModel;

/**
 * 下载区Dao接口
 * 
 * @author zhangb 2014年5月6日 上午10:16:17
 * 
 */
public interface DownloadDao extends GenericDao<DownloadModel> {

	public List<DownloadModel> findAllDownload(DownloadModel DownloadModel);

	public int getCountOfAll();

	public List<DownloadModel> findAll(PageModel page);
}
