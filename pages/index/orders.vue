<template>
	<view>
		<view class="navis">
			<view class="item" :class="{active: naviType === item.type}" v-for="item in navis" :key="item.type" @tap="orderSelectType(item.type)">
				{{item.name}}
			</view>
		</view>
		<view class="info" v-for="item in orders" :key="item.id">
			<view class="block">
				<view class="shop-title">
					<image class="shop-img" src="../../static/common_tab_ic_shop_s.png"></image>
					<view>{{item.shopName}}</view>
				</view>
			</view>
			<view class="item-body" @tap="toDetail(item.id)">
				<view class="cover" :style="{'background-image': 'url(' + item.image + ')'}"></view>
				<view class="name">{{item.serviceName}}</view>
				<view class="label">{{item.mealName}}</view>
				<view class="price">
					<view class="value">￥{{item.price}}</view>
					<view class="num">x{{item.number}}</view>
				</view>
			</view>
			<view class="item-footer">
				<view class="total">
					<view class="title">共{{item.number}}件商品  总计：</view>
					<view class="value">${{item.total}}</view>
				</view>
				<view class="action active" v-if="item.status === 1" @tap="cancelOrder(item.id)">
					取消订单
				</view>
				<view class="action" v-if="item.status === 1" @tap="toOrderPay(item.id, item.total)">
					立即支付
				</view>
				<view class="action" v-if="item.status === 3" @tap="toAddCommon(item.id)">
					评价
				</view>
				<view class="action" v-if="item.status === 4" @tap="toAddAfter(item.id)">
					申请售后
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {apiOrderViewCancelOrder, apiOrderFindOrder} from '../../api.js'
	export default {
		data() {
			return {
				navis: [
					{ name: '全部', type: '' },
					{ name: '待付款', type: 1 },
					{ name: '待使用', type: 2 },
					{ name: '待评价', type: 3 },
					{ name: '已完成', type: 4 }
				],
				naviType: '',
				currentPage: 1,
				orders: []
			}
		},
		onLoad() {
			const vm = this;
			vm.getToken(vm.getOrders);
		},
		onPullDownRefresh() {
			const vm = this;
			vm.currentPage = 1;
			vm.getOrders();
		},
		onReachBottom() {
			const vm = this;
			vm.currentPage += 1;
			vm.getOrders();
		},
		methods: {
			//取消订单
			cancelOrder(orderId) {
				const vm = this;
				uni.showModal({
					content: '确认取消此订单',
					success(res) {
						if (res.confirm) {
							apiOrderViewCancelOrder({orderId: orderId}).then(res => {
								if (res.data.status === 2000000) {
									uni.showToast({
										title: '取消成功'
									});
									setTimeout(vm.getOrders, 1000);
								} else {
									uni.showModal({
										title: '取消订单',
										content: res.data.message,
									});
								}
							});
						}
					}
				})
			},
			//跳转申请售后
			toAddAfter(orderId) {
				const vm = this;
				uni.navigateTo({
					url: '../index/orderAfterAdd?orderId=' + orderId
				});
			},
			//跳转订单支付
			toOrderPay(orderId, orderPrice) {
				const vm = this;
				uni.navigateTo({
					url: '../index/orderPay?orderId=' + orderId + '&orderPrice=' + orderPrice
				});
			},
			//跳转订单详情
			toDetail(orderId) {
				const vm = this;
				uni.navigateTo({
					url: '../index/orderDetail?orderId=' + orderId
				});
			},
			//选择订单类型
			orderSelectType(type) {
				const vm = this;
				vm.naviType = type;
				vm.currentPage = 1;
				vm.getOrders();
			},
			//评价
			toAddCommon(orderId) {
				uni.navigateTo({
					url: '../index/commandAdd?orderId=' + orderId
				})
			},
			//获取订单列表
			getOrders() {
				const vm = this;
				const data = {
					pageNumber: vm.currentPage,
					userId : vm.userId
				}
				if (vm.naviType) {
					data.status = vm.naviType;
				}
				apiOrderFindOrder(data).then(res => {
					if (res.data.status === 2000000) {
						const data = res.data.data;
						if (vm.currentPage === 1) {
							vm.orders = data;
						} else {
							if (data.length) {
								for (let i = 0; i < data.length; i += 1) {
									vm.orders.push(data[i]);
								}
							} else {
								uni.showToast({title: '到底了'});
							}
						}
					} else {
						if (res.data.status === 5000001) {
							if (vm.currentPage === 1) {
								vm.orders = [];
							} else {
								uni.showToast({title: '到底了'});
							}
						} else {
							uni.showModal({
								title: '获取服务订单',
								content: res.data.message,
							});
						}
					}
				});
			}
		}
	}
</script>

<style lang="less">
	.navis {
		height: 92upx; display: flex; justify-content: center;
		 border-bottom: 1px solid #EDEDED;
		.item {
			flex-grow: 1; text-align: center;
			line-height: 92upx; font-size: 30upx;
			&.active {
				color: #1B82D2;
			}
		}
	}
	.info {
		.block {
			padding: 0 30upx; font-size: 28upx; border-bottom: 1px solid #EDEDED;
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
		.item-body {
			position: relative; padding: 0 30upx 0 250upx; height: 201upx; margin-top: 20upx;
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
		.item-footer {
			padding: 0 30upx; text-align: right; margin-bottom: 20upx;
			.total {
				font-size: 26upx; color: #666666; display: flex;
				justify-content: flex-end; height: 100upx; align-items: center;
				.value {
					color: #333333; font-size: 30upx;
				}
			}
			.action {
				height: 58upx; padding: 0 20upx; border: 1px solid #1B82D2;
				text-align: center; color: #1B82D2; font-size: 32upx; margin-left: 10upx;
				line-height: 58upx; border-radius: 10upx; display: inline-block;
				&.active {
					color: #999999; border-color: #999999;
				}
			}
		}
	}
</style>
