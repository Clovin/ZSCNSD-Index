/**
 * Created by XX && Lunzi on 2016/7/13.
 */

//  改变背景的大小
function change_bgsize() {
	$("#background_img").css("height",$(window).height())
							  .css("width",$(window).width());
	$("#background_shadow").css("height",$(window).height())
							  .css("width",$(window).width());
}

$(document).ready(function () {
	change_bgsize();
	$(window).resize(change_bgsize);
});


