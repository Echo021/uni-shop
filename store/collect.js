export default {
	namespaced:true,
	
	state:()=>({
		collectGoods: JSON.parse(uni.getStorageSync('collect') || '[]'),
		collectNum: JSON.parse(uni.getStorageSync('collect') || '[]').length
	}),
	
	mutations:{
		updateCollectGoods(state,goods){
			state.collectGoods.unshift(goods)
			state.collectNum++
			this.commit('m_collect/saveCollectGoodsStorage')
		},
		saveCollectGoodsStorage(state){
			return uni.setStorageSync('collect',JSON.stringify(state.collectGoods))
		},
		cacelCollect(state,id){
			state.collectGoods= state.collectGoods.filter(item=>item.goods_id!=id)
			state.collectNum--
			this.commit('m_collect/saveCollectGoodsStorage')
		},
		
	},
	
	getters:{
		
	}
}