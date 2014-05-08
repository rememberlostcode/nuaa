function getListFromServer() {
	$("#searchInputText").val(getQueryString('keywords'));
	var newsurl = "/node/search/list?keywords="+encodeURIComponent(getQueryString('keywords'));
	if($('#currentPage')){
		newsurl += '&page='+$('#currentPage').val();
	}
	jQuery.ajax({
		url: newsurl,
		type: "GET",
		success: function(data) {
    		setList2Page(data);
        }
    });
}
function setList2Page(dataObj) {
	try {
		var searchs = dataObj.searchs;
		if (searchs != null) {
			$("#neirong").empty();
			for ( var key in searchs) {
				var each = searchs[key];
				var one = $("<span id='"+each.id+"' module='" + each.module + "' />");
				one.attr("class","one");
				one.append(each.title);
				if(each.module == "下载区"){
					one.append("&nbsp;&nbsp;&nbsp;");
					var downloadimg = $("<img src='/image/rdetail_btn.gif' path='"+each.path+"' width='60px'>");
					one.append(downloadimg);
					downloadimg.bind( {
						"click" : function() {
							window.location.href = $(this).attr("path");
						}
					});
				} else {
					one.css("cursor","pointer");
					one.bind( {
						"click" : function() {
							var module = $(this).attr("module");
							if(module == "通知"){
								window.location.href = "notice.html?id="+$(this).attr("id");
							}else if(module == "新闻"){
								window.location.href = "news.html?id="+$(this).attr("id");
							}else if(module == "报告"){
								window.location.href = "report.html?id="+$(this).attr("id");
							}					    
						}
					});
				}

				var two = $("<span />");
				two.attr("class","two");
				two.html(each.module);

				var three = $("<span />");
				three.attr("class","three");
				three.html(each.autor);

				var four = $("<span />");
				four.attr("class","four");
				four.html(each.date);
				var li = $("<li style='color:#434697;'/>");
				li.append(one);
				li.append(two);
				li.append(three);
				li.append(four);
				$("#neirong").append(li);
			}

			//设置当前页数和总页数
			$('#currentPage').val(dataObj.currentPage);
			$('#totalPages').val(dataObj.totalPages);

			pg = new showPages('pg');
			var totalPages=$('#totalPages').val(); //得到总页数
			pg.pageCount =parseInt(totalPages); // 定义总页数(必要)
			pg.argName = 'pageNum'; // 定义参数名(可选,默认为page)
			pg.printHtml();
		} else {

		}
	} catch (e) {
		// alert("e:"+e.message);
	}
}

jQuery(document).ready(function() {
	getListFromServer();
});