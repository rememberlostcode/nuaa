jQuery(document).ready(function() {
	navLeftClickBind();
});

function navLeftClickBind() {
	var navs = $("div[nav=true]");
	navs.each(function() {
		$(this).bind(
				{
					"click" : function() {
						var id = $(this).attr("id");
						var navdetails = $("div[navdetail=true]");
						navdetails.each(function() {
							$(this).css("display", "none");
						});

						var navdetailnow = $("div[navdetail=true][id=" + id
								+ "detail]");
						navdetailnow.css("display", "block");
						

						navs.each(function() {
							$(this).removeClass("now");
						});
						if($(this).parent().hasClass("first")){
							$(this).addClass("now");
						}else{
							$(this).parent().parent().prev().addClass("now");
						}					
					}
				});
	});
}