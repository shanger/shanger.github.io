require.config({
	paths:{
		jquery:'../bower_components/jquery/dist/jquery.min',
		bootstrap:'../bower_components/bootstrap/dist/js/bootstrap.min',
		vue:'../bower_components/vue/dist/vue.min',
		touchSwipe:'../jquery.touchSwipe.min'
	},
	shim: {　　　
		'bootstrap':{
			deps: ['jquery'],
　　　　　　exports: 'bootstrap'
		},
		'touchSwipe': {
　　　　　　deps: ['jquery'],
　　　　　　exports: 'touchSwipe'
　　　　},
　　}
});
requirejs(['jquery','bootstrap','vue','touchSwipe'],function($,bootstrap,Vue){
	$(function(){
		$("#carousel").swipe(
        {
            swipe:function(event, direction, distance, duration, fingerCount) {
                 if(direction == "left"){
                      //alert($("#carousel .item").eq(2).hasClass('active'));
                      if( $("#carousel .item").eq(2).hasClass('active') ){
                        $("#carousel .item").eq(0).addClass('active').siblings('.item').removeClass('active');
                      }else{
                        $("#carousel").find('.active').removeClass('active').next('.item').addClass('active');
                      }
                    
                 }else if(direction == "right"){
                    if( $("#carousel .item").eq(0).hasClass('active') ){
                      $("#carousel .item").eq(2).addClass('active').siblings('.item').removeClass('active');
                    }else{
                      $("#carousel").find('.active').removeClass('active').prev('.item').addClass('active');
                    }                            
                 }   
                }
            }
        );   
        $('#chat').bind('keyup',function(e){
          e.stopPropagation();
          e.preventDefault();
          if(e.keyCode ==13 ){
            var info = $('#chat').val()  
            var url='http://www.tuling123.com/openapi/api'; 

            $.get(
              url,
              {  
              info : info,  
              key : '1f70b96b94f8f4a58b146fa750ba7249' 
              },
              function(json) {  
                if(json != null){  
                    $('#answer').html(json.text);  
                }else{  
                    $('#answer').html('断电了');;  
                }  
              }
            ); 

          }            
        })
	})
	new Vue({
    	el:'#body',
    	data:{
    		title:'单国力--shanger'
    	}
    });
})