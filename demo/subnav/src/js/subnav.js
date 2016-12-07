require.config({
	paths:{
		vue:'../../../static/js/vue.min',
	},
	shim: {　　　
　　}
});
requirejs(['vue'],function(Vue){
	var app = new Vue({
		el:'#app',
		data:{
			li:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
			rightLi:[
				{text:'a',active:false},
				{text:'b',active:false},
				{text:'c',active:false},
				{text:'d',active:false},
				{text:'e',active:false},
				{text:'f',active:false},
				{text:'g',active:false},
				{text:'h',active:false},
				{text:'i',active:false},
				{text:'j',active:false},
				{text:'k',active:false},
				{text:'l',active:false},
				{text:'m',active:false},
				{text:'n',active:false},
				{text:'o',active:false},
				{text:'p',active:false},
				{text:'q',active:false},
				{text:'r',active:false},
				{text:'s',active:false},
				{text:'t',active:false},
				{text:'u',active:false},
				{text:'v',active:false},
				{text:'w',active:false},
				{text:'x',active:false},
				{text:'y',active:false},
				{text:'z',active:false},
				{text:'#',active:false},
			],
			rightLiLineHeight:'',	//行高 字号适配
			rightLiFontSize:'',
			rightShowText:'',	//提示字
			rightShowTextSize:'',	//提示字的字体大小
			rightLiSpan:'',
			rightLiActive:false,	//navbar样式
			activeColor:false,
		},
		created:function(){
			this.rightLiSet();
			this.touches();
		},
		methods:{
			rightLiSet:function(){
				var This = this;
				this.resize();
				window.addEventListener('resize',function(){
					This.resize();
				},false);
			},
			resize:function(){
				var body = document.querySelector('.body');
				var height = body.offsetHeight;
				this.rightLiLineHeight = height/28 + 'px';
				this.rightLiFontSize = height/28*0.6 + 'px';
				this.rightLiSpan = height/28*0.8 + 'px';
				this.rightShowTextSize = height/28*1.2 + 'px';
			},
			touches:function(){
				var This = this;
				(function(){ 
					var LSwiperMaker = function(o){              
						var that = this;
						this.config = o;
						this.control = false;
						this.sPos = {};
						this.mPos = {};
						this.dire;
						this.toleranceX = 50;
						this.toleranceY = 20;
						this.config.bind.addEventListener('touchstart', function(e){ return that.start(e); } ,false);
						this.config.bind.addEventListener('touchmove', function(e){ return that.move(e); } ,false);
						this.config.bind.addEventListener('touchend', function(e){ return that.end(e); } ,false);             
					}             
					LSwiperMaker.prototype.start = function(e){
						var point = e.touches ? e.touches[0] : e;
						this.sPos.x = point.clientX;
						this.sPos.y = point.clientY;   
					}
					LSwiperMaker.prototype.move = function(e){

						var This = this;
						var point = e.touches ? e.touches[0] : e;
						this.control = true;
						this.mPos.x = point.clientX;
						this.mPos.y = point.clientY;

						if(this.mPos.y > this.sPos.y && Math.abs(this.mPos.x - this.sPos.x) < this.toleranceY){
							this.dire = 'D';
						}
						if(this.mPos.y < this.sPos.y && Math.abs(this.mPos.x - this.sPos.x) < this.toleranceY){
							this.dire = 'U';
						}
						if(this.mPos.x > this.sPos.x && Math.abs(this.mPos.y - this.sPos.y) < this.toleranceX){
							this.dire = 'R';
						}
						if(this.mPos.x < this.sPos.x && Math.abs(this.mPos.y - this.sPos.y) < this.toleranceX){
							this.dire = 'L';
						}
						this.config.backfn(this);   
					}             
					LSwiperMaker.prototype.end = function(e){
						if(this.mPos.y > this.sPos.y && Math.abs(this.mPos.x - this.sPos.x) < this.toleranceY){
							this.dire = 'D';
						}
						if(this.mPos.y < this.sPos.y && Math.abs(this.mPos.x - this.sPos.x) < this.toleranceY){
							this.dire = 'U';
						}
						if(this.mPos.x > this.sPos.x && Math.abs(this.mPos.y - this.sPos.y) < this.toleranceX){
							this.dire = 'R';
						}
						if(this.mPos.x < this.sPos.x && Math.abs(this.mPos.y - this.sPos.y) < this.toleranceX){
							this.dire = 'L';
						}
						this.config.end(this);          
					} 
					window.LSwiperMaker = LSwiperMaker;                
				}());
				var OList = new LSwiperMaker({
                    bind:document.querySelector('.right'),  
                    backfn:function(o){    //回调事件  
                    	This.activeColor = true;
                    	if(o.dire == 'U'||o.dire == 'D'){ 
                    		var Myindex = Math.ceil(o.mPos.y/parseInt(This.rightLiLineHeight)) -2;
                    		This.$els.showtext.style.top = o.mPos.y - parseInt(This.rightLiLineHeight) + 'px';
                    		This.rightShowText = This.rightLi[Myindex>0?Myindex:0].text;
                    		This.rightLi.forEach(function(ele,index){
                    			if(index == Myindex){
                    				ele.active = true;
                    			}else{
                    				ele.active = false;
                    			}
                    		});
                    		document.querySelector('.body').scrollTop = Myindex * document.querySelector('ul.big li').offsetHeight;
                    	}else{
                    		return false; 
                    	}     
                    },
                    end:function(o){
                    	This.rightShowText = '';
                    	This.$els.showtext.style.top = '0px';
                    	This.rightLi.forEach(function(ele,index){
                    		ele.active = false;
                    	});
                    	if(o.dire == 'L'){
                    		This.rightLiActive = true;
                    	}else if(o.dire == 'R'){
                    		This.rightLiActive = false;
                    		This.activeColor = false;
                    	}else{
                    		This.activeColor = false;
                    	}
                    }
                });
			},
			choose:function($index){
				document.querySelector('.body').scrollTop = $index * document.querySelector('ul.big li').offsetHeight;
			}
		}

	});
});