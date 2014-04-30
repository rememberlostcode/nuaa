function getBaseDataFromServer() {
	var dataStr = "";
	$.ajax( {
		type : "get",
		url : "http://211.149.175.138/nuaa/nanhang/menus.json",
		async : false,
		beforeSend : function(XMLHttpRequest) {
		},
		success : function(result) {
			dataStr = result.data;
		},
		complete : function(XMLHttpRequest, textStatus) {
		},
		error : function() {
		}
	});
	return dataStr;
}
function setBaseData2Page() {
	try {
		var dataStr = getBaseDataFromServer();
		var dataObj = $.parseJSON(dataStr);
		if (dataObj.user == null) {
			$("#head #login_reg").css("display", "block");
		} else {
			$("#head #welcome").css("display", "block");
			var datetime = new Date();
			$("#head #welcome #date_uname").html(
					"今天是" + (datetime.getMonth() + 1) + "月"
							+ datetime.getDate() + "号，欢迎您，" + dataObj.user.name
							+ "!");
		}
		var menus = dataObj.menus;
		if (menus != null) {
			$("#navigation").append($("<ul />"));
			for ( var key in menus) {
				var menu = menus[key];
				$("#navigation ul").append(geneLi(menu,1));
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
		
		$("#navigation").append(search);
		/*搜索框 end*/
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
				if($(this).attr("childs") == "false"){
					$("#navigation ul li[layer='1']").each(function(index) {
						$(this).removeClass("now");
					});
					$("#navigation ul li[layer='1'][now='true']").addClass("now");
				}else{
				}			
			}	
		}
	});
	if(menu.subMenus != null){
	  var ul_child = $("<ul />");
	  ul_child.addClass("childs");
	  ul_child.css("display","none");
	  var childs = menu.subMenus;
	  for ( var key in childs) {
	    var menu_child = childs[key];
	    var li_child = geneLi(menu_child,2);	
	    ul_child.append(li_child);
	  }
	  ul_child.bind( {
		"mouseleave" : function() {
			$(this).css("display","none");
			
			$("#navigation ul li[layer='1']").each(function(index) {
				$(this).removeClass("now");
			});
			$("#navigation ul li[layer='1'][now='true']").addClass("now");
		}
	  });
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
	var r = hrefNow.substring(x, y);
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
	headHtml += '	<div class="logo"></div>';
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
	
	var left = $("<div />");
	left.attr("id","left");	
	
	var right = $("<div />");
	right.attr("id","right");
	
	var wrap = $("<div />");
	wrap.attr("id","wrap");	

	
	var content;
	var main = $("#main");
	var home = $("#home");
	if(main.length > 0){
		content = main;
		content.prepend(left);
		content.append(right);
	}else if(home != null){
		content = home;		
	}
	
	content.wrap(wrap);
	content.before(head);
	content.before(navigation);
	$("#wrap").after(foot);
}

jQuery(document).ready(function() {
	geneBaseHtml();
	setBaseData2Page();
	setFootData2Page();
	headClickDeal();
	setNavigationNow();
	
	$("#searchInputText").keydown(function(e){
		var curKey = e.which; 
		if(curKey == 13){
			searchWite();
			return false;
		} 
	}); 
});

function searchWite(){
	var searchInputTextva = $("#searchInputText");
	if(searchInputTextva && searchInputTextva.val()!='' && $.trim(searchInputTextva.val())!=''){
		window.location.href = "searchlist.html?keywords="+escape(searchInputTextva.val());
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