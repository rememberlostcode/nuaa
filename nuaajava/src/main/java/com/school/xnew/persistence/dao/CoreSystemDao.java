
package com.school.xnew.persistence.dao;

import java.util.List;

import com.school.xnew.persistence.entity.CoreSystemModel;

public interface CoreSystemDao extends GenericDao<CoreSystemModel> {

	public List<CoreSystemModel> findAll();

}
