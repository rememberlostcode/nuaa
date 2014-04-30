/**
 * 提示登录超时或者未登录
 */
function showLogin(){
	showMessage('登录超时或者未登录，请登录后重试！');
}
/**
 * 提示权限提示框
 */
function showRight(){
	showMessage('抱歉，您没有此操作的权限！');
}
/**
 * 提示成功提示框
 */
function showSuccess(){
	jQuery.dialog.tips('操作成功！'); 
}

/**
 * 提示错误提示框
 */
function showFail(){
	jQuery.dialog.tips('抱歉，操作失败，请稍后重试！'); 
}

/**
 * 提示成功提示框
 */
function showMessage(msg){
	jQuery.dialog.tips(msg); 
}
/**
 * 全选或者全不选,obj是checkbox本身，用this传入；使用方法：onclick="allCheck(this)"
 * @param obj
 */
function allCheck(obj){
	if(obj.checked){
		all_select("checkbox","qx");
	} else {
		all_select("checkbox","bx");
	}
}
/**
 * 全选或者全不选,obj是checkbox本身，用this传入；使用方法：onclick="allCheck(this,'checkboxName')"
 * @param obj
 * @param checkboxName
 */
function allCheck(obj,checkboxName){
	if(obj.checked){
		all_select(checkboxName,"qx");
	} else {
		all_select(checkboxName,"bx");
	}
}
/**
 * @param obj 复选框ID
 * @param flag 选择标记 空或者fx=反选 qx=全选 bx=不选 qx1=待定的全选，实际实现的是反选功能（主要用在那个红色的全选字样上的单击事件）
 * @作用 复选框选择功能
 */
function all_select(obj,flag){
	if(flag == "" || flag == "fx"){
		for(var i=0; i<document.getElementsByName(obj).length; i++){
			if(document.getElementsByName(obj)[i].checked){
				document.getElementsByName(obj)[i].checked = false;
			}else{
				document.getElementsByName(obj)[i].checked = true;
			}
		}
	}else if(flag == "qx"){
		for(var i=0; i<document.getElementsByName(obj).length; i++){
			document.getElementsByName(obj)[i].checked = true;
		}
	}else if(flag == "qx1"){  //名为全选一，功能实现为反选功能
		var isqx = "yes";
		for(var i=0; i<document.getElementsByName(obj).length; i++){
			if(! document.getElementsByName(obj)[i].checked){
				isqx = "no";
				break;
			}
		}
		if(isqx == "yes"){
			for(var j=0; j<document.getElementsByName(obj).length; j++){
				document.getElementsByName(obj)[j].checked = false;
			}
		}else{
			for(var j=0; j<document.getElementsByName(obj).length; j++){
				document.getElementsByName(obj)[j].checked = true;
			}
		}
	}else{
		for(var i=0; i<document.getElementsByName(obj).length; i++){
			document.getElementsByName(obj)[i].checked = false;
		}
	}
}

/**
 * 获得选中的checkbox的值，值以井号（#）分开
 * @returns {String}
 */
function getAllCheckboxIds(){
	var checks = document.getElementsByName("checkbox");
	var ids = '';
	for(var i=0,length=checks.length;i<length;i++){
		if(checks[i].checked){
			if(ids==''){
				ids = checks[i].value;
			} else {
				ids += '#' + checks[i].value;
			}
		}
	}
	return ids;
}
/**
 * 获得选中的checkbox的值，值以逗号（,）分开
 * @returns {String}
 */
function getAllCheckboxIdsNew(){
	var checks = document.getElementsByName("checkbox");
	var ids = '';
	for(var i=0,length=checks.length;i<length;i++){
		if(checks[i].checked){
			if(ids==''){
				ids = checks[i].value;
			} else {
				ids += ',' + checks[i].value;
			}
		}
	}
	return ids;
}

/**
 * 获得所有的checkbox的值，值以逗号（,）分开
 * @returns {String}
 */
function getAllCheckboxValByName(name){
	var checks = document.getElementsByName(name);
	var ids = '';
	for(var i=0,length=checks.length;i<length;i++){
		if(ids==''){
			ids = checks[i].value;
		} else {
			ids += ',' + checks[i].value;
		}
	}
	return ids;
}

/**
 * 获得选中的checkbox的值，值以逗号（,）分开
 * @returns {String}
 */
function getAllCheckboxIdsByName(name){
	var checks = document.getElementsByName(name);
	var ids = '';
	for(var i=0,length=checks.length;i<length;i++){
		if(checks[i].checked){
			if(ids==''){
				ids = checks[i].value;
			} else {
				ids += ',' + checks[i].value;
			}
		}
	}
	return ids;
}

