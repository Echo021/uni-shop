<template>
	<view class="my_search_container" :style="{'background-color': bgc }" @click="search">
		<view class="my_search_box" :style="{'border-radius': borderRadius+'px'}">
			<uni-icons type="search" size="20"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props:{
			bgc:{
				type: String,
				default: '#ff6d00'
			},
			borderRadius:{
				type: Number,
				default: 15
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			search(){
				this.$emit('myclick')
			}
		}
	}
</script>

<style lang="scss">
.my_search_container{
	height: 50px;
	display: flex;
	align-items: center;
	
	.my_search_box {
		height: 30px;
		width: 100%;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 10px;
		
		text{
			font-size: 14px;
			display: block; 
			margin-left: 5px;
		}
	}
}
</style>