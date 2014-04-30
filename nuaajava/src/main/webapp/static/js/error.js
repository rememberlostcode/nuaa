function daojishi() {
	var before = document.getElementById("second").innerHTML;
	if (before >= 1) {
		document.getElementById("second").innerHTML = before - 1;
	} 
	/*else if (before == 0) {
		window.location = url;
	}*/
}
/*function refresh() {
	try {
		var searchStr = location.search;
		searchStr = searchStr.substr(1);
		var searchs = searchStr.split("&");
		for ( var i = 0; i < searchs.length; i++) {
			var each = searchs[i].split("=");
			var paramName = each[0];
			var paramValue = each[1];
			if (paramName == "goto") {
				window.setInterval(function() {
					daojishi(paramValue);
				}, 1000);
			}
		}
	} catch (e) {
		alert(e.message);
	}
}*/
$(document).ready(function() {
	window.setInterval(function() {
		/*daojishi(location.hostname + ":" + location.port + "/home");*/
		daojishi();
	}, 1000);
});