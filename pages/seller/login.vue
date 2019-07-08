<template>
	<view>
		<!-- <image class="logo"></image> -->
		<view class="logo"></view>
		<view class="input-option">
			<view class="option-title">账号</view>
			<input type="text" class="option-value" v-model="phone" placeholder="请输入账号"/>
		</view>
		<view class="input-option">
			<view class="option-title">密码</view>
			<input type="password" class="option-value" v-model="password" placeholder="请输入密码"/>
		</view>
		<view class="actions">
			<view class="action" @tap="toForget()">
				忘记密码
			</view>
			<view class="action" @tap="toApply()">
				我要入驻
			</view>
		</view>
		<view class="btn-login" @tap="toLogin()">
			登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				password: ''
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'sellerToken',
				complete: (res) => {
					if (res.data) {
						uni.reLaunch({
							url: '../seller/sellerCenter'
						});
					}
				}
			});
		},
		methods: {
			//登录
			toLogin() {
				const vm = this;
				if (!vm.phone) {
					uni.showModal({
						content: '请输入账号'
					});
				} else if (!vm.password) {
					uni.showModal({
						content: '请输入密码'
					});
				} else {
					vm.getToken(() => {
						uni.request({
							url: vm.apiBaseUrl + '/api-userapp/api/app/businessUser/loginBusinessUser?id=' + vm.userId + '&phone=' + vm.phone + '&password=' + vm.password,
							method: 'GET',
							complete(res) {
								if (res.statusCode === 200 && res.data.status === 2000000) {
									uni.setStorage({
										key: 'shopUserId',
										data: res.data.data,
										complete() {
											uni.showModal({
												content: '登录成功',
												complete() {
													uni.reLaunch({
														url: '../seller/sellerCenter'
													});
												}
											});
										}
									});
								} else if (res.statusCode === 200 && res.data.status !== 2000000) {
									uni.showModal({
										title: '登录失败',
										content: res.data.message,
									});
								} else {
									uni.showModal({
										title: '登录失败',
										content: '请求失败',
									});
								}
							}
						})
					});
				}
			},
			//跳转商家入驻
			toApply() {
				uni.navigateTo({
					url: '../seller/apply'
				});
			},
			//跳转忘记密码
			toForget() {
				uni.navigateTo({
					url: '../seller/applyForgetPassword'
				});
			}
		}
	}
</script>

<style lang="less">
	.logo {
		display: block; width: 200upx; height: 200upx; background: #1B82D2;
		margin: 150upx auto 100upx auto;
	}
	.input-option {
		height: 98upx; display: flex; align-items: center; width: 610upx;
		margin: auto; border-bottom: 1px solid #DEDEDE;
		.option-title {
			width: 100upx; font-size: 28upx; color: #131319;
		}
		.option-value {
			color: #C6C6C6; size: 28upx;
		}
	}
	.actions {
		display: flex; justify-content: space-between; margin-top: 30upx;
		width: 610upx; margin: 30upx auto;
		.action {
			color: #3DA8FF; font-size: 28upx;
		}
	}
	.btn-login {
		width: 610upx; height: 90upx; line-height: 90upx; font-size: 38upx;
		color: white; text-align: center; margin: 177upx auto 0 auto;
		background: #1B82D2;
	}
</style>
