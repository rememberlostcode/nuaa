
package com.school.xnew.core.lang;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.school.xnew.sys.service.AuthService;

public class LoginInterceptor extends HandlerInterceptorAdapter {

	protected Logger	log	= LoggerFactory.getLogger(getClass());

	@Resource
	private AuthService	authService;
	@Resource
	@Value(value = "${com.nuaa.url}")
	private String		url;

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object handler) throws Exception {
		request.setCharacterEncoding("UTF-8");
		Integer id = authService.recognize(request, response);
		if (id == null) {
			String uri = request.getRequestURI();
			if (uri.contains("/register"))
				return true;
			String redirectUrl = url + "login.html";
			// String redirectUrl = url + "nanhang/login";
			response.setContentType("text/html;charset=UTF-8");
			response.getWriter().println("<script>");
			response.getWriter().println("window.location.href='" + redirectUrl + "';");
			response.getWriter().println("</script>");
			return false;
		} else {
			new COMUser(id, authService);
			return true;
		}
	}
}