(function(){ 
	var formChecker = function(o){
		var that = this;
		this.config = o;
		this.innerHtml = '';
		var obj = this.config.options;
		for(var key in obj){
			this.innerHtml +='<div ><input type="'+obj[key].type+'"  name="'+obj[key].name+'" placeholder="'+obj[key].placeholder+'"><p></p></div>'
		}
		this.config.bind.innerHTML = this.innerHtml;
		this.config.bind.addEventListener('focus',function(ev){
			ev.target.nextSibling.setAttribute('class','focus');
			ev.target.nextSibling.innerHTML = obj[ev.target.name].placeholder;
			
			
		},true);
		this.config.bind.addEventListener('blur',function(ev){
			var reg = obj[ev.target.name].reg ? obj[ev.target.name].reg : /\d{1000000000}/;
			if(!reg.test(ev.target.value)){
				ev.target.nextSibling.setAttribute('class','error');
				ev.target.nextSibling.innerHTML = obj[ev.target.name].error;
			}else{
				ev.target.nextSibling.innerHTML = '';
			}
		},true);
	}             
    window.formChecker = formChecker;
}())
var myform = new formChecker({
    bind:document.querySelector('.form'),  // 绑定的DOM对象
    options:{
    	account:{
    		name:'account',
    		type:'text',
    		placeholder:'请输入6-20位账号',
    		error:'您的账号不满足条件',
    	},
    	password:{
    		name:'password',
    		type:'password',
    		placeholder:'请输入密码',
    		error:'',
    	},
    	checkpassword:{
    		name:'checkpassword',
    		type:'password',
    		placeholder:'请再次输入密码',
    		error:'两次密码输入的不一致',
    	},
    	mail:{
    		name:'mail',
    		type:'text',
    		placeholder:'请输入您的邮箱',
    		error:'请输入正确的邮箱账号',
    		reg:/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
    	},
    },
    backfn:function(o){ 
    }
});