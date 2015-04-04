(function(window,$){
	$("html,body").css("scrollTop",0)
	var w = $(window)
	var body = $("body")
	var els = {
		first: $("#first .wrap"),
		second: $("#second .wrap"),
		third: $("#third .wrap"),
		main: $("main"),
		logitems: $("#second .logitem")
	}
	// $("body").click(function(){
	// 	$(".wrap figure").each(function(){$(this).removeClass("active top").css("zIndex",$(this).data("zindex"))})
	// })
	$(".wrap figure").on("click",function(e){
		var el = $(this)
		$(".wrap figure").each(function(){$(this).removeClass("active top")})//.css("zIndex",$(this).data("zindex"))
		$(this).addClass("active top")//.css("zIndex",el.data("zindex")+1)
	})

	$("#menu-toggle").on("click",function(){
		$("body").toggleClass("active-menu")
	})

	$(".mailtoemail").attr("href","mailto:hello@"+"samuel"+"delesque.me?subject=Awesome work!");

	var itemWidth = els.first.find("figure").outerWidth()-140,
	o1 = els.first.find("figure").length * itemWidth - w.width() + 1200,
	o2 = o1 + els.second.height()
	o3 = o2 + els.third.height()
	var limits = {
		first: o1,
		second: o2,
		third: o3,
	}
	var progressBars = {
		first: els.first.siblings(".progress")
	}
	console.log("Limits",limits)
	w.scroll(function(e){
		var top = w.scrollTop();
		if(top < limits.first){
			var percentDone = top/limits.first*100
			progressBars.first.css({width:percentDone+"%"});
			els.first.css({left:-top});
			els.main.css({top:0});
		}
		else{
			progressBars.first.css({width:"100%"})
			els.first.css({left:-limits.first})
			els.main.css({top:-(top-limits.first)})
		}
		if(top < limits.second + w.height() && top > limits.first){
			var l = -(limits.second-top) / (els.second.height()-2000) * 2000 - 1600
			var opacity = (500 - l)
			console.log(l)
			els.logitems.each(function(e,i){
				$(this).css("left",Math.max(0,l + (250 * $(this).index())))
			})
		}
		else if(top > limits.second){
			els.logitems.css("left",0)
		}
		else{
			els.logitems.css("left",2000)
		}

		if(top > limits.third){
			var t = (top - limits.third) / 2;
			console.log(t,top,limits.third);
			els.third.css({top:t});
		}

		body.css("background-position","0 "+(-top/1.25)+"px")
	});
	var count = $("main figure").length;
	
	w.on("resize",function(){
		body.css("height", 5600 + els.second.height() + els.third.height());
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