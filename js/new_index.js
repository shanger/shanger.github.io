require.config({
	paths:{
		vue:'../bower_components/vue/dist/vue.min',
	},
});
requirejs(['vue'],function(Vue){
	new Vue({
    	el:'#container',
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
    			{name:'html',degree:'80'},
    			{name:'js/jq',degree:'60'},
    			{name:'css',degree:'80'},
    			{name:'vue',degree:'40'},
    		],
    	},
    	created:function(){
    		this.abortme[1].value = this.date.getFullYear()-1995;//计算年龄
    	}
    });
})