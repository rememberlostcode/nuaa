
package com.school.xnew.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.lost.verifycode.util.VerifyCodeUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.school.xnew.util.RandomValidateCode;

/**
 * 
 * 类说明：随机验证码
 * 
 * @author robin 2014-3-12下午3:34:10
 * 
 */
@Controller
@RequestMapping(value = "/")
public class RandomCodeController {
	Logger	log	= LoggerFactory.getLogger(RandomCodeController.class);

	@RequestMapping(value = "/randomCode")
	@ResponseBody
	public String doCode(HttpServletResponse response) {
		return VerifyCodeUtil.getLetterByNumber(VerifyCodeUtil.getRandomCode());
	}

	@RequestMapping(value = "/imgCode")
	public void doCodeImg(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		response.setContentType("image/jpeg");// 设置相应类型,告诉浏览器输出的内容为图片
		response.setHeader("Pragma", "No-cache");// 设置响应头信息，告诉浏览器不要缓存此内容
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expire", 0);
		RandomValidateCode randomValidateCode = new RandomValidateCode();
		try {
			randomValidateCode.getRandcode(request, response);// 输出图片方法
		} catch (Exception e) {
			log.error("读取验证码出错：", e.getMessage());
		}
	}

}
