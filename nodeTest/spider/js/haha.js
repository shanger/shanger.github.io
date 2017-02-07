var http = require('http'); //http 网络
var fs = require('fs');	//流
var cheerio = require('cheerio'); //html 解析
var request = require('request');
var querySearch = 1;	//page id
var url = "http://www.haha.mx/topic/1/new/";
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
			var html = $('.joke-list-item .joke-main-content a img');
			for(var i = 0;i < html.length;i++){
				var src = html[i].attribs.src;
				if(src.indexOf('http://image.haha.mx') > -12){
					imgUrls.push(src);
				}
			}
			//获取完毕
			if(search == pagemax){
				console.log("图片链接获取完毕！" );
				console.log("链接总数量：" + imgUrls.length);
				if(imgUrls.length > 0){
					downloadImg(imgUrls.shift());
				}
				else{
					console.log("下载完毕");
				}
			}
		});

	})
}
//下载

function downloadImg(imgurl){
	var newArr = imgurl.replace("http://image.haha.mx/",'').split('/');
	http.get(imgurl.replace(/small/,'big'),function(res){
		var imgData = '';
		//设置response的编码方式为binary 否则下载来的图片打不开
		res.setEncoding('binary');
		res.on("data",function(chunk){
			imgData += chunk;
		});
		res.on('end',function(){
			var savePath = "../image/" + newArr[0] + newArr[2] + newArr[3] +'_' + newArr[4];
			//保存图片
			fs.writeFile(savePath,imgData,'binary',function(err){
				if(err){
					console.log(err);
				}else{
					console.log(newArr[0] + newArr[2] + newArr[3] +'_' + newArr[4]);
					if(imgUrls.length > 0){
						downloadImg(imgUrls.shift());
					}
					else{
						console.log("下载完毕");
					}
				}
			})
		})
	})
}
var pagemax = 10;    // 获取10页的内容
function start(){
  console.log("开始获取图片连接");
  for (var i = 1 ; i <= pagemax ; i++) {
    getHtml(url, i);
  }
}

start();

