<template>
	<div class="calendar">
		<div class="top">
			<span>{{nian}}年</span>
			<span>{{yue}}月</span>
			<span>{{ri}}日</span>
		</div>
		<div class="time">
			<span>{{shi}}时</span>
			<span>{{fen}}分</span>
			<span>{{miao}}秒</span>
		</div>
		<div class="con">
			<ul class="week">
				<li v-for='(item,i) in week'>{{item}}</li>
				<li v-for='item in date' :class='item[0]'>{{item[1]}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			week:['日','一','二','三','四','五','六'],
			nWeek:4,
			date:[],
			day: [31,28,31,30,31,30,31,31,30,31,30,31],
			nian:1970,
			yue:1,
			ri:1,
			shi:8,
			fen:0,
			miao:0
		}
	},
	created (){
		var that = this;
		setInterval(function(){
			that.init();
		},1000)
	},
	methods :{
		init (){
			var date       = new Date();
				this.nian  = date.getFullYear();
				this.yue   = date.getMonth()+1<10?'0'+(date.getMonth()+1):(date.getMonth()+1);
				this.ri    = date.getDate()<10?'0'+date.getDate():date.getDate();
				this.shi   = date.getHours()<10?'0'+date.getHours():date.getHours();
				this.fen   = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
				this.miao  = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
				this.nWeek = new Date(this.nian,this.yue-1,1).getDay();
			this.setDate();
		},
		setDate (){
			this.date = [];
			if (this.nian%4==0 && this.nian%100!=0 || this.nian%400==0) {
				this.day[1] = 29
			}else{
				this.day[1] = 28
			}
			for(var i=1;i<=35;i++){
				var day    = i-this.nWeek;
				var dayAll = this.day[this.yue-1];
				var name   = '';
				if (day<=0 || day>dayAll) {
					name = 'no ';
					if (day<=0) {
						var yue = this.yue-1>=0?this.yue-1:11;
						day = this.day[yue-1]+day;
					}else{
						var yue = this.yue+1<=11?this.yue+1:0;
						day = day-this.day[yue];
					}
				}else{
					if (day == this.ri){
						name +='on ';
					}else{
						name = ' ';
					}
				}
				this.date.push([name,day])
			}
		}
	}
}
</script>

<style lang='less' scoped>
	.calendar{
		border:1px #ccc solid;
		padding-top: 10px;
	}
	.top{
		width: 100%;
		text-align: center;
		input{
			width: 15%;
			text-align: center;
			border:none;
			outline: none;
			font-size: 16px;
		}
	}
	.time{
		margin-top: 5px;
		text-align: center;
		font-size: 14px;
	}
	ul{
		width: 100%;
		display:flex;
		flex-wrap: wrap;
		margin-top: 5px;
		background: #ccc;
		li{
			width: 14.286%;
			height: 25px;
			line-height: 25px;
			text-align: center;
			font-size: 14px;	
		}
		.no{
			color: #999;
		}
		.on{
			color: #fff;
			background: orange;
			border-radius: 5px;
		}
	}
</style>
