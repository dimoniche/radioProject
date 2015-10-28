
$(function(){
	var $menu = $("#menu");

	$(window).scroll(function(){
		if ($(this).scrollTop() > 120 && $menu.hasClass("default") ){
			$menu.fadeOut('fast',function(){
				$(this).removeClass("default")
						.addClass("fixed")
						.fadeIn('fast');
			});
		} else if($(this).scrollTop() <= 120 && $menu.hasClass("fixed")){
			$menu.fadeOut('fast',function(){
				$(this).removeClass("fixed")
						.addClass("default")
						.fadeIn('fast');
			});
		}
	});
});