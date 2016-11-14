require.config({
	paths:{
		vue:'../../../bower_components/vue/dist/vue.min',
		vueRouter:'../../../node_modules/vue-router/dist/vue-router0_7.min'
	},
	shim: {　　　
　　}
});
requirejs(['vue','vueRouter'],function(Vue,VueRouter){
	Vue.use(VueRouter);
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
	var Basic = Vue.extend({});
	router.start(Basic, '#basic')

	/*嵌套路由*/
	var routerBasic = new VueRouter();
	var Foo = Vue.extend({
		template : 
			'<div class="foo">' +
		      '<h2>This is Foo!</h2>' +
		      '<router-view></router-view>' + // <- nested outlet
		    '</div>'
	});
	var Bar = Vue.extend({
		template : '<div>this is bar</div>'
	});
	var Baz = Vue.extend({
		template : '<div>this is baz</div>'
	});
	routerBasic.map({
	    '/foo': {
		    // Foo is rendered when /foo is matched
		    component: Foo,
		    // add a subRoutes map under /foo
		    subRoutes: {
		    	'/': {
			        // This component will be rendered into Foo's <router-view>
			        // when /foo is matched. Using an inline component definition
			        // here for convenience.
			        component: {
			          template: '<p>Default sub view for Foo</p>'
			        }
			      },
		        '/bar': {
			        // Bar will be rendered inside Foo's <router-view>
			        // when /foo/bar is matched
			        component: Bar
		        },
		        '/baz': {
		          	// Same for Baz, but only when /foo/baz is matched
		          	component: Baz
		        }
		    }
		}
	});
	
	var Nested = Vue.extend({});
	routerBasic.start(Nested, '#Nested')

})