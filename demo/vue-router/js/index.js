require.config({
	paths:{
		vue:'../../../bower_components/vue/dist/vue.min',
	},
	shim: {　　　
　　}
});
requirejs(['vue'],function(Vue){
	Vue.component('child',{
		template:'<div>{{text}}<slot name="header"></slot><slot></slot></div>'
	});
	new Vue({
		el:'#app',
		data (){
			return{
				text:'ggg',
				message : 'nihao'
			}
			
		}
	})
	window.onbeforeunload = function()
	{
	    return "真的离开?";
	}
});