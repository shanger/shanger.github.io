<template>
  <div>
    <h3>这里是滚动信息</h3>
    <div id="demo" class="qimo8" ref="demo">
        <div class="qimo">
            <div id="demo1" ref = "demo1">
                <ul>
                    <li v-for="item1 in demo1">{{item1.title}}</li>
                </ul>
            </div>
            <div id="demo2" ref = "demo2">
                <ul>
                    <li v-for="item2 in demo2">{{item2.title}}</li>
                </ul>
            </div>
        </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'Scroll',
  data () {
    return {
      demo1: [
        {title: '11111'},
        {title: '22222'},
        {title: '33333'},
        {title: '44444'},
        {title: '55555'}
      ],
      demo2: [
        {title: '88888'},
        {title: '99999'},
        {title: '101010'},
        {title: '111111'},
        {title: '121212'}
      ]
    }
  },
  mounted () {
    var self = this;
    var demo = this.$refs.demo
    var demo1 = this.$refs.demo1
    var demo2 = this.$refs.demo2
    var top1 = demo1.offsetTop,top2 = demo2.offsetTop;
    var currentViewHeight = demo.offsetHeight;
    setInterval(function(){
      if(top1 < currentViewHeight){
        demo1.style.top = - top1++ + 'px';
      }else{
        demo1.style.top = currentViewHeight + 'px';
        top1 = -currentViewHeight;
        self.demo1.forEach(function(ele){
          ele.title = parseInt(ele.title) + 1
        })
      }
      if(top2 > -currentViewHeight){
        demo2.style.top =   top2-- + 'px'
      }else{
        demo2.style.top = currentViewHeight + 'px';
        top2 = currentViewHeight;
        self.demo2.forEach(function(ele){
          ele.title = parseInt(ele.title) - 1
        })
      }        
    },30)
    
  }
}
</script>
<style>
    div,li,ul{
      margin:0;padding:0;
    }
    .qimo8{ 
        margin:0 auto;
        overflow:hidden;
        width:400px;
        height:200px;
        background-color:#f0f0f0;
      }
      .qimo8 .qimo{
        position:relative;
        width:400px;
      }
      .qimo8 .qimo > div{
        position:absolute;
        left:0;
        width:100%;
      }
      .qimo8 .qimo > #demo1{
        top:0;
      }
      .qimo8 .qimo > #demo2{
        top:200px;
      }
.qimo8 .qimo ul{ overflow:hidden; }
.qimo8 .qimo ul li{
  line-height:40px; list-style:none;
  text-align:center;
}
</style>
