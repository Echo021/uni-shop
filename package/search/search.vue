<template>
	<view >
		<view class="search_container">
			<uni-search-bar @input="handleSearch" class="uni-mt-10" focus="true" radius="100" placeholder="请输入搜索内容" cancelButton="none"/>
		</view>
		<!-- 搜索结果区域 -->
		<view class="search_result_list" v-show="keyword.length">
			<view class="search_item" v-for="item in serachResults" :key="item.goods_id" @click="gotoGoodDeatil(item.goods_id)">
				<text>{{item.goods_name}}</text>
				<uni-icons type="right" size="20"></uni-icons>
			</view>
		</view>
		
		<!-- 搜索历史区域 -->
		<view class="search_history" v-show="!keyword.length">
			<view class="search_top">
				<text>历史搜索</text>
				<uni-icons type="trash" size="20" @click="clearTag"></uni-icons>
			</view>
			<view class="search_tag">
				<uni-tag @click="gotoGoodsList(tag)" :text="tag" v-for="(tag,index) in historyList" :key="index"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				keyword: '',
				serachResults: [],
				historyList: []
			};
		},
		onLoad(){
			this.historyList=JSON.parse(uni.getStorageSync('keyword')) || []
		},
		methods:{
			handleSearch(e){
				if(this.timer) clearTimeout(this.timer)
				this.timer=setTimeout(()=>{
					this.keyword=e.trim()
					this.handleSearchKeyword()
					this.saveHistoryTag(e.trim())
				},800)
			},
			
			async handleSearchKeyword(){
				if(this.keyword.length==0){
					this.serachResults = []
					return
				}
				const {data:res} =await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.keyword})
				if(res.meta.status!=200) return uni.$showMessage()
				this.serachResults = res.message
			},
			
			gotoGoodDeatil(id){
				uni.navigateTo({
					url: `/package/goods_detail/goods_detail?goods_id=${id}`
				})
			},
			
			saveHistoryTag(value){
				this.historyList = Array.from(new Set([value,...this.historyList]))
			  uni.setStorageSync('keyword',JSON.stringify(this.historyList))
			},
			
			clearTag(){
				this.historyList=[];
				uni.removeStorageSync('keyword')
			},
			
			gotoGoodsList(tag){
				uni.navigateTo({
					url: `/package/good_list/good_list?query=${tag}`
				})
			}
		}
	}
</script>

<style lang="scss">
.search_container{
	background-color: #ff6d00;
	position: sticky;
	top: 0;
	left: 0;
	z-index: 9;
}
.search_result_list{
	padding: 0 5px;
	
	.search_item{
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		border-bottom: 1px solid #efefef;
		padding: 10px 0;
		
		text{
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
}
.search_history{
	padding: 0 5px;
		
	.search_top{
		padding: 5px 0;
		font-size: 14px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #efefef;
	}
	
	.search_tag{
		padding-top: 5px;
		.uni-tag{
			margin-left: 5px;
			margin-top: 5px;
		}
	}
}
</style>
