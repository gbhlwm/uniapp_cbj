<template>
	<view class="page-apply">
		<view class="block-title">
			基本信息
		</view>
		<view class="block-option">
			<view class="option-title">门店名称</view>
			<input v-model="shopInfo.name" class="option-value" placeholder="请输入门店名称">
			<view class="option-btn"></view>
		</view>
		<view class="block-option">
			<view class="option-title">门店服务认证</view>
			<input v-model="shopClassify" class="option-value" placeholder="请输入门店名称">
			<view class="option-btn">
				<image src="../../static/common_nav_ic_more.png" mode=""></image>
			</view>
		</view>
		<view class="block-option">
			<view class="option-title">门店位置</view>
			<input v-model="shopAddress" class="option-value" placeholder="请输入门店名称">
			<view class="option-btn"></view>
		</view>
		<view class="block-option">
			<view class="option-title">开始营业时间</view>
			<input v-model="shopInfo.operatStartTime" class="option-value" placeholder="请输入门店名称">
			<view class="option-btn">
				<image src="../../static/common_nav_ic_more.png" mode=""></image>
			</view>
		</view>
		<view class="block-option">
			<view class="option-title">结束营业时间</view>
			<input v-model="shopInfo.operatEndTime" class="option-value" placeholder="请输入门店名称">
			<view class="option-btn">
				<image src="../../static/common_nav_ic_more.png" mode=""></image>
			</view>
		</view>
		<view class="block-option">
			<view class="option-title">门店属性</view>
			<input v-model="attributeName" class="option-value" placeholder="请输入门店名称">
			<view class="option-btn">
				<image src="../../static/common_nav_ic_more.png" mode=""></image>
			</view>
		</view>
		<view class="block-option">
			<view class="option-title">门店资质</view>
			<input v-model="qualificationName" class="option-value" placeholder="请输入门店名称">
			<view class="option-btn">
				<image src="../../static/common_nav_ic_more.png" mode=""></image>
			</view>
		</view>
		<view class="block-option">
			<view class="option-title">门店电话</view>
			<input v-model="shopInfo.mobile" class="option-value" placeholder="请输入门店名称">
			<view class="option-btn"></view>
		</view>
		<view class="block-option">
			<view class="option-title">联系人</view>
			<input v-model="shopInfo.contacts" class="option-value" placeholder="请输入门店名称">
			<view class="option-btn"></view>
		</view>
		<view class="block-option">
			<view class="option-title">联系手机号</view>
			<input v-model="shopInfo.telephone" class="option-value" placeholder="请输入门店名称">
			<view class="option-btn"></view>
		</view>
		<view class="block-title">
			店长身份证
		</view>
		<view class="image-upload">
			<view class="upload-item">
				<view class="upload-item-title">上传身份证正面</view>
			</view>
			<view class="upload-item">
				<view class="upload-item-title">上传身份证反面</view>
			</view>
		</view>
		<view class="block-title">
			营业执照
		</view>
		<view @tap="toImageUpload()" class="image-upload" v-if="shopInfo.businessLicenseImage">
			<view class="upload-item" :style="{'background-image': 'url(' + shopInfo.businessLicenseImage + ')'}">
				<view class="upload-item-title">上传营业执照照片</view>
			</view>
		</view>
		<view @tap="toImageUpload()" class="image-upload" v-if="!shopInfo.businessLicenseImage">
			<view class="upload-item">
				<view class="upload-item-title">上传营业执照照片</view>
			</view>
		</view>
		<view class="block-title">
			门店详情
		</view>
		<view class="block-title-s">请提供图文内容给车便捷客服，平台会帮您录入</view>
		<view class="action" @tap="toApplyPassword()">下一步</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopInfo: {
					name: '',
					shopClassifyId: '',
					lon:'',
					lat: '',
					address: '',
					operatStartTime:'',
					operatEndTime: '',
					qualification: 1,
					attribute: 1,
					telephone: '',
					contacts:'',
					mobile:'',
					identityCardImage: '',
					businessLicenseImage: '',
					code: ''
				},
				shopClassify: '',
				shopAddress: '',
				attributeName: '独立自营' ,
				qualificationName: '一类'
			}
		},
		methods: {
			//将chooseimage的图片转base64
			urlTobase64(url){
				uni.request({
					url: url,
					method:'GET',
					responseType: 'arraybuffer',
					success: (res) => {
						// console.log(uni.arrayBufferToBase64(res.data));
						let base64 = uni.arrayBufferToBase64(res.data); //把arraybuffer转成base64 
						base64 = 'data:' + res.header['content-type'] + ';base64,' + base64 //不加上这串字符，在页面无法显示的哦
						console.log(base64)
					}
				})
			},
			//图片上传
			toImageUpload() {
				const vm = this;
				uni.chooseImage({
					count: 1,
					complete(res) {
						uni.request({
							url: res.tempFilePaths[0],
							method:'GET',
							responseType: 'arraybuffer',
							success: (res) => {
								// console.log(uni.arrayBufferToBase64(res.data));
								let base64 = uni.arrayBufferToBase64(res.data); //把arraybuffer转成base64 
								base64 = 'data:' + res.header['content-type'] + ';base64,' + base64 //不加上这串字符，在页面无法显示的哦
								uni.request({
									url: 'http://chebianjie.net:8080/uaa/api/ut-files/uploadShoppingPic',
									method: 'POST',
									data: {
										MultipartFile: [base64]
									},
									complete(res) {
										console.log(res);
									}
								})
							}
						})
					}
				})
			},
			// 设置门店登录密码
			toApplyPassword() {
				uni.navigateTo({
					url: '../seller/applyPassword'
				});
			},
			//下一步
			toNext() {
				const vm = this;
				if (!vm.shopInfo.name) {
					uni.showModal({
						content: '请输入门店名称'
					});
				} else if (!vm.shopInfo.shopClassify) {
					uni.showModal({
						content: '请选择门店服务认证'
					});
				} else if (!vm.shopInfo.address) {
					uni.showModal({
						content: '请选择门店位置'
					});
				} else if (!vm.shopInfo.operatStartTime) {
					uni.showModal({
						content: '请选择门店开始营业时间'
					});
				} else if (!vm.shopInfo.operatEndTime) {
					uni.showModal({
						content: '请选择门店结束营业时间'
					});
				} else if (!vm.shopInfo.mobile) {
					uni.showModal({
						content: '请输入门店电话'
					});
				} else if (!vm.shopInfo.contacts) {
					uni.showModal({
						content: '请输入联系人'
					});
				} else if (!vm.shopInfo.telephone) {
					uni.showModal({
						content: '请输入联系人手机号'
					});
				} else if (!vm.shopInfo.identityCardImage) {
					uni.showModal({
						content: '请上传身份证正反面'
					});
				} else if (!vm.shopInfo.businessLicenseImage) {
					uni.showModal({
						content: '请上传营业执照照片'
					});
				} else {}
			}
		}
	}
