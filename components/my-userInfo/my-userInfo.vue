<template>
	<view class="my_userInfo_container">
		<view class="avator_box">
			<image :src="userInfo.avatarUrl" class="avator_img"></image>
			<text>{{userInfo.nickName}}</text>
		</view>
		
		<view class="panel">
			<view class="panel_item">
				<view class="top_list" v-for="(item,index) in first_list" :key="index">
					<text>{{item.num}}</text>
					<text class="panel_name">{{item.name}}</text>
				</view>
			</view>
			
			
			<view class="">
				<view class="panel_title">
					我的订单
				</view>
				<view class="panel_item">
					<view class="middle_list">
						<uni-icons type="cloud-upload" size="20"></uni-icons>
						<text class="panel_name">待付款</text>
					</view>
					<view class="middle_list">
						<uni-icons type="cloud-download-filled" size="20"></uni-icons>
						<text class="panel_name">待收货</text>
					</view>
					<view class="middle_list">
						<uni-icons type="cloud-download" size="20"></uni-icons>
						<text class="panel_name">退款/退货</text>
					</view>
					<view class="middle_list">
						<uni-icons type="cloud-upload-filled" size="20"></uni-icons>
						<text class="panel_name">全部订单</text>
					</view>
				</view>
			</view>
			
			
			<view class="panel_item panel_bottom">
				<view class="bottom_list">
					<text class="panel_name">收获地址</text>
					<uni-icons type="right" size="20"></uni-icons>
				</view>
				<view class="bottom_list">
					<text class="panel_name">联系客服</text>
					<uni-icons type="right" size="20"></uni-icons>
				</view>
				<view class="bottom_list" @click="logout">
					<text class="panel_name">退出登录</text>
					<uni-icons type="right" size="20"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	export default {
		name:"my-userInfo",
		data() {
			return {
				first_list:[
					{
						num: 8,
						name: '收藏的店铺'
					},
					{
						num: 14,
						name: '收藏的商品'
					},
					{
						num: 81,
						name: '关注的商品'
					},
					{
						num: 18,
						name: '足迹'
					}
				],
			};
		},
		computed:{
			...mapState('m_addr',['userInfo'])
		},
		methods:{
			...mapMutations('m_addr',['updataAdress','updateUserInfo','updateToken']),
			async logout(){
				const res = await uni.showModal({
					title: '提示',
					content: '确认退出吗？'
				}).catch(err=>err)
				if(res && res.confirm){
					this.updataAdress({})
					this.updateUserInfo({})
					this.updateToken('')
				}
			}
		}
	}
</script>

<style lang="scss">
.my_userInfo_container{
	height: 100vh;
	background-color: #efefef;
	
	.avator_box{
		height: 250px;
		background-color: #ff6d00;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.avator_img{
			width: 100px;
			height: 100px;
			border-radius: 50%;
			box-shadow: 0 1px 5px black;
			margin-bottom: 5px;
		}
		
		text{
			font-size: 18px;
			color: #fff;
		}
	}

	.panel{
		position: relative;
		top: -20px;
		margin: 0 10px;
		
		.panel_item{
			background-color: #fff;
			border-radius: 10px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			padding: 10px 0;
			font-size: 13px;
			margin-bottom: 10px;
			
			.top_list,.middle_list{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
			}
		}
		
		.panel_bottom{
			flex-direction: column;
			.bottom_list{
				display: flex;
				justify-content: space-between;
				align-items: center;
				line-height: 45px;
			}
		}
	}
}
</style>