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
		
		<view class="payBtn" @click="settlement">结算({{checkedTotal}})</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	
	export default {
		name:"my-settle",
		data() {
			return {
				second: 3,
				timer: null
			};
		},
		computed:{
			...mapState('m_addr',['address','token']),
			...mapState('m_cart',['cart']),
			...mapGetters('m_cart',['checkedTotal','total','checkedAccout']),
			checkAll(state){
				return this.checkedTotal == this.total
			}
		},
		methods:{
			...mapMutations('m_cart',['changeAllStatus']),
			...mapMutations('m_addr',['updateRedirect']),
			changeStatus(e){
				this.changeAllStatus(!this.checkAll)
			},
			settlement(){
				if(!this.checkedTotal) return uni.$showMessage('请选择要结算的商品！')
				
				if(!this.address.detailInfo) return uni.$showMessage('请选择收货地址！')
				
				if(!this.token) return this.delayToast(4)
				
				this.payOrder()
			},
			async payOrder(){
				const orderInfo ={
					order_price: 0.01,
					consignee_addr: this.address.detailInfo,
					goods: this.cart.filter(item=>item.goods_status).map(item=>({
						goods_id: item.goods_id,
						goods_number: item.goods_count,
						goods_price: item.goods_price
					}))
				}
				
				const res =await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
				console.log(res)
			},
			delayToast(n){
				this.second = n;
				this.showToast(this.second)
				
				this.timer = setInterval(()=>{
					if(this.second<=0){
						clearInterval(this.timer)
						uni.switchTab({
							url: '/pages/my/my',
							success:()=> {
								this.updateRedirect({
									openType: 'switchTab',
									from:'/pages/cart/cart'
								})
							}
						})
						
						return this.second = n
					}
					
					this.showToast(this.second--)
				},1000)
			},
			showToast(n){
				return uni.showToast({
					icon: 'none',
					title: `将在${n}秒后跳转到登录页面`,
					mask: true,
					duration: 1500
				})
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