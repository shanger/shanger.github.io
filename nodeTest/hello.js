function Sayhi(){
	var name ;
	this.setName = function(thyName){
		name = thyName;
	};
	this.sayHello = function(){
		console.log('hello '+name);
	}
};
module.exports = Sayhi;