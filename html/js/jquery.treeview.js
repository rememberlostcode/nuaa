;
(function($) {

	//重写为一个小控件, 删除所有其它插件
	$.extend(
	  $.fn, 
	  {
  		swapClass : 
  		function(c1, c2) {
    			var c1Elements = this.filter('.' + c1);
    			this.filter('.' + c2).removeClass(c2).addClass(c1);
    			c1Elements.removeClass(c1).addClass(c2);
    			return this;
  		},
  		replaceClass : 
  		function(c1, c2) {
  			  return this.filter('.' + c1).removeClass(c1).addClass(c2).end();
  		},
  		hoverClass : 
  		function(className) {
    			className = className || "hover";
    			return this.hover(function() {
    				  $(this).addClass(className);
    			}, function() {
    				  $(this).removeClass(className);
    			});
  		},
  		heightToggle : 
  		function(animated, callback) {
    			animated   
    			?   
    			this.animate( {height : "toggle"}, animated, callback)   
    			:   
    			this.each(
        			function() {
          				jQuery(this)[jQuery(this).is(":hidden") ? "show" : "hide"]();
          				if (callback){
          					  callback.apply(this, arguments);
          				}
        			}
    			);
  		},
  		heightHide : 
  		function(animated, callback) {
    			if (animated) {
      				this.animate( {height : "hide"}, animated, callback);
    			} else {
      				this.hide();
      				if (callback){
      					  this.each(callback);
      				}
    			}
  		},
  		prepareBranches : 
  		function(settings) {
    			if (!settings.prerendered) {      			
        		  this.filter(":last-child:not(ul)").addClass(CLASSES.last);  //标识树上最后一个条目     		  
        		  this.filter(  (settings.collapsed ? "" : "." + CLASSES.closed) + ":not(."+ CLASSES.open + ")"  )
        		      .find(">ul")
        		      .hide();  //折叠整棵树, 或者仅仅那些被标识为closed的, 随意除去那些别标识为open的
    	    }   	    
    	    return this.filter(":has(>ul)");  //返回所有条目，包括子列表
  		},
  		applyClasses : 
  		function(settings, toggler) {
      	  //使用事件代理
      		this.filter(":has(>ul):not(:has(>a))")
          		.find(">span")
          		.unbind("click.treeview")
          		.bind(
          		    "click.treeview", 
          		    function(event) {
             			   //不处理子列表的单击事件, 比如复选框      				
             				 //if (this == event.target){ toggler.apply($(this).next());}     				 
          		  	}
      		    )
      		    .add($("a", this))
      		    .hoverClass();
      
      		if (!settings.prerendered) {        			
        			this.filter(":has(>ul:hidden)").addClass(CLASSES.expandable).replaceClass(CLASSES.last, CLASSES.lastExpandable);  //第一次的时候，处理关闭的那些条目               			
        			this.not(":has(>ul:hidden)").addClass(CLASSES.collapsable).replaceClass(CLASSES.last, CLASSES.lastCollapsable);  //处理打开的那些条目
        
        			//如果不存在，则创建hitarea
        			var hitarea = this.find("div." + CLASSES.hitarea);
        			if (!hitarea.length){
        				  hitarea = this.prepend("<div class=\"" + CLASSES.hitarea + "\"/>").find("div." + CLASSES.hitarea);
        			}
        			hitarea.removeClass().addClass(CLASSES.hitarea).each(
            			function() {
            				var classes = "";
            				$.each(
                				$(this).parent().attr("class").split(" "), 
                				function() {
                					    classes += this + "-hitarea ";
                				}
            				);
            				$(this).addClass(classes);
            			}
        			)
      		}          		
      		this.find("div." + CLASSES.hitarea).click(toggler);  //为hitarea申请事件
  		},
  		treeview : 
  		function(settings) {
      		settings = $.extend( {cookieId : "treeview"}, settings);   
      		if (settings.toggle) {
        			var callback = settings.toggle;
        			settings.toggle = function() {
        				  return callback.apply($(this).parent()[0], arguments);
        			};     			
      		}   
      		var wrapId = $(this).attr("id");
    			if(settings.categoryHover){ 				  
    			    $(this).find("span.category").each(
    			        function(){
    			        	  $(this).mouseover(function(){ 			        
            			        $("#"+wrapId).find("span.now").each(
                				      function(){
                				      	  $(this).removeClass("now");
                				      }
                				  );
            			        $(this).addClass("now");   
            			    });
    			        }   			    
    			    );
    			}  
    			if(settings.categoryClick){ 
    				  var callback = settings.categoryClick;
        			$(this).find("span.category").each(
            			function(){
            				  $(this).bind("click", {id: $(this).attr("id")}, callback);
            			}
        			);
    			}
      		//处理toggle事件
      		function toggler() {
        			$(this).parent()
           					 //替换hitarea的classes
           					 .find(">.hitarea").swapClass(CLASSES.collapsableHitarea,CLASSES.expandableHitarea).swapClass(CLASSES.lastCollapsableHitarea,CLASSES.lastExpandableHitarea).end()
           					 //替换父li的classes
           					 .swapClass(CLASSES.collapsable, CLASSES.expandable).swapClass(CLASSES.lastCollapsable, CLASSES.lastExpandable)
           					 //查找子元素列表
           					 .find(">ul")
           					 //折叠或展开它们
           					 .heightToggle(settings.animated, settings.toggle);
        					
        			if (settings.unique) {
          				$(this).parent().siblings()
            						 //替换hitarea的classes
            						 .find(">.hitarea")
            						 .replaceClass(CLASSES.collapsableHitarea,CLASSES.expandableHitarea)
            						 .replaceClass(CLASSES.lastCollapsableHitarea,CLASSES.lastExpandableHitarea)
            						 .end()
            						 .replaceClass(CLASSES.collapsable, CLASSES.expandable)
            						 .replaceClass(CLASSES.lastCollapsable,CLASSES.lastExpandable)
            						 .find(">ul")
            						 .heightHide(settings.animated, settings.toggle);
        			}
      		}
      		this.data("toggler", toggler);
      
      		function serialize() {
        			function binary(arg) {
        				  return arg ? 1 : 0;
        			}
        			var data = [];
        			branches.each(function(i, e) {
        				  data[i] = $(e).is(":has(>ul:visible)") ? 1 : 0;
        			});
        			$.cookie(settings.cookieId, data.join(""), settings.cookieOptions);
      		}
      
      		function deserialize() {
        			var stored = $.cookie(settings.cookieId);
        			if (stored) {
          				var data = stored.split("");
          				branches.each(function(i, e) {
          					  $(e).find(">ul")[parseInt(data[i]) ? "show" : "hide"]();
          				});
        			}
      		}
       		
      		this.addClass("treeview");  //对活动的styles增加treeview class
            		
      		var branches = this.find("li").prepareBranches(settings);  //准备分支并且查找包含子元素列表的所有树条目
      
      		switch (settings.persist) {
          		case "cookie":
            			var toggleCallback = settings.toggle;
            			settings.toggle = function() {
            				serialize();
            				if (toggleCallback) {
            					  toggleCallback.apply(this, arguments);
            				}
            			};
            			deserialize();
            			break;
          		case "location":
            			var current = this.find("a").filter(function() {
            				  return this.href.toLowerCase() == location.href.toLowerCase();
            			});
            			if (current.length) {             				
              				var items = current.addClass("selected").parents("ul, li").add(current.next()).show();  //更新open/closed classes
              				if (settings.prerendered) {
              					//如果之前是打开的, 复制basic class swapping
              					items.filter("li")
                   					 .swapClass(CLASSES.collapsable,CLASSES.expandable)
                   					 .swapClass(CLASSES.lastCollapsable, CLASSES.lastExpandable)
                   					 .find(">.hitarea")
                   					 .swapClass(CLASSES.collapsableHitarea,CLASSES.expandableHitarea)
                   					 .swapClass(CLASSES.lastCollapsableHitarea,CLASSES.lastExpandableHitarea);
              				}
            			}
            			break;
      		}     
      		branches.applyClasses(settings, toggler);     
      		return this;
  		}
  		
	  }
	);
	
	
	

	$.treeview = {};
	var CLASSES = ($.treeview.classes = {
  		open : "open",
  		closed : "closed",
  		expandable : "expandable",
  		expandableHitarea : "expandable-hitarea",
  		lastExpandableHitarea : "lastExpandable-hitarea",
  		collapsable : "collapsable",
  		collapsableHitarea : "collapsable-hitarea",
  		lastCollapsableHitarea : "lastCollapsable-hitarea",
  		lastCollapsable : "lastCollapsable",
  		lastExpandable : "lastExpandable",
  		last : "last",
  		hitarea : "hitarea"
	});

})(jQuery);