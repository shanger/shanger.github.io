new Vue({
    el:'#panel',
    data:{
        score:'2048',
        record:'4096',
        panel:[
            {value:2,class:'class2'},{value:'2',class:'class2'},{value:'',class:'class0'},{value:2,class:'class2'},            
            {value:2,class:'class2'},{value:'8',class:'class8'},{value:'8',class:'class8'},{value:'',class:'class0'},                        
            {value:'',class:'class0'},{value:'8',class:'class8'},{value:'8',class:'class8'},{value:'',class:'class'},            
            {value:8,class:'class8'},{value:'',class:'class0'},{value:'2',class:'class2'},{value:'2',class:'class2'},            
            
            
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
            switch:false,
        },
        tipsShow:false
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
        },
        compute:function(dire){
            var This = this;
            this.touch.switch = false;
            switch(dire){
                case 'D':
                    //计算
                    for(var i = 0;i <= 11;i++){
                        if( Number(this.panel[i].value) != 0){
                            for(var x = 1;x < 4;x++){
                                if(i+4*x < 16 && Number(this.panel[i].value) ==  Number(this.panel[i+4*x].value)){
                                    This.add(i,i+4*x);
                                    break;
                                }
                            }               
                        }
                    }
                    //移动 
                    for(var i = 12;i < 16;i++){
                        for(var x = i;x >= i-8;x = x-4){
                           if( Number(this.panel[x].value) == 0){
                                for(var y = x; y >= i-12; y = y-4){
                                    if(Number(this.panel[y].value) != 0){
                                        This.move(x,y);
                                        break;
                                    }
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
                                    break;  //相邻的元素计算后推出
                                }
                            }                   
                        }
                    }
                    for(var i = 0;i < 4;i++){
                        for(var x = i;x <= i+8;x = x+4){
                           if( Number(this.panel[x].value) == 0){
                                for(var y = x; y <= i+12; y = y+4){
                                    if(Number(this.panel[y].value) != 0){
                                        This.move(x,y);
                                        break;
                                    }
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
                                    }else{
                                        break;
                                    }
                                }                   
                            }                        
                        }
                    }
                    //移动
                    for(var i = 0;i < 13;i = i+4){
                        for(var x = i;x <= i+2;x++){
                           if( Number(this.panel[x].value) == 0){
                                for(var y = x; y <= i+3; y++){
                                    if(Number(this.panel[y].value) != 0){
                                        This.move(x,y);
                                        break;
                                    }
                                }                                
                           } 
                        }
                    }
                    break;
                case 'R':
                    for(var r = 0;r < 3;r++){   //前三列
                        for(var i = r;i <= r+12;i = i+4){   //四行
                            if( Number(this.panel[i].value) != 0){
                                for(var x = i;x < i + (3-r) ;x++){  //每一行的比较相同则 计算，是不同列 所以比较后都要退出换i值
                                    if(Number(this.panel[i].value) ==  Number(this.panel[x+1].value)){
                                        This.add(i,x+1);
                                        break;
                                    }else{
                                        break;
                                    }
                                }                   
                            }
                        }
                    }
                    //移动
                    for(var i = 3;i < 16;i = i+4){  // 从右侧的3,7,11,15分四列开始检测
                        for(var x = i;x >= i-2;x--){    //每一列的遍历
                           if( Number(this.panel[x].value) == 0){   //如果当前元素为空 则从前面找不为空的元素置换位置
                                for(var y = x; y >= i-3; y--){
                                    if(Number(this.panel[y].value) != 0){
                                        This.move(x,y);
                                        break;
                                    }
                                }                                
                           } 
                        }
                    }
                    break;
            }
            var arr = [];   //存储value为空的元素index 
            this.panel.forEach(function(ele,index){
                if(Number(ele.value) === 0){
                    arr.push(index);
                }
            });
            if(arr.length == 0){
                this.tipsShow = true;
            }else if(this.touch.switch){    //如果有像加的计算
                var newIndex = Math.round(Math.random()*arr.length);    //新元素的位置
                this.panel[newIndex].value = 2;
                this.panel[newIndex].class = 'class2';
            }
            
        },
        add:function(oldindex,newindex){
            var This = this;
            This.panel[newindex].value = Number(This.panel[newindex].value) + Number(This.panel[oldindex].value);
            This.panel[oldindex].value = '';
            This.panel[oldindex].class = 'class';
            This.panel[newindex].class = 'class' + This.panel[newindex].value;
            this.touch.switch = true;
        },
        move:function(index1,index2){   //index1目标位置 index2被移动的位置
            this.panel[index1].value = this.panel[index2].value;
            this.panel[index1].class = this.panel[index2].class;
            this.panel[index2].value = '';
            this.panel[index2].class = 'class0';
            this.touch.switch = true;
        }
    }
})