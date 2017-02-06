var fs = require('fs');

var data = "怕不怕";

var readerStream = fs.createReadStream('test2.txt');
var writerStream = fs.createWriteStream('test.txt');

// writerStream.write(data,'UTF8');

// writerStream.end();
readerStream.pipe(writerStream);

writerStream.on('finish',function(){
	console.log('写入完成。');
});

writerStream.on('error',function(err){
	console.log(err.stack);
});

console.log('gg');