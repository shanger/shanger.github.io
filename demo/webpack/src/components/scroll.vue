<template>
  <div>
    <h3>这里是滚动信息</h3>
    <div id="demo" class="qimo8" ref="demo">
        <div class="qimo">
            <div id="demo1" ref = "demo1" v-bind:style="{top:demo1Top}" v-bind:class="{hidden:demo1Hidden}">
                <ul>
                    <li v-for="item1 in demo1">{{item1.title}}</li>
                </ul>
            </div>
            <div id="demo2" ref = "demo2" v-bind:style="{top:demo2Top}" v-bind:class="{hidden:demo2Hidden}">
                <ul>
                    <li v-for="item2 in demo2">{{item2.title}}</li>
                </ul>
            </div>
            <div id="demo2" ref = "demo3" v-bind:style="{top:demo3Top}" v-bind:class="{hidden:demo3Hidden}">
                <ul>
                    <li v-for="item3 in demo3">{{item3.title}}</li>
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
      ],
      demo3: [
        {title: '131313'},
        {title: '141414'},
        {title: '151515'},
        {title: '161616'},
        {title: '171717'}
      ],
      demo1ClassList:['mid','top'],
      demo2ClassList:['bot','mid','top'],
      position:['200px','0','-200px'],
      demo1Hidden:false,
      demo2Hidden:false,
      demo3Hidden:false,
      demo1Top:'0',
      demo2Top:'200px',
      demo3Top:'400px'
    }
  },
  created () {
    //this.dome1Class = this.demo1ClassList[0];
    this.dome2Class = this.demo2ClassList[0]
  },
  mounted () {
    var self = this;
    var i = 1,j = 0,k = -1,count = 0;
    setInterval(function(){
      i++;
      j++;
      k++;
      self.demo1Top = self.position[i%3]
      self.demo2Top = self.position[j%3]
      self.demo3Top = self.position[k%3]

      if(self.position[i%3] == '200px'){
        self.demo1Hidden = true;
      }else{
        self.demo1Hidden = false;
      }
      if(self.position[j%3] == '200px'){
        self.demo2Hidden = true;
      }else{
        self.demo2Hidden = false;
      }
      if(self.position[k%3] == '200px'){
        self.demo3Hidden = true;
      }else{
        self.demo3Hidden = false;
      }
      count++;
      if(count%3 == 0){
        self.demo1.forEach(function(ele){
          ele.title = parseInt(ele.title) + 1
        })
        self.demo2.forEach(function(ele){
          ele.title = parseInt(ele.title) + 1
        })
        self.demo3.forEach(function(ele){
          ele.title = parseInt(ele.title) + 1
        })
      }
      /*if(top1 < currentViewHeight){
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
      }*/   
    },3000);
    
    
  }
}
</script>
<style lang="scss">
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
      background-color:#f0f0f0;
    }
    .qimo8 .qimo > div{
      position:absolute;
      left:0;
      width:100%;
      transition:top 2s  ease-out;
      transform:translateZ(0);
    }
    .qimo8 .qimo > div.hidden{
      visibility:hidden;
    }
    .qimo8 .qimo > div:nth-of-type(1){
      top:0;
      /*transform: translate(0, 0);
      animation: top1 8s linear infinite;*/   
    }
    .qimo8 .qimo > div:nth-of-type(2){
      top:200px;
     /*transform: translate(0, 200px);
      animation: top2 8s linear infinite;*/
    }
    .qimo8 .qimo > div:nth-of-type(3){
      top:400px;
     /*transform: translate(0, 400px);
      animation: top3 8s linear infinite;*/
    }
    .qimo8 .qimo ul{ overflow:hidden; }
    .qimo8 .qimo ul li{
      line-height:40px; list-style:none;
      text-align:center;
      background-color:#f0f0f0;
    }
    @keyframes top1{
      0%{
        transform: translate(0, 0);
      }
      25%{
        transform: translate(0, -200px);
      }
      50%{
        transform: translate(0, 400px);
      }
      75%{
        transform: translate(0, 200px);
      }
      100%{
        transform: translate(0, 0);
      }
    }
    @keyframes top2{
      0%{
        transform: translate(0, 200px);
      }
      25%{
        transform: translate(0, 0px);
      }
      50%{
        transform: translate(0, -200px);
      }
      75%{
        transform: translate(0, 400px);
      }
      100%{
        transform: translate(0, 200px);
      }
    }
    @keyframes top3{
      0%{
        transform: translate(0, 400px);
      }
      25%{
        transform: translate(0, 200px);
      }
      50%{
        transform: translate(0, 0px);
      }
      75%{
        transform: translate(0, -200px);
      }
      100%{
        transform: translate(0, 400px);
      }
    }
</style>
