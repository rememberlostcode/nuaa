
package com.school.xnew.sys.service;

import java.io.Serializable;

/**
 * 
 * 类说明：重置密码
 * 
 * @author robin 2014-3-12上午9:41:38
 * 
 */
public class PasswordReset implements Serializable {
	private static final long	serialVersionUID	= -1622995328298954939L;
	private Integer				userId;
	private String				oldPw;
	private String				newPw;
	private String				reNewPw;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getOldPw() {
		return oldPw;
	}

	public void setOldPw(String oldPw) {
		this.oldPw = oldPw;
	}

	public String getNewPw() {
		return newPw;
	}

	public void setNewPw(String newPw) {
		this.newPw = newPw;
	}

	public String getReNewPw() {
		return reNewPw;
	}

	public void setReNewPw(String reNewPw) {
		this.reNewPw = reNewPw;
	}

}