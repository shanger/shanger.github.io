<script>
    //es6
    export default {
        el:"#scroll2Load",
        data () {
            return {
            	pageIndex:1,
		        paseSize:10,
				List:[
					{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15},{id:16},{id:17},
				],
				//提示框
				tips:{
		            show:false,
		            text:''
		        },
		        nomore:false,//没有更多的标记
            }
        },
        created:function(){
        	var that = this;
        	window.addEventListener('load',function(){
        		that.prepare();
        	})
        },
        methods:{
        	prepare (){
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
	                    var scrollY = window.scrollY;
	                    var screenH = document.documentElement.clientHeight||document.body.clientHeight;
	                    var offsetHeight = document.querySelector('.scroll2Load').offsetHeight;
	                    //屏幕高度+滚动高度 >= body高度 、做多划200px 、滑动加载的触发点、如果内容不充满屏幕不让滑动
	                    if(scrollY+screenH >= offsetHeight && this.sPos.y- this.mPos.y < 200 &&this.sPos.y- this.mPos.y > 100 && offsetHeight > screenH){
	                        document.querySelector('.list').style.marginBottom = this.sPos.y- this.mPos.y +'px';
	                        document.querySelector('.uploading').style.lineHeight = this.sPos.y- this.mPos.y +'px';
	                    }           
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
	            }())
	            var OList = new LSwiperMaker({
	                    bind:document.querySelector('.scroll2Load'),  // 绑定的DOM对象
	                    dire_h:true,     //true 判断左右， false 判断上下
	                    backfn:function(o){    //回调事件           
	                        if(o.dire == 'L'){
	                             return false; 
	                        }else if(o.dire == 'R'){
	                            return false; 
	                        }else if(o.dire == 'U'){
	                            var scrollY = window.scrollY;
	                            var screenH = document.documentElement.clientHeight||document.body.clientHeight;
	                            var offsetHeight = document.querySelector('.scroll2Load').offsetHeight;
	                            if(scrollY+screenH >= offsetHeight && This.List.length>This.paseSize-1&&!This.nomore){
	                                //加载结束
	                                function timeout(ms) {
									  return new Promise((resolve, reject) => {
									    setTimeout(resolve, ms, 'done');
									  });
									}
									timeout(2000).then((value) => {
										(function(){
											document.querySelector('.list').style.marginBottom = 0;
											document.querySelector('.uploading').style.lineHeight = '2rem';
											document.querySelectorAll('.uploading')[1].style.lineHeight = '2rem';
										})()
									});
	                                
	                            }
	                        }else if(o.dire == 'D'){
	                            return false;
	                        }           

	                    }
	            });
	        },
        },
    }
</script>
<template>
	<section class="scroll2Load">
		<section class="list">
			<ul  v-el:goodList>
				<li v-for="item in List">					
				</li>
			</ul>
			<section class="showMore" v-show="List.length > paseSize -1"   v-bind:class="{nomore:nomore}">
				<p>上滑加载更多</p>
			</section>
		</section>
		
		<section class="uploading" v-show="List.length > paseSize -1" v-bind:class="{nomore:nomore}">
			<ul class="loading3">
				<li></li><li></li><li></li><li></li><li></li>			
			</ul>
		</section>
		<section class="uploading" v-bind:class="{nomore:!nomore}">
			没有更多了
		</section>
		<!-- 提示 -->
        <section v-bind:class="{show:tips.show,tips:true}"  >
          <p>提示</p>
          <p>{{tips.text}}</p>
        </section>
	</section>
    
</template>
<style >
*{
	margin:0;padding: 0;
	box-sizing: border-box;
}
html,body{
	height: 100%;
}
.content{
	height: 100%;
}
.list{
	position: relative;
	z-index: 10;
	background-color: #fff;
}
.list ul li{
	height: 40px;
	list-style: none;

}

