<template>
	<view>
		<my-userInfo v-if="token"></my-userInfo>
		<my-login v-else></my-login>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar_badge.js'
	import {mapState} from 'vuex'
	
	export default {
		mixins:[badgeMix],
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_addr',['token'])
		}
	}
</script>

<style lang="scss">

</style>
