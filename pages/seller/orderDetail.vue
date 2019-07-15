<template>
	<view>
		<view class="status" v-if="from === 'scan'">待使用</view>
		<view class="status" v-if="from !== 'scan' && order.status === 1">待付款</view>
		<view class="status" v-if="from !== 'scan' && order.status === 2">待核销</view>
		<view class="status" v-if="from !== 'scan' && order.status === 3">已核销</view>
		<view class="status" v-if="from !== 'scan' && order.status === 4">已完成</view>
		<view class="status" v-if="from !== 'scan' && order.status === 5">已取消</view>
		<view class="block-info">
			<view class="info-shop">
				<image src="../../static/ic_store.png"></image>
				{{order.shopName}}
			</view>
			<view class="info-content">
				<view class="service-cover" :style="{'background-image': 'url(' + order.image + ')'}"></view>
				<view class="service-detail">
					<view class="title">{{order.mealName}}</view>
					<view class="service-label">{{order.serviceName}}</view>
					<view class="eval">
						<view class="price">${{order.price}}</view>
						<view class="number">x{{order.number}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="block-eval">
			<view class="item">
				<view class="title">商品总价</view>
				<view class="price">${{order.totalPrice}}</view>
			</view>
			<!-- <view class="item">
				<view class="title">优惠金额</view>
				<view class="price">-$10</view>
			</view> -->
			<view class="item">
				<view class="title">总计</view>
				<view class="price active">${{order.totalFee}}</view>
			</view>
		</view>
		<view class="block-order">
			<view class="title">
				<view class="title-label"></view>
				订单信息
			</view>
			<view class="item">
				<view class="item-title">用户昵称：</view>
				<view class="item-value">{{order.totalFee}}</view>
				<view class="item-action">
					<!-- <view class="btn-copy">复制</view> -->
				</view>
			</view>
			<view class="item">
				<view class="item-title">用户手机号：</view>
				<view class="item-value">{{order.userPhone}}</view>
				<view class="item-action">
					<!-- <view class="btn-copy">复制</view> -->
				</view>
			</view>
			<view class="item">
				<view class="item-title">订单号：</view>
				<view class="item-value">{{order.orderSn}}</view>
				<view class="item-action">
					<view class="btn-copy" @tap="toCopy(order.orderSn)">复制</view>
				</view>
			</view>
			<view class="item">
				<view class="item-title">创建时间：</view>
				<view class="item-value">{{order.createTime}}</view>
				<view class="item-action">
					<!-- <view class="btn-copy">复制</view> -->
				</view>
			</view>
			<view class="item">
				<view class="item-title">付款时间：</view>
				<view class="item-value">{{order.payTime || '未支付'}}</view>
				<view class="item-action">
					<!-- <view class="btn-copy">复制</view> -->
				</view>
			</view>
		</view>
		<view class="btn-confirm" v-if="from === 'scan' && order.status === 2" @tap="confirmOrder()">核销</view>
	</view>
</template>

<script>
	import {apiOrderViewShopOrder, apiOrderWriteOffOrder} from '../../api.js'
	export default {
		data() {
			return {
				order: {}
			}
		},
		onLoad(e) {
			const vm = this;
			vm.from = e.from || false;
			vm.orderId = e.orderId;
			vm.shopId = e.shopId;
			vm.getOrder();
		},
		methods: {
			//核销
			confirmOrder() {
				const vm = this;
				uni.showModal({
					content: '确认核销此订单',
					success(res) {
						if (res.confirm) {
							apiOrderWriteOffOrder({orderId: vm.orderId}).then(res => {
								if (res.data.status === 2000000) {
									uni.showToast({
										title: '核销成功'
									});
									setTimeout(function() {
										uni.navigateBack;
									}, 1000);
								} else {
									uni.showModal({
										title: '订单核销',
										content: res.data.message,
									});
								}
							});
						}
					}
				})
			},
			//复制到剪贴板
			toCopy(data) {
				uni.setClipboardData({
					data: data,
					success: function () {
						uni.showToast({
							title: '复制成功'
						})
					}
				});
			},
			//获取订单详情
			getOrder(orderId, shopId) {
				const vm = this;
				apiOrderViewShopOrder().then(res => {
					if (res.data.status === 2000000) {
						vm.order = res.data.data;
					} else {
						uni.showModal({
							title: '获取订单详情',
							content: res.data.message,
						});
					}
				});
			},
		}
	}
</script>

<style lang="less">
	.status {
		height: 100upx; line-height: 100upx; padding: 0 30upx;
		color: #1B82D2; font-size: 30upx;
	}
	.block-info {
		padding: 0 30upx; margin-top: 30upx;
		.info-shop {
			height: 100upx; line-height: 100upx; font-size: 28upx;
			display: flex; align-items: center;
			border-bottom: 1px solid #EDEDED;
			image {
				width: 41upx; height: 39upx; margin-right: 20upx;
			}
		}
		.info-content {
			display: flex; justify-content: space-between; margin-top: 20upx;
			.service-cover {
				width: 200upx; height: 200upx;
				background: #1B82D2 50% 50% no-repeat; background-size: cover;
			}
			.service-detail {
				width: 450upx;
				.title {
					height: 100upx; line-height: 50upx; font-size: 30upx;
					overflow: hidden; text-overflow: ellipsis;
					display:-webkit-box; -webkit-box-orient:vertical;
					-webkit-line-clamp:2;
				}
				.service-label {
					margin-top: 20upx; font-size: 26upx; color: #999999;
				}
				.eval {
					display: flex; justify-content: space-between; align-self: flex-end;
					.price {
						font-size: 34upx; color: #FF183F;
					}
					.number {
						font-size: 30upx; color: #999999;
					}
				}
			}
		}
	}
	.block-eval {
		margin-top: 40upx;
		.item {
			padding: 0 30upx; height: 66upx; display: flex;
			justify-content: space-between; color: #333333;
			.title {
				font-size: 30upx;
			}
			.price {
				font-size: 28upx;
				&.active {
					color: #FF4354;
				}
			}
		}
	}
	.block-order {
		padding: 0 30upx;
		.title {
			height: 100upx; line-height: 100upx; display: flex;
			font-size: 30upx; color: #333333;
			align-items: center;
			.title-label {
				width: 6upx; height: 26upx; background: #1B82D2;
				border-radius: 3upx; margin-right: 10upx;
			}
		}
		.item {
			height: 50upx; display: flex; justify-content: space-between;
			align-items: center; font-size: 26upx; color: #333333;
			.item-title {
				width: 160upx;
			}
			.item-value {
				flex-grow: 6;
			}
			.item-action {
				flex-grow: 2; width: 100upx; display: flex; align-items: center;
				.btn-copy {
					text-align: center;
					width: 122upx; height: 48upx; line-height: 48upx;
					border: 1px solid rgba(51,51,51,1); border-radius: 24upx;
				}
			}
		}
	}
	.btn-confirm {
		background: #1B82D2; width: 690upx; margin: 80upx auto 30upx auto;
		color: white; height: 100upx; line-height: 100upx; border-radius: 10upx;
		font-size: color; font-size: 36upx; text-align: center;
	}
</style>