/*加载更多*/
section.showMore{
	width: 100%;height: 1.8rem;line-height: 1.7rem;
	padding: 0 0.4rem;
	background-color: #f5f5f5;
}
section.showMore.nomore{
	display: none;
}
section.showMore>a{
	display: inline-block;width: 49%;height: 2rem;
	line-height:2rem;
	text-align: center;
	color: white;
	font-size: 0.68rem;
	background-color: #5d9cec;
}
section.showMore>a:nth-of-type(2){
	margin-left: 2%;
}
section.showMore > p{
	height: 1.7rem;line-height: 1.7rem;
	width: 100%;
	display: inline-block;vertical-align: middle;
	font-size: 0.68rem;text-align: center;
	color: #5d9cec;
}
/*上滑加载*/
section.uploading{
	width: 100%;
	line-height: 2rem;text-align: center;
	font-size: 0.68rem;color: #5d9cec;
	position: fixed;bottom: 0;left: 0;
	z-index: 0;

	transition:line-height linear;
	-webkit-transition:line-height linear;
	-moz-transition:line-height linear;
	-o-transition:line-height linear;
}
section.uploading.nomore{
	display: none;
}

/*提示框*/
.body >.tips{
	position: fixed;left: 15%;bottom: 0;
	width: 70%;opacity: 0;
	padding: 5px;color: white;
	background-color: #93B2DA;
	opacity: 0;z-index: -1;
	transition: all 1s ease-in-out;
	-webkit-transition: all 1s ease-in-out;
	-ms-transition: all 1s ease-in-out;
	-moz-transition: all 1s ease-in-out;
	-o-transition: all 1s ease-in-out;
	border-radius: 5px;
}
.body >.tips > p{
	font-size: 14px;color: white;
	padding: 0 5px;line-height: 20px;
}
.body >.tips > p:nth-of-type(2){
	text-align: center;
}
.body >.tips.show{
	display:block; opacity: 1;bottom: 150px;
	z-index: 10;opacity: 1;
	transition: all .5s ease-in-out;
	-webkit-transition: all .5s ease-in-out;
	-ms-transition: all .5s ease-in-out;
	-moz-transition: all .5s ease-in-out;
	-o-transition: all .5s ease-in-out;
}
/*loading*/
.loading >p{
	line-height: 1.4rem;
	font-size: 0.68rem;
	text-align: center;color: #5d9cec;
}
.loading3{
	display: inline-block;width: 100%;
	text-align: center;
	vertical-align: middle;
	height: 2.3rem;
}
.loading3 > li{
	display: inline-block;
	height: 1.25rem;width: 0.33rem;
	border-radius: 0.1rem;
	background-color: #fcca13;
	margin-left: 0.16rem;
	transition: all  linear;
	-webkit-transition: all  linear;
	-moz-transition: all  linear;
	-ms-transition: all  linear;
	-o-transition: all  linear;
	transform-origin: 50% 50%;
	-webkit-transform-origin: 50% 50%;
	-moz-transform-origin: 50% 50%;
	-ms-transform-origin: 50% 50%;
	-o-transform-origin: 50% 50%;
}
.loading3 > li:nth-of-type(1){
	animation: updown 1s linear infinite;
	-webkit-animation: updown 1s linear infinite;
	-moz-animation: updown 1s linear infinite;
	-ms-animation: updown 1s linear infinite;
	-o-animation: updown 1s linear infinite;
	margin-left: 0;
}
.loading3 > li:nth-of-type(2){
	animation: updown 1s linear 0.2s infinite;
	-webkit-animation: updown 1s linear 0.2s infinite;
	-moz-animation: updown 1s linear 0.2s infinite;
	-ms-animation: updown 1s linear 0.2s infinite;
	-o-animation: updown 1s linear 0.2s infinite;
}
.loading3 > li:nth-of-type(3){
	animation: updown 1s linear 0.4s infinite;
	-webkit-animation: updown 1s linear 0.4s infinite;
	-moz-animation: updown 1s linear 0.4s infinite;
	-ms-animation: updown 1s linear 0.4s infinite;
	-o-animation: updown 1s linear 0.4s infinite;
}
.loading3 > li:nth-of-type(4){
	animation: updown 1s linear 0.6s infinite;
	-webkit-animation: updown 1s linear 0.6s infinite;
	-moz-animation: updown 1s linear 0.6s infinite;
	-ms-animation: updown 1s linear 0.6s infinite;
	-o-animation: updown 1s linear 0.6s infinite;
}
.loading3 > li:nth-of-type(5){
	animation: updown 1s linear 0.8s infinite;
	-webkit-animation: updown 1s linear 0.8s infinite;
	-moz-animation: updown 1s linear 0.8s infinite;
	-ms-animation: updown 1s linear 0.8s infinite;
	-o-animation: updown 1s linear 0.8s infinite;
}

