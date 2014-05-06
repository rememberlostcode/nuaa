function getBaseDataFromServer() {	
	jQuery.ajax( {
		type : "GET",
		url : "/nuaa/nanhang/menus.json",
		beforeSend : function(XMLHttpRequest) {
		},
		success : function(result) {
			var dataStr = "";
			//dataStr = '{"user":{"id":-1,"name":"超级管理员"},"menus":[{"id":1,"name":"首页","now":false,"action":"/nuaa/home.html","subMenus":null},{"id":2,"name":"通知","now":false,"action":"/nuaa/noticelist.html","subMenus":null},{"id":3,"name":"新闻","now":false,"action":"/nuaa/newslist.html","subMenus":null},{"id":4,"name":"院系介绍","now":false,"action":"/nuaa/college.html","subMenus":null},{"id":5,"name":"教师介绍","now":false,"action":"/nuaa/teacher.html","subMenus":null},{"id":6,"name":"科研介绍","now":false,"action":"/nuaa/scientific.html","subMenus":null},{"id":7,"name":"系统管理","now":false,"action":null,"subMenus":[{"id":8,"name":"用户管理","now":false,"action":"/nuaa/nanhang/admin/listUsers","subMenus":null},{"id":9,"name":"新闻发布","now":false,"action":"/nuaa/nanhang/sys/news/list","subMenus":null},{"id":10,"name":"通知管理","now":false,"action":"/nuaa/nanhang/sys/news/listNotice","subMenus":null},{"id":11,"name":"用户审核","now":false,"action":"/nuaa/nanhang/user/listCheckUser","subMenus":null},{"id":13,"name":"报告管理","now":false,"action":"/nuaa/nanhang/sys/report/list","subMenus":null}]}]}';			
			dataStr = result.data;
			setBaseData2Page(dataStr);
		},
		complete : function(XMLHttpRequest, textStatus) {
		},
		error : function() {
		}
	});
}
function setBaseData2Page(dataStr) {
	try {
		var dataObj = $.parseJSON(dataStr);
		if (dataObj.user == null) {
			$("#head #login_reg").css("display", "block");
		} else {
			$("#head #welcome").css("display", "block");
			var datetime = new Date();
			$("#head #welcome #date_uname").html(
					"今天是" + (datetime.getMonth() + 1) + "月"
							+ datetime.getDate() + "号，欢迎您，<a href='/nuaa/nanhang/user/setting'>" + dataObj.user.name
							+ "!</a>");
		}
		var menus = dataObj.menus;
		if (menus != null) {
			var ulFirst = $("<ul />");
			ulFirst.attr("layer","1");
			$("#navigation").append(ulFirst);
			for ( var key in menus) {
				var menu = menus[key];
				$("#navigation ul[layer=1]").append(geneLi(menu,1));
			}
		} else {

		}
		
		/*搜索框 begin*/
		var searchInput = $("<input />");
		searchInput.attr("type","text");
		searchInput.attr("id","searchInputText");
		
		var searchBtn = $("<div />");
		
		var search = $("<div />");
		search.attr("id","search");
		search.append(searchInput);
		search.append(searchBtn);
		
		searchBtn.bind( {
		"click" : function() {
			searchWite();
		}
	});
		
		$("#head").append(search);
		/*搜索框 end*/
		setNavigationNow();
	} catch (e) {
		// alert("e:"+e.message);
	}
}

