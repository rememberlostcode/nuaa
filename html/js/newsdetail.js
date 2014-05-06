function getDetailDataFromServer() {
	jQuery.ajax({
		url: "/node/detail?key="+getQueryString('id'),
		type: "GET",
		success: function(data) {
    		setDetailData2Page(data);
        }
    });
}
function setDetailData2Page(dataObj) {
	try {
		var headline = dataObj.headline;
		if (headline != null) {
			$("#headline").html(headline);
		}

		var keywords = dataObj.keywords;
		if (keywords != null) {
			for ( var key in keywords) {
				var keyword = keywords[key];
				var spanName = $("<span />");
				spanName.addClass("name");
				spanName.html(keyword.name + ":");
				var valueName = $("<span />");
				valueName.addClass("value");
				valueName.html(keyword.value);
				var li = $("<li />");
				li.css({"width":"auto"});
				li.append(spanName);
				li.append(valueName);
				$("#keywords").append(li);
			}
		}

		var detail = dataObj.detail;
		if (detail != null) {
			$("#detail").html(detail);
		}

		var last = dataObj.last;
		var spanLast = $("#bottom #last .value");
		if (last && last.id) {
			spanLast.attr('id',last.id);
			spanLast.html(last.content);
			spanLast.bind( {
				"click" : function() {
				    window.location.href = "news.html?id="+$(this).attr("id");
				}
			});
		} else {
			spanLast.html("没有了");
			spanLast.addClass("none");
		}

		var next = dataObj.next;
		var spannext = $("#bottom #next .value");
		if (next != null) {
			spannext.attr('id',next.id);
			spannext.html(next.content);
			spannext.bind( {
				"click" : function() {
				    window.location.href = "news.html?id="+$(this).attr("id");
				}
			});
		} else {
			spannext.html("没有了");
			spannext.addClass("none");
		}
		$("#bottom #last").show();
		$("#bottom #next").show();
	} catch (e) {
		 alert("e:"+e.message);
	}
}

jQuery(document).ready(function() {
	getDetailDataFromServer();
});