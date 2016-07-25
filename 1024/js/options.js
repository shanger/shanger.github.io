new Vue({
    el:'#panel',
    data:{
        score:'2048',
        record:'4096',
        panel:[
            {value:2,class:'class2'},{value:'2',class:'class2'},{value:'',class:'class0'},{value:2,class:'class2'},            
            {value:2,class:'class2'},{value:'',class:'class0'},{value:'8',class:'class8'},{value:'',class:'class0'},                        
            {value:'',class:'class0'},{value:'8',class:'class8'},{value:'8',class:'class8'},{value:'',class:'class'},            
            {value:8,class:'class8'},{value:'8',class:'class8'},{value:'2',class:'class2'},{value:'2',class:'class2'},            
            
            
        ],
        li:{
            height:'50px',
            marginTop:'',
        },
        touch:{     //判断方向
            control:false,
            sPos : {},
            mPos : {},
            dire:'',
        }
    },
    created:function(){
        this.li.height = document.querySelector('li').offsetWidth +'px';
        this.li.marginTop = Math.floor(document.querySelector('li').offsetWidth/24) + 'px';
    },
    methods:{
        touchstart:function($event){
            var point = $event.touches ? $event.touches[0] : $event;
            this.touch.sPos.x = point.screenX;
            this.touch.sPos.y = point.screenY;
        },
        touchmove:function($event){
            var point = $event.touches ? $event.touches[0] : $event;
            this.touch.control = true;
            this.touch.mPos.x = point.screenX;
            this.touch.mPos.y = point.screenY;
        },
        touchend:function(){
            if(this.touch.mPos.y > this.touch.sPos.y && Math.abs(this.touch.mPos.x - this.touch.sPos.x) < 40){
                this.touch.dire = 'D';
            }
            if(this.touch.mPos.y < this.touch.sPos.y && Math.abs(this.touch.mPos.x - this.touch.sPos.x) < 40){
                this.touch.dire = 'U';
            }
            if(this.touch.mPos.x > this.touch.sPos.x && Math.abs(this.touch.mPos.y - this.touch.sPos.y) < 40){
                this.touch.dire = 'R';
            }
            if(this.touch.mPos.x < this.touch.sPos.x && Math.abs(this.touch.mPos.y - this.touch.sPos.y) < 40){
                this.touch.dire = 'L';
            }
            this.compute(this.touch.dire);
            //console.log(this.touch.dire);
        },
        compute:function(dire){
            var This = this;
            switch(dire){
                case 'D':
                    for(var i = 0;i < 11;i++){
                        if( Number(this.panel[i].value) != 0){
                            for(var x = 1;x < 4;x++){
                                if(i+4*x < 16 && Number(this.panel[i].value) ==  Number(this.panel[i+4*x].value)){
                                    This.add(i,i+4*x);
                                    break;
                                }
                            }               
                        }
                    }
                    break;
                case 'U':
                    for(var i = 15;i > 3;i--){
                        if( Number(this.panel[i].value) != 0){
                            for(var x = 1;x < 4;x++){
                                if(i-4*x >= 0 && Number(this.panel[i].value) ==  Number(this.panel[i-4*x].value)){
                                    This.add(i,i-4*x);
                                    break;
                                }
                            }                   
                        }
                    }
                    break;
                case 'L':
                    for(var l = 3;l > 0;l--){ //从第四列依次和前三列相加 一次相加之后推出循环不再相加
                        for(var i = l;i <= l+12; i=i+4){
                            if( Number(This.panel[i].value) != 0){
                                for(var x = i;x > i-l;x--){
                                    if(Number(This.panel[i].value) ==  Number(This.panel[x-1].value)){
                                        This.add(i,x-1);
                                        break;
                                    }
                                }                   
                            }                        
                        }
                    }
                    break;
                case 'R':
                    for(var r = 0;r < 3;r++){
                        console.log(r)
                        for(var i = r;i <= r+12;i = i+4){
                            if( Number(this.panel[i].value) != 0){
                                for(var x = i;x < i + (3-r) ;x++){
                                    if(Number(this.panel[i].value) ==  Number(this.panel[x+1].value)){
                                        This.add(i,x+1);
                                        break;
                                    }
                                }                   
                            }
                        }
                    }
                    break;
            }
        },
        add:function(oldindex,newindex){
            var This = this;
            This.panel[newindex].value = Number(This.panel[newindex].value) + Number(This.panel[oldindex].value);
            This.panel[oldindex].value = '';
            This.panel[oldindex].class = 'class';
            This.panel[newindex].class = 'class' + This.panel[newindex].value;
        },
    }
})