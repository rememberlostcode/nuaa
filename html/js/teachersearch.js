jQuery(document).ready(function() {
	searchNavClickBind();
});

var zc = "all";
var zy = "all";
var zm = "all";

function searchNavClickBind() {
	searchNavClickBindEach("div[id=searchByZC] div",1);
	searchNavClickBindEach("div[id=searchByZY] div",2);
	searchNavClickBindEach("div[id=searchByZM] div",3);
}

function searchNavClickBindEach(searchStr,num){
	var divs = $(searchStr);
	divs.each(function() {
		$(this).bind(
				{
					"click" : function() {					
						if(typeof($(this).attr("val"))!="undefined"){
							$(searchStr).each(function() {
								if(typeof($(this).attr("val"))!="undefined"){
									$(this).removeClass("selected");
								}							
							});	
							$(this).addClass("selected");
							var val = $(this).attr("val"); 
							if(num == 1){
								zc = val;
							}else if(num == 2){
								zy = val;
							}else if(num == 3){
								zm = val;
							}
							dealBind();
						}
					}
				});
	});
}

function dealBind(){
	var displaySum = 0;
	var teacher_eachs = $("li[class=teacher_each]");
	teacher_eachs.each(function() {
		var displayFlag = true;
		var zc_now = $(this).attr("zc");
		var zy_now = $(this).attr("zy");
		var zm_now = $(this).attr("zm");
		if(zc == "all" || zc == zc_now){
			displayFlag = true;
		}else{
			displayFlag = false;
			$(this).css("display","none");
			return true;
		}
		if(zy == "all" || zy == zy_now){
			displayFlag = true;
		}else{
			displayFlag = false;
			$(this).css("display","none");
			return true;
		}
		if(zm == "all" || zm == zm_now){
			displayFlag = true;
		}else{
			displayFlag = false;
			$(this).css("display","none");
			return true;
		}
		$(this).css("display","block");
		displaySum += 1;
	});
	var nodata = $("div[id=nodata]");
	if(displaySum == 0){
		nodata.css("display","block");
	}else{
		nodata.css("display","none");
	}
}