@keyframes updown{
	0%{
		transform: scale(1,1);
		-webkit-transform: scale(1,1);
		-moz-transform: scale(1,1);
		-ms-transform: scale(1,1);
		-o-transform: scale(1,1);
	}
	50%{
		transform: scale(1,1.8);
		-webkit-transform: scale(1,1.8);
		-moz-transform: scale(1,1.8);
		-ms-transform: scale(1,1.8);
		-o-transform: scale(1,1.8);
	}
	100%{
		transform: scale(1,1);
		-webkit-transform: scale(1,1);
		-moz-transform: scale(1,1);
		-ms-transform: scale(1,1);
		-o-transform: scale(1,1);
	}
}
@-webkit-keyframes updown{
	0%{
		transform: scale(1,1);
		-webkit-transform: scale(1,1);
		-moz-transform: scale(1,1);
		-ms-transform: scale(1,1);
		-o-transform: scale(1,1);
	}
	50%{
		transform: scale(1,1.8);
		-webkit-transform: scale(1,1.8);
		-moz-transform: scale(1,1.8);
		-ms-transform: scale(1,1.8);
		-o-transform: scale(1,1.8);
	}
	100%{
		transform: scale(1,1);
		-webkit-transform: scale(1,1);
		-moz-transform: scale(1,1);
		-ms-transform: scale(1,1);
		-o-transform: scale(1,1);
	}
}
@-moz-keyframes updown{
	0%{
		transform: scale(1,1);
		-webkit-transform: scale(1,1);
		-moz-transform: scale(1,1);
		-ms-transform: scale(1,1);
		-o-transform: scale(1,1);
	}
	50%{
		transform: scale(1,1.8);
		-webkit-transform: scale(1,1.8);
		-moz-transform: scale(1,1.8);
		-ms-transform: scale(1,1.8);
		-o-transform: scale(1,1.8);
	}
	100%{
		transform: scale(1,1);
		-webkit-transform: scale(1,1);
		-moz-transform: scale(1,1);
		-ms-transform: scale(1,1);
		-o-transform: scale(1,1);
	}
}
@-ms-keyframes updown{
	0%{
		transform: scale(1,1);
		-webkit-transform: scale(1,1);
		-moz-transform: scale(1,1);
		-ms-transform: scale(1,1);
		-o-transform: scale(1,1);
	}
	50%{
		transform: scale(1,1.8);
		-webkit-transform: scale(1,1.8);
		-moz-transform: scale(1,1.8);
		-ms-transform: scale(1,1.8);
		-o-transform: scale(1,1.8);
	}
	100%{
		transform: scale(1,1);
		-webkit-transform: scale(1,1);
		-moz-transform: scale(1,1);
		-ms-transform: scale(1,1);
		-o-transform: scale(1,1);
	}
}
@-o-keyframes updown{
	0%{
		transform: scale(1,1);
		-webkit-transform: scale(1,1);
		-moz-transform: scale(1,1);
		-ms-transform: scale(1,1);
		-o-transform: scale(1,1);
	}
	50%{
		transform: scale(1,1.8);
		-webkit-transform: scale(1,1.8);
		-moz-transform: scale(1,1.8);
		-ms-transform: scale(1,1.8);
		-o-transform: scale(1,1.8);
	}
	100%{
		transform: scale(1,1);
		-webkit-transform: scale(1,1);
		-moz-transform: scale(1,1);
		-ms-transform: scale(1,1);
		-o-transform: scale(1,1);
	}
}
.origin{
	text-decoration: line-through;
}


/*提示框*/
.tips{
	position: fixed;left: 15%;bottom: 0;
	width: 70%;opacity: 0;
	padding: 5px;color: white;
	background-color: #93B2DA;
	opacity: 0;z-index: -1;
	transition: all 1s ease-in-out;
	-webkit-transition: all 1s ease-in-out;
	-ms-transition: all 1s ease-in-out;
	-moz-transition: all 1s ease-in-out;
	-o-transition: all 1s ease-in-out;
	border-radius: 5px;
}
.tips > p{
	font-size: 14px;color: white;
	padding: 0 5px;line-height: 20px;
}
.tips > p:nth-of-type(2){
	text-align: center;
}
.tips.show{
	display:block; opacity: 1;bottom: 150px;
	z-index: 10;opacity: 1;
	transition: all .5s ease-in-out;
	-webkit-transition: all .5s ease-in-out;
	-ms-transition: all .5s ease-in-out;
	-moz-transition: all .5s ease-in-out;
	-o-transition: all .5s ease-in-out;
}
</style>
