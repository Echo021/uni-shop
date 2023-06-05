<template>
	<view class="my_login">
		<uni-icons type="staff-filled" size="100"></uni-icons>
		<button type="primary" @click="bindGetUserInfo">一键登录</button>
		<view class="text">登录后尽享更多优惠</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_addr',['userInfo','token','redirectInfo'])
		},
		methods:{
			...mapMutations('m_addr',['updateUserInfo','updateToken','updateRedirect']),
			
			async login(authDetail) {
				const res = await uni.login().catch(err=>err)
				
				if(res.errMsg!=='login:ok') return uni.$showMessage('登录失败！')
				
				const {encryptedData, iv, rawData, signature} = authDetail
				const query={
					code: res.code,
					encryptedData,
					iv,
					rawData,
					signature
				}
				
				const loginRes = await uni.$http.post('/api/public/v1/users/wxlogin',query)
				if(loginRes.statusCode!==200) return uni.$showMessage('登录失败！')
				
				this.updateToken(loginRes.cookies[0])
				this.navigatorBack()
				uni.$showMessage('登录成功 ')
			},
			bindGetUserInfo(e) {
				let _this = this
				uni.getUserProfile({
					desc:'weixin',   
					success:res=>{
						_this.login(res)
						this.updateUserInfo(res.userInfo)
					},
					fail:err=>{
						console.log(err,'失败授权')
					}
				})
			},
			navigatorBack(){
				if(this.redirectInfo && this.redirectInfo.openType== 'switchTab'){
					uni.switchTab({
						url: this.redirectInfo.from,
						complete: () => {
							this.updateRedirect({})
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.my_login{
	height: 750rpx;
	background-color: #efefef;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	overflow: hidden;
	
	&::after{
		content: ' ';
		height: 50px;
		background-color: white;
		width: 100%;
		position: absolute;
		bottom: -25px;
		left: 0;
		border-radius: 25px;
	}
	
	button{
		width: 90%;
		background-color: #ff6d00;
		border-radius: 50px;
		margin-bottom: 10px;
	}
	.text{
		color: gray;
		font-size: 13px;
	}
}
</style>