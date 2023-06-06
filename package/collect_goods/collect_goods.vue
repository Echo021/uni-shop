<template>
	<view class="collect_goods">
		<uni-swipe-action>
			<uni-swipe-action-item v-for="(item,i) in collectGoods" :key="i"  :right-options="options" @click="onClick">
				<view @click="gotoDetail(item.goods_id)">
					<my-goods :good="item" :flag="flag" @delete="deleteGoods"></my-goods>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				options:[
				  {
				    text: '去店铺',
				    style: {
				      backgroundColor: '#ff9f03',
							fontSize: '12px'
						}
				  }, {
				    text: '分享',
				    style: {
				      backgroundColor: '#ff6d00',
							fontSize: '12px'
						}
				  },{
							text: '删除',
							style: {
								backgroundColor: '#dd0606',
								fontSize: '12px'
							}
				  }
				],
			flag: false
			};
		},
		computed:{
			...mapState('m_collect',['collectGoods'])
		},
		methods:{
			...mapMutations('m_collect',['cacelCollect']),
			gotoDetail(id){
				uni.navigateTo({
					url: `/package/goods_detail/goods_detail?goods_id=${id}`
				})
			},
			onClick(e){
				if(e.index==2){
					this.flag = true
				}
			},
			deleteGoods(e){
				this.cacelCollect(e.id)
			}
		}
	}
</script>

<style lang="scss">

</style>
