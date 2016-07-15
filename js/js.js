/**
 * Created by XX on 2016/7/13.
 */

(function () {

    var width;   //视口宽度
    var index;    //判断区域位置

    //  改变大小
    function change_size() {
        $("#background_img").css("height",$(window).height())
            .css("width",$(window).width());
        $("#background_shadow").css("height",$(window).height())
            .css("width",$(window).width());
        width = $(window).width();
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
        var height1=[1000,2500,3800,5000];
        var current=$(document).scrollTop();
        for(var i=0;i<4;++i){
            if (current < height1[i]){
                return i;
            }
        }
        if (i==4){
            return 4;
        }
    }

    //  改变背景图片
    function change_bgimg() {
        var bg_img=$("#background_img");
        var current_img = bg_img.attr("src");
        var pos=get_position();
        var change_img = "img/bg"+pos+".jpg";
        if (current_img !== change_img){
            bg_img.fadeTo(400,.8);
            bg_img.attr("src",change_img);
            bg_img.fadeTo(400,1);
        }
    }

    //  点击nav事件
    function click_nav() {
        var height=[1340,2624,4000,5424];
        var index=$(event.target).attr("data-index");
        var current = document.body.scrollTop;
        if(index>=0){
            var temp = height[index];
            var t = 0;
            var step = (current - temp) / 40;
            move(current, t, step);
        }else {
            move(current,0,(current-10)/40);
        }
        event.preventDefault();
    }

    //使用滚动滚轮时自动滚动到相邻位置

    //大致思路：获取开始滚动是所在的position以及滚动条位置，滚动停止时获取所在的position及滚动条位置，
    //判断是否跨越position，若跨越直接跳转到该position的标签，若未跨越，向上滚动则向上跳跃一个，向下滚动则向下跳跃一个
    //目前写上的代码已测试可以正常工作
    function autoScroll(event) {
        var height=[1340,2624,4000,5424];
        var index=get_position();
        var endCurrent = document.body.scrollTop;
        if(event.deltaY < 0){
            //向下滚动
            if (index == 4){
                move(endCurrent,0,(endCurrent-10)/40);
            } else {
                var temp = height[index];
                var step = (endCurrent - temp) / 40;
                move(endCurrent, 0, step);
            }
        }else{
            //向上滚动
            if (index == 1){
                move(endCurrent,0,(endCurrent-10)/40);
            } else if(index == 0) {
                var temp = height[3];
                var step = (endCurrent - temp) / 40;
                move(endCurrent, 0, step);
            } else {
                var temp = height[index-2];
                var step = (endCurrent - temp) / 40;
                move(endCurrent, 0, step);
            }
        }
    }

    // 鼠标拖动滚动条事件
    function autoSearch(change_Y) {
        var height=[1340,2624,4000,5424];
        var endCurrent = document.body.scrollTop;
        console.log(index);
        if(change_Y > 0){
            //向下拖动
            if (index == 4){
                move(endCurrent,0,(endCurrent-10)/40);
            } else {
                var temp = height[index];
                var step = (endCurrent - temp) / 40;
                move(endCurrent, 0, step);
            }
        } else {
            //向上拖动
            if (index - 2 == -1){
                move(endCurrent,0,(endCurrent-10)/40);
            } else if(index - 2 == -2) {
                var temp = height[3];
                var step = (endCurrent - temp) / 40;
                move(endCurrent, 0, step);
            } else {
                var temp = height[index - 2];
                var step = (endCurrent - temp) / 40;
                move(endCurrent, 0, step);
            }
        }
    }

    $(document).ready(function () {
        change_size();
        change_bgimg();
        change_gt();
        add_active();
        window.scrollTo(0, 10);

        //  改变窗口大小事件
        $(window).resize(change_size);

        //  点击nav事件
        $("#nav a").click(click_nav);

        //  鼠标拖动滚动条事件
        var flag = false,
            flag1 = false,
            flag2 = false,
            startY,
            endY;
        $(window).mousedown(function(){
            flag = true;
            startY = event.pageY;
            index=get_position();
        });
        $(window).scroll(function(){
            flag1 = true;
        });
        $(window).mouseup(function(){
            endY = event.pageY;
            if(flag && flag1 &&flag2) autoSearch(endY - startY);
            flag = flag1 = false;
        });
        $(window).mousemove(function () {
            if (event.pageX<width-20){
                flag2=false;
            } else {
                flag2 = true;
            }
        });

        //  鼠标滚轮滚动事件
        $(window).mousewheel(autoScroll);

        //  滚动静止事件
        $(window).bind('scrollstop', function(){
            change_bgimg();
            change_gt();
            add_active();
        });

        // 点击返回顶部事件
        $("#go_top a").click(function () {
            var current = document.body.scrollTop;
            move(current,0,current/40);
            event.preventDefault();
        });
    });
})();


