//A购物车的位置坐标（以按钮中心作为坐标原点)
var sidebar = document.querySelector('.sidebar');
var dot = document.querySelector('.dot');
var img = document.querySelector('.sidebar > img');
var By = 0;
var Bx = 0;
var Ay = 0;
var Ax = 0;
changesize();
document.querySelector('body').onresize = changesize;

function changesize() {
	sidebar.style.height = window.document.body.clientHeight;
}
var Switch = true; //点击开关
document.querySelector('input').addEventListener('click', function () {

	if (Switch) {
		Switch = false; //动画开始关闭开关
		var a = '',
			b = ''; //抛物线函数
		speed = 10; //动画速度
		Ay = img.offsetTop; //购物车图片的位置
		Ax = sidebar.offsetLeft;
		By = dot.offsetTop; //动画图片的位置
		Bx = dot.offsetLeft;
		var Cy = By - Ay; //第一个坐标点	
		var Cx = Ax - Bx - dot.offsetWidth / 2;
		var Dy = Cy + 40; //第二个坐标点 自选的坐标点 + 40是想抛物线的效果
		var Dx = Cx / 2;
		a = (2 * Dy - Cy) / (2 * Math.pow(Dx, 2) - Math.pow(Cx, 2));
		b = (Cy - Math.pow(Cx, 2) * a) / Cx
		dot.setAttribute('class', 'dot');
		var x = 0;
		clearInterval(timer);
		reset();
		var timer = setInterval(function () {
			if (x < Cx) {
				dot.style.left = x + Bx + 'px';
				dot.style.top = By - (a * Math.pow(x, 2) + b * x) + 'px';
				x = x + speed;
			} else {
				Switch = true; //动画结束打开开关
				clearInterval(timer);
				dot.setAttribute('class', 'dot hidden'); //结束后隐藏dot
				img.setAttribute('class', 'dance'); //img动画
				//回到原来的位置
				reset();
				//购物车的小动画
				setTimeout(function () {
					img.setAttribute('class', ''); //img动画结束
				}, 300);
			}
		}, 8);
	}
}, false);

function reset() {
	dot.style.left = '50%';
	dot.style.MarginLeft = "25px";
	dot.style.top = By + 'px';
}