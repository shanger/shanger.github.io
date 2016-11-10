var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var i = 0;
var url = "http://user.qzone.qq.com/2569202365/infocenter?ptsig=7d-6G4dWzMjmEUorrf5CSa1XK9Aev2d4WTYqT55RMKY_";

function fetchPage(x){
	startRequest(x);
}

function startRequest(x){
	http.get(x,function(res){
		var html = ''; //页面内容
		var titles = [];
		res.setEncoding('utf-8');
		//监听data事件  获取每次爬取的数据
		res.on('data',function(chunk){
			html += chunk;
		})
		//网页内容读取完毕 执行回调函数
		res.on('end',function(){
			var $ = cheerio.load(html);	//使用cheerio解析html
			//saveContent($);	//存储文章内容及标题
			saveImg($);		//存储图片鸡标题
		}).on('error',function(error){
			console.log(error);
		});
	})

}

function saveContent($,new_title){
	$('.article-content p').each(function(index,item){
		var x = $(this).text();
		var y = x.substring(0,2).trim();
		if(y == ''){
			x = x + '\n';
			fs.appendFile('./data/'+new_title+'.txt',x,'utf-8',function(error){
				console.log(error);
			});
		}
	});
}

function saveImg($){
	//近期访问好友图片
	console.log($('body').length)
	$('#visitMeContainer li > a >img').each(function(index,ele){
		var img_title = $(this).attr('alt');
		console.log(img_title)
		var img_src = $(this).attr('src');
		var img_filename = img_title + '.jpg';
		request.head(img_src,function(err,res,body){
			if(err)console.log(err);
		});
		request(img_src).pipe(fs.createWriteStream('./image/'+img_filename));
	})
}
fetchPage('http://news.gmw.cn/2016-11/08/content_22886008.htm');
