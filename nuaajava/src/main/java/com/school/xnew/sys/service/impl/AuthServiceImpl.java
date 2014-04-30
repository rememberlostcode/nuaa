
package com.school.xnew.sys.service.impl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.school.xnew.sys.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

	public static final String	UID	= "u";

	@Override
	public Integer recognize(HttpServletRequest request, HttpServletResponse response) {
		HttpSession httpSession = request.getSession();
		if (httpSession != null) {
			Object obj = httpSession.getAttribute(UID);
			if (obj != null) {
				return (Integer) obj;
			}
		}
		return null;
	}

	@Override
	public void mark(Integer id, HttpServletRequest request, HttpServletResponse response) {
		if (id != null) {
			HttpSession httpSession = request.getSession();
			httpSession.setAttribute(UID, id);
		}
	}

	@Override
	public void removeMark(HttpServletRequest request, HttpServletResponse response) {
		HttpSession httpSession = request.getSession();
		if (httpSession != null) {
			httpSession.removeAttribute(UID);
		}
	}

}
