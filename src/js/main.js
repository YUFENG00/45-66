import '../css/main.less';
import $ from 'jquery';
import * as swipe from "./swipe.js";

// 将 onething页面的任务内容 替换为 all 页面的正在进行任务的内容
let doingTask = $("#doingTask").clone();
$("#onething").append(doingTask);

// add 按钮 添加输入框
let addInput = document.createElement("input");
    addInput.setAttribute("class","addInput");
// onething all模块
let foot = document.getElementsByTagName("footer");
$("#all").hide();
foot[0].addEventListener("click", e => {
	//点击 all 隐藏有关模块
   if(e.target.innerHTML == "All") {
   	$("#one-thing").hide();
   	$("#all").show();
   	$(".line-wrapper").show();
   	$(".addInput").remove();
   	$("#done").hide();
   	$("#cancel").hide();
   	$("#confirm").hide();
   	$("#add").show();
   }
   //点击 onething 隐藏相关模块
   else if (e.target.innerHTML == "OneThing") {
   	$("#one-thing").show();
   	$("#all").hide();
   	$("#done").hide();
   	$("#cancel").hide();
   	$("#confirm").hide();
   	$("#add").show();
   }
});


//cancel 按钮 回到onething界面
$("#cancel").click(() => {
	$("#one-thing").show();
	$("#all").hide();
	$("#done").hide();
   	$("#cancel").hide();
   	$("#confirm").hide();
   	$("#add").show();
});

//done cancel confirm 按钮
// add 模块
$("#done").hide();
$("#cancel").hide();
$("#confirm").hide();

// 让克隆得到的节点，每次都赋给不同的变量，不然会覆盖前一次添加的节点
let newTask = new Array(); 
// 添加的节点计数
let flag = 0; 

$("#add").click(() => {
	$("#done").show();
	$("#cancel").show();
    $("#add").hide();
    $("#one-thing").hide();
    $("#all").show();
    $(".line-wrapper").hide();
    $("#all").append(addInput);

    flag++;
    //获取页面的第一个任务节点
	let addTask = document.getElementsByClassName("line-wrapper")[0];
	//深度克隆，为了获得节点上绑定的事件
	newTask[flag] = $(addTask).clone(true);// 为什么不能用 getElementByClassName获取节点？
	// 去掉克隆节点上的 id="doingTask" 便于后判断是否添加到 onething页面
	newTask[flag][0].setAttribute("id","");
// 配置新添加节点的状态 优先级 状态
$(".level-status").click((e) => {
	console.log(newTask[flag]);
	// 用JQ克隆会报错:newTask[flag].getElementByClassname 不是函数
    // JQ对象可以用[index]转换为普通节点
    let imgNode = newTask[flag][0].getElementsByClassName("line-status-img");
    // console.log(imgNode);
    // console.log(e.target.id);
    	switch (e.target.id) {
    		case "high-level":
    			imgNode[0].parentNode.style.background = "#f00";
    			break;
    		case "mid-level":
    			imgNode[0].parentNode.style.background = "#f9f900";
    			break;
            case "low-level":
            	imgNode[0].parentNode.style.background = "#0f0";
            	break;
            case "doing":
                imgNode[0].setAttribute("src","images/45_66_03.png");
                newTask[flag][0].setAttribute("id", "doingTask");
                break;
            case "waiting":
            	imgNode[0].setAttribute("src","images/45_66_08.png");
            	break;
            case "completed":
            	imgNode[0].setAttribute("src","images/45_66_06.png");
            	break;
    	}
// done按钮 添加节点 并回到all界面
$("#done").click(() => {
	// 不允许添加空节点
    if (addInput.value !== null) {
    	let taskContent = newTask[flag][0].getElementsByClassName("line-normal-msg");
    	taskContent[0].innerHTML = addInput.value;
        console.log(newTask[flag]);
    	$("#task-content").append(newTask[flag]);
    	// 正在进行的任务添加到onething页面
    	if (newTask[flag][0].id == "doingTask") {
    		$("#onething").append($(newTask[flag]).clone());
    	}  
    	// 调用模块
    	swipe.lineSwipe();
		$(".line-wrapper").show();
		$("#done").hide();
   		$("#cancel").hide();
   		$("#add").show();
   		$(".addInput").remove();
    }
    else {
    	alert("请输入任务");
    }
});
});
});


// 编辑 删除
$("#task-content").click(e => {
	console.log(e.target);
	let parent = e.target.parentNode.parentNode;

	if (e.target.className == "compile") {
		$(".line-wrapper").hide();
		$("#add").hide();
		$("#confirm").show();
		let complieInput = document.createElement("input");
		complieInput.setAttribute("class","compileInput");
		let taskNode = parent.getElementsByClassName("line-normal-msg");
		complieInput.value = taskNode[0].innerHTML;
		$("#task-content").append(complieInput);
		// add 事件 替换文本 移除编辑模块		
		$("#confirm").click(() => {
			taskNode[0].innerHTML = complieInput.value;
			$(".line-wrapper").show();
			$("#add").show();
			$("#confirm").hide();
			$(".compileInput").remove();	
		})
	}
	// 设置任务的状态
	else if (e.target.className == "del") {
		e.target.parentNode.parentNode.parentNode.remove();
	}
	else if (e.target.className == "complete") {
        let imgNode = parent.getElementsByClassName("line-status-img");
        imgNode[0].setAttribute("src", "images/45_66_06.png");
	}
	else if (e.target.className == "wait") {
        let imgNode = parent.getElementsByClassName("line-status-img");
        imgNode[0].setAttribute("src", "images/45_66_08.png");
	}
	else if (e.target.className == "doing") {
        let imgNode = parent.getElementsByClassName("line-status-img");
        imgNode[0].setAttribute("src", "images/45_66_03.png");
	}
})

