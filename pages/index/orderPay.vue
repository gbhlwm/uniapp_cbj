<template>
	<view>
		<view class="block">
			<view>需支付 <view class="price">￥2000.00</view></view>
		</view>
		<view class="block type">
			选择支付方式
		</view>
		<view class="block" @tap="choosePayType(1)">
			微信
			<image v-if="payType !== 1" src="../../static/common_ic_choice_big_n.png"></image>
			<image v-if="payType === 1" src="../../static/common_ic_choice_big_s.png"></image>
		</view>
		<view class="block" @tap="choosePayType(2)">
			支付宝
			<image v-if="payType !== 2" src="../../static/common_ic_choice_big_n.png"></image>
			<image v-if="payType === 2" src="../../static/common_ic_choice_big_s.png"></image>
		</view>
		<view class="block" @tap="choosePayType(3)">
			余额（￥1000.00）
			<image v-if="payType !== 3" src="../../static/common_ic_choice_big_n.png"></image>
			<image v-if="payType === 3" src="../../static/common_ic_choice_big_s.png"></image>
		</view>
		<view class="action-btn" @tap="toPayResult()">
			确定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payType: 1
			}
		},
		methods: {
			//选择支付方式
			choosePayType(payType) {
				this.payType = payType;
			},
			//跳转支付结果页面
			toPayResult() {
				uni.navigateTo({
					url: '../index/orderPayResult'
				});
			}
		}
	}
</script>

<style lang="less">
	.block {
		height: 100upx; display: flex; align-items: center;
		justify-content: space-between; padding: 0 30upx;
		font-size: 30upx; color: rgba(51,51,51,1);
		image {
			width: 40upx; height: 40upx;
		}
		.price {
			color: rgba(255,24,63,1); display: inline;
		}
		&.type {
			color: rgba(153,153,153,1);
		}
	}
	.action-btn {
		position: absolute; bottom: 20upx; margin: auto;
		left: 0; right: 0; height: 98upx; width: 680upx;
		background: #1B82D2; color: white; text-align: center;
		line-height: 98upx; font-size: 38upx; border-radius: 8upx;
	}
</style>
