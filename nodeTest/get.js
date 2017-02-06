var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req,res){
	// get请求的数据
	res.writeHead(200,{'Content-Type':'text/plain'});
	var params =  url.parse(req.url,true).query;
	res.write('网站名：'+params.name+'\n');
	res.write('网站URL:'+params.url);
	res.end();
	
}).listen(3000);