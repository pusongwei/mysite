<template>
	<div class="music_list">
		<dl class="top">
			<dt>
				<img :src="list.album_pic?list.album_pic[0].pi_link:list.album.album_pic[0].pi_link" alt="">
			</dt>
			<dd>
				<h2 v-if='list.album_name'>{{list.album_name}}</h2>
				<h2 v-if='list.album_title'>{{list.album_title}}</h2>
				<h3>主播名：{{list.artist_name}}</h3>
			</dd>
		</dl>
		<div class="all_download" @click='download'>
			<span></span>
			批量下载
		</div>
		<ul class="list" v-if='song_list'>
			<li v-for='(item,i) in song_list' :class="name==item.song_title && play=='yes'?'on':''">
				<span class="index">{{i+1}}</span>
				<span class="title" @click='con(i)'>{{item.song_title}}</span>
				<span class="playThis"><img src='http://static.lebo.baidu.com/st/i/UzJVc9O3.gif' alt=""></span>
				<span class="download" @click='download'><i></i></span>
			</li>
		</ul>
		<div class="back" @click='goback'>
			<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492355302586&di=137f35fdefa2505268754dc90412c17c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7930232b79cb0a4685228b315b61f63e%2Fca8065380cd79123e21e55a5af345982b3b78061.jpg" alt="">
		</div>
		<tishi @guanbi='thishiguanbi' v-if='tishi'></tishi>
	</div>
</template>

<script>
import tishi from '@/components/page/music/tishi.vue';
export default {
	components:{
		tishi
	},
	props:{
	    list : {
	      type:Object,
	      default :function(){}
	    },
	    index : {
	    	type:Number,
	    	default:''
	    },
	    play : {
	    	type:String,
	    	default:''
	    },
	    name : {
	    	type:String,
	    	default:''
	    }
	},
	created (){
		this.getMusicList(this.list)
	},
	data () {
		return {
			song_list: [],
			tishi : false
		}
	},
	methods : {
		getMusicList (item){
			var that = this;
			this.$http.jsonp("http://leboapi.baidu.com/leboapi/album?callback=jsonp4&type=getAlbumDetail&args=*%2Csonglist.song.pic&album_id="+item.album_id+"&apiver=2&from=lebowebapp&terminal=pcweb&app=121")
			.then(function(data){
				that.song_list = data.body.data.song_list;
			})
		},
		goback (){
			this.$emit('goback')
		},
		download (){
			this.tishi = true;
		},
		thishiguanbi (){
			this.tishi = false;
		},
		con (i){
			this.$emit('con',{song_list:this.list,i:i})
		}
	}
}
</script>

<style lang='less' scoped>
	.top{
		width: 100%;
		height: 110px;
		padding:15px 0;
		display:-webkit-box;
	    display: -moz-box;
	    display: -ms-flexbox;
		-webkit-box-pack:center;
		-moz-box-pack:center;
		-ms-box-pack:center;
		dt{
			img{
				display: block;
				width: 80px;
				height: 80px;
			}
		}
		dd{
			h2{
				width: 100%;
				padding:10px 20px;
				font-size: 16px;
			}
			h3{
				width: 100%;
				padding:0 20px;
				font-size: 14px;
			}
		}
	}
	.all_download{
		padding: 15px;
		font-size: 14px;
		background-color: #fff;
		border-top: 1px #e2e2e2 solid;
		border-bottom: 1px #e2e2e2 solid;
		span{
			display: inline-block;
			width: 12px;
			height: 11px;
			background: url(../../../assets/lb.png) no-repeat;
			background-size: 492px 60px;
			background-position: -437.5px -47.5px;
			margin-right: 5px;
		}
	}
	.list{
		background: #fff;
		li{
			width: 100%;
			padding-left:15px;
			height: 80px;
			border-top: 1px #e2e2e2 solid;
			border-bottom: 1px #e2e2e2 solid;
			background: #fff;
			display:-webkit-box;
		    display: -moz-box;
		    display: -ms-flexbox;
		    -webkit-box-align:center;
			-moz-box-align:center;
			-ms-box-align:center;
		    span{
		    	display: block;
		    }
		    .index{
		    	width: 25px;
		    	height: 80px;
		    	text-align: left;
		    	line-height: 80px;
		    	color: #999;
		    }
		    .title{
		    	-webkit-box-flex:1;
				-moz-box-flex:1;
				-ms-box-flex:1;
				font-size: 14px;
		    }
		    .playThis{
		    	width: 38px;
		    	height: 80px;
		    	text-align: center;
		    	line-height: 80px;
		    	display: none;
		    	img{
		    		width: 17px;
		    		height: 15px;
		    	}
		    }
		    .download{
		    	width: 48px;
		    	height: 80px;
		    	text-align: center;
		    	line-height:80px; 
		    	i{
		    		display: inline-block;
		    		width: 16px;
		    		height: 16px;
		    		background:url(../../../assets/lb.png)no-repeat;
		    		background-size: 492px 60px;
					background-position: -455px -17px;
		    	}
		    }
		}
		.on{
			.title{
				color: #ff6600;
			}
			.playThis{
				display: inline-block;
			}
		}
	}
	.back{
		position: fixed;
		left: 0;
		top: 50%;
		width: 40px;
		height: 40px;
		img{
			width: 40px;
			height: 40px;
			border-radius: 40px;
			transform:rotate(180deg);
			-ms-transform:rotate(180deg); 	
			-moz-transform:rotate(180deg); 	
			-webkit-transform:rotate(180deg); 
			-o-transform:rotate(180deg);
		}
	}
	@media all and (max-width: 439px){
		.top{
			padding:15px;
			-webkit-box-pack:start;
			-moz-box-pack:start;
			-ms-box-pack:start;
		}
	}
</style>