</script>

<style lang="less">
	.page-apply {
		background: #F5F5F5;
		.block-title {
			height: 100upx; font-size: 32upx; color: #333333; line-height: 100upx;
			margin: 0 20upx; font-weight: bold;
		}
		.block-title-s {
			height: 50upx; font-size: 30upx; color: #333333; line-height: 50upx;
			margin: 0 20upx;
		}
		.block-option {
			display: flex; align-items: center; height: 100upx; margin: 0 20upx;
			.option-title {
				width: 200upx;
				font-size: 30upx; color: #131319; flex-grow: 2; text-align: left;
			}
			.option-value {
				font-size: 28upx; color: #131319; ::placeholder {color: #C6C6C6;}
				flex-grow: 4;
			}
			.option-btn {
				width: 20upx; color: #1B82D2;
				font-size: 28upx; flex-grow: 1; text-align: center;
				image {
					width: 13upx; height: 21upx;
				}
			}
		}
		.image-upload {
			display: flex; justify-content: space-between; margin: 0 20upx;
			.upload-item {
				width: 320upx; height: 226upx;
				background: 50% 50% url('../../static/id_bg1.png') no-repeat;
				background-size: cover;
				.upload-item-title {
					margin-top: 155upx; color: #999999; text-align: center; font-size: 30upx;
				}
			}
		}
		.action {
			margin: 90upx auto; width: 680upx; height: 98upx;
			line-height: 98upx; text-align: center; color: white;
			font-size: 38upx; background: #1B82D2; border-radius: 8upx;
		}
	}
</style>
