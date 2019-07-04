<template>
	<view>
		<!-- <view class="block-search">
			<view class="type">
				<view class="">{{typeName}}</view>
				<image src="../../static/ic_down_n _white.png" mode=""></image>
			</view>
			<view class="search">
				<image src="" mode=""></image>
			</view>
		</view> -->
		<uni-swipe-action :options="options" v-for="i in 6" :key="i">
			<view class='item'>
				<view class="item-cover"></view>
				<view class="item-body">
					<view class="title">服务名称</view>
				</view>
				<view class="item-price">
					<view class="total">￥88</view>
					<view class="market">$100</view>
				</view>
			</view>
		</uni-swipe-action>
	</view>
</template>

<script>
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue"
	export default {
		components: {uniSwipeAction},
		data() {
			return {
				options: [{
					text: '编辑',
					style: {
						backgroundColor: '#1B82D2'
					}
				}, {
					text: '下架',
					style: {
						backgroundColor: '#FF183F'
					}
				}]
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
