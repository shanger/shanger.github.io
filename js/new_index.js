require.config({
	paths:{
		vue:'../bower_components/vue/dist/vue.min',
        ajax:'ajax'
	},
});
requirejs(['vue','ajax'],function(Vue){

	var body = new Vue({
    	el:'#body',
    	data:{
    		date:new Date(),
    		abortme:[
    			{key:'性别：',value:'男'},
    			{key:'年龄：',value:''},
    			{key:'爱好：',value:'篮球、唱歌、LOL'},
    			{key:'毕业院校：',value:"<a href='http://www.hncj.edu.cn/ target='_blank'>河南城建学院</a>"},
    			{key:'工作经历:',value:''},
    			{key:'',value:'2015.07-2015.09 上海德拓信息科技有限公司'},
    			{key:'',value:'2016.03-- 上海游达网络科技'},
    		],
    		skill:[
    			{name:'html',degree:'.7',id:'canvas1',height:'200px',text:'js/jq'},
    			{name:'js/jq',degree:'.85',id:'canvas2',height:'200px',text:'html'},
    			{name:'html',degree:'.88',id:'canvas3',height:'200px',text:'css'},
    			{name:'html',degree:'.55',id:'canvas4',height:'200px',text:'vue'},
    		],
            contact:[
                {way:'邮箱',data:'2569202365@qq.com'},
                {way:'电话',data:'15800389618'},
                {way:'QQ',data:'2569202365'},
            ],
            img:{
                imgSrc:'',
                zhaojiling:'http://odqxl7d3r.bkt.clouddn.com/zhaojiling.png'
            },
            audio:'',//audio元素
            music:{
                src:'audio/Roar.mp3',
                play:false
            },
            controlShow:false,
            imgShow:false,
            info:'这是个逗笔的机器人……',
            answer:'',
            answershow:false,

    	},
    	created:function(){
            var This = this;
            this.abortme[1].value = this.date.getFullYear()-1995;//计算年龄
            if(document.documentElement.clientWidth <= 640){
                this.resize();
            }else{
                var width = 200,R = 100,X = 100;            
                this.skill.forEach(function(ele,index){
                    This.draw(ele.degree,ele.id,width,R,X);
                });
            }
            this.getAudio();
            /*音频加载完成显示小图标*/         
    	},
        methods:{
            getAudio:function(){
                var This = this;
                this.$nextTick(function () {
                    This.audio = This.$els.audio;
                })                
            },
            //画图
            draw:function(deg,id,width,R,X){
                var canvas = document.getElementById(id);
                var context = canvas.getContext("2d");
                context.clearRect(0, 0, width, width); 
                context.beginPath();  
                context.moveTo(X, X);  
                context.arc(X, X, R, 0, Math.PI * 2*deg, false);  
                context.closePath();  
                context.fillStyle = '#f60';
                context.fill();
            },
            //窗口宽度改变时重绘
            resize:function(){
                var This = this;
                var canvas = document.getElementsByTagName('canvas');
                for(var i = 0,len = canvas.length;i < len;i++){
                    canvas[i].width = 100;
                    canvas[i].height = 100;
                }
                this.skill.forEach(function(ele,index){
                    This.draw(ele.degree,ele.id,100,50,50);
                });
            },
            //二维码展示
            showImg:function(text){
                this.imgShow = true;
                if(text == 'zhaojiling'){
                    this.img.imgSrc = this.img.zhaojiling;
                }
            },
            closeImg:function(){
                this.imgShow = false;
            },
            //播放音乐
            play:function(){
                this.music.play = true;
                this.controlShow = true;
                this.audio.play();
            },
            control:function(){
                if(this.music.play){
                    this.music.play = false;
                    this.audio.pause();
                }else{
                    this.music.play = true;
                    this.audio.play();
                }
            },
            chat:function(){
                var This = this;
                ajax({
                    method : 'post',
                    url:'http://www.tuling123.com/openapi/api',
                    data:{
                        info : This.info,  
                        key : '1f70b96b94f8f4a58b146fa750ba7249' 
                    },
                    success:function(data){
                        var data = JSON.parse(data);
                        data == null ? This.answer = '断电了……':This.answer = data.text;
                        This.answershow = true;
                        setTimeout(function(){
                            This.answershow = false;
                        },3000)                       
                    },
                    async : true
                });
            }

        }
    });
})