
/**
<!--弹出框-->
<!---openUrl弹出框对应路径'url:http://www.baidu.com' 必填---->
<!---title弹出框对题目如某某弹出框 必填---->
<!---Id弹出框对应按键或路径的iD:  <a href="#"  id="szsxz">设置属性值 </a> 必填---->
<!---width弹出框宽  必填---->
<!---height弹出框高    必填 ---->
<!---lock弹出框是否锁屏    默认锁屏ture值 ---->
<!---max弹出框是否最大    默认没有最大false值 ---->
<!---min弹出框是否最小    默认没有最小false值 ---->
<!---ok 调用外部方法---->
*/
function openNewWindow(openUrl,title,id,width,height,max,min,lock,ok){
	if(ok!=null && ok!=""){
		jQuery.dialog({
			id:id,
			title: title,
			width: width, 
			height: height,
			max:max,
		     min: min,
		    lock: lock,
		    content: openUrl,
			ok: ok,
			cancelVal: '取消',
		    cancel: true
		}); 
	}else{
		jQuery.dialog({
			id:id,
			title: title,
			width: width, 
			height: height,
			max:max,
		     min: min,
		    lock: lock,
		    content: openUrl,
			cancelVal: '取消',
		    cancel: true
		}); 
	}
}

/**
 * 弹出子框
<!---openUrl弹出框对应路径'url:http://www.baidu.com' 必填---->
<!---title弹出框对题目如某某弹出框 必填---->
<!---Id弹出框对应按键或路径的iD:  <a href="#"  id="szsxz">设置属性值 </a> 必填---->
<!---width弹出框宽  必填---->
<!---height弹出框高    必填 ---->
<!---lock弹出框是否锁屏    默认锁屏ture值 ---->
<!---max弹出框是否最大    默认没有最大false值 ---->
<!---min弹出框是否最小    默认没有最小false值 ---->
<!---ok 调用外部方法---->
 */
function openChildDialog(openUrl,title,id,width,height,max,min,lock,ok){
	var api = frameElement.api, W = api.opener;
	if(ok!=null && ok!=""){
		W.$.dialog({
			id:id,
			title: title,
	    	width: width, 
	    	height: height,
	    	max:max,
	        min: min,
	        lock: lock,
	    	content: openUrl, 
			parent:api,
			ok:ok,
			cancelVal: '取消',
		    cancel: true
		}); 
	}else{
		W.$.dialog({
			id:id,
			title: title,
	    	width: width, 
	    	height: height,
	    	max:max,
	        min: min,
	        lock: lock,
	    	content: openUrl, 
			parent:api,
			cancelVal: '取消',
		    cancel: true
		}); 
	}
}
			