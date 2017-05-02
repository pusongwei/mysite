<template>
	<div class="life">
		<p>没有情调，不懂浪漫，也许这是程序员的一面，但拥有朴实无华的爱是他们的另一面。</p>
	</div>
</template>

<script>
export default {
	data () {
		return {
		  msg: 'Welcome to Your Vue.js App'
		}
	}
}
</script>

<style lang='less' scoped>
		.life{
		>p{
			text-align: right;
			font-size: 14px;
			padding-top: 10px;
			color: #999;
		}
	}
@media all and (max-width: 439px){
	.life{
		>p{
			text-align: center;
			font-size: 14px;
			padding-top: 10px;
			color: #999;
		}
	}
}
</style>
