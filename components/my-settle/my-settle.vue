<template>
	<view class="settlement">
		<view class="checkAll">
			<label class="radio" @click="changeStatus">
				<radio :checked="checkAll" color="#ff6d00"/><text>全选</text>
			</label>
		</view>
		
		<view class="total_price">
			<text>合计</text>
			<text class="price">￥{{checkedAccout}}</text>
		</view>
		
		<view class="payBtn">结算({{checkedTotal}})</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters('m_cart',['checkedTotal','total','checkedAccout']),
			checkAll(state){
				return this.checkedTotal == this.total
			}
		},
		methods:{
			...mapMutations('m_cart',['changeAllStatus']),
			changeStatus(e){
				this.changeAllStatus(!this.checkAll)
			}
		}
	}
</script>

<style lang="scss">
.settlement {
	height: 50px;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 99;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 13px;
	background-color: white;
	
	.checkAll{
		padding-left: 5px;
		display: flex;
		align-items: center;
	}
	
	.total_price{
		.price{
			color: #ff6d00;
			font-weight: 700;
		}
	}
	.payBtn{
		height: 100%;
		line-height: 50px;
		background-color: #ff6d00;
		color: white;
		padding: 0 20px;
	}
}
</style>