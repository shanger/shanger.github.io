require.config({
	paths:{
		vue:'../../../bower_components/vue/dist/vue.min',
		vueRouter:'../static/vue-router0_7.min',
		/*city:'city'*/
		city:'city'
	},
	shim: {　　　
　　}
});
requirejs(['vue','vueRouter','city'],function(Vue,VueRouter,city){
	var body = new Vue({
		el:'#body',
		data:{
			index:{
				age:''
			},
			bg:{
				'index':true,'message':false,'friends':false,'dynamic':false
			}
		},
		created:function(){
		},
		methods:{
			transform:function(){
				var heihei = this.$els.heihei;
				var class = heihei.getAttribute('class');
				if(class == 'heihei transform'){
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

	})
	Vue.use(VueRouter);

	var skill =  Vue.extend({
		template:'#skill',
		methods:{
			test:function(){
				console.log('gg');
			}
		}
	});
	var Works =  Vue.extend({
		template:'#works',

	});

	var SomeWords =  Vue.extend({
		template:'#someWords'
	});

	var Index = Vue.extend({
	    template: '#index',
	    data:function(){
	    	return {
	    		age : (new Date()).getFullYear() - 1995
	    	}
	    }
	});
	var about = new VueRouter();
	about.map({
	    '/index': {
		    component: Index,
		},
		'/skill': {
	        component: skill
	      },
        '/works': {
	        component: Works
        },
        '/someWords': {
          	component: SomeWords
        }
	});
	about.redirect({
	    '/': '/index'
	})
	var App = Vue.extend({});
	about.start(App, '#app');
	
});