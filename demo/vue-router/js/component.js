require.config({
	paths:{
		vue:'../../../bower_components/vue/dist/vue.min',
	},
	shim: {　　　
　　}
});
requirejs(['vue'],function(Vue){
	Vue.component('simple-counter',{
		template:'<button v-on:click="counter += 1">{{counter}}</button>',
		data:function(){
			return {
				counter:0
			}
		}
	});
	Vue.component('child',{
		props:['message'],
		template:'<p>{{message}}</p>',
	});
	Vue.component('activeProps',{
		props:['message'],
		data:function(){
			return {
				inputVal:''
			}
		},
		template:'<p>{{message}}</p>',
	});

	Vue.directive('reverse',function(value){
	})

	new Vue({
		el:'#body',
		data:{
			message:'sdfa',
			ceshi:'saser'
		}
	})
	
});