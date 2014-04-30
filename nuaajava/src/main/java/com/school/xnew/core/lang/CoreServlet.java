
package com.school.xnew.core.lang;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.ModelAndView;

public class CoreServlet extends DispatcherServlet {
	private static final long	serialVersionUID	= -5218643358161513909L;

	public CoreServlet() {
		setContextConfigLocation("");
	}

	@Override
	public void setContextConfigLocation(String contextConfigLocation) {
		super.setContextConfigLocation("classpath:/spring/core-context.xml");
	}

	@Override
	protected void render(ModelAndView mv, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		super.render(mv, request, response);
	}

	@Override
	protected void doService(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		super.doService(request, response);
	}
}
