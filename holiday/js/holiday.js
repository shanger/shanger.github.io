//document.querySelector('.body').style.width = document.documentElement.clientWidth + 'px';
//document.querySelector('.body').style.backgroundImage = 'url(img/shanghai.jpg)';
var thisOS=navigator.platform;
var os=new Array("iPhone","iPod","iPad","android","Nokia","SymbianOS","Symbian","Windows Phone","Phone","Linux armv7l","MAUI","UNTRUSTED/1.0","Windows CE","BlackBerry","IEMobile");
for(var i=0;i<os.length;i++)
{

if(thisOS.match(os[i]))
{   
    document.querySelector('.body').style.width = document.documentElement.clientWidth + 'px';
    document.querySelector('.body').style.backgroundImage = "http://odqxl7d3r.bkt.clouddn.com/shanghai.jpg";
}
}
/*mobile*/
(function(){ 
    var LSwiperMaker = function(o){  
        var that = this;
        this.config = o;    //传入的参数
        this.control = false;
        this.sPos = {};     //开始移动的坐标
        this.mPos = {};     //移动时的坐标
        this.dire;          //移动的方向
        this.tolerance = 40;//容差大小 毕竟触屏很难画直线
                            //移动各个时间的事件监听
        this.config.bind.addEventListener('touchstart', function(e){ return that.start(e); } ,false);
        this.config.bind.addEventListener('touchmove', function(e){ return that.move(e); } ,false);
        this.config.bind.addEventListener('touchend', function(e){ return that.end(e); } ,false);
 
    }
 
    LSwiperMaker.prototype.start = function(e){         
         var point = e.touches ? e.touches[0] : e;
         this.sPos.x = point.screenX;
         this.sPos.y = point.screenY; 
    }
    LSwiperMaker.prototype.move = function(e){  
 
        var point = e.touches ? e.touches[0] : e;
        this.control = true;
        this.mPos.x = point.screenX;
        this.mPos.y = point.screenY;
 
    }
    //touchEnd 时通过移动的位置来判断方向
    LSwiperMaker.prototype.end = function(e){

        if(this.config.dire_h){
        	if(!this.control){
        		this.dire = null;
        	}else{
        		if(this.mPos.y > this.sPos.y && Math.abs(this.mPos.x - this.sPos.x) < this.tolerance){
        			this.dire = 'D';
        		}
        		if(this.mPos.y < this.sPos.y && Math.abs(this.mPos.x - this.sPos.x) < this.tolerance){
        			this.dire = 'U';
        		}
        		if(this.mPos.x > this.sPos.x && Math.abs(this.mPos.y - this.sPos.y) < this.tolerance){
        			this.dire = 'R';
        		}
        		if(this.mPos.x < this.sPos.x && Math.abs(this.mPos.y - this.sPos.y) < this.tolerance){
        			this.dire = 'L';
        		}
        	}
        }
 
        this.control = false;
        this.config.backfn(this);
 
    } 
    window.LSwiperMaker = LSwiperMaker;
    document.querySelector('.list').addEventListener('touchmove', function (e) { 
        //看需求是否要阻止默认事件
        // e.preventDefault();
    }, false);// 禁止微信touchmove冲突 
}())
var OList = new LSwiperMaker({
        bind:document.querySelector('.list'),  // 绑定的DOM对象
        dire_h:true,     //true 判断左右， false 判断上下
        start:0,
        backfn:function(o){    //回调事件  
            if(o.dire == 'L'){                
                // handle()                            
            }else if(o.dire == 'R'){
                // handle()
            }else if(o.dire == 'U'){
                if(this.start < 3){
                    this.start++;
                    handle(this.start)
                }
             
            }else if(o.dire == 'D'){

                if(this.start > 0){
                    this.start--;
                    handle(this.start);
                }
            }               

        }
});
function handle(Current){
    var ul = document.querySelector('ul.list');
    var dotLi = document.querySelectorAll('ul.dot > li');
    ul.style.top = - Current*100 + '%';
    for(var index = 0; index < dotLi.length;index++){
        dotLi[index].setAttribute('class','');
    }
    dotLi[Current].setAttribute('class','active');
}

/*PC*/
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