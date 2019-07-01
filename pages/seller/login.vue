<template>
	<view>
		<!-- <image class="logo"></image> -->
		<view class="logo"></view>
		<view class="input-option">
			<view class="option-title">账号</view>
			<input type="text" class="option-value"/>
		</view>
		<view class="input-option">
			<view class="option-title">密码</view>
			<input type="text" class="option-value"/>
		</view>
		<view class="actions">
			<view class="action">
				忘记密码
			</view>
			<view class="action">
				我要入驻
			</view>
		</view>
		<view class="btn-login">
			登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'sellerToken',
				complete: (res) => {
					if (res.data) {
						uni.reLaunch({
							url: '../seller/sellerCenter'
						})
					}
				}
			});
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	.logo {
		display: block; width: 200upx; height: 200upx; background: #1B82D2;
		margin: 150upx auto 100upx auto;
	}
	.input-option {
		.option-title {}
		.option-value {}
	}
	.actions {
		.action {}
	}
	.btn-login {}
</style>
