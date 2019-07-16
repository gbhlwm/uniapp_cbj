<template>
	<view>
		<view class="block-point">
			<view class="title">评分</view>
			<view class="star">
				<sunui-star :defaultStar="star" :maxStar="5" :starSize='"33upx"' @changeStar="changeStar" class='sunui-star' />
			</view>
			<view class="value" v-if="star === 1">非常差</view>
			<view class="value" v-if="star === 2">差</view>
			<view class="value" v-if="star === 3">一般</view>
			<view class="value" v-if="star === 4">好</view>
			<view class="value" v-if="star === 5">非常好</view>
		</view>
		<view class="block-command">
			<textarea class="text-edit" v-model="content" placeholder="请您在此输入您的评价" maxlength="100"/>
			<view class="letter-number">{{100 - content.length}}/100</view>
		</view>
		<view class="block-img">
			<view class="image-upload" v-for="(img, index) in images" :key="index">
				<view class="upload-item" :style="{'background-image': 'url(' + img + ')'}"></view>
			</view>
			<view class="image-upload" v-if="images.length < 5">
				<view class="upload-item" @tap="toImageUpload('businessLicenseImage')">
					<view class="upload-item-title">添加照片</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {apiOrderCommentOrder} from '../../api.js'
	import sunuiStar from '@/components/sunui-star/sunui-star.vue'
	export default {
		components: {
			sunuiStar
		},
		data() {
			return {
				content: '',
				star: 5,
				images: []
			}
		},
		onLoad(e) {
			const vm = this;
			vm.orderId = e.orderId;
		},
		onNavigationBarButtonTap() {
			const vm = this;
			if (!vm.content) {
				uni.showToast({
					title: '请输入评价内容'
				});
			} else if(!vm.images.length) {
				uni.showToast({
					title: '请上传至少一张图片'
				});
			} else {
				let image = '';
				for (let i = 0; i < vm.images.length; i++) {
					if (!i) {
						image += vm.images[i];
					} else {
						image += ',' + vm.images[i]
					}
				}
				const data = {
					orderId: vm.orderId,
					star: vm.star,
					content: vm.content,
					image: image
				};
				apiOrderCommentOrder(data).then(res => {
					if (res.data.status === 2000000) {
						uni.showToast({
							title: '提交成功'
						});
						setTimeout(uni.navigateBack, 1000);
					} else {
						uni.showModal({
							title: '提交',
							content: res.data.message,
						});
					}
				});
			}
		},
		methods: {
			changeStar: function(e) {
				const vm = this;
				vm.star = e.curStar;
            },
			//图片上传
			toImageUpload() {
				const vm = this;
				uni.chooseImage({
					count: 1,
					complete(res) {
						vm.getToken(() => {
							const uploadTask = uni.uploadFile({
								url: vm.serviceBaseUrl + '/uaa/api/ut-files/uploadShoppingPic',
								name: 'files',
								header: {
									'Authorization': 'Bearer ' + vm.token
								},
								files: res.tempFiles,
								filePath: res.tempFilePaths[0],
								complete(res) {
									const imageData = JSON.parse(res.data);
									vm.images.push(imageData.data);
								}
							});
						});
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.block-point {
		display: flex; padding: 0 30upx; height: 100upx; align-items: center;
		border-bottom: 1px solid #CCCCCC;
		.title {
			font-size: 34upx; color: #424242;
		}
		.star {
			width: 300upx;
		}
		.value {
			font-size: 30upx; color: #999999;
		}
	}
	.block-command {
		padding: 30upx;
		.text-edit {
			width: 100%; font-size: 30upx; height: 240upx;
		}
		.letter-number {
			text-align: right; color: #999999; font-size: 26upx;
		}
	}
	.block-img {
		display: flex; flex-wrap: wrap;
		.image-upload {
			display: flex; justify-content: space-between; margin: 0 20upx;
			.upload-item {
				width: 170upx; height: 170upx;
				background: 50% 50% url('../../static/picture_ic_add.png') no-repeat;
				background-size: cover;
				.upload-item-title {
					margin-top: 130upx; color: #999999; text-align: center; font-size: 26upx;
				}
			}
		}
	}
</style>
