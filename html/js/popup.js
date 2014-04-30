function showPopUpLayer(title, w, h) {
	try {
		if ($("#popUpBg").html() != undefined) {
			return;
		}

		var iWidth = document.body.clientWidth;
		var iHeight = getPageSize()[0];

		// 弹出层的后背景
		var popUpBg = $("<div/>");
		popUpBg.attr("id", "popUpBg");
		popUpBg.css("width", window.screen.width + "px");
		popUpBg.css("height", iHeight + "px");
		$("body").append(popUpBg);

		// 弹出层
		var popUpLayer = $("<div/>");
		popUpLayer.attr("id", "popUpLayer");
		popUpLayer.css("top", (getScrollTop() + (iHeight - h) / 2) + "px");
		popUpLayer.css("left", (iWidth - w) / 2 + "px");
		popUpLayer.css("width", w + "px");
		popUpLayer.css("height", h + "px");
		$("body").append(popUpLayer);

		// 弹出层里面的表格
		var tableHtml = "<table id='popUpTable' cellspacing=0>";
		tableHtml += "<tr id='popUpTitle'>";
		tableHtml += "<td id='popUpTitleBar'>";
		tableHtml += title;
		tableHtml += "</td>";
		tableHtml += "<td id='popUpCloseBtn'>";
		tableHtml += "<div id='popUpDoCancel'>";
		tableHtml += "<a href='javascript:doCancel()'></a>";
		tableHtml += "</div>";
		tableHtml += "</td>";
		tableHtml += "</tr>";
		tableHtml += "<tr>";
		tableHtml += "<td id='popUpMain' colspan=2 valign=top>";
		tableHtml += "<table id='popUpMainTable'>";
		tableHtml += "<tr>";
		tableHtml += "<td id='popUpMainTableContent'>";		
		tableHtml += "</td>";
		tableHtml += "</tr>";
		tableHtml += "<tr>";
		tableHtml += "<td id='popUpMainTableButton'>";		
		tableHtml += "</td>";
		tableHtml += "</tr>";
		tableHtml += "</table>";
		tableHtml += "</td>";
		tableHtml += "</tr>";
		tableHtml += "</table>"
		var table = $(tableHtml);
		popUpLayer.append(table);

		// 关闭
		$("#popUpCloseBtn").onclick = this.doCancel = function() {
			popUpBg.remove();
			popUpLayer.remove();
		};

		// 以下部分使弹出层可以移动
		var moveX = 0;
		var moveY = 0;
		var moveTop = 0;
		var moveLeft = 0;
		var moveable = false;
		var docMouseMoveEvent = document.onmousemove;
		var docMouseUpEvent = document.onmouseup;
		$("#popUpTitleBar").bind(
				{
					mousedown : function() {
						var evt = getEvent();
						moveable = true;
						moveX = evt.clientX;
						moveY = evt.clientY;
						moveTop = parseInt(popUpLayer.css("top"));
						moveLeft = parseInt(popUpLayer.css("left"));
						document.onmousemove = function() {
							if (moveable) {
								var evt = getEvent();
								var x = moveLeft + evt.clientX - moveX;
								var y = moveTop + evt.clientY - moveY;
								if (x > 0 && (x + w < iWidth) && y > 0
										&& (y + h < iHeight)) {
									popUpLayer.css("top", y + "px")
									popUpLayer.css("left", x + "px")
								}
							}
						};
						document.onmouseup = function() {
							if (moveable) {
								document.onmousemove = docMouseMoveEvent;
								document.onmouseup = docMouseUpEvent;
								moveable = false;
								moveX = 0;
								moveY = 0;
								moveTop = 0;
								moveLeft = 0;
							}
						};
					}
				});

		function getEvent() {
			return window.event || arguments.callee.caller.arguments[0];
		}
		/* ============ */

	} catch (e) {
		// alert(e.message);
	}
}

function getScrollTop() {
	var scrollTop = 0;
	try {
		if (document.documentElement && document.documentElement.scrollTop) {
			scrollTop = document.documentElement.scrollTop;
		} else if (document.body) {
			scrollTop = document.body.scrollTop;
		}
	} catch (e) {
		// alert(e.message);
	}
	return scrollTop;
}

function getPageSize() {
	// 检测浏览器的渲染模式
	var body = (document.compatMode && document.compatMode.toLowerCase() == "css1compat") ? document.documentElement
			: document.body;
	var bodyOffsetWidth = 0;
	var bodyOffsetHeight = 0;
	var bodyScrollWidth = 0;
	var bodyScrollHeight = 0;
	var pageDimensions = [ 0, 0 ];

	pageDimensions[0] = body.clientHeight;
	pageDimensions[1] = body.clientWidth;

	bodyOffsetWidth = body.offsetWidth;
	bodyOffsetHeight = body.offsetHeight;
	bodyScrollWidth = body.scrollWidth;
	bodyScrollHeight = body.scrollHeight;
	if (bodyOffsetHeight > pageDimensions[0]) {
		pageDimensions[0] = bodyOffsetHeight;
	}

	if (bodyOffsetWidth > pageDimensions[1]) {
		pageDimensions[1] = bodyOffsetWidth;
	}

	if (bodyScrollHeight > pageDimensions[0]) {
		pageDimensions[0] = bodyScrollHeight;
	}

	if (bodyScrollWidth > pageDimensions[1]) {
		pageDimensions[1] = bodyScrollWidth;
	}
	return pageDimensions;
}