export default {
	namespaced: true,
	
	state:()=>({
		address: JSON.parse(uni.getStorageSync('address') || '{}')
	}),
	
	mutations:{
		updataAdress(state,address){
			state.address=address
			this.commit('m_addr/saveAdressStorage')
		},
		saveAdressStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		}
	},
	
	getters:{}
}