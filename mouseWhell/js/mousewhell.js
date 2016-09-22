document.body.addEventListener('mousewheel',scroll,false);
document.body.addEventListener('DOMMouseScroll',scroll,false);
var i = 0;
var open = true;
function scroll(event){
	if(open){
		open = false;
		if(event.type == "mousewheel" || event.type == "DOMMouseScroll"){	
			event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
			if(event.delta < 0){	//向上翻滚
				if(i < 3){
					i++;
					handle(i);
				}
			}else{
				if(i > 0){
					i--;
					handle(i);
				}
			}
		}
		setTimeout(function(){open = true;},1000);//动画时间		
	}
	
}
function handle(Current){
	var ul = document.querySelector('ul.list');
	var dotLi = document.querySelectorAll('ul.dot > li');
	ul.style.top = - Current*100 + '%';
	for(var index = 0; index < dotLi.length;index++){
		dotLi[index].setAttribute('class','');
	}
	dotLi[Current].setAttribute('class','active');
}

var input1 = document.querySelector('#test1');
var input = document.querySelector('#test');
input1.addEventListener('focus',function(event){
	input.focus();
});
input1.addEventListener('blur',function(event){
	input.blur();
});
input1.addEventListener('keyup',function(event){
	input.value = replace(input1.value);
});
function replace(str){
	var newstr = '';
	for(i=0;i<str.length-1;i++){
	  newstr += '*';
	}
	newstr += str.charAt(str.length-1);
	return newstr;
}