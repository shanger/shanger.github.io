var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var i = 0;
var url = "http://www.ss.pku.edu.cn/index.php/newscenter/news/2391";

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
			var time = $('.article-info a:first-child').next().text().trim();
			var new_item = {
				title:$('div.article-title a').text().trim(),
				Time:time,
				link:"http://www.ss.pku.edu.cn" + $("div.article-title a").attr('href'),
				author:$('[title=供稿]').text().trim(),
				i:i++
			};
			var new_title = $('div.article-title a').text().trim();
			saveContent($,new_title);	//存储文章内容及标题
			saveImg($,new_title);		//存储图片鸡标题
			//下一条新闻的链接
			var nextLink="http://www.ss.pku.edu.cn" + $("li.next a").attr('href');
            str1 = nextLink.split('-');  //去除掉url后面的中文
            str = encodeURI(str1[0]);  
            //这是亮点之一，通过控制I,可以控制爬取多少篇文章.
            if (i <= 10) {                
                fetchPage(str);
            }
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

function saveImg($,new_title){
	$('.article-content img').each(function(index,item){
		var img_title = $(this).parent().next().text().trim();
		if(img_title.length > 35||img_title==''){
			img_title="null";
		}
		var img_filename = img_title + '.jpg';
		var img_src = 'http://www.ss.pku.edu.cn' + $(this).attr('src');
		request.head(img_src,function(err,res,body){
			if(err)console.log(err);
		});
		request(img_src).pipe(fs.createWriteStream('./image/'+new_title+'--'+img_filename));
	})
}
fetchPage(url);
