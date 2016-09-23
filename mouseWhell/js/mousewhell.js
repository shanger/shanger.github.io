
function IScroll(data){
	var This = this;
	this.List = data.list;	//列表
	this.Dot = data.dot;
	this.DotLi = data.dotLi;	//小点点
	this.startIndex = 0;	//起始位置
	this.open = true;		//连续滚动的开关
	this.handle = function(Current){
		var ul = This.List;
		var dotLi = This.DotLi;
		ul.style.top = - Current*100 + '%';
		for(var index = 0; index < dotLi.length;index++){
			dotLi[index].setAttribute('class','');
		}
		dotLi[Current].setAttribute('class','active');
	};
	this.Dot.addEventListener('click',function(event){
		if(event.target.nodeName.toUpperCase() == 'LI'){
			This.handle(parseInt(event.target.getAttribute('dataIndex')) );
		}
	},false)
	document.body.addEventListener('mousewheel',scroll,false);
	document.body.addEventListener('DOMMouseScroll',scroll,false);
	function scroll(event){
		if(This.open){
			This.open = false;
			if(event.type == "mousewheel" || event.type == "DOMMouseScroll"){	
				event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
				if(event.delta < 0){	//向上翻滚
					if(This.startIndex < 3){
						This.startIndex++;
						This.handle(This.startIndex);
					}
				}else{
					if(This.startIndex > 0){
						This.startIndex--;
						This.handle(This.startIndex);
					}
				}
			}
			setTimeout(function(){This.open = true;},1000);//动画时间		
		}		
	} 	
}

IScroll({
	list:document.querySelector('ul.list'),
	dot:document.querySelector('ul.dot'),
	dotLi:document.querySelectorAll('ul.dot > li')
})


var input1 = document.querySelector('#test1');
var input = document.querySelector('#test');
input1.addEventListener('focus',function(event){
	document.querySelector('ul.list > li >div>#test >span').setAttribute('class','focus');
});
input1.addEventListener('blur',function(event){
	document.querySelector('ul.list > li >div>#test >span').setAttribute('class','');
});
input1.addEventListener('keyup',function(event){
	input.innerHTML = replace(input1.value) +'<span class="focus"></span>';
});
function replace(str){
	var newstr = '';
	for(i=0;i<str.length-1;i++){
	  newstr += '*';
	}
	newstr += str.charAt(str.length-1);
	return newstr;
}

/*polymerAnimate*/

function polymerAnimate(data){
	var This = this;
	this.parent = data.parent;	
	this.parent.addEventListener('click',function(event){
		var speed = 20;
		var top = 0,left = 0;
		var child = document.createElement('div');
		child.setAttribute('class','circle');
		left = event.clientX - This.parent.offsetLeft - child.offsetWidth/2;
		top = event.clientY - This.parent.offsetTop - child.offsetWidth/2;
		This.parent.appendChild(child);
		child.setAttribute('class','circle grident');		
		child.style.top = top + 'px';
		child.style.left = left + 'px';
		var Timer = setInterval(function(){
			child.style.width = child.offsetWidth + speed + 'px';
			child.style.height = child.offsetHeight + speed + 'px';
			child.style.top  = child.offsetTop - speed/2 + 'px';
			child.style.left  = child.offsetLeft - speed/2 + 'px';
			if(child.offsetWidth > 400){
				clearInterval(Timer);
				This.parent.removeChild(child);
			}
		},30)
	},false)

}
polymerAnimate(
	{
		parent:document.querySelector('#polymerAnimate'),
	}
);
