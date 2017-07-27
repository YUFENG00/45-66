import '../css/swipe.less';
import $ from 'jquery';
// 滑动事件 
let lineSwipe;
$(document).ready(lineSwipe = function(e) {
    $(".line-wrapper").width($(window).width());
    // 设定每一行的宽度=屏幕宽度+按钮宽度
    $(".line-scroll-wrapper").width($(".line-wrapper").width() + $(".line-btn-delete").width());

    console.log($(".line-scroll-wrapper").width());
    // 设定常规信息区域宽度=屏幕宽度
    $(".line-normal-wrapper").width($(".line-wrapper").width());
    // 设定文字部分宽度（为了实现文字过长时在末尾显示...）
    $(".line-normal-msg").width($(".line-normal-wrapper").width()-100);

    // 获取所有行，对每一行设置监听
    let lines = $(".line-normal-wrapper");
    let len = lines.length; 
    let lastX, lastXForMobile;

    // 用于记录被按下的对象
    let pressedObj;  // 当前滑动的对象
    let lastLeftObj; // 上一个左滑的对象
    let lastRightObj; //上一个右滑的对象

    // 用于记录按下的点
    let start;

    // 网页在移动端运行时的监听
    for (let i = 0; i < len; ++i) {
        lines[i].addEventListener('touchstart', function(e){
            lastXForMobile = e.changedTouches[0].pageX;
            pressedObj = this; // 记录被按下的对象 

            // 记录开始按下时的点
            let touches = event.touches[0];
            start = { 
                x: touches.pageX, // 横坐标
                y: touches.pageY  // 纵坐标
            };
        });

        lines[i].addEventListener('touchmove',function(e){
            // 计算划动过程中x和y的变化量
            let touches = event.touches[0];
            let delta = {
                x: touches.pageX - start.x,
                y: touches.pageY - start.y
            };

            // 横向位移大于纵向位移，阻止纵向滚动
            if (Math.abs(delta.x) > Math.abs(delta.y)) {
                event.preventDefault();
            }
        });

        lines[i].addEventListener('touchend', function(e){
            if ((lastLeftObj && pressedObj != lastLeftObj) 
                || (lastRightObj && pressedObj != lastRightObj)) { // 点击除当前滑动对象之外的任意其他位置
                $(lastLeftObj).animate({marginLeft:"0"}, 500); // 右滑
                lastLeftObj = null; // 清空上一个左滑的对象
                $(lastRightObj).animate({marginLeft:"0"},500);
                lastRightObj = null; //清空上一个右滑对象
            }
            let diffX = e.changedTouches[0].pageX - lastXForMobile;
            let currMarginLeft = parseInt(window.getComputedStyle(pressedObj,null).marginLeft); //获取当前对象的计算样式
            console.log(pressedObj.style.marginLeft);
            console.log(currMarginLeft);
            console.log(diffX);
            if (diffX < -150 && currMarginLeft == 0) {
                $(pressedObj).animate({marginLeft:"-264px"}, 500); // 左滑
                $(lastRightObj).animate({marginLeft:"0"},500);// 已经右滑状态的对象左滑
                lastLeftObj && lastLeftObj != pressedObj && 
                    $(lastLeftObj).animate({marginLeft:"0"}, 500); // 已经左滑状态的对象右滑
                lastLeftObj = pressedObj; // 记录上一个左滑的对象
            } 
            else if (diffX < -150 && currMarginLeft == 396) {
                if (pressedObj == lastRightObj) {
                    $(pressedObj).animate({marginLeft:"0"},500);
                    lastRightObj = null;
                }
            }
            else if (diffX > 150 && currMarginLeft == 264) {
              if (pressedObj == lastLeftObj) {
                $(pressedObj).animate({marginLeft:"0"}, 500); // 右滑
                lastLeftObj = null; // 清空上一个左滑的对象
              }
            }
            else if (diffX > 150 && currMarginLeft == 0) {
                $(pressedObj).animate({marginLeft:"396px"},500); // 右滑
                $(lastLeftObj).animate({marginLeft:"0"},500); // 已经左滑状态的对象右滑
                lastRightObj && lastRightObj != pressedObj && 
                    $(lastRightObj).animate({marginLeft:"0"},500); // 已经右滑状态的对象左滑
                lastRightObj = pressedObj; // 清空上一个右滑的对象
            }
        });
    }

//     // 网页在PC浏览器中运行时的监听
//     for (var i = 0; i < len; ++i) {
//         $(lines[i]).bind('mousedown', function(e){
//             lastX = e.clientX;
//             pressedObj = this; // 记录被按下的对象
//         });

//         $(lines[i]).bind('mouseup', function(e){
//             if (lastLeftObj && pressedObj != lastLeftObj) { // 点击除当前左滑对象之外的任意其他位置
//                 $(lastLeftObj).animate({marginLeft:"0"}, 500); // 右滑
//                 lastLeftObj = null; // 清空上一个左滑的对象
//             }
//             var diffX = e.clientX - lastX;
//             if (diffX < -150) {
//                 $(pressedObj).animate({marginLeft:"-264px"}, 500); // 左滑
//                 lastLeftObj && lastLeftObj != pressedObj && 
//                     $(lastLeftObj).animate({marginLeft:"0"}, 500); // 已经左滑状态的按钮右滑
//                 lastLeftObj = pressedObj; // 记录上一个左滑的对象
//             } else if (diffX > 150) {
//               if (pressedObj == lastLeftObj) {
//                 $(pressedObj).animate({marginLeft:"0"}, 500); // 右滑
//                 lastLeftObj = null; // 清空上一个左滑的对象
//               }
//             }
//         });
//     }
});
// console.log(lineSwipe);
export {lineSwipe};