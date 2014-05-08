
package com.school.xnew.sys.service;

import java.util.List;

import com.school.xnew.persistence.entity.DownloadModel;

/**
 * 下载区接口
 * 
 * @author zhangb 2014年5月5日 上午10:48:10
 * 
 */
public interface DownloadService {

	/**
	 * 查找下载区
	 * 
	 * @param download
	 * @return
	 */
	public List<DownloadModel> findAllDownload(DownloadModel download);

	/**
	 * 保存下载区
	 * 
	 * @param download
	 * @return
	 */
	public boolean saveDownload(DownloadModel download);

	/**
	 * 获取单条下载区的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public DownloadModel getModelById(Integer id);

	/**
	 * 删除下载区
	 * 
	 * @param download
	 * @return
	 */
	public boolean delete(DownloadModel download);

	public int getCountOfAll();

	public List<DownloadModel> findAll(int start, int num);

	public void build();

}
