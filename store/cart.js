export default {
	namespaced: true,
	
	state: ()=>({
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	
	mutations:{
		addToCart(state,goods){
			const result = state.cart.find(item=>item.goods_id==goods.goods_id)
			if(!result){
				state.cart.push(goods)
			}else{
				result.goods_count++
			}
			
			this.commit('m_cart/saveCartToStorage')
		},
		saveCartToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		changeGoodsStatus(state,goods){
			const result = state.cart.find(item=>item.goods_id==goods.goods_id)
			if(result){
				result.goods_status = goods.goods_status
			}
			this.commit('m_cart/saveCartToStorage')
		},
		changeGoodsCount(state,goods){
			const result = state.cart.find(item=>item.goods_id==goods.goods_id)
			if(result){
				result.goods_count = goods.goods_count
			}
			this.commit('m_cart/saveCartToStorage')
		},
		removeGoodById(state,id){
			state.cart = state.cart.filter(item=>item.goods_id!=id)
			this.commit('m_cart/saveCartToStorage')
		},
		changeAllStatus(state,checkStatus){
			state.cart.forEach(item=>item.goods_status =checkStatus)
			this.commit('m_cart/saveCartToStorage')
		}
	},
	
	getters:{
		// 统计购物车里商品的整数
		total(state){
			return state.cart.reduce((pre,now)=> pre+=now.goods_count,0)
		},
		checkedTotal(state){
			return state.cart.filter(item=>item.goods_status).reduce((pre,now)=>pre+=now.goods_count,0)
		},
		checkedAccout(state){
			return state.cart.filter(item=>item.goods_status).reduce((pre,now)=>pre+=(now.goods_price*now.goods_count),0).toFixed(2)
		}
	}
}