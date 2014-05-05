function getHomeDataFromServer() {
	/*最新通知*/
	jQuery.ajax({
		url: "/nuaa/node/notice/list?rows=5",
		type: "GET",
		success: function(data) {
    		setHomeData2PageNotice(data);
        }
    });
     
    /*热点新闻*/
	jQuery.ajax({
		url: "/nuaa/node/news/list?rows=25",
		type: "GET",
		success: function(data) {
    		setHomeData2PageNews(data);
			$("#marqueediv_hotnews").kxbdMarquee({direction:"up",isEqual:false,loop:0,scrollAmount:1,scrollDelay:60});
        }
    });

    /*学术会议*/
	/*jQuery.ajax({
		url: "http://211.149.175.138/nuaa/node/news/list?rows=5",
		type: "GET",
		success: function(data) {
    		setHomeData2PageMeeting(data);
        }
    });*/

    /*学术报告*/
	jQuery.ajax({
		url: "/nuaa/node/report/list?rows=5",
		type: "GET",
		success: function(data) {
			//var str = '{"notices":[{"id":"54","title":"高维拟线性双曲型方程组具间断始值的柯西问题","user":"陈恕行 院士","loca":"光华东主楼2001","time":"2014-03-21 13:05","action":"#"},{"id":"54","title":"高维拟线性双曲型方程组具间断始值的柯西问题","user":"陈恕行 院士","loca":"光华东主楼2001","time":"2014-03-21 13:05","action":"#"},{"id":"54","title":"高维拟线性双曲型方程组具间断始值的柯西问题","user":"陈恕行 院士","loca":"光华东主楼2001","time":"2014-03-21 13:05","action":"#"}],"currentPage":"1","totalPages":"2"}';
    		//data = $.parseJSON(str);
			setHomeData2PageReport(data);
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
				li.html(each.content + "<span class='time'>" + formatDate(string2Date(each.time),"YYYY-MM-DD") + "</span>");
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
				li.html(each.content + "<span class='time'>" + formatDate(string2Date(each.time),"YYYY-MM-DD") + "</span>");
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

function setHomeData2PageMeeting(dataObj) {
	try {
		var hotnews = dataObj.notices;
		if (hotnews != null) {
			for ( var key in hotnews) {
				var each = hotnews[key];
				var li = $("<li id='"+each.id+"'/>");
				li.html("【" + formatDate(string2Date(each.time),"YYYY-MM-DD") + "】" + each.content);
				li.attr("action", each.action);
				li.bind( {
					"click" : function() {
						clickDetail(this);
					}
				});
				$("#meeting .list").append(li);
			}
		} else {

		}
	} catch (e) {
		// alert("e:"+e.message);
	}
}

function setHomeData2PageReport(dataObj) {
	try {
		var hotnews = dataObj.notices;
		if (hotnews != null) {
			for ( var key in hotnews) {
				var each = hotnews[key];
				var time = each.time;
				var timeObj = string2Date(time);
				var li = $("<li />");
				var yearmonth = $("<div />");
				yearmonth.attr("class","yearmonth");
				yearmonth.html(formatDate(timeObj,"YYYY.MM"));
				var day = $("<div />");
				day.attr("class","day");
				day.html(formatDate(timeObj,"DD"));
				var week = $("<div />");
				week.attr("class","week");
				week.html(getWeek(timeObj));
				var divLeft = $("<div />");
				divLeft.attr("class","one");
				divLeft.append(yearmonth);
				divLeft.append(day);
				divLeft.append(week);
				var liTitle = $("<li />");
				liTitle.html("<span class='bold'>报告题目：</span>");
				var aName = $("<a />");
				aName.html(each.title);
				aName.attr("id", each.id);
				aName.attr("action", each.action);
				aName.bind( {
					"click" : function() {
						clickDetail(this);
					}
				});
				liTitle.append(aName);
				var liUser = $("<li />");
				liUser.html("<span class='bold'>报告人：</span>"+each.user);
				var liLoca = $("<li />");
				liLoca.html("<span class='bold'>报告地点：</span>"+each.loca);
				var liTime = $("<li />");
				liTime.html("<span class='bold'>报告时间：</span>"+formatDate(timeObj,"HH:MI"));
				var ulRight = $("<ul />");
				ulRight.attr("class","two");
				ulRight.append(liTitle);
				ulRight.append(liUser);
				ulRight.append(liLoca);
				ulRight.append(liTime);
				li.append(divLeft);
				li.append(ulRight);
				$("#report .list").append(li);
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