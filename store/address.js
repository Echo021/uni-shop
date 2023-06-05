export default {
	namespaced: true,
	
	state:()=>({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
		redirectInfo: {}
	}),
	
	mutations:{
		updataAdress(state,address){
			state.address=address
			this.commit('m_addr/saveAdressStorage')
		},
		saveAdressStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		updateUserInfo(state,userInfo){
			state.userInfo=userInfo
			this.commit('m_addr/saveUserInfoStorage')
		},
		saveUserInfoStorage(state){
			uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
		},
		updateToken(state,token){
			state.token=token
			this.commit('m_addr/saveTokenStorage')
		},
		saveTokenStorage(state){
			uni.setStorageSync('token',state.token)
		},
		updateRedirect(state,info){
			state.redirectInfo = info
		}
	},
	
	getters:{}
}