(function(window,$){
	$("html,body").css("scrollTop",0)
	var w = $(window)
	var body = $("body")
	var els = {
		intro: $("#intro"),
		introTitle: $("#intro h3"),
		first: $("#first"),
		second: $("#second"),
		third: $("#third"),
		main: $("main"),
		marker: $(".marker"),
		logitems: $("#first .logitem"),
		menuToggle: $("#menu-toggle")
	}

	els.menuToggle.on("click",function(){
		body.toggleClass("active-menu")
	})

	$(".mailtoemail").attr("href","mailto:hello@"+"samuel"+"delesque.me?subject=Awesome work!")

	var itemWidth = els.second.find("figure").outerWidth(true,true)-140,
		progressBar = els.second.find(".wrap").siblings(".progress"),
		mobileFolioWidth = els.second.find("figure").length * itemWidth - 500,
		mobileFolioOffset = els.second.offset().top


	w.scroll(function(e){
		if(w.width() < 640) return;

		var top = w.scrollTop();

		if(top < els.second.offset().top){
			els.second.find(".wrap").css("margin-left",0)
			els.main.css({top:-top})
			progressBar.css({width:"0%"})
		}
		else if(top > mobileFolioOffset && top < mobileFolioOffset + mobileFolioWidth){
			var done = (top-mobileFolioOffset)/mobileFolioWidth * 100
			els.second.find(".wrap").css("margin-left",-(top-mobileFolioOffset))
			els.main.css({top:-mobileFolioOffset})
			progressBar.css({width:done+"%"})
		}
		else{
			els.second.find(".wrap").css("margin-left",-mobileFolioWidth)
			els.main.css({top:-(top-mobileFolioWidth)})
			progressBar.css({width:"100%"})
		}

		// body.css("background-position","0 "+(-top/1.25)+"px")
	});
	var count = $("main figure").length;
	
	w.on("resize",function(){
		if(w.width() < 640) body.css("height","auto")
		else body.css("height", mobileFolioOffset + mobileFolioWidth + els.third.outerHeight(true,true) + 150);
	})
	w.trigger("resize")

	var l = 300;
	$("main figure").each(function(i,e){
		var zindex = count - i
		var el = $(this)
		el.css({
			// left: l + (i * l),
			zIndex: zindex
		}).data({
			zindex: zindex
		})
		setTimeout(function(){el.addClass("show")}, 200 + (i * 100))
	});
	setTimeout(function(){
		$("main #first").addClass("ready");
	}, count * 100 + 200);
	w.trigger("scroll");

	$("#pay").on("click",function(e){$("#payment").fadeIn();});
	$("#payment").on("click",function(){$("#payment").fadeOut();});
	$("#payment .inner").on("click",function(e){e.stopPropagation();});
})(window,jQuery)