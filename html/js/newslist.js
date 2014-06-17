function getListFromServer() {
	var newsurl = "/node/news/list";
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
			var page  = dataObj.currentPage;
			var i=0;
			var nd = new Date();
			nd.setMonth(nd.getMonth()-1);
			for ( var key in notices) {
				var notice = notices[key];
				
				var li = $("<li id='"+notice.id+"'/>");
				li.html(notice.content);

				var dt = string2Date(notice.time);
				if(page <=1 && i==0 && dt > nd){
					li.append("<img src=\"http://math.science.nuaa.edu.cn/image/new.gif\"/>");
				}

				li.bind( {
					"click" : function() {
					    window.location.href = "news.html?id="+$(this).attr("id");
					}
				});
				var fonttime = $("<font style='float:right;'/>");
				fonttime.html(notice.time);
				li.append(fonttime);
				$("#list").append(li);
				i++;
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