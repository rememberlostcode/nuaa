function waiting() {
	try {
		if($("#waitingBgParent").length > 0){
			$("#waitingBgParent").remove();
		}
		var w = 31;
		var h = 31;
		
		var widthAndHeight = getWAndH(w,h);
		var maskHeight = widthAndHeight.height;
		var maskWidth = widthAndHeight.width;
		var dialogTop = widthAndHeight.top;
		var dialogLeft = widthAndHeight.left;
		
		$(window).scroll(function() {
			resetWaitingBgParent(w,h);
		});
		$(window).resize(function() {
			resetWaitingBgParent(w,h);
		});

		var waitingBgParent = document.createElement("div");
		waitingBgParent.id = "waitingBgParent";
		waitingBgParent.style.cssText = "z-index:9999;position:absolute;left:0;top:0;overflow:hidden;";
		waitingBgParent.style.width = maskWidth + "px";
		waitingBgParent.style.height = maskHeight + "px";
		document.body.appendChild(waitingBgParent);

		/*var waitingBg_iframe = document.createElement("iframe");
		waitingBg_iframe.id = "waitingBg_iframe";
		waitingBg_iframe.style.cssText = "z-index:-1;position:absolute;left:0;top:0;scrolling:no;";
		waitingBg_iframe.style.width = maskWidth + "px";
		waitingBg_iframe.style.height = maskHeight + "px";
		waitingBgParent.appendChild(waitingBg_iframe);*/

		var waitingBg = document.createElement("div");
		waitingBg.id = "waitingBg";
		waitingBg.style.width = maskWidth + "px";
		waitingBg.style.height = maskHeight + "px";
		waitingBgParent.appendChild(waitingBg);

		var waitingLayer = document.createElement("div");
		waitingLayer.id = "waitingLayer";
		waitingLayer.style.top = dialogTop + "px";
		waitingLayer.style.left = dialogLeft + "px";
		waitingLayer.style.width = w + "px";
		waitingLayer.style.height = h + "px";
		waitingBgParent.appendChild(waitingLayer);

	} catch (e) {
		//alert(e.message);
	}
}

function resetWaitingBgParent(w,h){
	if ($("#waitingBgParent").length > 0) {
		
		var widthAndHeight = getWAndH(w,h);
		var maskHeight = widthAndHeight.height;
		var maskWidth = widthAndHeight.width;
		var dialogTop = widthAndHeight.top;
		var dialogLeft = widthAndHeight.left;
		
		$("#waitingBgParent").css({
			width : maskWidth + "px",
			height : maskHeight + "px"
		});
		$("#waitingBg").css({
			width : maskWidth + "px",
			height : maskHeight + "px"
		});
		$("#waitingLayer").css({
			top : dialogTop + "px",
			left : dialogLeft + "px"
		});
	}
}

function waitingClose() {
	$("#waitingBgParent").remove();
}

jQuery(document).ready(function() {
	try {
		$("form").submit(
		    function(){
		    	waiting();
		    }
		);
		$(document).ajaxStart(function(){
			waiting();
		});
		$(document).ajaxStop(function(){
			waitingClose();
			setTableContentHeight($("#compareTable_rollback_div"));			
		});
		$("a").click(function(){
			var href = $(this).attr("href");
			if(href != undefined && href.indexOf("http://") == 0){
				waiting();
			}
			var successMsg = $("#successMsg");
			if(successMsg != undefined){
				successMsg.hide("slow");
			}
			var errorMsg = $("#errorMsg");
			if(errorMsg != undefined){
				errorMsg.hide("slow");
			}
		});
	} catch (e) {
		// alert("e:"+e.message);
	}
});
function stateChangeIE(_frame) {
	if (_frame.readyState == "interactive"){//state: loading ,interactive, complete			
		waitingClose();
		_frame.style.visibility = "visible";
	}
}
function stateChangeFirefox(_frame) {
	waitingClose();
	_frame.style.visibility = "visible";
}