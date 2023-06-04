import Vue from 'vue'
import Vuex from 'vuex'
import cartModule from '@/store/cart'
import addrModule from '@/store/address'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		'm_cart': cartModule,
		'm_addr': addrModule
	}
})

export default store