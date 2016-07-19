var Told = document.querySelector('#Told');
var scale = document.querySelector('#scale');
var RT = document.querySelector('#rotate');

var start = document.querySelector('input:nth-of-type(1)');
var reset = document.querySelector('input:nth-of-type(2)');
var stop = document.querySelector('input:nth-of-type(3)');
var scaleX = document.querySelector('input:nth-of-type(4)');
var scaleY = document.querySelector('input:nth-of-type(5)');
var deg = document.querySelector('input:nth-of-type(6)');

var scalexValue = 1,scaleyValue = 1;	//初始值


var str = '';
var kernel = ['-ms-','-moz-','-webkit-','-o-',''];
for(var i = 0;i < 400;i++){
	str += "<li></li>";
}
Told.innerHTML = str;
var li = document.querySelectorAll('#Told > li');
var len = li.length;
var timer1 = null,timer2 = null;
var x = 0;
start.addEventListener('click',function(){
	if(timer1){
		return false;
	}
	if(timer2){
		clearInterval(timer2);timer2 = null
	}		
	timer1 = setInterval(function(){
		li[x].setAttribute('class','move');
		if(x < len-1){
			x++
		}else{
			clearInterval(timer1);
		}
	},200);
},false);
reset.addEventListener('click',function(){
	if(timer1){
		clearInterval(timer1);timer1= null
	}
	if(timer2){
		return false;
	}
	timer2 = setInterval(function(){
		li[x].setAttribute('class','');
		if(x > 0){
			x--
		}else{
			clearInterval(timer2);
		}
	},200);
},false)
//stop
stop.addEventListener('click',function(){
	if(timer1){
		clearInterval(timer1);timer1= null
	}
	if(timer2){
		clearInterval(timer2);timer2= null
	}
	start.disabled = false;
	reset.disabled = false;
},false);
//调整x轴方向缩放比例
scaleX.addEventListener('change',function(){	
	scalexValue = scaleX.value;
	changeStyle(scalexValue,scaleyValue);
},false)
//调整y轴方向缩放比例
scaleY.addEventListener('change',function(){
	scaleyValue = scaleY.value;
	changeStyle(scalexValue,scaleyValue);
},false);
function changeStyle(xValue,yValue){
	var Mstyle = '';			
	for(var i = 0, len = kernel.length;i < len;i++){
		Mstyle += kernel[i]+'transform: matrix('+ scalexValue +', 0, 0, '+ scaleyValue +', 0, 0);';
	}
	scale.setAttribute('style',Mstyle);
}
//deg旋转
deg.addEventListener('blur',function(){
	var degStyle = '';		
	var cosval = Math.cos(deg.value * Math.PI / 180), sinval = Math.sin(deg.value * Math.PI / 180);
	for(var i = 0, len = kernel.length;i < len;i++){
		degStyle += kernel[i]+'transform:matrix('+ cosval.toFixed(6) +','+ sinval.toFixed(6) +','+ (-1 * sinval).toFixed(6) +','+ cosval.toFixed(6) +',0,0);';
	}
	RT.setAttribute('style',degStyle);
},false);