/** jqGridCRUD 封装jqGrid增删改查操作 */

/** jqGrid表格展示数据和右侧分页工具条
 *  data 后台返回的json数据，包括page信息和listJson信息
 */
function showGriddata(data,tableId){
    //列表展示json数据
	var showData = JSON.parse(data.griddata);
	for(var i=0;i <= showData.length;i++){
        jQuery(tableId).jqGrid('addRowData',i+1,showData[i]);
	}
	//显示右边的分页条
	var totalPage = data.totalPages;
	var totalRecords = data.totalRecords;
	var currentPage = data.currentPage;
	var pageSize = data.pageSize;
	var startIndex = (currentPage - 1)*pageSize + 1;
	var endIndex = startIndex +  showData.length - 1;
	var text = startIndex + " - " + endIndex +"&nbsp;&nbsp;&nbsp;&nbsp;共  "+totalRecords+" 条";
	document.getElementById("pager_right").innerHTML = text;
}

// 选中行
function getChecked(tableId) {
	return jQuery(tableId).jqGrid('getGridParam', 'selarrrow');
}

function getRownum(tableId) {
	return jQuery().jqGrid('getGridParam', 'records');
}
/*
// 增加
jQuery("#add").click(function() {
			window.location = _addUrl;
	});

// 修改
jQuery("#edit").click(function() {
			var id = getChecked();
			if (id.length > 0) {
				if (id.length > 1) {
					alert("只能对一条数据进行修改!");
				} else {
					try {
						if (typeof(eval('allowEdit')) == "function") {
							if (!allowEdit(id))
								return;
						}
					} catch (e) {

					}
					var ret = jQuery("#tabGrid").jqGrid('getRowData', id);
					var url = _editUrl + id;
					window.location = url;
				}
			} else {
				alert("请选择一条数据进行修改!");
			}
		});

// 查看
jQuery("#view").click(function() {
			var id = getChecked();
			if (id.length > 0) {
				if (id.length > 1) {
					alert("只能对一条数据进行查看!");
				} else {
					var stage = "";
					if (jQuery("#stage") != null) {
						stage = jQuery("#stage").val();
					}
					var ret = jQuery("#tabGrid").jqGrid('getRowData', id);
					var url = _viewUrl + id + "&stage=" + stage;
					window.location = url;
				}
			} else {
				alert("请选择一条数据进行查看!");
			}
		});

// 删除
jQuery("#delete").click(function() {
			var ids = getChecked();
			if (ids.length > 0) {
				var params = {
					"ids" : ids.toString()
				};
				try {
					if (typeof(eval('allowDelete')) == "function") {
						if (!allowDelete(ids))
							return;
					}
				} catch (e) {
					// alert("not function");
				}
				if (confirm("是否删除选中记录?")) {
					jQuery.post(_deleteUrl, params, function(data) {
								if ("1" == data) {
									alert("操作成功!");
									jQuery("#tabGrid").jqGrid()
											.trigger('reloadGrid');
								} else if ("-1" == data) {
									alert("操作失败!");
								}
							}, 'text');
				}
			} else {
				alert("请至少选择一条数据进行删除!");
			}
		});

function reload(msg) {
	if ("" != msg) {
		alert(msg);
	}
	refersh();
}

// 刷新
function refersh() {
	jQuery("#tabGrid").jqGrid().trigger('reloadGrid');
}
*/
