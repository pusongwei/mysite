<template>
	<div class="bgimg">
		<img src="../../assets/1.jpg">
		<img src="../../assets/2.jpg">
		<img src="../../assets/3.jpg">
		<img src="../../assets/4.jpg">
		<img src="../../assets/5.jpg">
		<div v-for="item in className" ref='bg' :class='item'></div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			line:10,                                   //每行盒子个数
			list:5,                                    //每列盒子个数
			num:50,                                    //总盒子数
			bgImg:['bg1','bg2','bg3','bg4','bg5'],     //动态更改的背景图
			className:[],                              //当前class
			index:0                                    //当前显示背景图的下标
		}
	},
	created (){
		this.num  = this.line*this.list;
		for(var i=0;i<this.num;i++){
			this.className[i] = this.bgImg[this.index]+' an1'; 
		}
	},
	mounted (){
		this.init();
	},
	methods : {
		init (){
			for(var i=0;i<this.num;i++){
				var po = i%this.line*100/this.line+'%'+' '+parseInt((i/this.line)+1)*100/this.list+'%';
				var size = (this.line+1)*100+'%'+' '+(this.list+1)*100+'%';
				this.$refs.bg[i].style['width']               = 100/this.line+'%';
				this.$refs.bg[i].style['background-position'] = po;
				this.$refs.bg[i].style['background-size']     = size;
			}
			this.over();
		},
		over (){
			var that = this;
			setInterval(function(){
				that.index++;
				if (that.index>that.bgImg.length-1) {
					that.index = 0;
				}
				(function timeout(i){
					if (i<that.num) {
						var x = i%that.line+2;
						var y = parseInt((i/that.line)+2);
						var time = x*y*50;
						if (time>x*y/2) {
							time = time - x*10
						}
						setTimeout(function(){
							//vue直接改变数组不会刷新视图层 所以要用vue提供的数组方法
							var ind   = that.className[i].indexOf('an1');
							var index = that.index;
							var cla   = '';
							index--;
							if (index<0) {
								index = that.bgImg.length-1;
							}
							if(ind!=-1){
								cla = ' an2'
							}else{
								cla = ' an1'
							}
							that.className.splice(i,1,that.bgImg[index]+cla);
							setTimeout(function(){
								that.className.splice(i,1,that.bgImg[that.index]+cla);
							},500)
						},time)
						timeout(i+1)
					}
				})(0)
			},that.line*that.list*100)
		}
	}
}
</script>

<style lang='less' scoped>
	.bgimg{
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		font-size: 0;
		img{
			display: none;
		}
		.bg1{
			background:url(../../assets/1.jpg);
		}
		.bg2{
			background:url(../../assets/2.jpg);
		}
		.bg3{
			background:url(../../assets/3.jpg);
		}
		.bg4{
			background:url(../../assets/4.jpg);
		}
		.bg5{
			background:url(../../assets/5.jpg);
		}
		.an1{
			animation: rotateY1 1s linear;
		}
		.an2{
			animation: rotateY2 1s linear;
		}
		@keyframes rotateY1 {
			0% {
				transform:rotateY(0deg);
			}
			50%{
				transform:rotateY(90deg);
			}
			100% {
				transform:rotateY(0deg)
			}
		}
		@keyframes rotateY2 {
			0% {
				transform:rotateY(0deg);
			}
			50%{
				transform:rotateY(90deg);
			}
			100% {
				transform:rotateY(0deg)
			}
		}
	}
</style>
