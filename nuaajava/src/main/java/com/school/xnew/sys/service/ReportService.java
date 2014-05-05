
package com.school.xnew.sys.service;

import java.util.List;

import com.school.xnew.persistence.entity.ReportModel;

/**
 * 报告接口
 * 
 * @author zhangb 2014年5月5日 上午10:48:10
 * 
 */
public interface ReportService {

	/**
	 * 查找报告
	 * 
	 * @param Report
	 * @return
	 */
	public List<ReportModel> findAllReport(ReportModel report);

	/**
	 * 保存报告
	 * 
	 * @param Report
	 * @return
	 */
	public boolean saveReport(ReportModel report);

	/**
	 * 获取单条报告的详细信息
	 * 
	 * @param id
	 * @return
	 */
	public ReportModel getModelById(Integer id);

	/**
	 * 删除报告
	 * 
	 * @param report
	 * @return
	 */
	public boolean delete(ReportModel report);

	/**
	 * 获取报告的总数，用于build
	 * 
	 * @return
	 */
	public int getCountOfAll();

	/**
	 * 分页查找报告，用于build
	 * 
	 * @param start
	 * @param num
	 * @return
	 */
	public List<ReportModel> findAll(int start, int num);

	/**
	 * build报告（solr和redits）
	 */
	public void build();
}
