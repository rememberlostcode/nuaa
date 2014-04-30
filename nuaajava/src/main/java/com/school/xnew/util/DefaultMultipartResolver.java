package com.school.xnew.util;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.commons.CommonsMultipartResolver;

/**
 * kindeditor和spring mvc整合时，spring的Multipart的请求kindeditor取不到文件，需要重写方法来屏蔽
 * @author silvermoon
 *
 */
public class DefaultMultipartResolver extends CommonsMultipartResolver {

    private static final String ATTACHED = "kindeditor/file_upload";

    @Override
    public boolean isMultipart(HttpServletRequest request) {
        if (request.getRequestURI().contains(ATTACHED)) {
            return false;
        }
        return super.isMultipart(request);
    }

}