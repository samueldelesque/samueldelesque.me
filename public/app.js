(function(window,$){
	$("html,body").css("scrollTop",0)
	var w = $(window)
	var els = {
		first: $("#first .wrap"),
		second: $("#second .wrap"),
		main: $("main"),
	}
	// $("body").click(function(){
	// 	$(".wrap figure").each(function(){$(this).removeClass("active top").css("zIndex",$(this).data("zindex"))})
	// })
	$(".wrap figure").on("click",function(e){
		var el = $(this)
		$(".wrap figure").each(function(){$(this).removeClass("active top")})//.css("zIndex",$(this).data("zindex"))
		$(this).addClass("active top")//.css("zIndex",el.data("zindex")+1)
	})

	var itemWidth = els.first.find("figure").outerWidth()-140,
	o1 = els.first.find("figure").length * itemWidth - w.width() + 1200,
	o2 = o1 + 1000
	var limits = {
		first: o1,
		second: o2,
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
	});
	var count = $("main figure").length;
	$("body").css("height",(count * itemWidth + 5000));
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