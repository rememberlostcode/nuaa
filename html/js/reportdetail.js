function getDetailDataFromServer() {
	jQuery.ajax({
		url: "/node/report/detail?key="+getQueryString('id'),
		type: "GET",
		success: function(data) {
    		setDetailData2Page(data);
        }
    });
}
function setDetailData2Page(dataObj) {
	try {
		jQuery.ajax({
			url: "http://math.science.nuaa.edu.cn/nanhang/updateClickOrDownloadNum.json?type=report&id="+getQueryString('id'),
			type: "GET",
			success: function(data) {
			}
		});
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
				li.css({"width":"100%"});
				li.append(spanName);
				li.append(valueName);
				$("#keywords").append(li);
			}
		}

		var last = dataObj.last;
		var spanLast = $("#bottom #last .value");
		if (last && last.id) {
			spanLast.attr('id',last.id);
			spanLast.html(last.title);
			spanLast.bind( {
				"click" : function() {
				    window.location.href = "report.html?id="+$(this).attr("id");
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
			spannext.html(next.title);
			spannext.bind( {
				"click" : function() {
				    window.location.href = "report.html?id="+$(this).attr("id");
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