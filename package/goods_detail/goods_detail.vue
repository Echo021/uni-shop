<template>
	<view v-if="goodDetail" style="padding-bottom: 50px;" @delete="deleteCollect">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in goodDetail.pics" :key="item.goods_id">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		
		<!-- 信息区域 -->
		<view class="good_info">
			<view class="good_price">￥{{goodDetail.goods_price}}</view>
			<view class="good_middle">
				<view class="good_desc">{{goodDetail.goods_name}}</view>
				<view class="good_collect">
					<uni-icons type="star" size="20" color="gray"></uni-icons>
					<view class="good_collect_text">收藏</view>
				</view>
			</view>
			<view class="fee">免运费</view>
		</view>
		
		<rich-text :nodes="goodDetail.goods_introduce"></rich-text>
		
		<view class="good_nav">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick"/>			
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		computed:{
				...mapGetters('m_cart',['total']),
				...mapState('m_collect',['collectGoods'])
		},
		watch:{
			total:{
				handler(newVal){
					const cartOption = this.options.find(item=>item.icon=='cart')
						if(cartOption){
							cartOption.info=newVal
						}
				},
				immediate: true
			}
		},
		data() {
			return {
				goods_id: '',
				goodDetail: null,
				collected: true,
				options: [{
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				},{
					icon: 'star',
					text: '收藏',
				}],
				buttonGroup: [{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				},{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}]
			};
		},
		onLoad(option) {
			this.goods_id = option.goods_id,
			this.getGoodDetailInfo(this.goods_id)
		},
		methods:{
			...mapMutations('m_cart',['addToCart']),
			...mapMutations('m_collect',['updateCollectGoods','cacelCollect']),
			
			async getGoodDetailInfo(goods_id){
				const {data:res} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
				if(res.meta.status!=200) return uni.$showMessage()
				res.message.goods_introduce=res.message.goods_introduce.replace(/<img /g,'<img style="display:block;"')
				this.goodDetail =res.message
			},
			
			preview(index){
				uni.previewImage({
					urls: this.goodDetail.pics.map(item=>item.pics_big),
					current: index
				})
			},
			
			onClick(e){
				if(e.content.icon=='cart') uni.switchTab({
					url: '/pages/cart/cart'
				})
				if(e.content.icon=='star'){
					const {goods_id,goods_name,goods_price,goods_small_logo} = this.goodDetail
					const goods ={
						goods_count: 1,
						goods_id,
						goods_name,
						goods_price,
						goods_status: true,
						goods_small_logo
					};
					if([...this.collectGoods].some(item=>item.goods_id==goods_id)) {
						this.deleteCollect(goods_id)
						return uni.$showMessage('取消收藏！')
					}
					
					this.updateCollectGoods(goods)
					uni.$showMessage('收藏成功！')
				}
			},
			
			buttonClick(e){
				const {goods_id,goods_name,goods_price,goods_small_logo} = this.goodDetail
				if(e.index==0){
					const goods ={
						goods_count: 1,
						goods_id,
						goods_name,
						goods_price,
						goods_status: true,
						goods_small_logo
					};
					this.addToCart(goods)
				}
			},
			deleteCollect(id){
				this.cacelCollect(id)
			}
		}
	}
</script>

<style lang="scss">
swiper{
	height: 600rpx;
	
	image{
		width: 100%;
		height: 100%;
	}
}


.good_info{
	padding: 10px;
	padding-right: 0;
	
	.good_price{
		color: #ff6d00;
		font-size: 15px
	}
	.good_middle{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 5px 0;
		
		.good_desc {
			font-size: 13px;
			padding-right: 5px;
		}
		
		.good_collect{
			width: 120px;
			border-left: 1px solid #efefef;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.good_collect_text{
				color: gray;
			}
		}
	}
	
	.fee{
		color: gray;
		font-size: 15px;
	}
}

.good_nav{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}
</style>
