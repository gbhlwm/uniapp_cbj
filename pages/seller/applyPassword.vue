<template>
	<view>
		<view class="block-option">
			<view class="option-title">手机号</view>
			<input class="option-value" v-model="phone" placeholder="请输入手机号">
			<view class="option-btn">{{codeTitle}}</view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				code: '',
				codeTitle: '发送验证码',
				passwordType: 'password',
				confirmPasswordType: 'password',
				passwordShow: false,
				confirmPasswordShow: false,
				password: '',
				confirmPassword: ''
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
		onLoad() {
			
		},
		methods: {
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
						// const url = vm.apiBaseUrl + '';
						vm.codeTitle = 60;
						const timer = setInterval(() => {
							if (vm.codeTitle > 1) {
								vm.codeTitle -= 1;
							} else {
								vm.codeTitle = '发送验证码';
								clearInterval(timer);
							}
						}, 1000)
						// uni.request({
						// 	url: url,
						// 	complete(res) {
						// 		if (res.statusCode === 200 && res.data.status === 2000000) {
						// 			vm.codeTitle = 60;
						// 			const timer = setInterval(() => {
						// 				if (vm.codeTitle > 1) {
						// 					vm.codeTitle -= 1;
						// 				} else {
						// 					vm.codeTitle = '发送验证码';
						// 					clearInterval(timer);
						// 				}
						// 			}, 1000)
						// 		} else if (res.statusCode === 200 && res.data.status !== 2000000) {
						// 			uni.showModal({
						// 				title: '发送验证码',
						// 				content: res.data.message,
						// 			});
						// 		} else {
						// 			uni.showModal({
						// 				title: '发送验证码',
						// 				content: '请求失败',
						// 			});
						// 		}
						// 	}
						// });
					}
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
</style>
