
function validMaxLength(method,maxlength){
	if(maxlength!=null && maxlength!=""){
		jQuery.validator.addMethod(method, function(value, element) {
			var flag = true;
			var val=jQuery.trim(value);
			var valLength=getStrLength(val);
			if(maxlength!=null && maxlength!=""){
				if(valLength>maxlength)
					flag = false;
			}
			jQuery(element).val(val);
			return flag;
		}, jQuery.validator.format("长度不能超过"+(maxlength/2)+"个中文或"+maxlength+"个英文！"));
	}
}

function validMinLength(method,minlength){
	if(minlength!=null && minlength!=""){
		jQuery.validator.addMethod(method, function(value, element) {
			var flag = true;
			var val=jQuery.trim(value);
			var valLength=getStrLength(val);
			if(minlength!=null && minlength!=""){
				if(valLength<minlength)
					flag = false;
			}
			jQuery(element).val(val);
			return flag;
		}, jQuery.validator.format("长度不能小于"+(minlength/2)+"个中文或"+minlength+"个英文！"));
	}
}

function validRangeLength(method,rangelength){
	if(rangelength!=null && rangelength!=""){
		jQuery.validator.addMethod(method, function(value, element) {
			var flag = true;
			var val=jQuery.trim(value);
			var valLength=getStrLength(val);
			if(rangelength!=null && rangelength!=""){
				if(valLength<rangelength[0] || valLength>rangelength[1])
					flag = false;
			}
			jQuery(element).val(val);
			return flag;
		}, jQuery.validator.format("长度介于["+(rangelength[0]/2)+","+(rangelength[1]/2)+"]之间的中文或["+rangelength[0]+","+rangelength[1]+"]之间的英文！"));
	}
}


/**
 * @author robin 自定义创建验证方法
 * 
 * @param method 校验方法名
 * @param maxlength 字符串最大长度
 * @param minlength 字符串最小长度
 * @param rangelength 字符串长度范围 如：[10,50]
 * @param max 最大值
 * @param min 最小值
 * @param range 值范围 如：[10,50]
 * @param message 错误提示信息
 */
function createMethod(method,maxlength,minlength,rangelength,max,min,range,message){
	
	validMaxLength("validMaxLength",maxlength);
	validMinLength("validMinLength",minlength)
	validRangeLength("validRangeLength",rangelength)
	
	jQuery.validator.addMethod(method, function(value, element) {
		var flag = false;
		var val=jQuery.trim(value);
		if(val.length>0){
			flag=true;
		}
		if(maxlength!=null && maxlength!="")
			jQuery(element).attr("validMaxLength",maxlength);
		if(minlength!=null && minlength!="")
			jQuery(element).attr("validMinLength",minlength);
		if(rangelength!=null && rangelength!="")
			jQuery(element).attr("validRangeLength",rangelength);
		if(max!=null && max!="")
			jQuery(element).attr("max",max);
		if(min!=null && min!="")
			jQuery(element).attr("min",min);
		if(range!=null && range!="")
			jQuery(element).attr("range",range);
		jQuery(element).val(val);
		return flag;
	}, message);
}