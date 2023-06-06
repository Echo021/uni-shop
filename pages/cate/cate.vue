<template>
	<view>
		<my-search @click.native="handleSearch"></my-search>
		<view class="scroll_view">
			<!-- 左边滚动区 -->
			<scroll-view class="left_scroll_view" scroll-y="true" :style="{height: wh +'px'}">
				<block v-for="(item,index) in cateList" :key="item.cat_id">
					<view :class="['left_scroll_view_item', item.cat_id==cateActive ?'active':'']" @click="selectActive(item.cat_id)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 右边滚动区 -->
			<scroll-view class="right_scroll_view" scroll-y="true" :style="{height: wh +'px'}" :scroll-top="scrollTop">
				<block v-for="item2 in cateLevel2" :key="item2.cat_id">
					<view class="cata_l2_title">/ {{item2.cat_name}} /</view>
					<!-- 三级分类区域 -->
					<view class="cate_l3_contaier">
						<view class="cate_l3_item" v-for="item3 in item2.children" :key="item3.cat_id" @click="gotoGoodList(item3.cat_id)">
							<image :src="item3.cat_icon" mode="widthFix"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar_badge.js'
	
	export default {
		mixins:[badgeMix],
		data() {
			return {
				wh: '', //屏幕可用高度
				cateList: [],
				cateActive: 0,
				cateLevel2:[],
				scrollTop: 0
			};
		},
		onLoad(){
			const syncInfo = uni.getSystemInfoSync()
			this.wh = syncInfo.windowHeight
			
			//获取分类列表
			this.getCateList()
		},
		methods:{
			async getCateList(){
				const {data:res} = await uni.$http.get('/api/public/v1/categories')
				if(res.meta.status!=200) return uni.$showMessage()
				this.cateList = res.message
				this.cateActive = res.message[0].cat_id
				this.cateLevel2 = res.message[0].children
				uni.$showMessage('数据请求成功')
			},
			
			selectActive(activeId){
				this.cateActive = activeId
				this.cateLevel2 = this.cateList.find(item=>item.cat_id == activeId).children
				this.scrollTop = this.scrollTop == 0 ? 1 : 0
			},
			
			gotoGoodList(id){
				uni.navigateTo({
					url: `/package/good_list/good_list?cid=${id}`
				})
			},
			handleSearch(){
				uni.navigateTo({
					url: '/package/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.scroll_view{
	display: flex;
	
	.left_scroll_view{
		width: 240rpx;
		
		.left_scroll_view_item{
			height: 60px;
			background-color: #f3f3f3;
			font-size: 12px;
			text-align: center;
			line-height: 60px;
			position: relative;
			
			&.active{
				background-color: #fff;
				
				&::before{
					content: ' ';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #ff6d00;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
		
	}

	.right_scroll_view{
			.cata_l2_title{
				text-align: center;
				padding: 15px 0;
				font-weight: bold;
				font-size: 12px;
			}
			
			.cate_l3_contaier{
				display: flex;
				flex-wrap: wrap;
							
				.cate_l3_item{
					width: 33.33%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					margin-bottom: 10px;
					
					image{
						width: 60px;
						height: 60px;
					}
					
					text{
						font-size: 12px
					}
				}
			}
		}
}
</style>
