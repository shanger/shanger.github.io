
    		var prev = document.querySelector('.prev');
    		var next = document.querySelector('.next');
    		var ul = document.querySelector('ul');
    		var i = 0;
    		prev.addEventListener('click',function(){
    			i++;
    			var li = document.querySelectorAll('li')[0].cloneNode(true);	    		
	    		ul.appendChild(li);
	    		var liF = document.querySelectorAll('li')[0];
	    		ul.removeChild(liF);
    			//ul.style.left = - i*185 +'px';
    		},false);
    		next.addEventListener('click',function(){
    			i--;
    			var liF = document.querySelectorAll('li')[0];
    			var liL = document.querySelectorAll('li')[2].cloneNode(true);	    		
	    		ul.insertBefore(liL,liF);
	    		var liL = document.querySelectorAll('li')[3];
	    		ul.removeChild(liL);
    			//ul.style.left =  -i*185 +'px';
    		},false);
    		window.onload = function(){
    			var warp2 = document.querySelector(".warp2")
		        var _box1 = document.querySelector(".warp2ul1");
		        var _box2 = document.querySelector(".warp2ul2");
		        var x = 0;
		        var open = true;
		        var fun = function(){
		   			if(open){
		   				_box1.style.left = x + 'px';
			            _box2.style.left = (x +740) + 'px';
			            x--;
			            if((x +740) == 0){
			                x = 0;
			            }
		   			}
		            
		        }
		        //setInterval(fun,1);
		        warp2.addEventListener('mouseover',function(){
	    			open =  false
	    		},false);
	    		warp2.addEventListener('mouseleave',function(){
	    			open =  true
	    		},false);
		    }