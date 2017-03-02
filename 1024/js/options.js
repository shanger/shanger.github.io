var pannel = new Vue({
    el:'#panel',
    data:{
        score:0,
        record:localStorage.getItem('record')?localStorage.getItem('record'):0,
        panel:[
            {value:2,class:'class2'},{value:'2',class:'class2'},{value:4,class:'class4'},{value:2,class:'class2'},            
            {value:2,class:'class2'},{value:'',class:'class'},{value:'',class:'class'},{value:'',class:'class0'},                        
            {value:'4',class:'class4'},{value:'',class:'class'},{value:'',class:'class'},{value:'',class:'class'},            
            {value:'2',class:'class2'},{value:'',class:'class0'},{value:'',class:'class'},{value:'',class:'class'},            
            
            
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
            switch:false,//有相加加的计算,有计算则添加新数字
        },
        tipsShow:false,
        keybord:[1,1,1,1,1,1,1,1,1]
    },
    created:function(){
        document.querySelector('.loading').style.display='none'

        /*this.score = localStorage.getItem('record')?localStorage.getItem('record'):0;*/
        this.li.height = document.querySelector('div section:nth-of-type(2) ul > li').offsetWidth +'px';
        this.li.marginTop = Math.floor(document.querySelector('div section:nth-of-type(2) ul > li').offsetWidth/24) + 'px';
        this.reset();
    },
    methods:{
        //touch时间监听
        touchstart:function($event){
            var point = $event.touches ? $event.touches[0] : $event;
            this.touch.sPos.x = point.screenX;
            this.touch.sPos.y = point.screenY;
        },
        touchmove:function($event){
            $event.preventDefault();
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
                    for(var i = 15;i > 3;i--){
                        if( Number(this.panel[i].value) != 0){
                           for(var x = 1;x < 4;x++){
                                if( i-4*x >= 0 && Number(this.panel[i].value) ==  Number(this.panel[i-4*x].value)){
                                    if(x > 2 && Number(this.panel[i-8].value) == 0){    //跨非空元素不能相加
                                        This.add(i,i-4*x); //相邻的元素计算后退出
                                        break;
                                    }else if(x > 1 && Number(this.panel[i-4].value) == 0 && Number(this.panel[i-8].value) == 0){    //跨非空元素不能相加
                                        This.add(i,i-4*x); //相邻的元素计算后退出
                                        break; 
                                    }else if(x == 1){
                                        This.add(i,i-4*x); //相邻的元素计算后退出
                                        break;
                                    }                                     
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
                    for(var i = 0;i <= 11;i++){
                        if( Number(this.panel[i].value) != 0){
                            for(var x = 1;x < 4;x++){
                                if(i+4*x < 16 && Number(this.panel[i].value) ==  Number(this.panel[i+4*x].value)){
                                    if(x > 2 && Number(this.panel[i+8].value) == 0&& Number(this.panel[i+4].value) == 0){    //跨非空元素不能相加
                                        This.add(i,i+4*x); //相邻的元素计算后退出
                                        break;
                                    }else if(x > 1  && Number(this.panel[i+4].value) == 0){    //跨非空元素不能相加
                                        This.add(i,i+4*x); //相邻的元素计算后退出
                                        break; 
                                    }else if(x == 1){
                                        This.add(i,i+4*x); //相邻的元素计算后退出
                                        break;
                                    }                                  
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
                    //计算
                    for(var l = 3;l > 0;l--){ //从第四列依次和前三列相加 一次相加之后退出循环不再相加
                        for(var i = l;i <= l+12; i=i+4){
                            if( Number(This.panel[i].value) != 0){
                                for(var x = i;x > i-l;x--){
                                    if(Number(This.panel[i].value) ==  Number(This.panel[x-1].value)){
                                        if(i-x > 2 && Number(this.panel[i-1].value) == 0 && Number(this.panel[i-2].value) == 0){    //跨非空元素不能相加
                                            This.add(i,x-1); //相邻的元素计算后退出
                                            break;
                                        }else if(i-x > 1 && Number(this.panel[i-1].value) ){    //跨非空元素不能相加
                                            This.add(i,x-1); //相邻的元素计算后退出
                                            break; 
                                        }else if(i-x <= 1){
                                            This.add(i,x-1); //相邻的元素计算后退出
                                            break;
                                        }
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
                    //计算
                    for(var r = 0;r < 3;r++){   //前三列
                        var count = 0;
                        for(var i = r;i <= r+12;i = i+4){   //四行
                            
                            if( Number(this.panel[i].value) != 0){
                                for(var x = i;x < i + (3-r) ;x++){  //每一行的比较相同则 计算，是不同列 所以比较后都要退出换i值
                                    if(Number(this.panel[i].value) ==  Number(this.panel[x+1].value)){
                                        if(x-i+1 > 2 && Number(this.panel[i+1].value) == 0 && Number(this.panel[i+2].value) == 0){    //跨非空元素不能相加
                                            This.add(i,x+1); //相邻的元素计算后退出
                                            break;
                                        }else if(x-i+1 > 1 && Number(this.panel[i+1].value) == 0){    //跨非空元素不能相加
                                            This.add(i,x+1); //相邻的元素计算后退出
                                            break; 
                                        }else if(x-i+1 <= 1){
                                            This.add(i,x+1); //相邻的元素计算后退出
                                            break;
                                        }
                                        
                                        
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
                this.record = this.score;
                localStorage.setItem('score',this.record)

            }else if(this.touch.switch){    //如果有像加的计算
                var newIndex = Math.floor(Math.random()*arr.length);
                newIndex = arr[newIndex];   //新元素的位置 
                this.panel[newIndex].value = 2;
                this.panel[newIndex].class = 'class2';
            }
            /*如果成绩大于记录写入记录*/
            if(this.score > this.record){
                this.record = this.score;
                localStorage.setItem('record',this.score)   
            }
                    
        },
        add:function(oldindex,newindex){
            var This = this;
            This.panel[newindex].value = Number(This.panel[newindex].value) + Number(This.panel[oldindex].value);
            This.panel[oldindex].value = '';
            This.panel[oldindex].class = 'class';
            This.panel[newindex].class = 'class' + This.panel[newindex].value;
            this.touch.switch = true;
            this.score += This.panel[newindex].value;
        },
        //移动位置
        move:function(index1,index2){   //index1目标位置 index2被移动的位置
            this.panel[index1].value = this.panel[index2].value;
            this.panel[index1].class = this.panel[index2].class;
            this.panel[index2].value = '';
            this.panel[index2].class = 'class0';
            this.touch.switch = true;
        },
        reset:function(){
            this.tipsShow = false;//关闭弹窗
            this.panel = [];
            for(var i = 0;i < 16;i++){
                this.panel.push({value:'',class:'class'})
            }
            var set = [];
            var length = set.length;
            while(length < 3){
                var key = Math.floor(Math.random()*16);
                var x = true;
                for(var i = 0;i < length;i++){
                    if(key == set[i]){
                        x = false;
                    }
                }
                if(x){
                    set.push(key);
                    length = set.length;
                }
            }
            for(var i = 0,len = set.length;i < len;i++){
                this.panel[set[i]].value = 2;
                this.panel[set[i]].class ='class2';
            }
        
        },
        pcmove:function($index){    //pc事件监听
            switch($index){
                case 1:this.compute('U');break;
                case 3:this.compute('L');break;
                case 5:this.compute('R');break;
                case 7:this.compute('D');break;
            }
        },
        keyup:function($event){
            //console.log($event.keyCode)
            switch($event.keyCode){
                case 38:this.compute('U');break;
                case 37:this.compute('L');break;
                case 39:this.compute('R');break;
                case 40:this.compute('D');break;
            }
        }
    }
})
