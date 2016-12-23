<script>
    //es6
    export default {
        el:".radio",
         //data:function(){}，下面是es6写法
        data () {
            return {
                isWechat:false,
                name:'sex'
            }
        },
    }
</script>
<template>
    <span class="radio">
        <input type="radio" v-bind:checked="isWechat" v-bind:name="name">
        <span></span>
    </span>
</template>
<style >
	span,input[type="radio"]{
		margin: 0;padding: 0;
	}
    span.radio{
		display: inline-block;vertical-align: middle;
		width: 1rem;height: 1rem;position: relative;line-height:1rem;
		margin-left: 0.2rem;
	}
	span.radio input{
		position: absolute;top: 0;left: 0;z-index: 1;
		display: inline-block;width: 1rem;height: 1rem;
		border:none;outline: none;background-color: transparent;
		opacity: 0;

	}
	span.radio >span{
		position: absolute;top:0;left: 0;z-index: 0;
		display: inline-block;vertical-align: top;
		width: 1rem;height: 1rem;
		background-color: navy;
		background-size: cover;
	}
	span.radio input:checked +span{
		background-color: #f60;
	}
</style>
