<template>
	<div class="bang">
		<ul class="list2">
			<li v-for='(item,i) in bang'>
				<div class="two" @click='playb(item,i)'>
					<img :src="item.album_pic[0].pi_link" alt="">
					<span class="rank not_start" ref='rank'>
						<img class="img1" src="http://static.lebo.baidu.com/st/i/H51z9oS0.png" alt="">
						<img class="img2" src="http://static.lebo.baidu.com/st/i/9uFQlWY5.gif" alt="">
						<img class="img3" src="http://static.lebo.baidu.com/st/i/OfIYWWkI.png" alt="">
					</span>
				</div>
				<div class="info" @click='musicList(item)'>
					<h2>{{item.album_title}}</h2>
					<h3>{{item.artist_name}}</h3>
					<div class="top">
						<span class="top_span">音乐</span>
						<span>音乐推荐</span>
					</div>
					<span class="linsten">
						<i></i>
						{{parseInt(item.statistics.play_count/1000)/10}}万
					</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props:{
	    bang : {
	      type:Array,
	      default :function(){}
	    },
	    audioPlay : {
	    	type:Boolean,
	    	default :''
	    },
	    play : {
	    	type:String,
	    	default:''
	    }
	},
	data (){
		return {
			index:0
		}
	},
	watch : {
		audioPlay (){
			this.setClass();
		}
	},
	mounted (){
		if (this.play == 'no') {return false}
		if (this.play == 'yes') {
			this.$refs.rank[this.index].className = 'rank plays'
		}else{
			this.$refs.rank[this.index].className = 'rank zan'
		}
	},
	methods : {
		playb (item,i){
			this.index = i;
			this.$emit('bangClick',{item:item,i:i,time:+new Date()})
			this.setClass(this.index==i);
		},
		setClass (){
			for(var j=0;j<this.$refs.rank.length;j++){
				this.$refs.rank[j].className = 'rank not_start';
			}
			if (this.audioPlay) {
				this.$refs.rank[this.index].className = 'rank plays'
			}else{
				this.$refs.rank[this.index].className = 'rank zan'
			}
		},
		musicList (item){
			this.$emit('musicList',{item:item})
		}
	}
}
</script>

<style lang='less' scoped>
.list2{
width: 100%;
padding:0 14px;
	li{
		border-bottom: 1px solid #e2e2e2;
		display: -webkit-box;
		-webkit-box-pack: center;
		-webkit-box-direction: normal;
		-webkit-box-align: center;
		padding: 7px 0 7px 0;
		position: relative;
		margin-bottom: 5px;
		margin-right: 5px;
	}
}
.two{
	border: 1px solid #dfdfdf;
	margin-right: 10px;
	img{
		width: 80px;
		height: 80px;
		vertical-align: middle;	
	}
}
.rank{
	position: absolute;
	width: 36px;
	height: 36px;
	left: 44px;
	bottom: 7px;
	img{
		width: 25px;
		height: 25px;
		position: relative;
		top: 5px;
		left: 5px;
		display: none;
	}
}
.not_start .img1{
	display: block;
}
.plays .img2{
	display: block;
}
.zan .img3{
	display: block;
}
.info{
	display: block;
	-webkit-box-flex: 1;
	color: #999;
	position: relative;
	a{
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
	h2{
		font-weight: normal;
		color: #252525;
		font-size: 16px;
		line-height: 20px;
	}
	h3{
		font-weight: normal;
		margin-top: 10px;
		font-size: 13px;
	}
}
.top{
	display: inline-block;
	margin-top: 10px;
	span{
		display: inline-block;
		padding:3px;
		border: 1px #e2e2e2 solid;
		border-radius:3px;
		font-size: 10px;
	}
	.top_span{
		border: 1px #f60 solid;
		color: #f60;
	}
}
.linsten{
	float: right;
	font-size: 12px;
	margin-top: 10px;
	i{
		display: inline-block;
		width: 10px;
		height: 10px;
		background: url(../../../assets/lb.png) no-repeat;
		background-size: 615px 75px;
		background-position: -593px 0px;
	}
}
</style>