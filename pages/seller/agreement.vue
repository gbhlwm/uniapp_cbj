<template>
	<view class="page-agreement">
		<view class="title">{{title}}</view>
		<rich-text :nodes="agreement"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				agreement:'',
			}
		},
		onLoad() {
			const vm = this;
			uni.request({
				url: vm.apiBaseUrl + '/api-userapp/api/app/businessUser/findUserAgreement',
				method: 'GET',
				complete(res) {
					if (res.statusCode === 200 && res.data.status === 2000000) {
						vm.agreement = res.data.data.details;
						vm.title = res.data.data.title;
					} else if (res.statusCode === 200 && res.data.status !== 2000000) {
						uni.showModal({
							title: '获取用户协议',
							content: res.data.msg,
						});
					} else {
						uni.showModal({
							title: '获取用户协议',
							content: '请求失败',
						});
					}
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	.page-agreement {
		padding: 30upx;
		img {
			width: 100%; height: auto;
		}
	}
</style>
