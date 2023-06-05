<template>
	<view class="my_address">
		<view class="add_address" v-if="!Object.keys(address).length">
			<button type="primary" size="mini" @click="chooseAdress">请选择收货地址+</button>
		</view>
		
		<view class="address_info" v-else @click="chooseAdress">
			<view class="row1">
				<view class="row1_left">收货人：{{address.userName	}}</view>
				<view class="row1_right">
					<text>电话：{{address.telNumber}}</text>
					<uni-icons type="right" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2_left">
					收货地址:
				</view>
				<view class="row2_right">{{address.detailInfo}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		name:"my-address",
		computed:{
			...mapState('m_addr',['address'])
		},
		data() {
			return {

			};
		},
		methods:{
			...mapMutations('m_addr',['updataAdress']),
			async chooseAdress(){
				const res = await uni.chooseAddress().catch(err=>err)
				if(res.errMsg==="chooseAddress:ok"){
					this.updataAdress(res)
				}
				
			}
		},
	}
</script>

<style lang="scss">
.my_address{
		border-bottom: 6px solid #ff6d00;
		.add_address{
			height: 140rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.address_info{
			padding: 5px;
			.row1{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.row1_right{
					display: flex;
					align-items: center;
				}
			}
			
			.row2{
				display: flex;
				align-items: center;
				margin-top: 10px;

				.row2_left{
					white-space: nowrap;
					padding-right: 5px;
				}
			}
		}
}
</style>