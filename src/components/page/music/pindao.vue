<template>
	<div class="pindao">
		<ul class="list">
			<li v-for='item in list' @click='gopindao(item)'>{{item.tag_name}}</li>
			<li class="pcnone last"></li><li class="pcnone"></li>
		</ul>
	</div>
</template>

<script>
export default {
	props:{
	    list : {
	      type:Array,
	      default :function(){}
	    }
	},
	methods :{
		gopindao(item){
			this.$emit('gop',item)
		}
	}
}
</script>

<style lang='less' scoped>
.list{
		width: 100%;
		li{
			width: 10%;
			height: 37px;
			font-size: 14px;
			background: #fff;
			display: inline-block;
			text-align: center;
			line-height: 37px;
			border:1px #e8e8e8 solid;
			margin-left: -1px;
			margin-top: -1px;
		}
		.pcnone{
			display: none;
		}
}
@media all and (max-width: 439px) {
	.list{
		padding:0 10px;
		box-sizing:border-box;
		li{
			width: 25%;
		}
		.pcnone{
			display: inline-block;
			float: right;
		}
		.last{
			margin-right: 4px;
		}
	}
}
</style>