<template>
	<view class="page-agreement">
		<view class="title">{{title}}</view>
		<rich-text :nodes="agreement"></rich-text>
	</view>
</template>

<script>
	import {apiUserFindUserAgreement} from '../../api.js'
	export default {
		data() {
			return {
				agreement:'',
			}
		},
		onLoad() {
			const vm = this;
			apiUserFindUserAgreement().then(res => {
				if (res.data.status === 2000000) {
					vm.agreement = res.data.data.details;
					vm.title = res.data.data.title;
				} else {
					uni.showModal({
						title: '获取用户协议',
						content: res.data.msg,
					});
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
