require.config({paths:{vue:"../../../static/js/vue.min"},shim:{}}),requirejs(["vue"],function(t){new t({el:"#app",data:{li:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],rightLi:[{text:"a",active:!0},{text:"b",active:!1},{text:"c",active:!1},{text:"d",active:!1},{text:"e",active:!1},{text:"f",active:!1},{text:"g",active:!1},{text:"h",active:!1},{text:"i",active:!1},{text:"j",active:!1},{text:"k",active:!1},{text:"l",active:!1},{text:"m",active:!1},{text:"n",active:!1},{text:"o",active:!1},{text:"p",active:!1},{text:"q",active:!1},{text:"r",active:!1},{text:"s",active:!1},{text:"t",active:!1},{text:"u",active:!1},{text:"v",active:!1},{text:"w",active:!1},{text:"x",active:!1},{text:"y",active:!1},{text:"z",active:!1},{text:"#",active:!1}],rightLiLineHeight:"",rightLiFontSize:"",rightShowText:"",rightLiSpan:""},created:function(){this.rightLiSet(),this.touches()},methods:{rightLiSet:function(){var t=this;this.resize(),window.addEventListener("resize",function(){t.resize()},!1)},resize:function(){var t=document.querySelector(".body"),i=t.offsetHeight;this.rightLiLineHeight=i/28+"px",this.rightLiFontSize=i/28*.6+"px",this.rightLiSpan=i/28*.8+"px"},touches:function(){var t=this;!function(){var t=function(t){var i=this;this.config=t,this.control=!1,this.sPos={},this.mPos={},this.dire,this.tolerance=20,this.config.bind.addEventListener("touchstart",function(t){return i.start(t)},!1),this.config.bind.addEventListener("touchmove",function(t){return i.move(t)},!1),this.config.bind.addEventListener("touchend",function(t){return i.end(t)},!1)};t.prototype.start=function(t){var i=t.touches?t.touches[0]:t;this.sPos.x=i.clientX,this.sPos.y=i.clientY},t.prototype.move=function(t){var i=t.touches?t.touches[0]:t;this.control=!0,this.mPos.x=i.clientX,this.mPos.y=i.clientY,this.mPos.y>this.sPos.y&&Math.abs(this.mPos.x-this.sPos.x)<this.tolerance&&(this.dire="D"),this.mPos.y<this.sPos.y&&Math.abs(this.mPos.x-this.sPos.x)<this.tolerance&&(this.dire="U"),this.mPos.x>this.sPos.x&&Math.abs(this.mPos.y-this.sPos.y)<this.tolerance&&(this.dire="R"),this.mPos.x<this.sPos.x&&Math.abs(this.mPos.y-this.sPos.y)<this.tolerance&&(this.dire="L"),this.config.backfn(this)},t.prototype.end=function(t){this.config.end(this)},window.LSwiperMaker=t}();new LSwiperMaker({bind:document.querySelector(".right"),backfn:function(i){if("U"!=i.dire&&"D"!=i.dire)return!1;var e=Math.ceil(i.mPos.y/parseInt(t.rightLiLineHeight))-2;t.$els.showtext.style.top=i.mPos.y-parseInt(t.rightLiLineHeight)+"px",t.rightShowText=t.rightLi[e>0?e:0].text,t.rightLi.forEach(function(t,i){i==e?t.active=!0:t.active=!1}),document.querySelector(".body").scrollTop=e*document.querySelector("ul.big li").offsetHeight},end:function(){t.rightShowText="",t.$els.showtext.style.top="0px"}})}}})});