(function(window,$){
	$("html,body").css("scrollTop",0)
	var w = $(window),
		body = $("body"),
        eadReceived = new Date('2015-04-24').getTime();
		els = {
			intro: $("#intro"),
            ead: $("#ead"),
			introTitle: $("#intro h3"),
			first: $("#first"),
			second: $("#second"),
			third: $("#third"),
			main: $("main"),
			marker: $(".marker"),
			logitems: $("#first .logitem"),
			menuToggle: $("#menu-toggle"),
			book: $(".book"),
			page: $(".book figure"),
			projects: $(".project")
		}

	els.menuToggle.on("click",function(){
		body.toggleClass("active-menu")
	})

    var updateEAD = setInterval(function(){
        els.ead.html(Math.round((new Date().getTime() - eadReceived) / 1000 / 86400)+" days")
    }, 100)

	var itemWidth,progressBar,mobileFolioWidth,mobileFolioOffset

	w.on("resize",function(){
		itemWidth = els.second.find("figure").outerWidth(true,true)-140,
		progressBar = els.second.find(".wrap").siblings(".progress"),
		mobileFolioWidth = els.second.find("figure").length * itemWidth - 500,
		mobileFolioOffset = els.second.offset().top

		if(w.width() < 800){
			body.css("height","auto")
		}
		else{
			body.css("height", mobileFolioOffset + mobileFolioWidth + els.third.outerHeight(true,true) + 1300)
		}
	})
	w.trigger("resize")

	w.scroll(function(e){
		if(w.width() < 800)return;

		var top = w.scrollTop();

		if(top < mobileFolioOffset){
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
	})
	w.trigger("scroll")

	var count = $("main figure").length;


	var l = 300;
	$("main figure").each(function(i,e){
		var zindex = count - i,
			el = $(this)
		el.css({
			zIndex: zindex
		}).data({
			zindex: zindex
		})
		setTimeout(function(){el.addClass("show")}, 200 + (i * 100))
	});
	setTimeout(function(){
		els.first.addClass("ready")
	}, count * 100 + 200)

	els.projects.on("click",function(e){
		console.log($(this));
		window.open($(this).find("a").attr("href"))
	})

	$("#pay").on("click",function(e){$("#payment").fadeIn()})
	$("#payment").on("click",function(){$("#payment").fadeOut()})
	$("#payment .inner").on("click",function(e){e.stopPropagation()})
	$(".mailtoemail").attr("href","mailto:hello@"+"samuel"+"delesque.me?subject=Awesome work!")
})(window,jQuery)
