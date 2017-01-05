(function(){ 
    var LSwiperMaker = function(o){
        var that = this;
        this.config = o;
        this.control = false;
        this.sPos = {};	//出发点
        this.mPos = {};	//结束位置
        this.dire;
        this.maxLeft = this.config.bind.offsetWidth - document.body.offsetWidth;//最多能拖动的距离
        this.moveX =0;//移动距离
        this.oldMoveX =0;//上次移动的距离
        this.config.bind.addEventListener('touchstart', function(e){ return that.start(e); } ,false);
        this.config.bind.addEventListener('touchmove', function(e){ return that.move(e); } ,false);
        this.config.bind.addEventListener('touchend', function(e){ return that.end(e); } ,false);
        if(this.config.preventDefault){
        	this.config.bind.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        }        
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
        this.moveX = this.mPos.x - this.sPos.x + this.oldMoveX ; 
        this.config.bind.style.transform = "translate("+ this.moveX +"px, 0px) translateZ(0px)"       
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
        this.oldMoveX = this.moveX;
 		if(this.oldMoveX >0){
 			this.config.bind.style.transform = "translate(0px, 0px) translateZ(0px)" ;
 			this.config.bind.style.transformDuration = "600ms" ;
 			this.oldMoveX = 0;
 		}else if(this.oldMoveX <=- this.maxLeft){
 			this.config.bind.style.transform = "translate("+ -this.maxLeft+"px, 0px) translateZ(0px)" ;
 			this.config.bind.style.transformDuration = "600ms" ;
 			this.oldMoveX = -this.maxLeft;
 		}

        this.control = false;
        this.config.backfn(this);
        
    } 
    window.LSwiperMaker = LSwiperMaker;               
}())
var OList = new LSwiperMaker({
        bind:document.querySelector('.move'),  // 绑定的DOM对象
        dire_h:true,     //true 判断左右， false 判断上下
        preventDefault:true,
        backfn:function(o){    //回调事件           
            if(o.dire == 'L'){

                return false; 
            }else if(o.dire == 'R'){
                return false; 
            }else if(o.dire == 'U'){
                return false;
            }else if(o.dire == 'D'){
                return false;
            }           

        }
});