function geneLi(menu,layer){
	var li = $("<li />");
	li.html(menu.name);
	if (menu.now == "true") {
		li.addClass("now");
		li.attr("now", "true");
	}
	li.attr("layer", layer);
	li.attr("action", menu.action);
	li.bind( {
		"click" : function() {
			var url = $(this).attr("action");
			//alert($(this).attr("action"));
			if(url!="" && url!=undefined){
				window.location.href = url;
			}
		},
		"mouseenter" : function() {
			if($(this).attr("layer") == 1){
				$("#navigation ul li[layer='1']").each(function(index) {
					$(this).removeClass("now");
				});
				$(this).addClass("now");
				if($(this).find("ul") != null){
				  $(this).find("ul").css("display","block");
				}
			}		
		},
		"mouseout" : function() {
		    var action = $(this).attr("action");
			if($(this).attr("layer") == 1){
				//if($(this).attr("childs") == "false"){
					$("#navigation ul li[layer='1']").each(function(index) {
						$(this).removeClass("now");
					});
					$("#navigation ul li[layer='1'][now='true']").addClass("now");
					if($(this).find("ul") != null){
					  $(this).find("ul").css("display","none");
					}
				//}			
			}	
		}
	});
	//alert(menu.subMenus != null && menu.subMenus != '');
	if(menu.subMenus != null && menu.subMenus != ''){
	  var ul_child = $("<ul />");
	  ul_child.addClass("childs");
	  ul_child.css("display","none");
	  var childs = menu.subMenus;
	  for ( var key in childs) {
	    var menu_child = childs[key];
	    var li_child = geneLi(menu_child,2);	
	    ul_child.append(li_child);
	  }
	  ul_child.find("li").hover(
	      function() {
	    	  $(this).parent().css("display","block");
	    	  $("#navigation ul li[layer='1']").each(function(index) {
					$(this).removeClass("now");
			  });
	    	  $(this).parent().parent().addClass("now");
		  }, function() {
	    	  $(this).parent().css("display","none");
	    	  $("#navigation ul li[layer='1']").each(function(index) {
					$(this).removeClass("now");
			  });
			  $("#navigation ul li[layer='1'][now='true']").addClass("now");
		  }
	  );
	  li.attr("childs", "true");
	  li.append(ul_child);
	}else{
	  li.attr("childs", "false");
	}
	return li;
}

function setFootData2Page() {
	try {
		var footStr = "地址：江苏省南京市白下区御道街29号 | 邮编：210016 | 电话：025-84893057 | 版权所有©南京航空航天大学";
		$("#foot").html(footStr);
	} catch (e) {
		// alert("e:"+e.message);
	}
}

function headClickDeal() {
	$("#head #login").bind( {
		"click" : function() {
			window.location.href = "login.html";
		}
	});
	$("#head #reg").bind( {
		"click" : function() {
			window.location.href = "register.html";
		}
	});
	$("#head #logout").bind( {
		"click" : function() {
			if(window.confirm("您确定要退出！")){
				window.location.href = "/nuaa/nanhang/exit";
			}
		}
	});
}

function setNavigationNow() {
	var hrefNow = window.location.href;
	var x = hrefNow.lastIndexOf("/") + 1;
	var y = hrefNow.lastIndexOf(".");
	var r ;
	if(x < y){
		r = hrefNow.substring(x, y);
	}else{
		r = "home";
	}
	$("#navigation ul li").each(function(index) {
		var action = $(this).attr("action");
		$(this).removeClass("now");
		$(this).attr("now", "false");
	});
	$("#navigation ul li").each(function(index) {
		var action = $(this).attr("action");
		if (action!=undefined && action.indexOf(r) >= 0) {
			$(this).addClass("now");
			$(this).attr("now", "true");
			return false;
		}
	});
}

function geneBaseHtml(){
	var headHtml = '';
	headHtml += '<div id="head">';
	headHtml += '	<a class="logo" href="/nuaa/home.html"></a>';
	headHtml += '	<div id="welcome">';
	headHtml += '		<span id="date_uname"></span>';
	headHtml += '		<a href="#" id="logout">退出</a>';
	headHtml += '	</div>';
	headHtml += '	<div id="login_reg">';
	headHtml += '		<a href="#" id="login">登录</a>';
	headHtml += '		<a href="#" id="reg">注册</a>';
	headHtml += '	</div>';
	headHtml += '	<div id="earth">';
	headHtml += '	</div>';
	headHtml += '</div>';
	var head = $(headHtml);
	
	var navigation = $("<div />");
	navigation.attr("id","navigation");
	
	var foot = $("<div />");
	foot.attr("id","foot");	
	/*foot.addClass("bottomcut");*/
	
	var left = $("<div />");
	left.attr("id","left");	
	
	var right = $("<div />");
	right.attr("id","right");
	
	var clear = $("<div />");
	clear.css("clear","both");
		
	var content;
	var main = $("#main");
	var home = $("#home");
	if(main.length > 0){
		content = main;
		content.prepend(left);
		content.append(right);
		content.append(clear);
	}else if(home != null){
		content = home;		
	}
	
	content.before(head);
	content.before(navigation);
	//由于foot是固定在浏览器上的，有可能盖住下面的内容，所有添加一个空白的div
	/*var kongbai = $("<div />");
	if($('#home').html()){
		kongbai.css("height","300px");	
	} else{
		kongbai.css("height","50px");	
	}
	content.after(kongbai);*/
	content.after(foot);
}

