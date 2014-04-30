
package com.school.xnew.sys.service;

import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.school.xnew.persistence.entity.CoreMenuModel;

public class User implements Serializable {

	/**
     * 
     */
	private static final long	serialVersionUID	= -1902536010009121168L;
	private Integer				id;
	private String				username;
	private String				fullname;
	private String				password;
	private String				mobileNumber;
	private String				email;
	private Set<Integer>		menuIds;
	private Integer				systemId;
	private String				createBy;
	private Character			isDel;
	private String				repeatPwd;

	private List<CoreMenuModel>	menuList;

	public List<CoreMenuModel> getMenuList() {
		return menuList;
	}

	public void setMenuList(List<CoreMenuModel> menuList) {
		this.menuList = menuList;
	}

	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Character getIsDel() {
		return isDel;
	}

	public void setIsDel(Character isDel) {
		this.isDel = isDel;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRepeatPwd() {
		return repeatPwd;
	}

	public void setRepeatPwd(String repeatPwd) {
		this.repeatPwd = repeatPwd;
	}

	public Set<Integer> getMenuIds() {
		return menuIds;
	}

	public void setMenuIds(Set<Integer> menuIds) {
		this.menuIds = menuIds;
	}

	public void setMenuIds(List<Integer> menuIds) {
		if (menuIds != null && !menuIds.isEmpty()) {
			Set<Integer> set = new HashSet<Integer>();
			for (Integer menuId : menuIds) {
				set.add(menuId);
			}
			this.menuIds = set;
		}
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPassword() {
		return password;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	/**
	 * @return the managementSystemId
	 */
	public Integer getSystemId() {
		return systemId;
	}

	/**
	 * @param managementSystemId
	 *            the managementSystemId to set
	 */
	public void setSystemId(Integer systemId) {
		this.systemId = systemId;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((createBy == null) ? 0 : createBy.hashCode());
		result = prime * result + ((menuIds == null) ? 0 : menuIds.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((isDel == null) ? 0 : isDel.hashCode());
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((systemId == null) ? 0 : systemId.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (createBy == null) {
			if (other.createBy != null)
				return false;
		} else if (!createBy.equals(other.createBy))
			return false;
		if (menuIds == null) {
			if (other.menuIds != null)
				return false;
		} else if (!menuIds.equals(other.menuIds))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (isDel == null) {
			if (other.isDel != null)
				return false;
		} else if (!isDel.equals(other.isDel))
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (systemId == null) {
			if (other.systemId != null)
				return false;
		} else if (!systemId.equals(other.systemId))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

}
