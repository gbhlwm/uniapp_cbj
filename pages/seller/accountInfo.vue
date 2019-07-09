<template>
	<view>
		<view class="block-option">
			<view class="option-title">门店名称</view>
			<input v-model="shopInfo.shopName" class="option-value" placeholder="门店名称">
			<view class="option-btn">
				<image src="../../static/common_nav_ic_more.png" mode=""></image>
			</view>
		</view>
		<view class="block-option">
			<view class="option-title">绑定手机</view>
			<view class="option-value">{{shopInfo.phone.substr(0,4) + '****' + shopInfo.phone.substr(6,4)}}</view>
			<view class="option-btn">
				<image src="../../static/common_nav_ic_more.png" mode=""></image>
			</view>
		</view>
		<view class="block-option">
			<view class="option-title">修改密码</view>
			<input class="option-value" disabled="true">
			<view class="option-btn">
				<image src="../../static/common_nav_ic_more.png" mode=""></image>
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
				shopInfo: {
					phone: ''
				}
			}
		},
		onLoad() {
			const vm = this;
			uni.getStorage({
				key: 'shopId',
				complete: (res) => {
					if (!res.data) {
						uni.navigateTo({
							url: '../seller/login'
						});
					} else {
						vm.shopId = res.data;
						uni.getStorage({
							key: 'shopUserId',
							complete(res) {
								vm.shopUserId = res.data;
								uni.request({
									url: vm.apiBaseUrl + '/api-userapp/api/app/businessUser/findAccount?id=' + vm.shopUserId,
									method: 'GET',
									complete(res) {
										if (res.statusCode === 200 && res.data.status === 2000000) {
											vm.shopInfo = res.data.data;
										} else if (res.statusCode === 200 && res.data.status !== 2000000) {
											uni.showModal({
												title: '获取账号资料',
												content: res.data.msg,
											});
										} else {
											uni.showModal({
												title: '获取账号资料',
												content: '请求失败',
											});
										}
									}
								})
							}
						});
					}
				}
			});
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	.block-option {
		display: flex; align-items: center; height: 100upx; margin: 0 20upx; position: relative;
		.option-title {
			width: 200upx;
			font-size: 30upx; color: #131319; flex-grow: 2; text-align: left;
		}
		.option-value {
			font-size: 28upx; color: #131319; ::placeholder {color: #C6C6C6;}
			flex-grow: 4; text-align: right;
		}
		.option-btn {
			width: 20upx; color: #1B82D2;
			font-size: 28upx; flex-grow: 1; text-align: center;
			image {
				width: 13upx; height: 21upx;
			}
		}
		.area-picker {
			position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 10;
		}
	}
</style>
