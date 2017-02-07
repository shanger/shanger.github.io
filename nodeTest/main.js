// var sayhi = require('./hello');
// hello = new sayhi();
// hello.setName('shanger');
// hello.sayHello();

// 触发事件
// var EventEmitter = require('events').EventEmitter; 
// var event = new EventEmitter(); 
// event.on('some_event', function() { 
// 	console.log('some_event 事件触发'); 
// }); 
// setTimeout(function() { 
// 	event.emit('some_event'); 
// }, 1000); 

//
var events = require('events');
var eventEmitter =  new events.EventEmitter();

//监听器1

var listener1 = function listener1(){
	console.log('监听器listener1执行');
}

//监听器2

var listener2 = function listener1(){
	console.log('监听器listener2执行');
} 

//绑定connection事件，处理函数为 listener1
eventEmitter.addListener('connection',listener1);

//绑定connection事件，处理函数为 listener2
eventEmitter.on('connection',listener2);
var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + "个监听器监听连接事件");

//处理connection事件
eventEmitter.emit('connection');

//移除绑定的listener1函数
eventEmitter.removeListener('connection',listener1);
console.log('listener1 不再受监听。');

//触发连接事件
eventEmitter.emit('connection');
eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + "个监听器监听连接事件");

console.log('程序执行完毕！');