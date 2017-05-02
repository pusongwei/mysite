<template>
	<div id="player" v-if='current.show'>
		<div class="small" v-if='Vidoestyle'>
			<div class="jd" ref='jd'></div>
			<div class="player">
				<img :src="current.song.song_pic[0].pi_link" alt="">
				<div class="mp3name">
					<div class="title">{{current.song.song_title}}</div>
					<div class="name">{{current.song.album.artist_name}}</div>
				</div>
				<div class="btn"><i id="down"></i></div>
				<div class="btn suspend" @click='player(song_listIndex)' ref='btn'><i id="play"></i></div>
				<div class="btn" @click='audioNext'><i id="forward"></i></div>
			</div>
		</div>
		<div class="large" v-if='!Vidoestyle'>
			<div class="back" @click='goback'>
				<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492355302586&di=137f35fdefa2505268754dc90412c17c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7930232b79cb0a4685228b315b61f63e%2Fca8065380cd79123e21e55a5af345982b3b78061.jpg" alt="">
			</div>
			<div class="song_title">
				{{current.song.song_title}}
			</div>
			<div class="top">
				<div class="pic">
					<img :src="current.song.song_pic[0].pi_link" alt="">
				</div>
				<div class="misc">
					<div class="favor"><i></i></div>
					<div class="share"><i></i></div>
					<div class="info"><i></i></div>
				</div>
			</div>
			<div class="jundu" @click='setsongTime($event)' ref='jindu'>
				<span class="tiao">
					<span class="jd" ref='jd'></span>
					<span class="time" ref='time'>{{songtime}}</span>
				</span>
				<span class="long">{{long}}</span>
			</div>
			<div class="ctrl">
				<div class="download">下载</div>
				<div class="prev" @click='audioPrev'></div>
				<div class="btn suspend" @click='player(song_listIndex)' ref='btn'></div>
				<div class="next" @click='audioNext'></div>
				<div class="subscribe">订阅</div>
			</div>
		</div>
		<audio :src="current.songfile[0].songfile_link" ref='audio' autoplay="autoplay"></audio>
	</div>
</template>

