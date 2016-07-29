var sidebar = document.querySelector('.sidebar');
var dot = document.querySelector('.dot');
var By = dot.offsetTop;
var Bx = dot.offsetLeft;
changesize();
document.querySelector('body').onresize = changesize;


function changesize(){
	sidebar.style.height = window.document.body.clientHeight;
	By = dot.offsetTop;
	Bx = dot.offsetLeft;
}
var Switch = true;	//点击开关
document.querySelector('input').addEventListener('click',function(){
	//A购物车的位置坐标（以按钮中心作为坐标原点)
	if(Switch){
		Switch = false;
		var a = '',b = '';	
		var img = document.querySelector('.sidebar > img');
		var Ay = img.offsetTop;
		var Ax = document.querySelector('.sidebar').offsetLeft;	
		var Cy = By - Ay;
		var Cx = Ax - Bx - document.querySelector('.dot').offsetWidth/2;
		var Dy = Cy + 40;	//第二个点
		var Dx = Cx/2;
		a = ( 2*Dy-Cy )/( 2*Math.pow(Dx,2) - Math.pow(Cx,2) );
		b = ( Cy - Math.pow(Cx,2)*a)/Cx
		dot.setAttribute('class','dot')
		var x = 0;
		clearInterval(timer);
		dot.style.left =  Bx + 'px';	
		dot.style.top =  By + 'px';
		var timer = setInterval(function(){
			if(x <  Cx){
				dot.style.left = x + Bx + 'px';
				dot.style.top =  By - (a*Math.pow(x,2) + b*x) + 'px';
				x = x + 10;
			}else{
				Switch = true;
				clearInterval(timer);
				dot.setAttribute('class','dot hidden');
				img.setAttribute('class','dance');
				//回到原来的位置
				dot.style.left =  Bx + 'px';	
				dot.style.top =  By + 'px';
				//购物车的小动画
				setTimeout(function(){
					img.setAttribute('class','');
				},300);
			}		
		},8);
	}
	

},false)
