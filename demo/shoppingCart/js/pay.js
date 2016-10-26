var index =  new Vue({
	el:'#pay',
	data:{
		good:{
			title:'title',
			note:'note',
			count:555,
			origin:'33',
			current:'22',
			id:'66'
		},
		address:{
			name:'单国力',
			number:'13243188551',
			address:'上海上海市松江区泗泾镇德宁苑3号楼1604',
		},
		//支付方式
		payWays:{
			alipay:true,
		},
		postData:{
			ApplyCount:1
		},
	},
	created:function(){
	},
	methods:{
		raidoChick:function(){
            if(!this.$els.radio.checked){
                this.payWays.alipay = false;
            }else{
                this.payWays.alipay = true;
            }
        },
        /*数量加减*/
        reduce:function(){
            if(this.postData.ApplyCount>1){
                this.postData.ApplyCount--;
                this.moneycount = this.postData.ApplyCount*this.price;
                this.moneycount = this.moneycount.toFixed(2);
            }
        },
        add:function(){
            this.postData.ApplyCount++;
            this.moneycount = this.postData.ApplyCount*this.price;
            this.moneycount = this.moneycount.toFixed(2);
        },
        EditAddress:function(){
        	this.$els.edit.click();
        }
	},
});