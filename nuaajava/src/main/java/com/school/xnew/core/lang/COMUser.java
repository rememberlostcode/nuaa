
package com.school.xnew.core.lang;

import com.school.xnew.sys.service.AuthService;

public class COMUser {
	private Integer										id;
	private transient static final ThreadLocal<COMUser>	COMU	= new ThreadLocal<COMUser>();
	private transient AuthService						auth;

	public COMUser(Integer id, AuthService auth) {
		if (id == null) {
			throw new COMException("Constructor COMUser(ID id,Authenticate auth) id can't be null");
		}
		this.id = id;
		this.auth = auth;
		COMU.set(this);
	}

	public static COMUser currentCOMUser() {
		return COMU.get();
	}

	public static void removeCurrentCOMUser() {
		COMU.remove();
	}

	public void setAuth(AuthService auth) {
		this.auth = auth;
	}

	public Integer getId() {
		return id;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
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
		COMUser other = (COMUser) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
