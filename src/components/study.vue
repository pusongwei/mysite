<template>
	<div class="study">
		<p ref='width'>作为一个真正的程序员，首先应该尊重编程，热爱你所写下的程序，他是你的伙伴，而不是工具。</p>
		<div v-if='searchNull'>
					没有搜索到关于"{{search}}"的内容
		</div>
		<div class="center" v-if='study.length>0 || searchNull'>
			<div class="list">
				<div v-for='(item,i) in study' :class="item.on" ref='li'>
					<div class="licon">
						<h3>{{item.title}}</h3>
						<div class="fubt">
							<span>蒲松伟</span>
							<span>发布于 {{item.time}}</span>
						</div>
						<div v-html='item.con' class="con" ref='mycon'></div>
					</div>
					<span class="span"><span @click='lishow(i)' ref='tishi'>{{tishi}}</span></span>
				</div>
				<div class="myTxt">
					<div class="bottom"></div>
					<input type="text" v-model='title' placeholder="请输入标题" class="title">
					<quillEditor ref='myText' 
								 v-model='text'
								 :config='textConfig'
					></quillEditor>
					<button @click='insert()'>插入</button>
					<div class="bottom"></div>
				</div>
			</div>
			<aside class="right">
				<div class="search">
					<input type="text" placeholder="搜索" v-model='search'>
					<span @click='mysearch'>搜索</span>
				</div>
				<myCalendar></myCalendar>
			</aside>
		</div>
	</div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import myCalendar from '@/components/base/calendar.vue'
export default {
	components: {
		quillEditor,
		myCalendar
	},
	data () {
		return {
		  study: [],
		  title:'',
		  search:'',
		  searchNull:false,
		  tishi:'更多详情请点击查看',
		  text: '请输入内容',
		  textConfig: {
	       // something config
	      }
		}
	},
	created (){
		this.getDate()
	},
	methods :{
		getDate(){
			var that = this;
			this.$http.post('https://www.pusongwei.com/api.php',{
				start:0,
				line:20,
				type:'study',
				getType:'queryLimit'
			},{emulateJSON: true}).then((res) => {
				that.study = res.body;
				that.setStyle();
			})
		},
		setStyle (){
			var that = this;
			for(var i=0;i<that.study.length;i++){
				var date = new Date(Number(that.study[i].time)),
					nian = date.getFullYear(),
					yue  = date.getMonth()+1,
					ri   = date.getDate();
				that.study[i].time = nian+"年"+yue+"月"+ri+"日";
				that.study[i].on   = 'li on';
			}
			setTimeout(function(){
				var w=that.$refs.width.clientWidth;
				for(var j=0;j<that.$refs.mycon.length;j++){
					var childNode = that.$refs.mycon[j].childNodes;
					for(var i=0;i<childNode.length;i++){
						if (childNode[i].nodeName=='PRE') {
							childNode[i].style['background-color']='#23241f';
							childNode[i].style['color']= '#f8f8f2';
							childNode[i].style['padding']= '5px 10px';
							childNode[i].style['border-radius']= '3px';
						}else if (childNode[i].nodeName=='P') {
							childNode[i].style['line-height']= '20px';
							childNode[i].style['text-indent']= '2em';
							if(childNode[i].childNodes[0].nodeName=='IMG' && w<416){
								childNode[i].childNodes[0].style['width']='100%';
								childNode[i].childNodes[0].style['display']='block'
							}
						}
					}
				}
			})
		},
	    insert () {
	    	this.$http.post('https://www.pusongwei.com/api.php',{
				title:this.title,
				con:this.text,
				time:new Date()*1,
				read:0,
				type:'study',
				getType:'add'
			},{emulateJSON: true}).then((res) => {
				console.log(res);
			})
	    },
	    lishow (i) {
	    	if ( this.study[i].on == 'li on') {
	    		this.study[i].on ='li';
	    		this.$refs.li[i].className = 'li';
	    		this.$refs.tishi[i].innerText = '向上收起'
	    	}else{
	    		this.study[i].on = 'li on';
	    		this.$refs.li[i].className = 'li on';
	    		this.$refs.tishi[i].innerText = '更多详情请点击查看'
	    	}
	    },
	    mysearch (){
	    	var that = this;
			this.$http.post('https://www.pusongwei.com/api.php',{
				title:that.search,
				type:'study',
				getType:'queryTitle'
			},{emulateJSON: true}).then((res) => {
				that.study = res.body;
				if(that.study.length == 0){
					that.searchNull = true;
					return false;
				}else{
					that.searchNull = false;
				}
				that.setStyle();
			})
	    }
	}
}	
</script>

<style lang='less' scoped>
.fade-enter-active {
  animation: fade-show 1s;
}
.fade-leave-active {
  animation: fade-hide 1s;
}
@keyframes fade-show {
  0% {
    height: 0;
  }
  100% {
    height: 100%;
  }
}
@keyframes fade-hide {
  0% {
    height: auto;
  }
  100% {
    height: 100%;
  }
}
	.study{
		width: 100%;
		overflow-x:hidden;
		.center{
			display: -webkit-box;
		    display: -moz-box;
		    display: -ms-box;
		    display: box;
		    margin-top: 10px;
			.right{
				width: 250px;
				height: 100%;
				margin-top: 20px;
				padding:10px 5px;
				.search{
					margin-bottom: 30px;
					input{
						outline: none;
						padding:3px 5px;
						border-radius: 10px;
						font-size: 12px;
					}
					span{
						display: inline-block;
						font-size: 14px;
						padding:3px 8px;
						margin-left: 10px;
						background: orange;
						border-radius: 20px;
						color: #fff;
					}
				}
			}
			@media all and (max-width: 439px){
				.right{
					display: none;
				}
			}
			.list{
				-webkit-box-flex:1;
				-moz-box-flex:1;
				-ms-box-flex:1;
				box-flex:1;
				margin-right: 10px;
				.li{
					width: 100%;
					margin:0 auto;
					margin-bottom: 10px;
					padding:20px 10px 50px 10px;
					position: relative;
					.licon{
						
					}
					.span{
						position: absolute;
						display: block;
						width: 100%;
						height: 40px;
						text-align: center;
						line-height: 40px;
						left: 0;
						bottom: 0px;
						span{
							font-size: 14px;
							color: #999;
							cursor: pointer;
						}
					}
					.fubt{
						padding:10px 0;
						span{
							padding-right: 20px;
							font-size: 14px;
							color: #999;
						}
					}
					p{
						/* overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical; */
					}
				}
				.on{
					.licon{
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
					}
				}
			}
		}
		>p{
			text-align: right;
			font-size: 14px;
			padding-top: 10px;
			color: #999;
		}
	}
	.bottom{
		margin-bottom: 100px;
	}
	.title{
		width: 100%;
		border:none;
		outline: none;
		text-align: center;
		margin-bottom: 10px;
		font-weight: bold;
		font-size: 16px;
	}
	.myTxt{
		display: none;
	}
@media all and (max-width: 439px){
	.study{
		>p{
			text-align: center;
			font-size: 14px;
			padding-top: 10px;
			color: #999;
		}
	}
	.myTxt{
		display: none;
	}
}
</style>
