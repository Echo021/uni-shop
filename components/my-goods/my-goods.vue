<template>
		<view class="goods_item">
			<view class="left_goods_image">
				<radio :checked="good.goods_status" color="#ff6d00" v-show="showRadio" @click="radioClickHandle"/>
				<image :src="good.goods_small_logo"></image>
			</view>
			<view class="right_goods_info">
				<view class="good_desc">{{good.goods_name}}</view>
				<view class="good_count">
					<view class="good_price">￥{{good.goods_price | tofixed}}</view>
					<uni-number-box :min="1" :value="good.goods_count" v-show="showRadio" @change="numChangeHandle"></uni-number-box>
				</view>
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
			},
			showRadio:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			radioClickHandle(){
				this.$emit('radioChange',{
					goods_id: this.good.goods_id,
					goods_status: !this.good.goods_status
				})
			},
			numChangeHandle(val){
				this.$emit('numChange',{
					goods_id: this.good.goods_id,
					goods_count: Number(val)
				})
			}
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
		margin-bottom: 10px;
		margin-right: 5px;
		
		.left_goods_image{
			margin: 0 5px;
			display: flex;
			align-items: center;
			
			image{
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		
		.right_goods_info{
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;
			
			.good_desc{
				font-size: 13px;
			}
			.good_count{
				display: flex;
				justify-content: space-between;
				
				.good_price{
					color: $color
				}
			}
		}
}
</style>