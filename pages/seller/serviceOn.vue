<template>
	<view class="page-service-on">
		<!-- <view class="block-search">
			<view class="type">
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">
						<view class="select-value">{{typeName}}</view>
						<image src="../../static/ic_down_n _white.png" mode=""></image>
					</view>
				</picker>
			</view>
			<mSearch class="search-action" :mode="2" button="inside" :show="false" @search="search($event,3)"></mSearch>
		</view> -->
		<uni-swipe-action :options="options" v-for="i in 6" :key="i">
			<view class='item'>
				<view class="item-cover"></view>
				<view class="item-body">
					<view class="shop-title">服务名称</view>
					<view class="shop-label">洗车美容</view>
				</view>
				<view class="item-price">
					<view class="total">￥88</view>
					<view class="market">$100</view>
				</view>
			</view>
		</uni-swipe-action>
		<view class="action">
			<view class="btn-add">
				新增
			</view>
		</view>
	</view>
</template>

<script>
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue"
	export default {
		components: {uniSwipeAction, mSearch},
		data() {
			return {
				typeName: '全部',
				array: ['全部', '美国', '巴西', '日本'],
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
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
		}
	}
</script>

<style lang="less">
	.page-service-on {
		padding-bottom: 150upx;
	}
	.block-search {
		display: flex;
		.type {
			flex-grow: 3; display: flex; align-items: center;
			image {
				width: 21upx; height: 13upx;
			}
		}
		.search-action {
			flex-grow: 4; width: 400upx;
		}
	}
	.item {
		height: 164upx; padding: 30upx; display: flex; justify-content: space-between;
		.item-cover {
			width: 164upx; height: 164upx; background: 50% 50% #1B82D2 no-repeat; background-size: cover;
		}
		.item-body {
			flex-grow: 1; margin-left: 10upx;
			.shop-title { font-size: 36upx; color: #1B82D2; }
			.shop-label {
				margin-top: 50upx;
				font-size: 28upx; color: #666666; padding: 0 20upx; height: 58upx; background: #ededed;
				border-radius: 29upx; display: inline-block; line-height: 58upx;
			}
		}
		.item-price {
			.total { font-size: 36upx; color: #fa2b2b; }
			.market { font-size: 22upx; text-decoration: line-through; color: #999999; }
		}
	}
	.action {
		position: fixed; bottom: 0; left: 0; right: 0; height: 120upx;
		background: white;
		display: flex; justify-content: center; align-items: center;
	}
	.btn-add {
		width: 680upx; height: 98upx;
		line-height: 98upx; text-align: center; color: white;
		font-size: 38upx; background: #1B82D2; border-radius: 8upx;
	}
</style>
