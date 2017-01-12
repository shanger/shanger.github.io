'use strict'

var fs = require('fs')
var path = require('path')

// Define global Vue for server-side app.js
global.Vue = require('vue')

// Get the HTML layout
var layout = fs.readFileSync('./ssr.html', 'utf8')

// Create a renderer
var renderer = require('vue-server-renderer').createRenderer()

// Create an express server
var express = require('express')
var server = express()

// Serve files from the js directory
server.use('/js', express.static(
  path.resolve(__dirname, 'js')
))

// Handle all GET requests
server.get('*', function (request, response) {
  // Render our Vue app to a string
  renderer.renderToString(
    // Create an app instance
    require('./js/app')(),
    // Handle the rendered result
    function (error, html) {
      // If an error occurred while rendering...
      if (error) {
        // Log the error in the console
        console.error(error)
        // Tell the client something went wrong
        return response
          .status(500)
          .send('Server Error')
      }
      // Send the layout with the rendered app's HTML 这特么的才是关键啊
      response.send(layout.replace('<div id="app"></div>', html))
    }
  )
})

// Listen on port 5000
server.listen(5000, function (error) {
  if (error) throw error
  console.log('Server is running at localhost:5000')
})


function setCookie(name,value,time){
	var strsec = getsec(time);
	var exp = new Date();
	exp.setTime(exp.getTime()+strsec*1);
	document.cookie = name + '=' +escape(value)+':expires=' + exp.toGMTString();
}
function gesec(str){
	var str1 = str.substring(1,str.length)*1;
	var str2 = str.substring(0,1);
	switch(str2){
		case 's':
			return str1 * 1000;
			break;
		case 'm':
			return str1 * 1000*60;
			break;
		case 'h':
			return str1 * 1000*60*60;
			break;
		case 'd':
			return str1 * 10000*60*60*24;
			break;
		
	}
}
setCookie('a','1','s10')