/**
 * 获得选中的checkbox的值，值以分号（;）分开
 * @returns {String}
 */
function getCheckedboxIdsByName(name){
	var checks = document.getElementsByName(name);
	var ids = '';
	for(var i=0,length=checks.length;i<length;i++){
		if(checks[i].checked){
			if(ids==''){
				ids = checks[i].value;
			} else {
				ids += ';' + checks[i].value;
			}
		}
	}
	return ids;
}

/**
 * 判断元素是否在数组中，在数组中增加或删除该元素
 * idArr：数组
 * id：元素
 * type：操作类型---增加或删除，即'add'或'del'
 */
function dealSingleId(id,idArr,type){
	if(type == 'add'){
		if(jQuery.inArray(id,idArr) < 0){
			if(idArr.length == 1 && idArr[0] == ""){
				idArr[0] = id;
			}else{
				idArr[idArr.length] = id;
			}
		}
	}else if(type == 'del'){ 
		if(jQuery.inArray(id,idArr) >= 0){
			idArr.splice(jQuery.inArray(id,idArr),1); 
		}
	}
	return idArr;
}

/**
 * 获得指定ID开头的标签的值，如input[id^=id_]
 * appointId：指定ID开头
 * type：标签类型
 * @return String 
 */
function getAppointIdAndTypeVals(appointId,type){
	var typeObjs = $(type + "[id^=" + appointId + "]");
    var returnVals = '';
    if(typeObjs.length){
    	typeObjs.each(function(i){
    	    returnVals += $(this).val() + ",";
        });
    	returnVals = returnVals.substring(0,returnVals.length-1);
    }
    return returnVals;
}

/**
 * JQUERY：获得元素HTML，而非元素内部HTML
 * obj：需要获得HTML的元素
 * @return String
 */
function getOuterHtml(obj) {
    var box = $('<div></div>');
    for (var i = 0; i < obj.length; i ++) {
        box.append($(obj[i]).clone());
    }
    return box.html();
}

//表排序
function tableSorting() {
   jQuery("#formCateTable").tableDnD({
        onDragClass: "tDnD_whileDrag",
        onDrop: function(table, row) {
            var rows = table.tBodies[0].rows;
            var idStr = "";
            for (var i=0; i<rows.length; i++) {
                var id = rows[i].id;
                if(idStr != ''){
                	idStr += ",";
                }
                if(id.indexOf("add") >= 0){
                	idStr += id.replace("saveForm","id");
                }else{
                	idStr += id.substring(id.indexOf("_") + 1); 
                }
            }
            $("#cateIdSorting").val(idStr);
        }
        //,onDragStart: function(table, row) {
        //    alert("Started dragging row "+row.id);
        //}
    });
}

/**
 * @作用 获得字符串的长度，中文为2个字节，英文为1个字节 
 */
function getStrLength(str){
	var len = 0;
	if(str != undefined && str != null && str != ""){
		for (var i = 0; i < str.length; i++) {
	        if (str[i].match(/[^\x00-\xff]/ig) != null) //全角 
	            len += 2; //如果是全角，占用两个字节
	        else
	            len += 1; //半角占用一个字节
	    }
	}
    return len;
}

/**
 * @作用　页面跳转
 * @param url 跳转页面的url
 */
function code_save(url){
	window.location = url;
}

function goback(){
	history.go(-1);
}

function preview(obj,name){
	try{		
		var previewArea = $(obj).find("div[name=" + name + "]");
		if(previewArea.length == 0){
			previewArea = $(obj).parent().find("div[name=" + name + "]");
		}
		var dis = previewArea.css("display");
		if(dis == "block"){
			previewArea.css("display","none");
			return false;
		}else{
			$("div[name=" + name + "]").each(
				function(i){
					$(this).css("display","none");
				}	
			);
			previewArea.css("display","block");
			return true;
		}
	}catch(e){
		alert(e.message);
	}
}

