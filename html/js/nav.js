	function scroll(box,left,right,img,speed,or)
	{ 
		var box = $(box);
		var left = $(left);
		var right = $(right);
		var img = $(img).find('ul');
		var w = img.find('li').outerWidth(true);
		var s = speed;
		left.click(function()
		{
			img.animate({'margin-left':-w},function()
			{
				img.find('li').eq(0).appendTo(img);
				img.css({'margin-left':0});
			});
		});
		right.click(function()
		{
			img.find('li:last').prependTo(img);
			img.css({'margin-left':-w});
			img.animate({'margin-left':0});
		});
		if (or == true)
		{
			ad = setInterval(function() { right.click();},s*1000);
			box.hover(function(){clearInterval(ad);},function(){ad = setInterval(function() { right.click();},s*1000);});
		}
	}
	scroll(".navframe_01",".navframe_02left",".navframe_02right",".navframe_01",3,false);	