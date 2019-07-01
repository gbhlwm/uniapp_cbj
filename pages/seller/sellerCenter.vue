<template>
	<view>
		
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
					if (!res.data) {
						uni.navigateTo({
							url: '../seller/login'
						});
					}
				}
			});
		},
		onShow() {
			uni.getStorage({
				key: 'sellerToken',
				complete: (res) => {
					if (!res.data) {
						uni.navigateBack();
					}
				}
			});
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
