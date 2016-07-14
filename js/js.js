/**
 * Created by XX on 2016/7/13.
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
	} else {
		add_active();
	}
}

//改变背景图片
function change_bgimg(which) {
	$("#background_img").attr("src",which);
}

//改变nav的avtive
function add_active() {
	var pos = get_position();
	console.log(pos);
	var a=$("nav a");
	for(i=0;i<4;i++){
		a.eq(i).removeClass("active");
	}
	if (pos!==-1){
		a.eq(pos).addClass("active");
	}
}

//获取当前所处位置
function get_position() {
	// var offset_width=$(window).width();
	var oh=$(window).height()*0.3;   //获取margin大小
	var height=[oh*1.5 + 185,oh*2.5+408,oh*3.5+837,oh*4.5+1217];  //各个块的位置
	var current=$(document).scrollTop();
	for(var i=0;i<4;++i){
		if (current<height[i]){
			return i-1;
		}
	}
	if (i===4){
		return 3;
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


