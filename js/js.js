/**
 * Created by XX on 2016/7/13.
 */

(function () {
    //  改变大小
    function change_size() {
        $("#background_img").css("height",$(window).height())
            .css("width",$(window).width());
        $("#background_shadow").css("height",$(window).height())
            .css("width",$(window).width());
    }

    //  移动滚动条
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

    //  改变背景图片
    function change_bgimg(which) {
        $("#background_img").attr("src",which);
    }

    //  改变nav的avtive
    function add_active() {
        var pos = get_position();
        // console.log(pos);
        var a=$("nav a");
        for(i=0;i<4;i++){
            a.eq(i).removeClass("active");
        }
        if (pos > 0){
            a.eq(pos-1).addClass("active");
        }
    }

    //  改变go_top的显示隐藏
    function change_gt() {
        var pos = get_position();
        var gt=$("#go_top");
        if (pos>0){
            gt.fadeIn();
        } else {
            gt.fadeOut();
        }
    }

    //  获取当前所处位置
    function get_position() {
        var oh=$(window).height()*0.3;   //获取margin大小
        var height=[oh*1.5 + 185,oh*2.5+408,oh*3.5+837,oh*4.5+1217];  //各个块的位置
        var current=$(document).scrollTop();
        for(var i=0;i<4;++i){
            if (current<height[i]){
                return i;
            }
        }
        if (i===4){
            return 4;
        }
    }

    //  改变背景图片
    function change_bgimg() {
        var bg_img=$("#background_img");
        var current_img = bg_img.attr("src");
        var pos=get_position()+2;
        var change_img = "img/bg"+pos+".jpg";
        if (current_img !== change_img){
            bg_img.fadeTo(400,.8);
            bg_img.attr("src",change_img);
            bg_img.fadeTo(400,1);
        }
    }

    //  点击nav事件
    function click_nav() {
        //TODO:参数为JQ元素，想要模拟点击对应的a标签元素，多加了一个参数试图让函数更灵活，滚动页面时模拟点击标签
        var target =(arguments[1]) ? arguments[1].attr("href") : $($(event.target).attr("href"));
        var current = document.body.scrollTop;
        if(target!=='#main_content'){
            var temp = target.offset().top-230;
            var t = 0;
            var step = (current - temp) / 40;
            move(current, t, step);
        }else {
            move(current,0,current/40);
        }
        event.preventDefault();
    }

    //使用滚动滚轮时自动滚动到相邻位置

    //大致思路：获取开始滚动是所在的position以及滚动条位置，滚动停止时获取所在的position及滚动条位置，
    //判断是否跨越position，若跨越直接跳转到该position的标签，若未跨越，向上滚动则向上跳跃一个，向下滚动则向下跳跃一个
    //目前写上的代码已测试可以正常工作
    function autoScroll(startCurrent) {
        var endCurrent = document.body.scrollTop;
        if (startCurrent.position == get_position()) {  //当滚动完position未改变时
            if(endCurrent > startCurrent.scroll){
                //TODO：向下滚动，模拟点击下一个标签
            }else{
                //TODO：向上滚动，模拟点击上一个标签
            }
        }else{
            //TODO：模拟点击对应position的标签
        }
    }

    $(document).ready(function () {
        var startCurrent = {position: 0, scroll: 0};    //开始滚动时的滚动条位置
        change_size();
        change_bgimg();
        change_gt();
        $(window).resize(change_size);    //  改变窗口大小事件
        $("#nav a").click(click_nav);       //  点击nav事件
        $(window).scroll(function () {
            add_active();
            change_gt();
        });
        $(window).bind('scrollstart', function () {
            startCurrent.scroll = document.body.scrollTop;
            start.position = get_position();
        });
        $(window).bind('scrollstop', function(){
            change_bgimg();
            autoScroll(startCurrent);
        });
        $("#go_top a").click(function () {
            var current = document.body.scrollTop;
            move(current,0,current/40);
            event.preventDefault();
        })
    });
})();


