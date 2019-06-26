<template>
	<view>
		<view class="block">
			<view class="shop-title">
				<image class="shop-img" src="../../static/common_tab_ic_shop_s.png"></image>
				<view>门店名称</view>
			</view>
		</view>
		<view class="info">
			<view class="cover"></view>
			<view class="name">服务名称服务名称服务名称服务名称服务名称服务名称服务名称</view>
			<view class="label">标准养护</view>
			<view class="price">
				<view class="value">￥88.00</view>
				<view class="num">x2</view>
			</view>
		</view>
		<view class="block">
			<view>优惠券</view>
			<view class="cupon">
				<view>优惠券</view>
				<image src="../../static/common_nav_ic_more.png"></image>
			</view>
		</view>
		<view class="block">
			<view class="input-action">
				<view>订单备注： </view>
				<input type="text" value="" placeholder="请输入"/>
			</view>
		</view>
		<view class="s-block">
			<view>商品总价</view>
			<view>￥18400.00</view>
		</view>
		<view class="s-block">
			<view>优惠金额</view>
			<view>￥18400.00</view>
		</view>
		<view class="s-block">
			<view>总计</view>
			<view>￥18400.00</view>
		</view>
		<view class="footer">
			<view class="price">
				合计：<view class="value">￥499.00</view>
			</view>
			<view class="action-btn" @tap="toPay()">
				提交订单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			//跳转支付页面
			toPay() {
				uni.navigateTo({
					url: '../index/orderPay'
				});
			}
		}
	}
</script>

<style lang="less">
	.block {
		padding: 0 30upx; font-size: 28upx;
		height: 90upx; display: flex; align-items: center; justify-content: space-between;
		.shop-title {
			display: flex; align-items: center;
		}
		.shop-img {
			width: 41upx; height: 39upx; margin-right: 10upx;
		}
		.cupon {
			display: flex; align-items: center;
			image {
				width: 17upx; height: 28upx; margin-left: 10upx;
			}
		}
		.input-action {
			display: flex; align-items: center;
			
		}
	}
	.info {
		padding: 0 30upx 0 250upx; position: relative; height: 201upx;
		.cover {
			background: 50% 50% #1B82D2 no-repeat;
			background-size: cover; width: 201upx; height: 201upx;
			position: absolute; top: 0; bottom: 0; left: 30upx;
			margin: auto;
		}
		.name {
			width: 300upx; height: 84upx; font-size: 30upx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
		.label {
			color: rgba(153,153,153,1); font-size: 26upx; margin-top: 20upx;
		}
		.price {
			position: absolute; top: 0; right: 30upx;
			.value {
				font-size: 34upx; color: rgba(255,24,63,1);
			}
			.num {
				text-align: right; font-size: 30upx; color: rgba(153,153,153,1);
			}
		}
	}
	.s-block {
		padding: 0 30upx; font-size: 30upx;
		height: 66upx; display: flex; align-items: center; justify-content: space-between;
	}
	.footer {
		position: absolute; height: 100upx; bottom: 0;
		left: 0; right: 0; border-top: 1px solid #E8EAED;
		display: flex; justify-content: space-between; align-items: center;
		.price {
			display: flex; font-size: 34upx; padding-left: 30upx;
			.value {
				color: #FF183F;
			}
		}
		.action-btn {
			height: 100upx; background: #1B82D2; width: 240upx;
			text-align: center; color: white; font-size: 32upx;
			line-height: 100upx;
		}
	}
</style>
