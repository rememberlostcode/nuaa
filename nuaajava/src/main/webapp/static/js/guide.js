function showGuide(obj) {
	try {
		if (obj.css("display") == "none") {
			obj.css("visibility","");
			obj.css("display","");
			obj.show();
		}
		var id = $(obj).attr("id");

		var loc = window.location.href;
		var ind = loc.lastIndexOf("#");
		if (ind != -1) {
			var idExist = loc.substring(ind, loc.length);
			if (idExist != id) {
				window.location = loc.substring(0, ind) + "#" + id;
			}
		} else {
			window.location = window.location + "#" + id;
		}
	} catch (e) {
		//alert(e.message);
	}
}

function hideGuide(obj) {
	var div = $(obj).parent();
	var id = div.attr("id");
	$("#" + id).css({
		"visibility" : "hidden",
		"display" : "none"
	});
	noGuide(obj);
	nextGuide(div);
}
function noGuide(obj) {
	var div = $(obj).parent();
	var id = div.attr("id");
	var checked = div.find("input[type=checkbox]").is(':checked');
	if (checked) {
		SetCookie("guideNeverShow_" + id, "no", {
			expires : 37230
		});
	}
}

function nextGuide(obj) {
	var flag = false;
	var guides = $("[guide=true]");
	guides.each(function() {
		try{
			var id = $(this).attr("id");
			var objId = $(obj).attr("id");
			if(id == objId){
				flag = true;
			}
			if (flag == true && id != null && objId != null && id != objId) {
				var guideNeverShow = GetCookie("guideNeverShow_" + id);
				if (guideNeverShow != "no") {
					showGuide($(this));
					return false;
				}
			}
		}catch(e){
			alert(e.message);
		}
	});
}

function GetCookie(name) {
	var arr = document.cookie
			.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null) {
		var val = decodeURIComponent(arr[2]);
		return val;
	}
	return null;
}

function SetCookie(name, value, options) {
	var expires = '', path = '', domain = '', secure = '';
	if (options) {
		if (options.expires
				&& (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var exp;
			if (typeof options.expires == 'number') {
				exp = new Date();
				exp.setTime(exp.getTime() + options.expires * 24 * 60 * 60
						* 1000);
			} else {
				exp = options.expires;
			}
			expires = ';expires=' + exp.toUTCString();
		}
		path = options.path ? '; path=' + options.path : '';
		domain = options.domain ? ';domain=' + options.domain : '';
		secure = options.secure ? ';secure' : '';
	}
	document.cookie = [ name, '=', encodeURIComponent(value), expires, path,
			domain, secure ].join('');
}