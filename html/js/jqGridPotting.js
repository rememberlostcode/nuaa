(function ($) {
    $.fn.bindTable = function (tableInfo,tableInfoJson,columnInfoJson,columnSortJson,pageurl,callback) {
    	var url = tableInfo.url;
    	var daoPageSqlId = tableInfo.daoPageSqlId == null ? "" : tableInfo.daoPageSqlId;
    	var fieldNames = tableInfo.fieldNames;
    	var databaseNames = tableInfo.databaseNames;
    	var columnSort = columnSortJson.columnSort;
    	//处理表格初始化参数Json数据
    	var caption = tableInfoJson.caption == undefined ? "JqGrid Table" : tableInfoJson.caption;
    	var width = tableInfoJson.width == undefined ? "none" : tableInfoJson.width;
    	var height = tableInfoJson.height == undefined ? "auto" : tableInfoJson.height;
    	var autowidth = width == "none" ? true : false;
    	var pageSize = tableInfoJson.pageSize == undefined ? 20 : tableInfoJson.pageSize;
    	var multiselect = tableInfoJson.multiselect == undefined ? false : tableInfoJson.multiselect;
    	var lineNumbers = tableInfoJson.lineNumbers == undefined ? false : tableInfoJson.lineNumbers;
    	var tableAlign = tableInfoJson.tableAlign == undefined ? "center" : tableInfoJson.tableAlign;
    	var tableDatefmt = tableInfoJson.tableDatefmt == undefined ? "Y-m-d" : tableInfoJson.tableDatefmt;
    	//处理表格colModel参数Json数据
    	var colNames = [];
        var colModels = [];
        var columnInfo = columnInfoJson.columnInfo;
        for(var i=0;i<columnInfo.length;i++){
        	var columnInfoObj = columnInfo[i];
        	if(columnInfoObj.formatType == "date"){
        		var newformat = columnInfoObj.columnDatefmt == undefined ? tableDatefmt : columnInfoObj.columnDatefmt;
        		colModels.push({
            		name : columnSort[i],
            		index : databaseNames[name],
            		width : columnInfoObj.width == undefined ? 60 : columnInfoObj.width,
            		editable : columnInfoObj.editable == undefined ? false : columnInfoObj.editable,
            		sortable : columnInfoObj.sortable == undefined ? false : columnInfoObj.sortable,
            	    align : columnInfoObj.columnAlign == undefined ? tableAlign : columnInfoObj.columnAlign,
            	    hidedlg : columnInfoObj.hidedlg == undefined ? false : columnInfoObj.hidedlg,
    	    		hidden : columnInfoObj.hidden == undefined ? false : columnInfoObj.hidden,
    	    		formatter : columnInfoObj.formatType,
    				formatoptions : {srcformat:"Y-m-d H:i:s",newformat : newformat}
            	});
        	}else if(columnInfoObj.formatType == "select"){
        		var editoptions = columnInfoObj.editoptions == undefined ? "" : columnInfoObj.editoptions;
        		colModels.push({
            		name : columnSort[i],
            		index : databaseNames[name],
            		width : columnInfoObj.width == undefined ? 60 : columnInfoObj.width,
            		editable : columnInfoObj.editable == undefined ? false : columnInfoObj.editable,
            		sortable : columnInfoObj.sortable == undefined ? false : columnInfoObj.sortable,
            	    align : columnInfoObj.columnAlign == undefined ? tableAlign : columnInfoObj.columnAlign,
            	    hidedlg : columnInfoObj.hidedlg == undefined ? false : columnInfoObj.hidedlg,
    	    		hidden : columnInfoObj.hidden == undefined ? false : columnInfoObj.hidden,
    	    		formatter : columnInfoObj.formatType,
    	    		editoptions : {value : editoptions}
            	});
        	}else{
        		colModels.push({
            		name : columnSort[i],
            		index : databaseNames[name],
            		width : columnInfoObj.width == undefined ? 60 : columnInfoObj.width,
            		editable : columnInfoObj.editable == undefined ? false : columnInfoObj.editable,
            		sortable : columnInfoObj.sortable == undefined ? false : columnInfoObj.sortable,
            	    align : columnInfoObj.columnAlign == undefined ? tableAlign : columnInfoObj.columnAlign,
            	    hidedlg : columnInfoObj.hidedlg == undefined ? false : columnInfoObj.hidedlg,
    	    		hidden : columnInfoObj.hidden == undefined ? false : columnInfoObj.hidden
            	});
        	}
        	colNames.push(columnInfoObj.columnName);
        }
        if (colNames.length == 0) {
            alert("表格数据列不能为空!");
            return me;
        }
        //表格初始化和加载数据
        this.jqGrid({
            height: height,
            width : width,
            url: pageurl,
            datatype : 'json',
            mtype : 'POST',
            autowidth : autowidth,
            colNames : colNames,
            colModel : colModels,
            rowNum : pageSize,
            rownumbers : lineNumbers,
            pager: "pager",
            rowList: [10,20,30],
            multiselect: multiselect,
            jsonReader: {
            	//root: "griddata",
            	total: "totalPages",
            	records: "totalRecords",
            	page: "currentPage", 
            	repeatitems: false
            },
            prmNames: {
        		page : "currentPage",
        		rows : "pageSize",
        		order : "sortWay",
        		sort : "sortName"
            },
            postData: {
            	"userUrl": url,
            	"daoPageSqlId": daoPageSqlId
            },
            caption: caption,
            loadComplete: function(data) {
                if (!!callback) callback(data, this);
            }
        });
        this.navGrid("#pager", { edit: false, add: false, del: false, search: false, refresh: false });
    };
})(jQuery);