<script>
export default {
	props:{
	    audio : {
	      type:Object,
	      default :function(){}
	    },
	    songI : {
	    	type:Number,
	    	default :''
	    },
	    play : {
	    	type:String,
	    	default :''
	    },
	    Vidoestyle : {
	    	type:Boolean,
	    	default :''
	    }
	},
	data (){
		return {
			current:{show:false},
			song_listIndex:0,
			song_item:[],
			time:0,
			long:'00:00',                      //音乐时长
			songtime:'00:00',
			touch:false
		}
	},
	created (){		
		this.songIndex = this.songI || 0;
		this.getVideo();
	},
	watch : {
		audio (){
			if (this.song_listIndex == this.audio.i) {
				this.player(this.song_listIndex)
			}else{
				this.current.show = false;
				this.getVideo();
			}
		},
		songIndex (){
			this.emitvideo()
		}
	},
	methods : {
		getVideo (){
			this.getMusicList(this.audio.item);
			this.song_listIndex = this.audio.i
			this.song_item = this.audio.item
			this.time = this.audio.time
		},
		getMusicList (item){
			var that = this;
			this.$http.jsonp("http://leboapi.baidu.com/leboapi/album?callback=jsonp4&type=getAlbumDetail&args=*%2Csonglist.song.pic&album_id="+item.album_id+"&apiver=2&from=lebowebapp&terminal=pcweb&app=121")
			.then(function(data){
				that.song_list = data.body.data.song_list;
				that.getMusic(that.song_list[that.songIndex].song_id);
			})
		},
		getMusic (id){
			var that = this;
			this.$http.jsonp("http://leboapi.baidu.com/leboapi/song?callback=jsonp7&type=getSongFileLink&song_id="+id+"&linktype=1&args=baseinfo%2Cpic%2Calbum.pic&apiver=2&from=lebowebapp&terminal=pcweb&app=121")
			.then(function(data){
				that.current = data.body.data;
				that.current.show = true;
				setTimeout(function(){
					that.audioPlay();
					that.audioJd();
					that.$refs.btn.className = 'btn suspend';
					that.emitvideo();
					that.touchTime();
				},100)
			})
		},
		audioPlay (){
			this.$refs.audio.play();
		},
		audioPause (){
			this.$refs.audio.pause();
		},
		audioJd (){
			var that=this;
			this.$refs.audio.addEventListener("timeupdate",function(){
				var time = that.$refs.audio.currentTime?that.$refs.audio.currentTime:1;
				var bl=time/that.$refs.audio.duration*100+"%";
				if (!that.touch) {
					that.$refs.jd.style.width = bl;
				}
				if (bl=="100%") {
					that.audioNext();
				}
				var fen = parseInt(time/60);
				fen = fen< 10?'0'+fen+':':fen;
				var miao = parseInt(time%60);
				miao = miao<10?'0'+miao:miao;
				that.songtime = fen+miao;
				that.setLong();
			},true);
			/*this.$refs.audio.addEventListener("endd",function(){
					that.next();
			},true);*/
		},
		setLong(){
			var fen = parseInt(this.$refs.audio.duration/60);
				fen = fen< 10?'0'+fen+':':fen;
				var miao = parseInt(this.$refs.audio.duration%60);
				miao = miao<10?'0'+miao:miao;
				this.long = fen+miao
		},
		audioNext(){
			this.songIndex++;
			if (this.songIndex>19) {
				this.songIndex = 0;
			}
			this.getMusic(this.song_list[this.songIndex].song_id);
		},
		audioPrev(){
			this.songIndex--;
			if (this.songIndex<0) {
				this.songIndex = 19;
			}
			this.getMusic(this.song_list[this.songIndex].song_id);
		},
		player (i){
			if (this.$refs.audio.paused) {
				this.audioPlay()
				this.$refs.btn.className = 'btn suspend';
			}else{
				this.audioPause();
				this.$refs.btn.className = 'btn';
			}
			this.$emit('listIndex',!this.$refs.audio.paused)
		},
		emitvideo (){
			this.$emit('songChange',{i:this.songIndex,name:this.current.song.song_title})
		},
		setsongTime(e){
			var jindu = parseInt((e.pageX-this.$refs.jindu.offsetLeft)/(this.$refs.jindu.getBoundingClientRect().width)*this.$refs.audio.duration);
			this.$refs.audio.currentTime = jindu;
		},
		touchTime (){
			var that = this;
			this.$refs.time.addEventListener('touchmove',function(e){
				that.touch = true;
				var jindut = parseInt((e.changedTouches[0].clientX-that.$refs.jindu.offsetLeft)/(that.$refs.jindu.getBoundingClientRect().width)*100);
				if (jindut>100) {
					jindut = 100;
				}
				that.$refs.jd.style.width = jindut+'%';
			})
			this.$refs.time.addEventListener('touchend',function(e){
				that.touch = false;
				var jindut = parseInt((e.changedTouches[0].clientX-that.$refs.jindu.offsetLeft)/(that.$refs.jindu.getBoundingClientRect().width)*that.$refs.audio.duration);
				that.$refs.audio.currentTime = jindut;
			})
		},
		goback (){
			this.$emit('goback')
		}
	}
}
</script>

