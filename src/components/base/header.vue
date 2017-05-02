<template>
	<div id="header">
		<header>
			<div class="head">
				<img src="../../assets/logo.png"alt="">
				<span @click='getList()'>{{str}}</span>
				<ul :class="show?'pc_list showList':'pc_list'">
					<li @click='getList()'>
						<router-link to='home'>首页</router-link>
					</li>
					<li @click='getList()'>
						<router-link to='me'>关于我</router-link>
					</li>
					<li @click='getList()'>
						<router-link to='life'>生活</router-link>
					</li>
					<li @click='getList()'>
						<router-link to='study'>学无止境</router-link>
					</li>
					<li @click='getList()'>
						<router-link to='discuss'>留言板</router-link>
					</li>
					<li @click='getList()'>
						<router-link to='music'>听会音乐</router-link>
					</li>
				</ul>
			</div>
		</header>
	</div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
        str : '• • •',
        show:true
    }
  },
  created: function() {
    if(window.screen.width>440){
    	this.str=''
    }
  },
  methods:{
  	getList (){
  		this.show=!this.show;
  	}
  }
}
</script>

<style lang='less' scoped>
  #header{
	width: 100%;
	height: 100px;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 101;
	background: #393D49;
	box-shadow: 0px 5px 15px #888888;
	.head{
		width: 1080px;
		height: 100%;
		margin:auto;
		img{
			width: 250px;
			display: block;
			float: left;
		}
		>span{
			display: none;
		}
		.pc_list{
			width: 830px;
			float: right;
			li{
				display: block;
				float: left;
				width: 130px;
				height: 100px;
				text-align: right;
				line-height: 100px;
				a{
					display: block;
					width: 100%;
					text-align: center;
					color: #fff;
					opacity: 0.6;
				}
				a:hover{
					opacity: 1;
				}
				.router-link-active{
					opacity: 1;
				}
			}
		}
	}
}
@media all and (max-width: 439px) {
	#header {
		height: 40px;
		.head{
			width: 100%;
			position: relative;
			img{
				height: 100%;
				width: auto;
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				top: 0;
				margin:auto;
			}
			>span{
				display: block;
				height: 40px;
				padding-left: 10px;
				line-height: 40px;
				text-align: left;
				font-size: 14px;
				color: #fff;
			}
			.pc_list{
				width: 100%;
				height: 240px;
				overflow: hidden;
				transition: all .3s ease;
				li{
					width: 100%;
					padding-left: 10px;
					float: none;
					height: 40px;
					line-height: 40px;
					text-align: left;
					font-size: 12px;
					background: #393D49;
					border-top: 1px #999 solid;
					font-size: 14px;
				}
			}
			.showList{
				height: 0;
				transition: all .3s ease;
			}
		}
	}

}
</style>