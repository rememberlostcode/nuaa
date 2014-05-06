function getListFromServer() {
	$("#searchInputText").val(getQueryString('keywords'));
	var newsurl = "/nuaa/node/search/list?keywords="+encodeURIComponent(getQueryString('keywords'));
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
				var one = $("<span id='"+each.id+"' style='cursor: pointer;' module='" + each.module + "' />");
				one.attr("class","one");
				one.html(each.title);
				one.bind( {
					"click" : function() {
					    var module = $(this).attr("module");
					    if(module == "通知"){
					    	window.location.href = "notice.html?id="+$(this).attr("id");
					    }else if(module == "新闻"){
					    	window.location.href = "news.html?id="+$(this).attr("id");
					    }					    
					}
				});

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