<style lang='less' scoped>
.large{
	.song_title{
		width: 100%;
		height: 40px;
		text-align: center;
		line-height: 40px;
		font-size: 16px;
		color: orange;
	}
	.top{
		width: 100%!important;
		height: 320px;
		.pic{
			width: 262px;
			height: 262px;
			background: #fff;
			margin:auto;
			border:1px solid #e3e3e3;
			img{
				display: block;
				width: 260px;
				height: 260px;
				border-radius: 260px;
			}
		}
		.misc{
		    display: -webkit-box;
		    display: -moz-box;
		    display: -ms-box;
		    display: box;
		    -webkit-box-oritent: horizontal;
		    -moz-box-oritent: horizontal;
		    -ms-box-oritent: horizontal;
		    -box-oritent: horizontal;
		    -webkit-box-direction: normal;
		    -moz-box-direction: normal;
		    -ms-box-direction: normal;
		    box-direction: normal;
		    -webkit-box-pack: start;
		    -moz-box-pack: start;
		    -ms-box-pack: start;
		    box-pack: start;
		    -webkit-box-align: center;
		    -moz-box-align: center;
		    -ms-box-align: center;
		    box-align: center;
		    background: #f4f5f6;
		    padding: 10px 0;
		    div{
		    	-webkit-box-flex: 1;
			    -moz-box-flex: 1;
			    -ms-box-flex: 1;
			    box-flex: 1;
			    height: 30px;
			    display: -webkit-box;
			    display: -moz-box;
			    display: -ms-box;
			    display: box;
			    -webkit-box-oritent: horizontal;
			    -moz-box-oritent: horizontal;
			    -ms-box-oritent: horizontal;
			    -box-oritent: horizontal;
			    -webkit-box-direction: normal;
			    -moz-box-direction: normal;
			    -ms-box-direction: normal;
			    box-direction: normal;
			    -webkit-box-pack: center;
			    -moz-box-pack: center;
			    -ms-box-pack: center;
			    box-pack: center;
			    -webkit-box-align: center;
			    -moz-box-align: center;
			    -ms-box-align: center;
			    box-align: center;
		    }
		    .favor{
		    	i{
		    		display: inline-block;
				    vertical-align: middle;
				    width: 16px;
				    height: 18px;
				    background: url(../../../assets/lb.png) no-repeat;
				    -moz-background-size: 477px 58px;
				    -o-background-size: 477px 58px;
				    -webkit-background-size: 477px 58px;
				    background-size: 477px 58px;
				    overflow: hidden;
				    background-position: -384px -23px;
		    	}
		    }
		    .share{
		    	i{
		    		display: inline-block;
				    vertical-align: middle;
				    width: 17px;
				    height: 20px;
				    background: url(../../../assets/lb.png) no-repeat;
				    -moz-background-size: 452px 60px;
				    -o-background-size: 452px 60px;
				    -webkit-background-size: 452px 60px;
				    background-size: 452px 60px;
				    overflow: hidden;
				    background-position: -298px -36px;
		    	}
		    }
		    .info{
		    	i{
		    		display: inline-block;
				    vertical-align: middle;
				    width: 20px;
				    height: 20px;
				    background: url(../../../assets/lb.png) no-repeat;
				    -moz-background-size: 492px 58px;
				    -o-background-size: 492px 58px;
				    -webkit-background-size: 492px 58px;
				    background-size: 492px 58px;
				    overflow: hidden;
				    background-position: -390px 0px;
		    	}
		    }
		}
	}
	.jundu{
		display:-webkit-box;
	    display: -moz-box;
	    display: -ms-box;
	    font-size: 12px;
	    height: 12px;
	    background: #e2e2e2;
		span{
			display: block;
		}
		.tiao{
			height: 12px;
			-webkit-box-flex:1;
			-moz-box-flex:1;
			-ms-box-flex:1;
			display:-webkit-box;
		    display: -moz-box;
		    display: -ms-box;
			.jd{
				height: 12px;
			}
			.time{
				position: relative;
			    z-index: 1;
			    vertical-align: middle;
			    width: 39px;
			    height: 19px;
			    background: url(../../../assets/lb.png) no-repeat;
			    -moz-background-size: 498px 60px;
			    -o-background-size: 498px 60px;
			    -webkit-background-size: 498px 60px;
			    background-size: 498px 60px;
			    overflow: hidden;
			    top: -4px;
			    left: -4px;
			    color: #ff6600;
			    line-height: 20px;
			    text-align: center;
			    background-position: -261px -36px;
			}
		}
		.long{
			width: 35px;
		    color: #999;
		}
	}
	.ctrl{
		height: 113px;
	    display: -webkit-box;
	    display: -moz-box;
	    display: -ms-box;
	    display: box;
	    -webkit-box-oritent: horizontal;
	    -moz-box-oritent: horizontal;
	    -ms-box-oritent: horizontal;
	    -box-oritent: horizontal;
	    -webkit-box-direction: normal;
	    -moz-box-direction: normal;
	    -ms-box-direction: normal;
	    box-direction: normal;
	    -webkit-box-pack: center;
	    -moz-box-pack: center;
	    -ms-box-pack: center;
	    box-pack: center;
	    -webkit-box-align: center;
	    -moz-box-align: center;
	    -ms-box-align: center;
	    box-align: center;
	    div{
	    	margin:9px;
	    }
	    .download{
	    	margin: 5px;
		    display: inline-block;
		    vertical-align: middle;
		    width: 54px;
		    height: 31px;
		    background: url(../../../assets/lb.png) no-repeat;
		    -moz-background-size: 492px 60px;
		    -o-background-size: 492px 60px;
		    -webkit-background-size: 492px 60px;
		    background-size: 492px 60px;
		    overflow: hidden;
		    font-size: 12px;
		    text-align: center;
		    line-height: 31px;
		    background-position: -336px 0px;
	    }
	    .prev{
	    	display: inline-block;
		    vertical-align: middle;
		    width: 21px;
		    height: 13px;
		    background: url(../../../assets/lb.png) no-repeat;
		    -moz-background-size: 492px 60px;
		    -o-background-size: 492px 60px;
		    -webkit-background-size: 492px 60px;
		    background-size: 492px 60px;
		    overflow: hidden;
		    background-position: -414px -18px;
	    }
	    .btn{
	    	display: inline-block;
		    vertical-align: middle;
		    width: 60px;
		    height: 60px;
		    background: url(../../../assets/lb.png) no-repeat;
		    -moz-background-size: 492px 60px;
		    -o-background-size: 492px 60px;
		    -webkit-background-size: 492px 60px;
		    background-size: 492px 60px;
		    overflow: hidden;
		    background-position: -60px 0px;
	    }
	    .suspend{
	    	display: inline-block;
		    vertical-align: middle;
		    width: 60px;
		    height: 60px;
		    background: url(../../../assets/lb.png) no-repeat;
		    -moz-background-size: 492px 60px;
		    -o-background-size: 492px 60px;
		    -webkit-background-size: 492px 60px;
		    background-size: 492px 60px;
		    overflow: hidden;
		    background-position: -120px 0px;
	    }
	    .next{
	    	display: inline-block;
		    vertical-align: middle;
		    width: 21px;
		    height: 13px;
		    background: url(../../../assets/lb.png) no-repeat;
		    -moz-background-size: 504px 60px;
		    -o-background-size: 504px 60px;
		    -webkit-background-size: 504px 60px;
		    background-size: 504px 60px;
		    overflow: hidden;
		    background-position: -424px 0px;
		}
		.subscribe{
			margin: 5px;
		    display: inline-block;
		    vertical-align: middle;
		    width: 54px;
		    height: 31px;
		    background: url(../../../assets/lb.png) no-repeat;
		    -moz-background-size: 492px 60px;
		    -o-background-size: 492px 60px;
		    -webkit-background-size: 492px 60px;
		    background-size: 492px 60px;
		    overflow: hidden;
		    font-size: 12px;
		    text-align: center;
		    line-height: 31px;
		    background-position: -336px 0px;
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
#down{
	display: inline-block;
	width: 16.5px;
	height: 19px;
	background: url(../../../assets/down.png) no-repeat;
	background-size: cover;
}
#play{
	display: inline-block;
	width: 16px;
    height: 23px;
	background: url(../../../assets/play.png) no-repeat;
	background-size: cover;
}
.suspend #play{
	display: inline-block;
	width: 16px;
    height: 23px;
	background: url(../../../assets/noplay.png) no-repeat;
	background-size: cover;
}
#forward{
	display: inline-block;
	width: 16px;
    height: 23px;
	background: url(../../../assets/forward.png) no-repeat;
	background-size: cover;
}
audio{
	display: none;
}
.small{
	width: 100%;
	background: #fff;
	position: fixed;
	display: block;
	bottom: 0;
	left: 0;
	z-index: 103;
	box-shadow: 2px 0 6px rgba(0, 0, 0, 0.12);
}
.player{
	height: 60px;
	display: -webkit-box;
	-webkit-box-align: center;
	-webkit-box-pack: start;
}
.player img{
	width: 45px;
	height: 45px;
	margin-left: 5px;
}
.jd{
	width: 100%;
	height: 2px;
	background: #ff6600;
}
.mp3name{
	padding:10px;
	-webkit-box-flex:1;
}
.title{
	color: #252525;
	font-size: 16px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.name{
	color: #b6b6b6;
	font-size: 12px;
	line-height: 20px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.btn{
	width: 35px;
	height: 100%;
	text-align: center;
	display: -webkit-box;
	-webkit-box-pack: center;
	-webkit-box-align: center;
	i{
		display: inline-block;
		vertical-align: middle;
		width: 16px;
		height: 23px;
		overflow: hidden;
	}
}
</style>
