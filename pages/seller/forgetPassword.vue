<template>
	<view>
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
				<image v-if="!confirmPasswordShow" src="../../static/login_icon_mima_n.png"></image>
				<image v-if="confirmPasswordShow" src="../../static/login_icon_mima_s.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
			if (!vm.password) {
				uni.showModal({
					content: "请输入新密码"
				});
			} else if (!vm.confirmPassword) {
				uni.showModal({
					content: "请输入确认密码"
				});
			} else if (vm.password !== vm.confirmPassword) {
				uni.showModal({
					content: "请输入新密码与确认密码不一致"
				});
			} else {
				uni.showModal({
					content: "修改完成",
					complete() {
						uni.redirectTo({
							url: '../seller/login'
						});
					}
				});
			}
		},
		methods: {
			// 改变
			changePasswordType(type) {
				const vm = this;
				vm.passwordShow = !vm.passwordShow;
				vm.passwordType = type;
			},
		}
	}
</script>

<style lang="less">
	.block-option {
		margin: 0 20upx;
		display: flex; align-items: center; height: 100upx; border-bottom: 1px solid #DEDEDE;
		.option-title {
			font-size: 30upx; color: #131319; flex-grow: 2; text-align: center;
		}
		.option-value {
			font-size: 28upx; color: #131319; ::placeholder {color: #C6C6C6;}
			flex-grow: 6; border: none; height: 90upx; padding: 0;
			outline: none;
		}
		.option-btn {
			color: #1B82D2; display: flex; justify-content: center;
			font-size: 28upx; flex-grow: 1; text-align: center; align-items: center;
			image {
				width: 54upx; height: 32upx;
			}
		}
	}
</style>