function displayOrHidePreview(id){
    try{
    	var div = $("div[id=" + id + "]");
    	var td = div.parent();
    	var displayBefore = div.css("display");
    	if(displayBefore == "none"){   	    
    	    div.css('display','');
    	    td.css('height','100%');		
    	}else{
			div.css('display','none');
            var divOther;
			if(div.prev().length>0){
			    divOther = div.prev();
			}else if(div.next().length>0){
			    divOther = div.next();
			}
    		if(divOther == undefined || divOther.css('display') == "none"){
    		    td.css('height','0');
    		}
    	}
    }catch(e){
        alert(e.message);
    }
}
function displayOrHideChildTr(id){
	var tr_parent = $("tr[id="+id+"]");
	var tr_childList = $("tr[name=child_"+id+"]");
	tr_childList.each(function(){
		var displayBefore = $(this).css("display");
		if(displayBefore == "none"){   	    
			tr_parent.find("a[class=property_view_right]").removeClass("property_view_right").addClass("property_view_down");
			$(this).css('display','');		
    	}else{
    		tr_parent.find("a[class=property_view_down]").removeClass("property_view_down").addClass("property_view_right");
    		$(this).css('display','none');
    	}
	});
	
}

function setTableContentHeight(obj,objReal){
	try {
		if(obj == undefined || obj.length == 0){
			return;
		}
		var browserVisualAreaHeight = $(window).height();				
		//console.log("browserVisualAreaHeight=" + browserVisualAreaHeight + "\n" + "otherHeight=" + otherHeight);
		
		//console.log("Padding_Margin_Border=" + h);		
		if(objReal == undefined){
			var otherHeight = getOtherHeight(obj);
			var h = getPadding_Margin_Border(obj);
			var height = browserVisualAreaHeight - otherHeight - h - 10;
			if(height > 0){
				obj.css("height",height + "px");	
			}
		}else{
			var otherHeight = getOtherHeight(obj);
			var h = getPadding_Margin_Border_2(objReal,obj);
			var height = browserVisualAreaHeight - otherHeight - h - 10;
			if(height > 0){
				objReal.css("height",height + "px");
			}			
		}			
	} catch (e) {
		//alert("e:"+e.message);
	}	
}
function getOtherHeight(obj,height){
	if(obj.is("SCRIPT") || obj.is("STYLE") || obj.css("display") == "none"){
		return height;
	}
	if(height == undefined){
		height = 0;
	}
	var objParent = obj.parent();
	if(objParent.length == 0 || objParent.is("HTML")){
		return height;
	}	
	var heightOfPaddingAndMarginOfObjParent = getPadding_Margin_Border(objParent);
	//console.log("PaddingAndMargin-parent=" + heightOfPaddingAndMarginOfObjParent + "\t" + temp(objParent));
	height += heightOfPaddingAndMarginOfObjParent;		
	height += getHeightOfPrevAllAndNextAll(obj);
	return getOtherHeight(objParent,height);
}
function getHeightOfPrevAllAndNextAll(obj){
	var height = 0;
	var prevAllObj = obj.prevAll();
	var nextAllObj = obj.nextAll();
	prevAllObj.each(function(){
		try{
			if($(this).is("SCRIPT") || $(this).is("STYLE") || $(this).css("display") == "none"){
				return;
			}
			var h = $(this).height();
			var pm = getPadding_Margin_Border($(this));
			//console.log("height-prev=" + h + "\t" + temp($(this)));
			//console.log("PaddingAndMargin-prev=" + pm + "\t" + temp($(this)));
			height += h + pm;
		}catch(e){
			//alert(e.message);
		}
	});
	nextAllObj.each(function(){
		try{
			if($(this).is("SCRIPT") || $(this).is("STYLE") || $(this).css("display") == "none"){
				return;
			}
			var h = $(this).height();
			var pm = getPadding_Margin_Border($(this));
			//console.log("height-next=" + h + "\t" + temp($(this)));
			//console.log("PaddingAndMargin-next=" + pm + "\t" + temp($(this)));
			height += h + pm;
		}catch(e){
			//alert(e.message);
		}
	});
	return height;
}
function getPadding_Margin_Border_2(obj,objParentTop,height){
	if(height == undefined){
		height = 0;
	}
	var objParent = obj.parent();
	height += getPadding_Margin_Border(objParent);	
	if(objParentTop != undefined && objParent.attr("id") == objParentTop.attr("id")){
		return height;
	}
	return getPadding_Margin_Border_2(objParent,objParentTop,height);
}
function getPadding_Margin_Border(obj){
	var height = getPadding(obj) + getMargin(obj) + getBorder(obj);	
	return height;
}
function getBorder(obj){
	if(obj.is("SCRIPT") || obj.is("STYLE") || obj.css("display") == "none"){
		return 0;
	}
	var height = 0;
	var objBorderTop = 0;
	var objBorderBottom = 0;
	try {
		objBorderTop = parseInt(obj.css("border-top").replace("px",""));
		objBorderBottom = parseInt(obj.css("border-bottom").replace("px",""));
	} catch (e) {
		//
	}
	if(isNaN(objBorderTop)){
		objBorderTop = 0;
	}
	if(isNaN(objBorderBottom)){
		objBorderBottom = 0;
	}
	height = objBorderTop + objBorderBottom;
	return height;
}

