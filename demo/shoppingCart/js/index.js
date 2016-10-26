var index =  new Vue({
	el:'#index',
	data:{
		loopImg:[
			{img:'img/Img1.jpg',Li1:true,Li2:false,Li3:false,transition:false,showImg:'img/Img1.jpg',normalImg:'img/Img1.jpg'},
			{img:'img/Img2.jpg',Li1:false,Li2:true,Li3:false,transition:false,showImg:'img/Img2.jpg',normalImg:'img/Img2.jpg'},
			{img:'img/Img3.jpg',Li1:false,Li2:false,Li3:true,transition:false,showImg:'img/Img3.jpg',normalImg:'img/Img3.jpg'},
		],
	},
	created:function(){
		this.prepare();
	},
	methods:{
		prepare:function(){ 
            //上下滑动事件的监听
            var This = this;
            (function(){ 
                var LSwiperMaker = function(o){ 
             
                    var that = this;
                    this.config = o;
                    this.control = false;
                    this.sPos = {};
                    this.mPos = {};
                    this.dire;
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
                LSwiperMaker.prototype.end = function(e){
                    
                    if(this.config.dire_h){
                        if(!this.control){
                            this.dire = null;
                        }else{
                            if(this.mPos.y > this.sPos.y && Math.abs(this.mPos.x - this.sPos.x) < 40){
                                this.dire = 'D';
                            }
                            if(this.mPos.y < this.sPos.y && Math.abs(this.mPos.x - this.sPos.x) < 40){
                                this.dire = 'U';
                            }
                            if(this.mPos.x > this.sPos.x && Math.abs(this.mPos.y - this.sPos.y) < 40){
                                this.dire = 'R';
                            }
                            if(this.mPos.x < this.sPos.x && Math.abs(this.mPos.y - this.sPos.y) < 40){
                                this.dire = 'L';
                            }
                        }
                    }
             
                    this.control = false;
                    this.config.backfn(this);
             
                } 
                window.LSwiperMaker = LSwiperMaker;
                //document.querySelector('.loop').addEventListener('touchmove', function (e) { e.preventDefault(); }, false);// 禁止微信touchmove冲突 
            }())
            var OList = new LSwiperMaker({
                    bind:document.querySelector('.header'),  // 绑定的DOM对象
                    dire_h:true,     //true 判断左右， false 判断上下
                    backfn:function(o){    //回调事件           
                        if(o.dire == 'L'){
                            This.goleft();             
                        }else if(o.dire == 'R'){
                            This.goright();      
                        }else if(o.dire == 'U'){
                            return false;                            
                        }else if(o.dire == 'D'){
                            return false;
                        }           

                    }
            });
            setInterval(function(){            	
                This.goright()
            },5000)
            
        },
        goleft:function(){
        	var This = this;
        	This.loopImg.forEach(function(ele){
				ele.transition = true;
			})
        	this.loopImg.forEach(function(ele,index){
        		var Myindex = '';
        		for(key in ele){
        			if(ele[key]&&key!='img'&&key!="showImg"&&key!='normalImg'&&key!='date'&&key!="transition"){
        				Myindex = Number(key.slice(2));//获取当前位置
        				ele[key] = false;//先取消位置
        			}
        		}
        		if(Myindex - 1 == 0){
        			ele['Li3'] = true;
        		}else{
        			ele['Li' + (Myindex-1)] = true;
        		}

        	})

        },
        goright:function(){
        	var This = this;
        	This.loopImg.forEach(function(ele){
				ele.transition = true;
			})
        	this.loopImg.forEach(function(ele,index){
        		var Myindex = '';
        		for(key in ele){
        			if(ele[key]&&key!='img'&&key!="showImg"&&key!='normalImg'&&key!='date'&&key!="transition"){
        				Myindex = Number(key.slice(2));//获取当前位置
        				ele[key] = false;//先取消位置        				
        			}
        		}
        		if(Myindex + 1 > 3){
        			ele['Li1'] = true;
        		}else{
        			ele['Li' + (Myindex+1)] = true;
        		}

        	})
        },
	},
});