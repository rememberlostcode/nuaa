function getHomeDataFromServer() {
	jQuery.ajax({
		url: "/nuaa/node/notice/list?rows=5",
		type: "GET",
		success: function(data) {
    		setHomeData2PageNotice(data);
        }
    });

	jQuery.ajax({
		url: "/nuaa/node/news/list?rows=5",
		type: "GET",
		success: function(data) {
    		setHomeData2PageNews(data);
        }
    });

}
function setHomeData2PageNotice(dataObj) {
	try {
		var notices = dataObj.notices;
		if (notices != null) {
			for ( var key in notices) {
				var each = notices[key];
				var li = $("<li id='"+each.id+"'/>");
				li.html(each.content);
				li.attr("action", each.action);
				li.bind( {
					"click" : function() {
						clickDetail(this);
					}
				});
				$("#notice .list").append(li);
			}
		} else {

		}
	} catch (e) {
		// alert("e:"+e.message);
	}
}

function setHomeData2PageNews(dataObj) {
	try {
		var hotnews = dataObj.notices;
		if (hotnews != null) {
			for ( var key in hotnews) {
				var each = hotnews[key];
				var li = $("<li id='"+each.id+"'/>");
				li.html(each.content);
				li.attr("action", each.action);
				li.bind( {
					"click" : function() {
						clickDetail(this);
					}
				});
				$("#hotnews .list").append(li);
			}
		} else {

		}
	} catch (e) {
		// alert("e:"+e.message);
	}
}

function homeClickDeal() {
	$("#home #notice .more").bind( {
		"click" : function() {
			window.location.href = "noticelist.html";
		}
	});
	$("#home #hotnews .more").bind( {
		"click" : function() {
			window.location.href = "newslist.html";
		}
	});
}

jQuery(document).ready(function() {
	getHomeDataFromServer();
	homeClickDeal();
});