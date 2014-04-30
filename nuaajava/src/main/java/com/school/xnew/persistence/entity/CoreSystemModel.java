
package com.school.xnew.persistence.entity;

import java.io.Serializable;

/**
 * The persistent class for the core_system database table.
 * 
 */
public class CoreSystemModel implements Serializable {
	private static final long	serialVersionUID	= 1L;
	private Integer				id;
	private String				name;

	public CoreSystemModel() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

}