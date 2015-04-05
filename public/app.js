(function(window,$){
	$("html,body").css("scrollTop",0)
	var w = $(window)
	var body = $("body")
	var els = {
		intro: $("#intro"),
		introTitle: $("#intro h3"),
		first: $("#first .wrap"),
		second: $("#second .wrap"),
		third: $("#third .wrap"),
		main: $("main"),
		marker: $(".marker"),
		logitems: $("#second .logitem"),
		menuToggle: $("#menu-toggle")
	}

	els.menuToggle.on("click",function(){
		body.toggleClass("active-menu")
	})

	$(".mailtoemail").attr("href","mailto:hello@"+"samuel"+"delesque.me?subject=Awesome work!")

	var itemWidth = els.first.find("figure").outerWidth(true,true)-140,
		introHeight = els.first.offset().top - 50,
		limits = {},
		progressBar = els.first.siblings(".progress")

	limits.first = els.first.find("figure").length * itemWidth - w.width() + 900
	limits.second = limits.first + els.second.height()
	limits.third = limits.second + els.third.height()

	w.scroll(function(e){
		var top = w.scrollTop();
		if(top < introHeight){
			els.main.css({top:-(top)})
			progressBar.css({width:0})
			var shadowTop = top/introHeight*30
			els.introTitle.css("text-shadow","10px "+(-10+shadowTop)+"px 0 #000")
		}
		else if(top < limits.first){
			var percentDone = (top-introHeight)/(limits.first-introHeight)*100
			progressBar.css({width:percentDone+"%"});
			els.first.css({left:-(top-introHeight)});
			els.main.css({top:-introHeight});
		}
		else{
			progressBar.css({width:"100%"})
			els.first.css({left:-limits.first+introHeight})
			els.main.css({top:-(top-limits.first)-introHeight})
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