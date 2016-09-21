document.body.addEventListener('mousewheel',scroll,false);
document.body.addEventListener('DOMMouseScroll',scroll,false);
var i = 0;
function scroll(event){
	
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