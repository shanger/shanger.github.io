require.config({
	paths:{
		vue:'../../../bower_components/vue/dist/vue.min',
		vueRouter:'../../../node_modules/vue-router/dist/vue-router.min'
	},
	shim: {　　　
　　}
});
requirejs(['vue','vueRouter'],function(Vue,VueRouter){
	var Home = Vue.extend({
	    template: '<div><h1>Home</h1><p>{{msg}}</p></div>',
	    data: function() {
	        return {
	            msg: 'Hello, vue router!'
	        }
	    }
	});
	
	var About = Vue.extend({
	    template: '<div><h1>About</h1><p>This is the tutorial about vue-router.</p></div>'
	});
	var router = new VueRouter();
	router.map({
	    '/home': { component: Home },
	    '/about': { component: About }
	});
	var App = Vue.extend({})
	router.start(App, '#app')

})