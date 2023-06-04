<template>
	<view>
		<view class="search_box">
			<my-search @myclick.native="handleSearch"></my-search>
		</view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="item.goods_id">
				<navigator class="swiper-item" :url="`/package/goods_detail/goods_detail?goods_id=${item.goods_id}`">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		
		<!-- 分类区域 -->
		<view class="nav_list">
			<view class="nav_item" v-for="item in navList" :key="item.name" @click="navClickHandle(item.name)">
				<image :src="item.image_src" ></image>
			</view>
		</view>
		
		<!-- 商品区域 -->
		<view class="floor_list">
			<view class="floor_item" v-for="(item,i) in floorList" :key="i">
				<image :src="item.floor_title.image_src" class="floor_img"></image>
				<view class="floor_img_box">
					<!-- 左边图片 -->
					<navigator class="left_img" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" mode="widthFix" :style="{width: item.product_list[0].image_width + 'rpx'}"></image>
					</navigator>
					<!-- 右边图片 -->
					<view class="right_img">
						<navigator v-for="(item,index) in item.product_list" :key="index" v-if="index!=0" :url="item.url">
							<image :src="item.image_src" mode="widthFix" :style="{width: item.image_width + 'rpx'}" />
						</navigator>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar_badge.js'
	
	export default {
		mixins:[badgeMix],
		data() {
			return {
				swiperList:[],
				navList:[],
				floorList:[]
			};
		},
		onLoad(){
			this.getSwiperData()
			this.getNavData()
			this.getFloorData()
		},
		methods:{
			async getSwiperData(){
				const {data:res} =await uni.$http.get("/api/public/v1/home/swiperdata")
				if(res.meta.status!=200) return uni.$showMessage()
				this.swiperList = res.message;
				uni.$showMessage('数据请求成功')
			},
			
			async getNavData(){
				const {data:res} =await uni.$http.get("/api/public/v1/home/catitems")
				if(res.meta.status!=200) return uni.$showMessage()
				this.navList = res.message;
				uni.$showMessage('数据请求成功')
			},
			
			async getFloorData(){
				const {data:res} =await uni.$http.get("/api/public/v1/home/floordata")
				if(res.meta.status!=200) return uni.$showMessage()
				res.message.forEach(item=>{
					item.product_list.forEach(prod=>{
						prod.url = '/package/good_list/good_list?'+prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message;
				uni.$showMessage('数据请求成功')
			},
			
			navClickHandle(name){
				if(name==='分类') uni.switchTab({
					url: '/pages/cate/cate'
				})
			},
			
			handleSearch(){
				uni.navigateTo({
					url: '/package/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.search_box{
	position: sticky;
	top: 0;
	z-index: 999;
}
swiper{
	height: 330rpx;
	
	.swiper-item,
	image{
		width: 100%;
		height: 100%;
	}
}

.nav_list{
	display: flex;
	justify-content: space-around;
	margin: 15px 0;
	
	.nav_item image{
		width: 128rpx;
		height: 140rpx;
	}
}

.floor_list {
	.floor_img{
		width: 100%;
		height: 60rpx;
	}
}
.floor_img_box {
	display: flex;
	justify-content: space-around;
	padding-left: 10rpx;
	
	.right_img{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
}
</style>
