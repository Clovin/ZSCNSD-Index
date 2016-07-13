/**
 * Created by XX && Lunzi on 2016/7/13.
 */

//  改变大小
function change_size() {
	$("#background_img").css("height",$(window).height())
							  .css("width",$(window).width());
	$("#background_shadow").css("height",$(window).height())
							  .css("width",$(window).width());
}

//移动滚动条
function move(current, t, step) {
	if (t < 40) {
		setTimeout(function () {
			window.scrollTo(0, current - step);
			++t;
			current = current - step;
			move(current, t, step);
		}, 12.5);
	}
}

//点击nav事件
function click_nav() {
	var target = $($(event.target).attr("href"));
	var temp = target.offset().top-230;
	var current = document.body.scrollTop;
	var t = 0;
	var step = (current - temp) / 40;
	move(current, t, step);
	event.preventDefault();
}

$(document).ready(function () {
	change_size();
	$(window).resize(change_size);    //改变窗口大小事件
	$("nav a").click(click_nav);       //点击nav事件
	$("#nav>a").click(function () {   //点击LOGO事件
		var current = document.body.scrollTop;
		move(current,0,current / 40);
		event.preventDefault();
	});
});


