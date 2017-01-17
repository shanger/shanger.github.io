//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    info: [
      {title:'姓名',value:'单国力'},
      {title:'年龄',value:(new Date()).getFullYear() - 1995},
      {title:'毕业院校',value:'河南城建学院'},
      {title:'爱好',value:'篮球、唱歌、读书、做饭、LOL'},
    ],
    "tabBar": {
      "color":"#ddd",
      "selectedColor": "#ff",
      "borderStyle": "#fff",
      "backgroundColor": "#000",
      "list": [
        {
          "pagePath": "pages/index/index",
          "text": "首页"
        },
        {
          "pagePath": "pages/skill/skill",
          "text": "技术"
        },
        {
          "pagePath": "pages/works/works",
          "text":"作品"
        },
        {
          "pagePath": "pages/someWords/someWords",
          "text": "期望"
        }
      ],
      "position": "bottom"  
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
