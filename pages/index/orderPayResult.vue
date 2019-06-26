<template>
	<view>
		<image class="status-img" v-if="status" src="../../static/ic_success.png"></image>
		<image class="status-img" v-if="!status" src="../../static/ic_fail.png"></image>
		<view class="tips" v-if="status">付款成功</view>
		<view class="tips" v-if="!status">付款失败</view>
		<view class="action" v-if="status">
			<view class="item" @tap="toOrders()">查看订单</view>
			<view class="item active" @tap="toHome()">返回首页</view>
		</view>
		<view class="action-btn" v-if="!status" @tap="toOrderPay()">重新支付</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: true
			}
		},
		methods: {
			//跳转订单页面
			toOrders() {
				uni.reLaunch({
					url: '../index/orders'
				});
			},
			//跳转门店列表页面
			toHome() {
				uni.reLaunch({
					url: '../index/index'
				});
			},
			//跳转订单支付页
			toOrderPay() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="less">
	.status-img {
		width: 150upx; height: 150upx; display: block;
		margin: 150upx auto 40upx auto;
	}
	.tips {
		text-align: center; font-size: 36upx; font-weight: 500;
		color: rgba(19,19,25,1); line-height: 38upx; margin-bottom: 80upx;
	}
	.action {
		display: flex; justify-content: space-around;
		.item {
			width: 310upx; height: 90upx; border: 1px solid #CCCCCC;
			border-radius: 4upx; text-align: center; line-height: 90upx;
			font-size: 36upx; background: white;
			&.active {
				background: #1B82D2; color: white; border: 1px solid #1B82D2;
			}
		}
	}
	.action-btn {
		width: 630upx; height: 90upx; margin: auto;
		border-radius: 4upx; text-align: center; line-height: 90upx;
		font-size: 36upx; background: #FF183F; color: white;
	}
</style>
