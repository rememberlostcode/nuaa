
package com.school.xnew.persistence.dao;

import java.util.List;

import com.school.xnew.persistence.entity.PageModel;
import com.school.xnew.persistence.entity.ReportModel;

/**
 * 报告Dao接口
 * 
 * @author zhangb 2014年5月5日 上午9:57:24
 * 
 */
public interface ReportDao extends GenericDao<ReportModel> {

	public List<ReportModel> findAllReports(ReportModel reportModel);

	public int getCountOfAll();

	public List<ReportModel> findAll(PageModel page);
	
	public void updateClickNum(int paramInt);

}
