var http = require('http'); //http 网络
var fs = require('fs');	//流
var cheerio = require('cheerio'); //html 解析
var request = require('request');
var querySearch = 1;	//page id
var url = "http://blk.okcard.com/blk/tysh?&sccid=310000&scrtype=03&scdmc=松江&ddcurr=";
var imgUrls = [];	//待下载图片地址

//获取地址
function getHtml(href,search){
	var pageData = "";
	var req = http.get(href + search,function(res){
		res.setEncoding('utf-8');
		res.on('data',function(chunk){
			pageData += chunk;
		});
		res.on('end',function(){
			$ = cheerio.load(pageData);
			var li = $('ul.rs_line li');
			console.log(li.length[0].find('.tdz .dzl span'));
			li.each(function(index,ele){
				var address = li[index].find('.tdz .dzl span').text().trim();
				var name = li[index].find(' .pulp a').text().trim();
				var text = name + '\n' + address;
				console.log(text)
				var title = new_item.name;
				if((/[(鼓楼公路)|(泽悦路)|(德悦路)]/).test(address)){
					saveContent($,title,text)
				}
			})			
			
			//获取完毕
			if(search == pagemax){
				console.log("获取完毕！" );				
			}
		});

	})
}
//下载
function saveContent($,new_title,text){
	var txt = text;
	fs.appendFile('./data/'+new_title+'.txt',txt,'utf-8',function(error){
				console.log(error);
	});
}
var pagemax = 1;    // 获取10页的内容
function start(){
  for (var i = 1 ; i <= pagemax ; i++) {
    getHtml(url, i);
  }
}

start();

