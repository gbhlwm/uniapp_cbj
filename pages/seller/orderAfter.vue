<template>
	<view>
		<view class="order-list">
			<view class="item" v-for="item in orders" :key="item.id">
				<view class="item-head">
					<view>售后订单编号：{{item.orderSn}}</view>
					<view class="status">待核销</view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navis: [
					{ name: '全部', type: '' },
					{ name: '待核销', type: 1 },
					{ name: '已核销', type: 2 }
				],
				naviType: '',
				currentPage: 1,
				orders: [],
				shopId: '',
				shopUserId: ''
			}
		},
		onLoad() {
			const vm = this;
			uni.getStorage({
				key: 'shopId',
				complete(res) {
					vm.shopId = res.data;
					uni.getStorage({
						key: 'shopUserId',
						complete(res) {
							vm.shopUserId = res.data;
							vm.getOrders();
						}
					})
				}
			});
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '../seller/orders'
			});
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
			//跳转售后详情
			toDetail(orderId) {
				uni.navigateTo({
					url: '../seller/orderAfterDetail?orderId=' + orderId
				});
			},
			//获取门店售后订单列表
			getOrders() {
				const vm = this;
				const url = vm.apiBaseUrl + '/api-order/api/app/return_order/findShopReturnOrder';
				const data = {
					pageNumber: vm.currentPage,
					shopId: vm.shopId
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
							uni.showModal({
								title: '获取门店售后订单',
								content: res.data.message,
							});
						} else {
							uni.showModal({
								title: '获取门店售后订单',
								content: '请求失败',
							});
						}
					}
				})
			},
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
	.order-list {
		.item {
			.item-head {
				padding: 0 30upx; border-bottom: 1px solid #EDEDED;
				height: 82upx; line-height: 82upx; font-size: 26upx;
				display: flex; justify-content: space-between;
				.status {
					color: #FF183F;
				}
			}
			.item-body {
				padding: 30upx 30upx 30upx 250upx; position: relative; height: 201upx;
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
					position: absolute; top: 30upx; right: 30upx;
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
					height: 58upx; background: #FF183F; padding: 0 20upx;
					text-align: center; color: white; font-size: 32upx;
					line-height: 58upx; border-radius: 29upx; display: inline-block;
				}
			}
		}
	}
</style>

