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
		<div class="bg">
			<bgImgRotate></bgImgRotate>
		</div>
	</div>
</template>

<script>
import bgImgRotate from '@/components/base/bgimg.vue'
export default {
	name: 'home',
	components: {
		bgImgRotate
	},
	data (){
		return {
			show:false,
			skill : [['html+css',80],['html5+css3',80],['javascript',80],['jquery、zepto',80],['vue',70],['angular',60],['php',40],['nodejs',40],['mysql',30]]
		}
	},
	mounted (){
		this.init()
	},
	methods :{
		init (){
			var that = this;
			var span = that.$refs.spans;
			for(var i=0;i<span.length;i++){
				span[i].childNodes[0].style.width = that.skill[i][1]+"%";
			}
			that.show = true;
		},
		abc (){
			this.show = !this.show;
		}
	}
}
</script>

<style lang='less' scoped>
.bg{
	position: absolute;
	left:0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 5;
	padding-top: 100px;
}
button{
	position: relative;
	z-index: 6;
}
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
		position: relative;
		z-index: 10;
		img{
			width: 100px;
			height: 100px;
			border-radius: 100%;
		}
	}
	.skill{
		flex-grow:1;
		margin-left: 50px;
		position: relative;
		z-index: 10;
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
		b{
			width: 120px;
			display: block;
			color: #fff;
		}
	}
}
@media all and (max-width: 439px) {
	.bg{
		display: none;
	}
	.home{
		padding:0;
		margin-top: 20px;
		display:block;
		.my{
			margin:0 auto;
		}
		.skill{
			margin-left: 10px;
			b{
				width: 120px;
				display: block;
				color: #000;
			}
		}
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
