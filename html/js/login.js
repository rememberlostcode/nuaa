function loginBind() {
	$("#login").bind( {
		"click" : function() {
			var uname = $.trim($("#uname").val());
			var pwd = $.trim($("#pwd").val());
			if (uname == "") {
				$("#point_uname").html("请输入帐号！");
			}else{
				$("#point_uname").html("");
				if (pwd == "") {
					$("#point_pwd").html("请输入密码！");
				}else{
					$("#point_pwd").html("");
					//login(uname,pwd);
					$("#loginForm").submit();
				}	
			}
		}
	});
}

function login(uname,pwd){
	var url = "/nanhang/LoginAuth.json";
	$.ajax( {
		type : "post",
		url : url,
		async : false,
		data:{"oid":uname,"key":pwd},
		dataType:"json",
		beforeSend : function(XMLHttpRequest) {
		},
		success : function(data, textStatus) {
			alert(data.data);
			window.location.href = "/home.html";
		},
		complete : function(XMLHttpRequest, textStatus) {
		},
		error : function() {
		}
	});
}

jQuery(document).ready(function() {
	loginBind();
	$(document).keydown(function(e){
		var curKey = e.which; 
		if(curKey == 13){
			$("#login").click();
			return false; 
		} 
	}); 
});