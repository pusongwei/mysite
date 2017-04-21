<template>
	<div class="pindao">
		<div class="back" @click='goback'>
			<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492355302586&di=137f35fdefa2505268754dc90412c17c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D7930232b79cb0a4685228b315b61f63e%2Fca8065380cd79123e21e55a5af345982b3b78061.jpg" alt="">
		</div>
		<div class="top">
			<div class="list list1">
				<span :class='zui=="hot_desc"?"on":""' @click='zui2("hot_desc")'>最热</span>
				<span :class='zui=="updatetime_desc"?"on":""' @click='zui2("updatetime_desc")'>最新</span>
				<span :class='zui=="playcount_desc"?"on":""' @click='zui2("playcount_desc")'>经典</span>
			</div>
			<div class="list list2" v-if='list2.length>0'>
				<span :class="id==list.tag_id?'on':''"
					  @click='xuan2(list.tag_id)'>全部</span>
				<span v-for='item in list2' 
					  :class="id==item.tag_id?'on':''"
					  @click='xuan2(item.tag_id)'>{{item.tag_name}}</span>
			</div>
		</div>
		<div class="con" v-if='con.length>0'>
			<ul>
				<li v-for='(item,i) in con' @click='golist(item)'>
					<div class="pic">
						<img :src="item.album_pic.length>0?item.album_pic[0].pi_link:''" alt="">
					</div>
					<div class="info">
						<h2>{{item.album_title}}</h2>
						<h3>{{item.artist_name}}</h3>
						<div class="misc">
							<span class="update">
								{{item.lastTime}}
							</span>
							<span class="listen">
								<i></i>
								{{item.statistics.play_count}}
							</span>
							<div class="collections">收藏</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="load_more" @click='getAll' v-if='gd'>
			点击加载更多
		</div>
	</div>
</template>

<script>
export default {
	props:{
	    list : {
	      type:Object,
	      default :function(){}
	    }
	},
	data (){
		return {
			list2 : [],
			con:[],
			id:0,
			start:1,
			zui:'hot_desc',    // 最热hot_desc 最新 updatetime_desc 经典 playcount_desc
			xuan:'',            // 非空为选中全部状态
			gd:true
		}
	},
	created (){
		this.id = this.list.tag_id;
		this.xuan = "&tag="+this.id;
		this.getList()
		this.getAll()
	},
	methods : {
		getList (list){
			var that = this;
			this.$http.jsonp("http://leboapi.baidu.com/leboapi/tag?callback=jsonp5&type=getChildTagList&tag_id="+this.id+"&apiver=2&from=lebowebapp&terminal=pcweb&app=121")
			.then(function(data){
				 that.list2 = data.body.data;
			})
		},
		getAll(){
			var that = this;
			this.$http.jsonp("http://leboapi.baidu.com/leboapi/tag?callback=jsonp4&type=getAlbumListByTagid&args=album.*%2Csong.*%2Csong.album.*%2Csong.pic%2Ctag%2Csong.album.tag&order="+this.zui+"&tag_id="+this.id+"&start="+this.start+"&limit=20"+this.xuan+"&apiver=2&from=lebowebapp&terminal=pcweb&app=121")
			.then(function(data){
				if (data.body.data.length<20 && that.con.length!=0) {
					that.gd = false;
					that.con = that.con.concat(data.body.data);
					that.setTime();
					return false;
				}
				that.con = that.con.concat(data.body.data);
				that.setTime();
				that.start+=20;
			})
		},
		setTime (){
			var hour = 3600;
			var day  = 86400;
			for(var i=0;i<this.con.length;i++){
				var time = new Date()*1/1000-this.con[i].album_lastuptime;
				if (time<3600) {
					this.con[i].lastTime = parseInt(time/60)+"分钟前"
				}else if (time>=3600 && time<86400) {
					this.con[i].lastTime = parseInt(time/3600)+"小时前"
				}else if (time>=86400 && time<86400*5) {
					this.con[i].lastTime = parseInt(time/86400)+"天前"
				}else if (time>=86400*5){
					var date = new Date(this.con[i].album_lastuptime*1000);
					var nian = date.getFullYear();
					var yue  = date.getMonth()+1;
					var ri   = date.getDate();
					this.con[i].lastTime = nian+"年"+yue+"月"+ri+"日" 
				}
			}
		},
		zui2(str){
			if (str == this.zui) {return false}
			this.zui   = str;
			this.con   = [];
			this.start = 1;
			this.getAll();
			this.gd = true;
		},
		xuan2(num){
			if (num == this.id) {return false}
			if (num == this.list.tag_id) {
				this.xuan = "&tag="+this.id;
			}else{
				this.xuan = '';
			}
			this.id    = num;
			this.con   = [];
			this.start = 1;
			this.getAll();
			this.gd = true;
		},
		goback (){
			this.$emit('goback')
		},
		golist (res){
			this.$emit('golist',res)
		}
	}
}
</script>

