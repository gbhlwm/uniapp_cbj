<template>
	<view>
		<view class="block-option">
			<view class="option-title">手机号</view>
			<input class="option-value" v-model="phone" placeholder="请输入手机号">
			<view class="option-btn" @tap="sendCode()">{{codeTitle}}</view>
		</view>
		<view class="block-option">
			<view class="option-title">验证码</view>
			<input v-model="code" class="option-value" placeholder="请输入验证码">
			<view class="option-btn"></view>
		</view>
		<view class="block-option">
			<view class="option-title">设置密码</view>
			<input class="option-value" :type="passwordType" v-model="password" placeholder="请输入密码">
			<view class="option-btn">
				<image @tap="changePasswordType('text')" v-if="!passwordShow" src="../../static/login_icon_mima_n.png"></image>
				<image @tap="changePasswordType('password')" v-if="passwordShow" src="../../static/login_icon_mima_s.png"></image>
			</view>
		</view>
		<view class="block-option">
			<view class="option-title">确认密码</view>
			<input v-model="confirmPassword" :type="confirmPasswordType" class="option-value" placeholder="请再次输入密码">
			<view class="option-btn">
				<image @tap="changeConfirmPasswordType('text')" v-if="!confirmPasswordShow" src="../../static/login_icon_mima_n.png"></image>
				<image @tap="changeConfirmPasswordType('password')" v-if="confirmPasswordShow" src="../../static/login_icon_mima_s.png"></image>
			</view>
		</view>
		<view class="action" @tap="toApply()">申请</view>
		<view class="tips">
			<image src="../../static/common_ic_choice_big_n.png" mode="" v-if="!hasAgree" @tap="hasAgree = true;"></image>
			<image src="../../static/common_ic_choice_big_s.png" mode="" v-if="hasAgree" @tap="hasAgree = false;"></image>
			<view class="tips-content">
				<view class="content-normal">申请即代表同意</view>
				<view class="content-special" @tap="toAgreement()">《车便捷服务协议》</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {apiUserRegisterBusinessUser} from '../../api.js'
	export default {
		data() {
			return {
				hasAgree: true,
				phone: '',
				code: '',
				codeTitle: '发送验证码',
				passwordType: 'password',
				confirmPasswordType: 'password',
				passwordShow: false,
				confirmPasswordShow: false,
				password: '',
				confirmPassword: '',
				shopInfo: {}
			}
		},
		onNavigationBarButtonTap() {
			const vm = this;
			if (!vm.phone) {
				uni.showModal({
					content: "请输入手机号"
				});
			} else if (!vm.code) {
				uni.showModal({
					content: "请输入验证码"
				});
			} else {
				uni.navigateTo({
					url: '../seller/forgetPassword'
				});
			}
		},
		onLoad(e) {
			const vm = this;
			vm.shopInfo = JSON.parse(e.shopInfo);
		},
		methods: {
			//跳转用户协议
			toAgreement() {
				uni.navigateTo({
					url: '../seller/agreement'
				});
			},
			// 改变
			changePasswordType(type) {
				const vm = this;
				vm.passwordShow = !vm.passwordShow;
				vm.passwordType = type;
			},
			// 改变
			changeConfirmPasswordType(type) {
				const vm = this;
				vm.confirmPasswordShow = !vm.confirmPasswordShow;
				vm.confirmPasswordType = type;
			},
			// 发送验证码
			sendCode() {
				const vm = this;
				const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (!vm.phone) {
					uni.showModal({
						content: '请输入手机号'
					});
				} else if (!phoneReg.test(vm.phone)) {
					uni.showModal({
						content: '请输入正确手机号'
					});
				} else {
					if (vm.codeTitle === '发送验证码') {
						const url = vm.serviceBaseUrl + '/uaa/api/comsumer/sendRegistryMessage?account=' + vm.phone;
						uni.request({
							url: url,
							method: 'POST',
							complete(res) {
								if (res.statusCode === 200 && res.data.status === 2000000) {
									vm.codeTitle = 60;
									const timer = setInterval(() => {
										if (vm.codeTitle > 1) {
											vm.codeTitle -= 1;
										} else {
											vm.codeTitle = '发送验证码';
											clearInterval(timer);
										}
									}, 1000)
								} else if (res.statusCode === 200 && res.data.status !== 2000000) {
									uni.showModal({
										title: '发送验证码',
										content: res.data.msg,
									});
								} else {
									uni.showModal({
										title: '发送验证码',
										content: '请求失败',
									});
								}
							}
						});
					}
				}
			},
			//申请
			toApply() {
				const vm = this;
				if (!vm.phone) {
					uni.showModal({
						content: '请输入手机号',
					});
				} else if (!vm.password) {
					uni.showModal({
						content: '请输入密码',
					});
				} else if (!vm.confirmPassword) {
					uni.showModal({
						content: '请输入确认密码',
					});
				} else if (vm.confirmPassword !== vm.password) {
					uni.showModal({
						content: '密码与确认密码不一致',
					});
				} else if (!vm.hasAgree) {
					uni.showModal({
						content: '未同意用户协议',
					});
				} else {
					//验证短信验证码
					uni.request({
						url: vm.serviceBaseUrl + '/uaa/api/ut-consumers/getRegistryContrast?tel='+ vm.phone +'&code=' + vm.code,
						method: 'GET',
						complete(res) {
							if (res.data.code === 200 && res.data.status === 2000000) {
								// 申请入驻
								const url = vm.apiBaseUrl + '/api-userapp/api/app/businessUser/registerBusinessUser'
								vm.getToken(() => {
									vm.shopInfo.id = vm.userId;
									vm.shopInfo.password = vm.password;
									vm.shopInfo.phone = vm.phone;
									vm.shopInfo.nickname = vm.userNickName;
									apiUserRegisterBusinessUser(vm.shopInfo).then(res => {
										if (res.data.status === 2000000) {
											uni.showModal({
												title: '商家入驻申请',
												content: '成功',
												complete(res) {
													uni.request({
														url: vm.serviceBaseUrl + '/uaa/api/ut-consumers/delRegistryMessage?tel=' + vm.phone,
														method: 'POST',
														complete(res) {
															uni.navigateTo({
																url: '../seller/login'
															});
														}
													})
												}
											});
										} else {
											uni.showModal({
												title: '商家入驻申请',
												content: res.data.message,
											});
										}
									});
								});
							} else if (res.statusCode === 200 && res.data.status !== 2000000) {
								uni.showModal({
									title: '验证验证码',
									content: res.data.msg,
								});
							} else {
								uni.showModal({
									title: '验证验证码',
									content: '请求失败',
								});
							}
						}
					});
				}
			}
		}
	}
</script>

<style lang="less">
	.block-option {
		margin: 0 20upx;
		display: flex; align-items: center; height: 100upx;
		.option-title {
			width: 150upx;
			font-size: 30upx; color: #131319; flex-grow: 1; text-align: left;
		}
		.option-value {
			font-size: 28upx; color: #131319; ::placeholder {color: #C6C6C6;}
			flex-grow: 3; height: 90upx; padding: 0; border: none;
			outline: none;
		}
		.option-btn {
			color: #1B82D2; display: flex; justify-content: center; width: 150upx;
			font-size: 28upx; flex-grow: 1; text-align: center; align-items: center;
			image {
				width: 54upx; height: 32upx;
			}
		}
	}
	.action {
		margin: 90upx auto 0 auto; width: 680upx; height: 98upx;
		line-height: 98upx; text-align: center; color: white;
		font-size: 38upx; background: #1B82D2; border-radius: 8upx;
	}
	.tips {
		display: flex; align-items: center; height: 100upx; margin: 0 auto;
		width: 680upx;
		image {
			width: 40upx; height: 40upx;
		}
		.tips-content {
			display: flex; font-size: 30upx;
			.content-normal { color: #333333; }
			.content-special { color: #1B82D2; }
		}
	}
</style>
