/**
 * 
 */

package com.school.xnew.persistence.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.school.xnew.persistence.entity.CoreMenuModel;

/**
 * 
 * 类说明：
 * 
 * @author robin 2014-3-14下午8:51:58
 * 
 */
public interface CoreMenuDao extends GenericDao<CoreMenuModel> {

	public List<CoreMenuModel> findAll();

	public List<CoreMenuModel> getMenusByUserId(@Param(value = "id") Integer userId);

}
