<template>
		<view class="goods_item">
			<view class="left_goods_image">
				<image :src="good.goods_small_logo"></image>
			</view>
			<view class="right_goods_info">
				<view class="good_desc">{{good.goods_name}}</view>
				<view class="good_price">￥{{good.goods_price | tofixed}}</view>
			</view>
		</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			good:{
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				
			};
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
$color: #ff6d00;
	.goods_item{
		display: flex;
		margin-bottom: 5px;
		
		.left_goods_image{
			margin-right: 5px;
			
			image{
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		
		.right_goods_info{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			
			.good_desc{
				font-size: 13px;
			}
			.good_price{
				color: $color
			}
		}
}
</style>