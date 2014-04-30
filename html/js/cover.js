function cover(goalObjId,content) {
	try {
		var goalObj = $("#" + goalObjId);
		
		var coverBgParent = $("<div/>");
		coverBgParent.css("width",goalObj.parent().css("width"));
		coverBgParent.css("height",goalObj.parent().css("height"));
		coverBgParent.css("position","absolute");
		coverBgParent.css("left","0px");
		coverBgParent.css("top","0px");
		coverBgParent.css("overflow","hidden");
		coverBgParent.css("z-index","70");
		
		var coverBg = $("<div/>");
		coverBg.css("width",goalObj.parent().css("width"));
		coverBg.css("height",goalObj.parent().css("height"));
		coverBg.css("position","absolute");
		coverBg.css("left","0px");
		coverBg.css("top","0px");
		coverBg.css("background-color","#DCE2F1");
		coverBg.css("opacity","0.6");
		coverBg.css("filter","Alpha(Opacity = 60)");
		coverBg.css("z-index","70");
		
		var contentDiv = $("<div />");
		contentDiv.css("color","red");
		contentDiv.css("font-size","22px");
		contentDiv.css("font-weight","bold");
		contentDiv.css("font-family","黑体");
		contentDiv.css("text-align","center");
		contentDiv.css("z-index","71");
		contentDiv.html("<span style='background-color:#DCE2F1;'>" + content + "</span>");
		
		coverBgParent.append(coverBg);		
		coverBgParent.append(contentDiv);		
		
		goalObj.prepend(coverBgParent);

	} catch (e) {
		alert(e.message);
	}
}