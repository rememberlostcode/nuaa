function checkEmail(email_address) {
	var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
	return regex.test(email_address);
}

function checkMobile(mobile) {
	var regex = /^1(3|4|5|8)[0-9]{9}$/g;
	return regex.test(mobile);
}

function check() {
	var result = true;
	var uname = $.trim($("#uname").val());
	var pwd = $.trim($("#pwd").val());
	var repwd = $.trim($("#repwd").val());
	var name = $.trim($("#name").val());
	var email = $.trim($("#email").val());
	var mobile = $.trim($("#mobile").val());

	var point_uname = $("#point_uname");
	var point_pwd = $("#point_pwd");
	var point_repwd = $("#point_repwd");
	var point_name = $("#point_name");
	var point_email = $("#point_email");
	var point_mobile = $("#point_mobile");

	if (uname == "") {
		point_uname.attr("class", "error");
		point_uname.html("请输入用户名！");
		result = false;
	} else {
		point_uname.attr("class", "ok");
		point_uname.html("");
	}
	if (pwd == "") {
		point_pwd.attr("class", "error");
		point_pwd.html("请输入密码！");
		result = false;
	} else if (pwd.length < 6) {
		point_pwd.attr("class", "error");
		point_pwd.html("密码不足6位！");
		result = false;
	} else {
		point_pwd.attr("class", "ok");
		point_pwd.html("");
		if (repwd == "") {
			point_repwd.attr("class", "error");
			point_repwd.html("请再次输入密码！");
			result = false;
		} else if (pwd != repwd) {
			point_repwd.attr("class", "error");
			point_repwd.html("两次输入密码不一致！");
			result = false;
		} else {
			point_repwd.attr("class", "ok");
			point_repwd.html("");
		}
	}

	if (name == "") {
		point_name.attr("class", "error");
		point_name.html("请输入姓名！");
		result = false;
	} else {
		point_name.attr("class", "ok");
		point_name.html("");
	}

	if (email == "") {
		point_email.attr("class", "error");
		point_email.html("请输入邮箱地址！");
		result = false;
	} else if (!checkEmail(email)) {
		point_email.attr("class", "error");
		point_email.html("请输入正确的邮箱地址！");
		result = false;
	} else {
		point_email.attr("class", "ok");
		point_email.html("");
	}

	if (mobile == "") {
		point_mobile.attr("class", "error");
		point_mobile.html("请输入手机号码！");
		result = false;
	} else if (!checkMobile(mobile)) {
		point_mobile.attr("class", "error");
		point_mobile.html("请输入正确的手机号码！");
		result = false;
	} else {
		point_mobile.attr("class", "ok");
		point_mobile.html("");
	}
	return result;
}

function register() {
	var uname = $.trim($("#uname").val());
	var pwd = $.trim($("#pwd").val());
	var repwd = $.trim($("#repwd").val());
	var name = $.trim($("#name").val());
	var email = $.trim($("#email").val());
	var mobile = $.trim($("#mobile").val());
	
	$.ajax( {
		type : "post",
		url : "",
		async : false,
		beforeSend : function(XMLHttpRequest) {
		},
		success : function(data, textStatus) {
			window.location.href = "home.html";
		},
		complete : function(XMLHttpRequest, textStatus) {
		},
		error : function() {
		}
	});
}

function dealBind(){
	$("#register").bind( {
		"click" : function() {
			var result = check();
			if(result){
				//register();
				$("#registerForm").submit();
			}
		}
	});
	$("#uname").bind( {
		"change" : function() {
			check();
		}
	});
	$("#pwd").bind( {
		"change" : function() {
			check();
			if($(this).val() == ""){
				$("#repwd").val("");
			}
		}
	});
	$("#repwd").bind( {
		"change" : function() {
			check();
		}
	});
	$("#name").bind( {
		"change" : function() {
			check();
		}
	});
	$("#email").bind( {
		"change" : function() {
			check();
		}
	});
	$("#mobile").bind( {
		"change" : function() {
			check();
		}
	});
}

jQuery(document).ready(function() {
	dealBind();
	$(document).keydown(function(e){
		var curKey = e.which; 
		if(curKey == 13){
			$("#register").click();
			return false; 
		} 
	}); 
});