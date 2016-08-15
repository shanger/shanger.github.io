var body = document.querySelector('body');
var div = document.querySelector('body > div:nth-of-type(1)');
var style = "background-color: #f60;color: white;width: 200px;height: 200px;margin:50px auto;border-radius: 50%;line-height: 200px;text-align: center;";
body.addEventListener('mousemove',function(ev){
	var x = ev.pageX;var y = ev.pageY;
	var D = 0;var move = '';
	if(y < 600){
		if(x > (div.offsetLeft + div.offsetWidth/2)){
			D = Math.floor(3*y/10);	//180deg
		}else{
			D = Math.floor(3*(600-y)/10) + 180;
		}		
		move = "transform: rotate("+D+"deg);-webkit-transform: rotate("+D+"deg);-ms-transform: rotate("+D+"deg);"
  			+"-moz-transform: rotate("+D+"deg);-o-transform: rotate("+D+"deg);";
  		div.style = style + move;
	}
	
},false)