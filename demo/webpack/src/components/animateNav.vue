<script>
	//es6
    export default {
        el:"#animateNav",
         //data:function(){}，下面是es6写法
        data () {
            return {
            }
        },
    }
    
</script>
<template>
    <div class="animateNav">
		<ul class="move">
			<li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>10</li><li>11</li><li>12</li><li>13</li><li>14</li><li>15</li>
		</ul>
	</div>
</template>
<style >
	*{padding: 0;margin:0;}
	body{
		overflow: auto;font-size: 0;
		font-family: "Microsoft Yahei";
	}
	div.animateNav{
		width: 100%;
		height: 40px;
		background-color: black;
		overflow:hidden;
	}
	div.animateNav ul{	
		display: table;
		position: relative;		
		white-space: nowrap;				
		transform: translate(0px, 0px) translateZ(0px);
	    transition-duration: 0ms;
	    transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);
	}
	div.animateNav li{
		list-style: none;
		display: inline-block;
		width: 80px;
		height: 40px;line-height: 40px;
		text-align: center;
		font-size: 16px;
		color: #fff;
	}

</style>