<style lang='less' scoped>
	.top{
		width: 100%;
		padding:0 10px;
		.list{
			width: 100%;
			height: 40px;
			text-align: left;
			line-height: 40px;
			font-size: 14px;
			border-bottom: 1px #dfdfdf solid;
			span{
				display: inline-block;
			    margin: 6px 0;
			    padding: 0px 10px;
			    height: 26px;
			    line-height: 26px;
			    border: 1px solid rgba(255, 255, 255, 0);
			    border-radius: 2px;
			}
			.on{
				border: 1px solid #f90;
			}
		}
	}
	.con li{
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
	    position: relative;
	    top: 1px;
	    padding: 7px 0 7px 10px;
	    border-bottom: 1px solid #e2e2e2;
	    .pic{
	    	width: 50px;
		    height: 50px;
		    -moz-border-radius: 3px;
		    -webkit-border-radius: 3px;
		    border-radius: 3px;
		    border: 1px solid #e2e2e2;
    		margin-right: 10px;
    		img{
    			width: 50px;
			    height: 50px;
			    -moz-border-radius: 3px;
			    -webkit-border-radius: 3px;
			    border-radius: 3px;
    		}
	    }
	    .info{
	    	-webkit-box-flex: 1;
		    -moz-box-flex: 1;
		    -ms-box-flex: 1;
		    box-flex: 1;
		    color: #999;
		    h2{
		    	color: #252525;
			    font-size: 16px;
			    line-height: 20px;
		    }
		    h3{
		    	font-size: 12px;
    			line-height: 18px;
		    }
		    .misc{
		    	margin-top: 2px;
   				font-size: 10px;
   				.update{
   					color: #f60;
   					position: relative;
    				margin-right: 15px;
   				}
   				.listen{
   					position: relative;
   					margin-right: 15px;
   					i{
   						display: inline-block;
					    vertical-align: middle;
					    width: 10px;
					    height: 10px;
					    background: url(//static.lebo.baidu.com/st/i/0iEyQnwT.png) no-repeat;
					    -moz-background-size: 615px 75px;
					    -o-background-size: 615px 75px;
					    -webkit-background-size: 615px 75px;
					    background-size: 615px 75px;
					    overflow: hidden;
					    background-position: -593px 0px;
					    position: relative;
					    top: -1.5px;
					    margin-right: 4px;
					}
   				}
   				.collections{
					position: absolute;
				    right: 10px;
				    bottom: 5px;
				    padding: 6px 10px 6px 30px;
				    background: url(//static.lebo.baidu.com/st/i/FuwtktYy.png) no-repeat 10px 50%;
				    -moz-background-size: 16px auto;
				    -webkit-background-size: 16px auto;
				    background-size: 16px auto;
				    border: 1px solid #999;
				    border-radius: 10px;
				    color: #999;
				    z-index: 100;
   				}
		    }
	    }
	}
	.load_more{
		height: 60px;
	    line-height: 60px;
	    text-align: center;
	    border-top: 1px solid #e2e2e2;
	    border-bottom: 1px solid #e2e2e2;
	    font-size: 14px;
	}
	.back{
		position: fixed;
		left: 0;
		top: 50%;
		width: 40px;
		height: 40px;
		z-index: 102;
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
</style>