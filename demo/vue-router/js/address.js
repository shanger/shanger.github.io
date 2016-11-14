require.config({
	paths:{
		vue:'../../../bower_components/vue/dist/vue.min',
		vueRouter:'../../../node_modules/vue-router/dist/vue-router0_7.min',
		city:'city'
	},
	shim: {　　　
　　}
});
requirejs(['vue','vueRouter','city'],function(Vue,VueRouter,city){
	var body = new Vue({
		el:'#body',
		data:{
			provincialLevel:'',
			cityLevel:'',
			area:'',
			bg:{
				'index':true,'message':false,'friends':false,'dynamic':false
			}
		},
		created:function(){
			this.provincialLevel = provincialLevel;
			this.cityLevel = cityLevel;
			this.area = levl3;
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
	var Address =  Vue.extend({
		template:'<h2 class="index">地址选择</h2>'
	});
	var Province =  Vue.extend({
		template:'<h2 class="message">消息</h2>'
	});
	var City =  Vue.extend({
		template:'<h2 class="friends">联系人</h2>'
	});
	var Area =  Vue.extend({
		template:'<h2 class="dynamic">动态</h2>'
	});
	var address = new VueRouter();
	address.map({
	    '/address': {
		    component: Address,		   
		},
		'/province': {
	        component: Province
	      },
        '/city': {
	        component: City
        },
        '/area': {
          	component: Area
        }
	});
	var App = Vue.extend({});
	address.start(App, '#app')
});