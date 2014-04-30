function goPage(tableId,pageDivId,pno,psize,isInitial,postCatNowId){
	//不是初始化分页时，设置全部提示信息隐藏
	if(isInitial != true){
		$(".message").hide();
	}
	var tableTrs = $("#" + tableId + " tr");
	var num = tableTrs.length;//表格行数
	var totalPage = 0;//总页数
	var pageSize = parseInt(psize);//每页显示行数
	if(num/pageSize > parseInt(num/pageSize)){   
	   totalPage = parseInt(num/pageSize) + 1;   
	}else{   
	   totalPage = parseInt(num/pageSize);   
	}   
	var currentPage = parseInt(pno);//当前页数
	if(currentPage > totalPage){
		currentPage = totalPage;
	}
	var startRow = (currentPage - 1) * pageSize;//开始显示的行   
	var endRow = currentPage * pageSize;//结束显示的行   
	endRow = (endRow > num) ? num : endRow;
	//显示和隐藏数据
	var i = 0;
	if(tableTrs.length){
		$("#formBody").empty();
		tableTrs.each(function(){
			if(i >= startRow && i < endRow){
				$(this).css("display","");
				$("#formBody").append(getOuterHtml($(this)));
			}
			$(this).css("display","none");
			i++;
		});
	}
	var sortIdStr = getSortIdStr();
	jQuery("#cateIdSorting").val(sortIdStr);
	//设置分页工具条中的文本及链接
	$("#nowPage").text(currentPage);
	$("#totalPageNum").text(totalPage);
	$("#totalDataNum").text(num);
	$("#pageSize").val(pageSize);
	$("#currentPage").val(currentPage);
	if(num > 30){
		var lastOptionValue = $("#selectedPage option:last").val();
		if(lastOptionValue == num){
			$("#selectedPage option:last").remove();
		}
		if(psize == num){
			$("#selectedPage").append("<option selected='selected'>" + num + "</option>");
		}else{
			$("#selectedPage").append("<option>" + num + "</option>");
		}
	}
	
	if(currentPage < totalPage){
		$("#nextPage").removeClass().addClass("ui-pg-button ui-corner-all");
		$("#lastPage").removeClass().addClass("ui-pg-button ui-corner-all");
		var nextPageNew = '<a href="#" onClick="goPage(\'' + tableId + '\',\'' + pageDivId + '\',' + (currentPage + 1) + ',' + psize + ');"><span class="ui-icon ui-icon-seek-next"></span></a>';
		var lastPageNew = '<a href="#" onClick="goPage(\'' + tableId + '\',\'' + pageDivId + '\',' + totalPage + ',' + psize + ');"><span class="ui-icon ui-icon-seek-end"></span></a>';
	}else{
		$("#nextPage").removeClass().addClass("ui-pg-button ui-corner-all ui-state-disabled");
		$("#lastPage").removeClass().addClass("ui-pg-button ui-corner-all ui-state-disabled");
		var nextPageNew = '<span class="ui-icon ui-icon-seek-next"></span>';
		var lastPageNew = '<span class="ui-icon ui-icon-seek-end"></span>';
	}
	$("#nextPage").empty();
	$("#nextPage").append(nextPageNew);
	$("#lastPage").empty();
	$("#lastPage").append(lastPageNew);
	
	if(currentPage > 1){
		$("#firstPage").removeClass().addClass("ui-pg-button ui-corner-all");
		$("#prevPage").removeClass().addClass("ui-pg-button ui-corner-all");
		var firstPageNew = '<a href="#" onClick="goPage(\'' + tableId + '\',\'' + pageDivId + '\',' + 1 + ',' + psize + ');"><span class="ui-icon ui-icon-seek-first"></span></a>';
		var prevPageNew = '<a href="#" onClick="goPage(\'' + tableId + '\',\'' + pageDivId + '\',' + (currentPage - 1) + ',' + psize + ');"><span class="ui-icon ui-icon-seek-prev"></span></a>';
	}else{
		$("#firstPage").removeClass().addClass("ui-pg-button ui-corner-all ui-state-disabled");
		$("#prevPage").removeClass().addClass("ui-pg-button ui-corner-all ui-state-disabled");
		var firstPageNew = '<span class="ui-icon ui-icon-seek-first"></span>';
		var prevPageNew = '<span class="ui-icon ui-icon-seek-prev"></span>';
	}
	$("#firstPage").empty();
	$("#firstPage").append(firstPageNew);
	$("#prevPage").empty();
	$("#prevPage").append(prevPageNew);
	
	if(postCatNowId != 0){
		tableSorting();
	}
}