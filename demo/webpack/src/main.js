
import Vue from "../node_modules/.2.1.6@vue/dist/vue.min.js";
import VueRouter from "../node_modules/.2.3.0@vue-router/dist/vue-router.min.js"

require("./index.css");
require("./index.scss");

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
		path:'/',redirect: '/index',
	},
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
	

	