jQuery(document).ready(function() {
	geneBaseHtml();
	getBaseDataFromServer();
	setFootData2Page();
	headClickDeal();
	
	$("#searchInputText").keydown(function(e){
		var curKey = e.which; 
		if(curKey == 13){
			searchWite();
			return false;
		} 
	}); 
			
	/*setFootInBottom();*/
});

/**
 * 使foot在页面底部
 */
function setFootInBottom(){
	$(window).scroll(function(){
		if($.browser.msie && $.browser.version=="6.0")$(".bottomcut").css("top",$(window).height()-$(".bottomcut").height()+$(document).scrollTop());
	});
	/*var h_window = $(window).height();
	var h_body = $("body").height();
	var oh_wrap = $("#wrap").outerHeight(true);
	var h_wrap = $("#wrap").height();
	var oh_foot = $("#foot").outerHeight(true);
	
	var h_wrap_new = h_window - oh_foot -(oh_wrap - h_wrap);
	
	if(h_window > h_body){
		$("#wrap").css({"height":h_wrap_new + "px"});		
	}*/
}

function searchWite(){
	var searchInputTextva = $("#searchInputText");
	if(searchInputTextva && searchInputTextva.val()!='' && $.trim(searchInputTextva.val())!=''){
		window.location.href = "/nuaa/searchlist.html?keywords="+escape(searchInputTextva.val());
	}
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return '';
}

function clickDetail(obj){
	window.location.href = "news.html?id="+obj.id;
}

/*字符串to日期*/
function string2Date(temp){
	temp = temp.replace(/-/g, "/"); 
	var date = new Date(Date.parse(temp)); 
	return date; 
}

/*格式化日期*/
function formatDate(dateObj,formator) { 
	var returnText = formator.toUpperCase(); 
	if (returnText.indexOf("YYYY") > -1){ 
	    returnText = returnText.replace("YYYY", dateObj.getFullYear()); 
	} 
	if (returnText.indexOf("MM") > -1){ 
		var mm = dateObj.getMonth() + 1;
		if(mm >= 1 && mm <= 9){
			mm = "0" + mm;
		}
	    returnText = returnText.replace("MM", mm); 
	} 

	if (returnText.indexOf("DD") > -1){ 
	    returnText = returnText.replace("DD", dateObj.getDate()); 
	} 

	if (returnText.indexOf("HH") > -1){ 
	    returnText = returnText.replace("HH", dateObj.getHours()); 
	} 

	if (returnText.indexOf("MI") > -1){ 
		var mi = dateObj.getMinutes();
		if(mi >= 1 && mi <= 9){
			mi = "0" + mi;
		}
	    returnText = returnText.replace("MI", mi); 
	} 

	if (returnText.indexOf("SS") > -1){ 
	    returnText = returnText.replace("SS", dateObj.getSeconds()); 
	} 

	if (returnText.indexOf("SI") > -1){ 
	    returnText = returnText.replace("SI", dateObj.getMilliseconds()); 
	} 
	return returnText; 
}
/*获取星期*/
function getWeek(dateObj) { 
	var weeks = ["日","一","二","三","四","五","六"];
    var week = dateObj.getDay();
	return "星期" + weeks[week];
}