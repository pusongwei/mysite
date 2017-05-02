<template>
	<div class="swiperComponent">
	    <swiper :options="swiperOption">
	    	<swiper-slide class="swiper-swiping" data-id="swiper">
	        	<img src="../../assets/1.jpg" alt="">
	        </swiper-slide>
	        <swiper-slide class="swiper-swiping" data-id="swiper">
	        	<img src="../../assets/2.jpg" alt="">
	        </swiper-slide>
	        <swiper-slide class="swiper-swiping" data-id="swiper">
	        	<img src="../../assets/3.jpg" alt="">
	        </swiper-slide>
	        <swiper-slide class="swiper-swiping" data-id="swiper">
	        	<img src="../../assets/4.jpg" alt="">
	        </swiper-slide>
	        <swiper-slide class="swiper-swiping" data-id="swiper">
	        	<img src="../../assets/5.jpg" alt="">
	        </swiper-slide>
	    	<div class="swiper-pagination" slot="pagination"></div>
	    </swiper>
	    <div class="yearn">
	    	I yearn
	    </div>
	</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
	components: {
		swiper,
		swiperSlide
	},
	data () {
		return {
			swiperOption: {
				autoplay: 2000,
				loop: true,
				pagination : '.swiper-pagination',
				autoplayDisableOnInteraction: false,
				paginationClickable :true,
				mousewheelControl:true,
				observeparents:true,
				simulateTouch :true,
				observer:true,
				observeParents:true
	    	}
		}
	}
}
</script>

<style lang='less' scoped>
	.yearn{
		width: 100px;
		height: 20px;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: 10px auto;
		z-index: 100;
		color: #fff;
		text-align: center;
		line-height: 20px;
		font-size: 20px;
		font-weight: bold;
	}
	.swiperComponent{
		margin-top: 20px;
		width: 40%;
		position: relative;
		.swiper-swiping{
			width: 100%;
			img{
				display: block;
				width: 100%;
			}
		}
	}
@media all and (max-width: 439px){
	.swiperComponent{
		margin: 0;
		width: 100%;
	}
}
</style>