<template>
	<view>
		<view class="back-navigate" @tap="toBack()">
			<image src="../../static/common_nav_ic_back_black.png" mode=""></image>
		</view>
		<rich-text class="banner-content" v-if="bannerType === 2" :nodes="detail"></rich-text>
		<web-view v-else-if="bannerType === 1" class="outer-link" :src="detail"></web-view>
	</view>
</template>

<script>
	import {apiOrderViewAdvertisement} from '../../api.js'
	export default {
		data() {
			return {
				bannerType: 1,
				detail: ''
			}
		},
		onLoad(e) {
			const vm = this;
			vm.bannerType = parseInt(e.bannerType);
			vm.getBannerDetail(e.bannerId);
		},
		methods: {
			//返回
			toBack() {
				uni.navigateBack();
			},
			//获取banner详情
			getBannerDetail(bannerId) {
				const vm = this;
				apiOrderViewAdvertisement({id: bannerId}).then(res => {
					if (res.data.status === 2000000) {
						vm.detail = res.data.data.details;
					} else {
						uni.showModal({
							title: '获取banner详情',
							content: res.data.message,
						});
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.back-navigate {
		position: fixed; width: 55upx; height: 55upx; background: rgba(0,0,0,0.5);
		line-height: 55upx; color: white; font-size: 36upx; text-align: center;
		border-radius: 100%; top: 20upx; left: 20upx; z-index: 99;
		box-shadow: 0 0 1px rgba(255,255,255,0.5);
		image {
			display: inline-block; width: 13upx; height: 20upx;
			transform: rotate(180deg);
		}
	}
	.outer-link {
		z-index: 98;
		// position: fixed; top: 0; bottom: 0; left: 0; right: 0; overflow: scroll;
	}
	.banner-content {}
</style>
