// //es6语法：
// // import Vue from "../node_modules/vue/dist/vue.min.js";//其实不用写完，会自动查找。
// // 外部引入别的库都可以用这样的方式，比如jquery等。。
// // 引入我们编写的测试用vue文件。

// import MyApp from './components/radio.vue';
// import picker from './components/citypicker.vue';
// import autoComp from './components/autoComplet.vue';
// import scrollTop2Load from './components/scrollTop2Load.vue';
// import animateNav from './components/animateNav.vue';

// Vue.config.debug = true;//开启错误提示

// new Vue(MyApp);

// new Vue(picker);

// new Vue(autoComp);

// new Vue(scrollTop2Load);
// new Vue({   
//     el: '#body',  
//     components: { app }  
// })  

// var app = new Vue({
// 	el:'#body',
// 	data:{		
// 		aa:'ggg'
// 	}
// 	data(){
// 		return {
// 			aa:'ggg'
// 		}
// 	}
// })

import Vue from "../node_modules/.2.1.6@vue/dist/vue.min.js";
import VueRouter from "../node_modules/.2.3.0@vue-router/dist/vue-router.min.js"

Vue.use(VueRouter);
const skill =  ({
	template:'#skill',
	methods:{
		test:function(){
			console.log('gg');
		}
	}
});
const Works =  ({
	template:'#works',

});

const SomeWords =  ({
	template:'#someWords'
});

const indexChild =  ({
	props: ['msg'],
	template:'<p>{{msg}}</p>',

});

const Index = ({
    template: '#index',
    data:function(){
    	return {
    		age : (new Date()).getFullYear() - 1995,
    	}
    },
    components:{
    	'index-child':indexChild
    }
});

const routes = [
	{
		path:'/index',component: Index,
	},
	{
		path:'/skill',component: skill,
	},
	{
		path:'/works',component: Works,
	},
	{
		path:'/someWords',component: SomeWords,
	},
];
const router = new VueRouter({
	routes
});

var body = new Vue({
	el:'.body',
	data:{
		index:{
			age:''
		},
		bg:{
			'index':true,'message':false,'friends':false,'dynamic':false
		},
		text:'hi',
	},
	created:function(){
	},
	methods:{
		transform:function(){
			var heihei = this.$refs.heihei;
			var Tclass = heihei.getAttribute('class');
			if(Tclass == 'heihei transform'){
				heihei.setAttribute('class','heihei');
			}else{
				heihei.setAttribute('class','heihei transform');
			}
		},
		test:function(){
			console.log('gg');
		},
		load:function(){
			console.log((new Date()).toString())
		},
		load1:function(){
			console.log((new Date()).toString())
		}
	},
	router:router
});
	

	