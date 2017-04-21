<template>
	<div class="music">
		<div class="music_home" v-if='music_home'>
			<div class="tishi">
				本音乐来自百度乐播数据,可以收藏<a href="http://lebo.baidu.com/" target="_blank">乐播官网</a>享受一场音乐盛宴。
			</div>
			<nav>
				<div class="div1"><span></span>乐播频道</div>
				<leboPindao :list='list'
							@gop='gopindao'>
					
				</leboPindao>
			</nav>
			<div class="tj" v-if='tj.length>0'>
				<div class="div1"><span></span>乐播推荐</div>
				<leboTuijian :tj='tj'
							  @musicList='Listcon'	>
				</leboTuijian>
			</div>
			<div class="jm">
				<div class="div1"><span></span>新晋节目榜</div>
				<leboBang :bang='bang' 
						  :audioPlay='audioPlay'
						  :play='song_this_play'
						  @bangClick="change" 
						  @musicList='Listcon'>
				</leboBang>
			</div>
		</div>
		<div class="music_list" v-if='music_list'>  
			<!-- 音乐列表 -->
			<musicLists 
				:list='music_list_this'
				:index='song_index'
				:name='song_name'
				:play='song_this_play'
				@goback='goback'
				@con='gocon'>
			</musicLists>
		</div>
		<div class="music_pindao" v-if='musoc_pindao'>
			<!-- 分类频道 -->
			<musicPindao :list='musoc_pindao_this'
						  @goback='gohome'
						  @golist='golist'></musicPindao>
		</div>
		<!-- 底层音乐播放器 -->
		<leboAudio  :audio='audio' 
					:songI='song_index'
					:play='song_this_play'
					:Vidoestyle='Vidoestyle'
					v-if='audio.show' 
					@listIndex='listIndex' 
					@songChange='sangChange'
					@goback='golist'>
		</leboAudio>
		<div class="bottom" v-if='Vidoestyle'>技术支持@蒲松伟</div>
	</div>
</template>

<script>
import leboPindao from '@/components/page/music/pindao.vue';
import leboTuijian from '@/components/page/music/tj.vue';
import leboBang from '@/components/page/music/bang.vue';
import leboAudio from '@/components/page/music/audio.vue';
import musicLists from '@/components/page/music/musicList.vue';
import musicPindao from '@/components/page/music/musicPindao.vue';
export default {
	components: {
		leboPindao,
		leboTuijian,
		leboBang,
		leboAudio,
		musicLists,
		musicPindao
	},
	data () {
		return {
		  list: [],                 //乐播频道
		  tj:[],		            //乐播推荐
		  bang:[],                  //乐播节目榜
		  audioPlay:true,           //自动播放
		  audio:{show:false},       //音乐播放当前播放对象 show 是否显示播放器 播放器根据这个播放音乐
		  music_home:true,          //音乐首页是否创建
		  music_list:false,         //音乐列表页是否创建
		  musoc_pindao:false,       //音乐频道是否创建
		  musoc_pindao_this:[],     //当前点击频道
		  music_list_this:[],       //当前播放音乐列表 
		  song_index:0,			    //从第几首开始播放
		  song_this_play:"no",      //当前播放状态 yes 播放中 zan 暂停中 no 未播放
		  song_name:'',             //当前播放音乐名称
		  Vidoestyle: true          //播放器样式 true小 false大
		}
	},
	created (){
		this.getList()
		this.getData()
		this.getBang()
	},
	methods : {
		change (obj){
			this.audio      = obj;
			this.audio.show = true;
			this.songplaystate()
		},
		listIndex (play){
			this.audioPlay = play;
		},
		songplaystate (){
			if (!this.audio.show) {
				this.song_this_play = 'no'
			}else{
				if (!this.audioPlay) {
					this.song_this_play = 'zan'
				}else{
					this.song_this_play = 'yes'
				}
			}
		},
		getList () {
			var that = this;
			this.$http.jsonp("http://leboapi.baidu.com/leboapi/tag?callback=jsonp1&type=getRootTagList&edit=0&apiver=2&from=lebowebapp&terminal=pcweb&app=121")
			.then(function(data){
				that.list = data.body.data;
			})
		},
		getData (){
			var that = this;
			this.$http.jsonp("http://leboapi.baidu.com/leboapi/business?callback=jsonp2&type=getHotList&limit=6&args=album.*%2Csong.*%2Csong.album.*%2Csong.pic%2Ctag%2Csong.album.tag&terminal=android&apiver=2&from=lebowebapp&app=121")
			.then(function(data){
				that.tj = data.body.data;
			})
		},
		getBang (){
			var that = this;
			this.$http.jsonp("http://leboapi.baidu.com/leboapi/rank?callback=jsonp3&type=getRanking&rank_type=2&args=album.*%2Calbum.album_end%2C+album.pic&start=1&limit=10&apiver=2&from=lebowebapp&terminal=pcweb&app=121")
			.then(function(data){
				that.bang = data.body.data;
			})
		},
		Listcon (res){
			this.music_list      = true;
			this.music_home      = false;
			this.musoc_pindao    = false;
			this.music_list_this = res.item;
		},
		sangChange (res){
			this.song_name  = res.name
			this.song_index = res.i;
		},
		goback (){
			if (this.musoc_pindao_this.tag_id) {
				this.music_home   = false;
				this.music_list   = false;
				this.musoc_pindao = true;
				this.Vidoestyle   = true;
			}else{
				this.music_home   = true;
				this.music_list   = false;
				this.musoc_pindao = false;
				this.Vidoestyle   = true;
			}
		},
		gohome(){
			this.music_home        = true;
			this.music_list        = false;
			this.musoc_pindao      = false;
			this.musoc_pindao_this = [];
		},
		gocon (res){
			this.music_home   = false;
			this.music_list   = false;
			this.Vidoestyle   = false;
			this.song_index   = res.i;
			this.audio.item   = res.song_list;
			this.audio.show   = true;
			this.musoc_pindao = false;
		},
		golist(res){
			this.music_home          = false;
			this.music_list          = true;
			this.Vidoestyle          = true;
			this.musoc_pindao        = false;
			if (res !=undefined) {
				this.music_list_this = res
			}
		},
		gopindao (res){
			this.musoc_pindao_this = res
			this.music_home   = false;
			this.music_list   = false;
			this.Vidoestyle   = true;
			this.musoc_pindao = true;
		}
	}

}
</script>

<style lang='less' scoped>
.bottom{
	width: 100%;
	height: 62px;
	text-align: center;
	line-height: 62px;
	font-size: 14px;
	color: #999;
}
	.tishi{
		width: 100%;
		height: 20px;
		margin: 10px 0;
		text-align: center;
		line-height: 20px;
		color: #ccc;
		font-size: 14px;
		a{
			color: #333;
		}
	}
	.div1{
		line-height: 55px;
		font-size: 16px;
		span{
			border-left: 3px solid #ff9900;
			padding: 2px 0;
			margin-right: 5px;
		}
	}
	.tj{
		width: 100%;
	}
@media all and (max-width: 439px) {
	.music{
		width: 100%;
		background: #f7f7f7;
	}
	.div1{
		padding-left: 14px;
	}
}
</style>
