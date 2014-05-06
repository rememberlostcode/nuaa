function getListFromServer() {
	var newsurl = "/nuaa/node/report/list";
	if($('#currentPage')){
		newsurl += '?page='+$('#currentPage').val();
	}
	jQuery.ajax({
		url: newsurl,
		type: "GET",
		success: function(data) {
    		setList2Page(data);
        }
    });
}
function setList2Page(data) {
	try {
		var dataObj = data;
		var notices = dataObj.notices;
		if (notices != null) {
			$("#list").empty();
			for ( var key in notices) {
				var notice = notices[key];
				
				var li = $("<li id='"+notice.id+"'/>");
				li.html(notice.title);
				li.bind( {
					"click" : function() {
					    window.location.href = "report.html?id="+$(this).attr("id");
					}
				});
				var fonttime = $("<font style='float:right;'/>");
				fonttime.html(notice.time);
				li.append(fonttime);
				$("#list").append(li);
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