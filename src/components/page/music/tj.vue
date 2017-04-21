<template>
	<div class="tj">
		<ul class="list1">
			<li>
				<div class="one" v-for='(item,i) in tj' v-if='i<3' @click='goList(item)'>
					<img :src="item.song_pic?item.song_pic[0].pi_link:item.album_pic[0].pi_link" alt="">
					<p>{{item.song_title?item.song_title:item.album_title}}</p>
					<span>#{{item.tag?item.tag[0].tag_name:item.album.tag[0].tag_name}}</span>
				</div>
			</li>
			<li>
				<div class="one" v-for='(item,i) in tj' v-if='i>=3' @click='goList(item)'>
					<img :src="item.song_pic?item.song_pic[0].pi_link:item.album_pic[0].pi_link" alt="">
					<p>{{item.song_title?item.song_title:item.album_title}}</p>
					<span>#{{item.tag?item.tag[0].tag_name:item.album.tag[0].tag_name}}</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props:{
	    tj : {
	      type:Array,
	      default :function(){}
	    }
	},
	methods :{
		goList (item){
			this.$emit('musicList',{item:item})
		}
	}
}
</script>

<style lang='less' scoped>
	.list1{
		width: 100%;
		li{
			margin-top: 10px;
			width: 100%;
			padding:0 14px;
			display:-webkit-box;
		    display: -moz-box;
		    display: -ms-flexbox;
		    -webkit-box-pack:justify;
		    -moz-box-pack:justify;
		    -ms-box-pack:justify;
			div{
				width: 32%;
				img{
					width: 100%;
					border-radius: 5px;
				}
				p{
					width: 100%;
					height: 40px;
					font-size: 14px;
					overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				span{
					display: block;
					color: #999;
					height: 30px;
					line-height: 30px;
					font-size: 14px;
				}
			}
		}
	}
</style>