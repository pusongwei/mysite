<template>
	<div class="zhe" @touchmove.prevent>
		<div class="tishi">
			<div class="con">
				<div class="top">
					<img src="http://static.lebo.baidu.com/st/i/XCtHkEGB.png" alt="">
					<span>需要百度乐播客户端支持</span>
				</div>
				<div class="bottom">
					<a href="https://itunes.apple.com/app/apple-store/id956391561?mt=8" target="_blank">
						立即下载
					</a>
				</div>
				<div class="guanbi" @click='gunbi'>
					<i></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
		  
		}
	},
	methods :{
		gunbi (){
			this.$emit('guanbi')
		}
	}
}
</script>

<style lang='less' scoped>
	.zhe{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.3);
	}
	.tishi{
		width: 100%;
		height: 100%;
		display:-webkit-box;
	    display: -moz-box;
	    display: -ms-flexbox;
		-webkit-box-pack:center;
		-moz-box-pack:center;
		-ms-box-pack:center;
		-webkit-box-align:center;
		-moz-box-align:center;
		-ms-box-align:center;
		overflow: hidden;
		.con{
			width: 270px;
			height: 150px;
			background: #fff;
			border-radius: 10px;
			position: relative;
			.top{
				width: 100%;
				height: 40px;
				line-height: 40px;
				text-align: center;
				margin-top: 20px;
				img{
					width: 28px;
					height: 40px;
				}
				span{
					font-size: 14px;
				}
			}
			.bottom{
			    margin-top: 20px;
			    a{
			    	display: block;
			    	margin:auto;
			    	width: 130px;
				    height: 40px;
				    text-align: center;
				    line-height: 40px;
				    background: #f60;
				    color: #000;
			    }
			}
			.guanbi{
				width: 36px;
				height: 36px;
				position: absolute;
				right: 0;
				top: 0;
				text-align: center;
				line-height: 36px;
				i{
					display: inline-block;
					width: 12px;
					height: 12px;
					background: url(../../../assets/lb.png)no-repeat;
					background-size: 492px 60px;
					background-position: -474px -12px;
				}
			}
		}
	}
</style>
