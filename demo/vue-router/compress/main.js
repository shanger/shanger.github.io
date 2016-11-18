require.config({
	paths:{
		vue:'../../../bower_components/vue/dist/vue.min',
		vueRouter:'../../../node_modules/vue-router/dist/vue-router0_7.min',
		/*city:'city'*/
		city:'../js/city'
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
			this.index.age = (new Date()).getFullYear() - 1995;
		},
		methods:{
			color1:function(){
				var This = this;
				for(key in this.bg){
					this.bg[key] = false;
				}
				this.bg.index = true
			},
			color2:function(){
				var This = this;
				for(key in this.bg){
					this.bg[key] = false;
				}
				this.bg.message = true
			},
			color3:function(){
				var This = this;
				for(key in this.bg){
					this.bg[key] = false;
				}
				this.bg.friends = true
			},
			color4:function(){
				var This = this;
				for(key in this.bg){
					this.bg[key] = false;
				}
				this.bg.dynamic = true
			}
		},

	})
	Vue.use(VueRouter);

	var skill =  Vue.extend({
		template:'#skill'
	});
	var Works =  Vue.extend({
		template:'#works'
	});
	var SomeWords =  Vue.extend({
		template:'#someWords'
	});
	var Index = Vue.extend({
	    template: '#index'
	})
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
	about.start(App, '#app')
});