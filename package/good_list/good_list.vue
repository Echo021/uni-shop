<template>
	<view class="goods_list">
		<view v-for="(good,index) in goodsList" :key="good.cat_id" @click="gotoDetail(good.cat_id)">
			<my-goods :good="good"></my-goods>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{
					query: '',
					cid: '',
					pagenum: 1,
					pageSize: 10
				},
				total: 0,
				goodsList:[],
				loading: false
			};
		},
		onLoad(option){
			this.queryObj.query=option.query || '';
			this.queryObj.cid=option.cid || '';
			this.getGoodsListData()
		},
		methods:{
			async getGoodsListData(){
				this.loading=true
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj);
				this.loading = false
				if(res.meta.status!=200) return uni.$showMessage()
				this.goodsList=[...res.message.goods,...this.goodsList];
				this.total=res.message.total
			},
			gotoDetail(id){
				uni.navigateTo({
					url: `/package/goods_detail/goods_detail?goods_id=${id}`
				})
			}
		},
		onReachBottom() {
			if(this.queryObj.pagenum*this.queryObj.pageSize>=this.total) return uni.$$showMessage('数据加载完毕！')
			if(this.loading) return;
			this.queryObj.pagenum++
			this.getGoodsListData()
		},
		onPullDownRefresh(){
			this.queryObj.pagenum = 1;
			this.goodsList=[];
			this.total=0;	
			this.getGoodsListData()
		}
	}
</script>

<style lang="scss">
.goods_list{
	margin: 10px 5px;
}
</style>
