<template>
	<view>
		<view class="info" v-for="item in orders" :key="item.id">
			<view class="block">
				<view class="shop-title">
					<image class="shop-img" src="../../static/common_tab_ic_shop_s.png"></image>
					<view class="shop-name">{{item.shopName}}</view>
					<view class="status" v-if="item.status === 1">待商家处理</view>
					<view class="status" v-if="item.status === 2">待买家处理</view>
					<view class="status" v-if="item.status === 3">退款成功</view>
					<view class="status" v-if="item.status === 4">退款关闭</view>
				</view>
			</view>
			<view class="item-body">
				<view class="cover" :style="{'background-image': 'url(' + item.image + ')'}"></view>
				<view class="name">{{item.serviceName}}</view>
				<view class="label">{{item.mealName}}</view>
				<view class="price">
					<view class="value">￥{{item.price}}</view>
					<view class="num">x{{item.number}}</view>
				</view>
			</view>
			<view class="item-footer">
				<view class="action" @tap="toDetail(item.id)">
					查看详情
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
			//跳转订单详情
			toDetail(orderId) {
				const vm = this;
				uni.navigateTo({
					url: '../index/orderAfterDetail?orderId=' + orderId
				});
			},
			//选择订单类型
			orderSelectType(type) {
				const vm = this;
				vm.currentPage = 1;
				vm.getOrders();
			},
			//获取订单列表
			getOrders() {
				const vm = this;
				const url = vm.apiBaseUrl + '/api-order/api/app/return_order/findReturnOrder';
				const data = {
					pageNumber: vm.currentPage,
					userId : vm.userId
				}
				if (vm.naviType) {
					data.status = vm.naviType;
				}
				uni.request({
					url: url,
					method: 'GET',
					data: data,
					complete(res) {
						if (res.statusCode === 200 && res.data.status === 2000000) {
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
						} else if (res.statusCode === 200 && res.data.status !== 2000000) {
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
						} else {
							uni.showModal({
								title: '获取服务订单',
								content: '请求失败',
							});
						}
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.info {
		.block {
			padding: 0 30upx; font-size: 28upx; border-bottom: 1px solid #EDEDED;
			.shop-title {
				display: flex; align-items: center; justify-content: space-between;
				height: 90upx;
				.shop-img {
					width: 41upx; height: 39upx; margin-right: 10upx;
				}
				.shop-name {
					flex-grow: 4;
				}
				.status {
					color: #3DA3ED;
				}
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
			padding: 0 30upx; text-align: right; margin-bottom: 20upx; margin-top: 20upx;
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
