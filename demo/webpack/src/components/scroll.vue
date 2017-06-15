<template>
  <div>
    <h3>这里是滚动信息</h3>
    <div id="demo" class="qimo8" ref="demo">
        <div class="qimo">
            <div id="demo1" ref = "demo1"  v-bind:class="{hidden:demo1.hidden,top:demo1.position.top,mid:demo1.position.mid,bot:demo1.position.bot}">
                <ul>
                    <li v-for="item1 in demo1.data">{{item1.title}}</li>
                </ul>
            </div>
            <div id="demo2" ref = "demo2"  v-bind:class="{hidden:demo2.hidden,top:demo2.position.top,mid:demo2.position.mid,bot:demo2.position.bot}">
                <ul>
                    <li v-for="item2 in demo2.data">{{item2.title}}</li>
                </ul>
            </div>
            <div id="demo2" ref = "demo3"  v-bind:class="{hidden:demo3.hidden,top:demo3.position.top,mid:demo3.position.mid,bot:demo3.position.bot}">
                <ul>
                    <li v-for="item3 in demo3.data">{{item3.title}}</li>
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
      totalList:[
        [
          {title: '11111'},
          {title: '11111'},
          {title: '11111'},
          {title: '11111'},
          {title: '11111'}
        ],
        [
          {title: '22222'},
          {title: '22222'},
          {title: '22222'},
          {title: '22222'},
          {title: '22222'}
        ],[
          {title: '33333'},
          {title: '33333'},
          {title: '33333'},
          {title: '33333'},
          {title: '33333'}
        ],[
          {title: '44444'},
          {title: '44444'},
          {title: '44444'},
          {title: '44444'},
          {title: '44444'}
        ],
        [
          {title: '55555'},
          {title: '55555'},
          {title: '55555'},
          {title: '55555'},
          {title: '55555'}
        ],[
          {title: '66666'},
          {title: '66666'},
          {title: '66666'},
          {title: '66666'},
          {title: '66666'}
        ],
        [
          {title: '77777'},
          {title: '77777'},
          {title: '77777'},
          {title: '77777'},
          {title: '77777'}
        ]
      ],
      position:['bot','mid','top'],
      demo1:{
        data:null,
        hidden:false,
        position:{
          top:false,
          mid:true,
          bot:false
        }
      },
      demo2:{
        data:null,
        hidden:false,
        position:{
          top:false,
          mid:false,
          bot:true
        }
      },
      demo3:{
        data:null,
        hidden:false,
        position:{
          top:false,
          mid:false,
          bot:false
        }
      },
      count:1
    }
  },
  created () {
    this.demo1.data = this.totalList[0];
    this.demo2.data = this.totalList[1];
    this.demo3.data = this.totalList[2];
  },
  methods:{
    changeClass (e,index) {
      for(var key in e.position){
        if(key == this.position[index%3]){
          e.position[key] = true;
        }else{
          e.position[key] = false;
        }
      }
      if(this.position[index%3] == 'bot'){
        this.count++;
        e.data = this.totalList[this.count%this.totalList.length];
        e.hidden = true;           
      }else{
        e.hidden = false;
      }
    }
  },
  mounted () {
    var self = this;
    var i = 1,j = 0,k = -1,count = 1;
    setInterval(function(){
      i++;
      j++;
      k++;
      self.changeClass(self.demo1,i);
      self.changeClass(self.demo2,j);    
      self.changeClass(self.demo3,k);       

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
    
    
  },
  
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
      transition:transform 2s  ease-out;
      transform:translateZ(0);
    }
    .qimo8 .qimo > div.hidden{
      visibility:hidden;
    }
    .qimo8 .qimo > div:nth-of-type(1){
      /*top:0;*/
      transform: translateY(0); 
    }
    .qimo8 .qimo > div:nth-of-type(2){
      /*top:200px;*/
     transform: translateY(200px);
    }
    .qimo8 .qimo > div:nth-of-type(3){
      /*top:400px;*/
      transform: translateY(400px);
    }
    .qimo8 .qimo > div.top{
      transform: translateY(-200px);
    }
    .qimo8 .qimo > div.mid{
      transform: translateY(0px);
    }
    .qimo8 .qimo > div.bot{
      transform: translateY(200px);
    }
    .qimo8 .qimo ul{ overflow:hidden; }
    .qimo8 .qimo ul li{
      line-height:40px; list-style:none;
      text-align:center;
      background-color:#f0f0f0;
    }
</style>
