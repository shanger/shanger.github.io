<script>
    //es6
    export default {
        el:"#autoComplet",
        data () {
            return {
            	inputVal:'',
                compValue:[{title:"book",id:"0"},{title:"blue",id:"1"},{title:"fool",id:"2"},{title:"bus",id:'3'}],
        		selectValue:[],
        		filterVal:[],//过滤后的数组
            }
        },
        methods:{
        	inputKeyup (){
        		document.querySelector('.autoComp ul').style.display = 'block';
        		document.querySelector('.autoComp ul').style.top = document.querySelector('.autoComp').offsetHeight + 'px';
        		this.filterVal = [];
        		this.changeUl();
        	},
        	//filter
        	changeUl (){
	 			var that = this;
	 			var reg = new RegExp(this.inputVal,'g');
	 			this.compValue.forEach((ele) =>{ 				
	 				if(reg.test(ele.title)){
	 					that.filterVal.push({title:ele.title,id:ele.id})
	 				}
	 				
	 			});
	 			//console.log(Object.prototype.toString.call(that.filterVal))
	 		},
	 		select (id){
	 			var that = this;
	 			this.filterVal.forEach((ele,index) =>{ 
	 				if(ele.id == id){
	 					var Ttitle = that.filterVal[index].title;
	 					var Tid = that.filterVal[index].id;
	 					that.selectValue.push({title:Ttitle,id:Tid});
	 					document.querySelector('.autoComp ul').style.top = document.querySelector('.autoComp').offsetHeight + 'px';
	 				}	 				
	 			});	 			
	 			
	 		},
	 		remove (id){
	 			var that = this;
	 			this.selectValue.forEach((ele,index) =>{ 
	 				if(ele.id == id){
	 					that.selectValue.splice(index,1);
	 					document.querySelector('.autoComp ul').style.top = document.querySelector('.autoComp').offsetHeight + 'px';
	 				}	 				
	 			});
	 		}

        },
    }
</script>
<template>
    <div class="autoComp">
		<div class="spanList" v-el:parent>
			<span v-for="item in selectValue" v-bind:data_id="item.id">{{item.title}}<input type='button' v-on:click="remove(item.id)"/></span>
		</div><input type="text" name="" class="inputBox" v-on:keyup="inputKeyup()" v-model="inputVal"><ul v-el:valul>
			<li v-for="item in filterVal" v-on:click="select(item.id)" v-bind:data_index="item.id">{{item.title}}</li>
		</ul>
	</div>
</template>
<style >
	.autoComp,.autoComp *{
		margin:0;padding: 0;
		font-family: "Microsoft Yahei"
	}

	.autoComp{
		width: 400px;line-height: 42px;
		margin:50px auto;
		border:1px solid #162EA2;
		position: relative;
	}
	/*标签栏*/
	.spanList{
		display: inline-block;line-height: 42px;
		vertical-align: top;
	}
	.spanList span{
		display: inline-block;height: 30px;vertical-align: top;
		margin-top: 6px;
		line-height: 30px;
		padding: 0 6px;
		background-color: rgba(22,46,162,.6);
		border-radius: 4px;
		min-width: 60px;
		margin-left: 4px;
		font-size: 16px;
		position: relative;
	}
	.spanList span input{
		display: inline-block;
		position: absolute;width: 10px;height: 10px;
		top: -4px;right: -4px;
		background-color: #f60;
		border:none;outline: none;
		border-radius: 50%;
	}
	.inputBox{
		display: inline-block;width: 100px;height: 30px;
		vertical-align: top;
		margin-top: 6px;
		border:none;outline: none;
		padding-left: 4px;
		font-size: 20px;
		margin-left: 4px;border-radius: 4px;
		background-color: rgba(22,46,162,.2);
	}
	.autoComp ul{
		position: absolute;top: 39px;left: -1px;
		width: 400px;
		border:1px solid #162EA2;
		border-top: none;
		display: none;
		max-height: 240px;
		overflow-y: auto;
	}
	.autoComp ul li {
		list-style: none;
		height: 30px;
		padding-left: 5px;
		line-height: 30px;
		font-size: 16px;

	}
	.autoComp ul li:hover{
		background-color: rgba(22,46,162,.6);
		color: white;
	}

</style>
