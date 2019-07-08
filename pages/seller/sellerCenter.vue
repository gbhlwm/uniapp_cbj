<template>
	<view class="page-seller-center">
		<view class="block-info" @tap="toAccountInfo()">
			<view class="seller-head" :style="{'background-image': 'url(' + shopInfo.shopImage + ')'}"></view>
			<view class="seller-info">
				<view class="seller-info-up">
					<view class="seller-name">{{shopInfo.name}}</view>
					<view class="seller-classify">{{shopInfo.shopClassifyName}}</view>
				</view>
				<view class="seller-info-down">
					总评分 {{shopInfo.star}}    |    总订单{{shopInfo.orderNumber}}
				</view>
			</view>
			<image class="more" src="../../static/common_nav_ic_back_black.png"></image>
		</view>
		<view class="block-action">
			<image class="action-img" src="../../static/icon-scan.png"></image>
			<view class="action-title">扫一扫</view>
			<view class="action-turn action_1">
				<image src="../../static/common_nav_ic_back_black.png"></image>
			</view>
		</view>
		<view class="block-action" @tap="toOrder()">
			<image class="action-img" src="../../static/icon-order.png"></image>
			<view class="action-title">门店订单</view>
			<view class="action-turn action_2">
				<image src="../../static/common_nav_ic_back_black.png"></image>
			</view>
		</view>
		<view class="block-action" @tap="toOrderWater()">
			<image class="action-img" src="../../static/icon_water.png"></image>
			<view class="action-title">订单流水</view>
			<view class="action-turn action_3">
				<image src="../../static/common_nav_ic_back_black.png"></image>
			</view>
		</view>
		<view class="block-action" @tap="toServiceOn()">
			<image class="action-img" src="../../static/icon_guanli_up.png"></image>
			<view class="action-title">在架服务管理</view>
			<view class="action-turn action_4">
				<image src="../../static/common_nav_ic_back_black.png"></image>
			</view>
		</view>
		<view class="block-action" @tap="toServiceDown()">
			<image class="action-img" src="../../static/icon_guanli_down.png"></image>
			<view class="action-title">下架服务管理</view>
			<view class="action-turn action_5">
				<image src="../../static/common_nav_ic_back_black.png"></image>
			</view>
		</view>
		<view class="block-action" @tap="toShopInfo()">
			<image class="action-img" src="../../static/icon_edit.png"></image>
			<view class="action-title">编辑门店信息</view>
			<view class="action-turn action_6">
				<image src="../../static/common_nav_ic_back_black.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopId: '',
				shopUserId: '',
				shopInfo: {}
			}
		},
		onLoad() {
			const vm = this;
			uni.getStorage({
				key: 'shopUserId',
				complete: (res) => {
					if (!res.data) {
						uni.navigateTo({
							url: '../seller/login'
						});
					} else {
						vm.shopUserId = res.data;
						uni.request({
							url: vm.apiBaseUrl + '/api-userapp/api/app/businessUser/MyBusiness?id=' + vm.shopUserId,
							method: 'GET',
							complete(res) {
								if (res.statusCode === 200 && res.data.status === 2000000) {
									uni.setStorage({
										key: 'shopId',
										data: res.data.data[0].id,
									});
									vm.shopInfo = res.data.data[0];
								} else if (res.statusCode === 200 && res.data.status !== 2000000) {
									uni.showModal({
										title: '获取门店账号资料',
										content: res.data.message,
									});
								} else {
									uni.showModal({
										title: '获取门店账号资料',
										content: '请求失败',
									});
								}
							}
						})
					}
				}
			});
		},
		onShow() {
			uni.getStorage({
				key: 'shopUserId',
				complete: (res) => {
					if (!res.data) {
						uni.navigateBack();
					}
				}
			});
		},
		methods: {
			//跳转到门店账号信息页面
			toAccountInfo() {
				uni.navigateTo({
					url: '../seller/accountInfo'
				})
			},
			//跳转到订单页面
			toOrder() {
				uni.navigateTo({
					url: '../seller/orders'
				})
			},
			//跳转到订单流水页面
			toOrderWater() {
				uni.navigateTo({
					url: '../seller/orderWater'
				})
			},
			//跳转到在架服务管理页面
			toServiceOn() {
				uni.navigateTo({
					url: '../seller/serviceOn'
				})
			},
			//跳转到下架服务管理页面
			toServiceDown() {
				uni.navigateTo({
					url: '../seller/serviceDown'
				})
			},
			//跳转到编辑门店管理页面
			toShopInfo() {
				uni.navigateTo({
					url: '../seller/shopInfoEdit'
				})
			},
			//扫一扫
			toScan() {
				uni.scanCode({
					onlyFromCamera: true,
					scanType: ['qrCode'],
					success(res) {
						
					},
					fail(res) {
						uni.showModal({
							content: '识别失败'
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.block-info {
		display: flex; width: 100%; height: 305upx; align-items: center;
		background: 50% 50% url('../../static/me_bg3@2x.png') no-repeat;
		background-size: cover; justify-content: space-between;
		.seller-head {
			width: 120upx; height: 119upx; border-radius: 100%; margin-left: 20upx;
			background: white 50% 50% no-repeat; background-size: cover;
		}
		.seller-info {
			color: white;
			.seller-info-up {
				align-items: center;
				display: flex;
				.seller-name {
					font-size: 38upx; width: 300upx;
					white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
				}
				.seller-classify {
					width: 160upx; height: 40upx; border-radius: 20upx;
					text-align: center; line-height: 40upx; font-size: 24upx;
					background: #FF6262; margin-left: 10upx;
				}
			}
			.seller-info-down {}
		}
		.more {
			width: 16upx; height: 25upx;  margin-right: 20upx;
		}
	}
	.block-action {
		margin: 40upx auto;
		display: flex; width: 690upx; height: 180upx; border-radius: 16upx;
		overflow: hidden; justify-content: space-between; align-items: center;
		box-shadow:0px -4px 4px 0px rgba(183,187,190,0.1), 0px 8px 7px 1px rgba(183,187,190,0.33);
		.action-img {
			width: 90upx; height: 90upx; margin-left: 40upx;
		}
		.action-title {
			flex-grow: 5; margin-left: 10upx; color: #333333;
			font-size: 40upx; font-weight: bold;
		}
		.action-turn {
			width: 128upx; height: 180upx; display: flex;
			justify-content: center; align-items: center;
			&.action_1 { background: #FC7E7B; }
			&.action_2 { background: #9EDB8F; }
			&.action_3 { background: #53A8E4; }
			&.action_4 { background: #BFB031; }
			&.action_5 { background: #CDA381; }
			&.action_6 { background: #7ACCC7; }
			image {
				width: 25upx; height: 40upx;
			}
		}
	}
</style>
