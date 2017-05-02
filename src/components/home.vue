<template>
	<div class="home">
		<div class="my">
			<img src="../assets/my.png" alt="">
		</div>
		<div class="skill">
			<div v-for='item in skill'>
				<b>{{item[0]}}</b>
				<span class="span1" ref='spans'>
					<span>
						<transition name='fade'>
							<span class="span2" v-if='show'>
								{{item[1]}}%
							</span>
						</transition>
					</span>
				</span>
			</div>
		</div>
		<button @click='abc'>点击</button>
	</div>
</template>

<script>
export default {
	name: 'home',
	data (){
		return {
			show:false,
			skill : [['html+css',80],['html5+css3',80],['javascript',80],['jquery、zepto',80],['vue',70],['angular',60],['php',40],['nodejs',40],['mysql',30]]
		}
	},
	created (){
		this.init()
	},
	methods :{
		init (){
			var that = this;
			setTimeout(function(){
				var span = that.$refs.spans;
				for(var i=0;i<span.length;i++){
					span[i].childNodes[0].style.width = that.skill[i][1]+"%";
				}
				that.show = true;
			},1000)
		},
		abc (){
			this.show = !this.show;
		}
	}
}
</script>

<style lang='less' scoped>
.home{
	margin-top: 100px;
	display:flex;
	align-items:center;
	width: 100%;
	height: 100%;
	padding:0 150px;
	.my{
		width: 200px;
		text-align: center;
		line-height: 100%;
		img{
			width: 100px;
			height: 100px;
			border-radius: 100%;
		}
	}
	.skill{
		flex-grow:1;
		margin-left: 50px;
		div{
			margin-top: 10px;
			display:flex;
			.span1{
				flex-grow:1;
				display: block;
				height: 30px;
				>span{
					display: block;
					height: 30px;
					text-align: left;
				}
			}
			b{
				width: 120px;
				display: block;
			}
			.span2{
				display: inline-block;
				width: 100%;
				text-align: right;
				padding-right: 10px;
				height: 30px;
				line-height: 30px;
				font-size: 14px;
				background:#00DDDD;
			}
		}
	}
}
@media all and (max-width: 439px) {
	.home{
		padding:0;
	}
}
.fade-enter-active {
  animation: fade-in 2s;
}
.fade-leave-active {
  animation: fade-out 2s;
}
@keyframes fade-in {
	0% {
		width: 0%;
	}
	100% {
		width: 100%;
	}
}
	@keyframes fade-out {
	0% {
		width: 100%;
	}
	100% {
		width: 0%;
	}
}
</style>
