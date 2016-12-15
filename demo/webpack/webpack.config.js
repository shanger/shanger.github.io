var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

//路径

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH,'bulid');	//生成文件路径

module.exports = {
	//项目的文件夹 可以直接用文件夹名称 默认会找indexjs 也可以确定是哪个文件名字
	entry:APP_PATH,
	//输出文件名 合并命名为bundle.js
	output:{
		path:BUILD_PATH,
		filename:'bunle.js'
	},
	//添加我们的插件 会自动生成一个html文件
	plugins:[
		new HtmlwebpackPlugin({
			title:'hello world app'
		})
	],
	devServer:{
		historyApiFallback:true,
		hot:true,
		inline:true,
		progress:true,
	}
}