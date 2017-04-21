<template>
	<div class="home">
		<div class="swiperComponent">
		    <swiper :options="swiperOption">
		    	<swiper-slide class="swiper-swiping" data-id="swiper">
		        	asd
		        </swiper-slide>
		    	<div class="swiper-pagination" slot="pagination"></div>
		    </swiper>
		</div>
	</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
	name: 'home',
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
	},
	created (){
		this.getDate()
	},
	methods :{
		getDate(){
			this.$http.get('localhost:3000/users/addUser', {
				username: 'name',
				age: 'age'
			},{}).then((response) => {
				console.log(response);
			})
		}
	}
}
</script>

<style lang='less' scoped>
  
</style>
