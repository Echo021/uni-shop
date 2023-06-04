<template>
	<view style="padding-bottom: 50px;" v-if="cart.length">
		<my-address></my-address>
		<view class="cart_box">
			<view class="cart_top">
				<uni-icons type="shop-filled" size="18"></uni-icons>
				<text class="cart_name">购物车</text>
			</view>
			<uni-swipe-action>
				<block v-for="(good,index) in cart" :key="index">
					<uni-swipe-action-item :right-options="options" @click="removeGood(good.goods_id)">
						<my-goods :good="good" :showRadio="true" @radioChange="radioChange" @numChange="numChange"></my-goods>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
		</view>
		<my-settle></my-settle>
	</view>
	<view class="empty_cart" v-else>
		<image src="../../static/images/emptyCart.png"></image>
		<text>空空如也~</text>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar_badge.js';
	import { mapState, mapMutations } from 'vuex';
	
	export default {
		mixins:[badgeMix],
		computed:{
			...mapState('m_cart',['cart']),
		},
		data() {
			return {
				options:[{
					text: '删除',
					style:{
						backgroundColor: '#ff6d00'
					}
				}]
			};
		},
		methods:{
			...mapMutations('m_cart',['changeGoodsStatus','changeGoodsCount','removeGoodById']),
			radioChange(e){
				this.changeGoodsStatus(e)
			},
			numChange(e){
				this.changeGoodsCount(e)
			},
			removeGood(id){
				this.removeGoodById(id)
			}
		}
	}
</script>

<style lang="scss">
.cart_box{
	.cart_top{
		display: flex;
		align-items: center;
		padding: 8px 5px;
		border-bottom: 1px solid #efefef;
		margin-bottom: 5px;
		.cart_name{
			font-size: 14px;
			padding-left: 5px;
		}
	}
}
.empty_cart{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	
	image{
		width: 50px;
		height: 50px;
		padding-top: 50px;
		padding-bottom: 10px;
	}
}
</style>