function getPadding(obj){
	if(obj.is("SCRIPT") || obj.is("STYLE") || obj.css("display") == "none"){
		return 0;
	}
	var height = 0;
	var objPaddingTop = 0;
	var objPaddingBottom = 0;
	try {
		objPaddingTop = parseInt(obj.css("padding-top").replace("px",""));
		objPaddingBottom = parseInt(obj.css("padding-bottom").replace("px",""));
	} catch (e) {
		//
	}
	if(isNaN(objPaddingTop)){
		objPaddingTop = 0;
	}
	if(isNaN(objPaddingBottom)){
		objPaddingBottom = 0;
	}
	height = objPaddingTop + objPaddingBottom;
	return height;
}
function getMargin(obj){
	if(obj.is("SCRIPT") || obj.is("STYLE") || obj.css("display") == "none"){
		return 0;
	}
	var height = 0;
	var objMarginTop = 0;
	var objMarginBottom = 0;
	try {
		objMarginTop = parseInt(obj.css("margin-top").replace("px",""));
		objMarginBottom = parseInt(obj.css("margin-bottom").replace("px",""));
	} catch (e) {
		//
	}
	if(isNaN(objMarginTop)){
		objMarginTop = 0;
	}
	if(isNaN(objMarginBottom)){
		objMarginBottom = 0;
	}
	height = objMarginTop + objMarginBottom;
	return height;
}

function temp(obj){
	var s = "";
	s += obj.get(0).tagName;
	s += " " + "id=";
	if(obj.attr("id") != undefined){
		s += obj.attr("id");
	}
	s += " " + "name=";
	if(obj.attr("name") != undefined){
		s += obj.attr("name");
	}
	s += " " + "class=";
	if(obj.attr("class") != undefined){
		s += obj.attr("class");
	}
	return s;
}

function setTableWidth(){
	try {
	    var id = "mainframe_content_table";
		var tableHead = $("#tableHead");
		var mainframe_content_table = $("#" + id);
   		var firstTr = mainframe_content_table.find("tr:eq(0)");
		
   		var tHead = $("<thead />");
   		var tr = $("<tr />");
   		tr.css("border","none");
   		
		var firstTrHead = tableHead.find("tr:eq(0)");
 		firstTrHead.find("th").each(function(i){
			/*var td = firstTr.find("td:eq(" + i + ")");
			td.attr("width",$(this).attr("width"));*/			
			var th=$("<th />");
			th.attr("width",$(this).attr("width"));
			th.css("border","none");
			th.css("height","0");
			tr.append(th);
 		});
 		
 		var table = mainframe_content_table.find("table").first();
 		if(table.find("thead").length > 0){
 			table.find("thead").prepend(tr);
 		}else{
 			tHead.append(tr);
 			table.prepend(tHead);
 		}
 		
 		
 		var content_table = document.getElementById(id);
 		if(content_table){
 			if(content_table.clientWidth > 0){
 			    var w = content_table.clientWidth;
 			    //tableHead.css("width",w);			
 			}			
 		}	
 		/*mainframe_content_table.bind({			
 			"DOMNodeInserted":function(){
 				setTableWidth();
 			}
 		});*/
	} catch (e) {
		// alert("e:"+e.message);
	}
}
function showSavePrompt(idName){
	try {
		var guides = $("[guide=true]");
		guides.each(function(){
		    var id = $(this).attr("id");
			if(id == idName){
			    var guideNeverShow = GetCookie("guideNeverShow_" + id);
        		if (guideNeverShow != "no") {
        			showGuide($(this));
					return false;
        		}
			}
		});
	} catch (e) {
		// alert(e.message);
	}
}
function getWAndH(w,h) {
    try{
		var result = {"width":0,"height":0,"top":0,"left":0};			
	
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
		
		result.height = maskHeight;
	    result.width = maskWidth;
	    
	    if(w >=0 && h >= 0){
	    	var windowHeight = $(window).height();
	    	var top = (windowHeight / 2) - (w / 2);
	    	result.top = top;
	    	result.left = (maskWidth / 2) - (h / 2);
	    }	    		
		return result;
	}catch(e){
	    // alert(e.message);
	}
}
jQuery(document).ready(function() {
	setTableContentHeight($("#mainframe_content_table"));
	setTableContentHeight($("table[id=cateManage]"),$("#cateManageTree"));
	setTableContentHeight($(".ui-jqgrid-bdiv"));
	setTableWidth();
});		