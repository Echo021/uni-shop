import Vue from 'vue'
import Vuex from 'vuex'
import cartModule from '@/store/cart'
import addrModule from '@/store/address'
import collectModule from '@/store/collect'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		'm_cart': cartModule,
		'm_addr': addrModule,
		'm_collect': collectModule
	}
})

export default store