<template>
	<view>
		<view class="block-title">
			基本信息
		</view>
		<view class="block-option" v-if="service.id">
			<view class="option-title">服务ID</view>
			<input v-model="service.id" class="option-value">
			<view class="option-btn"></view>
		</view>
		<view class="block-option">
			<picker class="area-picker" :value="classsifyIndex" @change="bindPickerChange" :range="serviceList" range-key="name"></picker>
			<view class="option-title">服务分类</view>
			<input v-model="classifyName" class="option-value" placeholder="请选择服务分类" disabled="true">
			<view class="option-btn">
				<image src="../../static/common_nav_ic_more.png" mode=""></image>
			</view>
		</view>
		<view class="block-option">
			<view class="option-title">服务名称</view>
			<input v-model="service.name" class="option-value" placeholder="请输入服务名称">
			<view class="option-btn"></view>
		</view>
		<view class="block-option">
			<view class="option-title">服务说明</view>
			<input v-model="service.instruction" class="option-value" placeholder="请输入服务说明">
			<view class="option-btn"></view>
		</view>
		<view class="block-option">
			<view class="option-title">数字排序</view>
			<input type="number" v-model="service.sort" class="option-value" placeholder="请设置数字排序">
			<view class="option-btn"></view>
		</view>
		<view class="block-option">
			<view class="option-title">购买须知</view>
			<input v-model="service.notice" class="option-value" placeholder="请输入购买须知">
			<view class="option-btn"></view>
		</view>
		<view class="block-title">
			服务缩略图
		</view>
		<view class="image-upload" v-if="service.image">
			<view class="upload-item" @tap="toImageUpload('image')" :style="{'background-image': 'url(' + service.image + ')'}">
				<!-- <view class="upload-item-title">服务缩略图</view> -->
			</view>
		</view>
		<view class="image-upload" v-if="!service.image">
			<view class="upload-item" @tap="toImageUpload('image')">
				<view class="upload-item-title">服务缩略图</view>
			</view>
		</view>
		<view class="block-title">
			服务套餐
		</view>
		<view class="meal-item" v-for="(item, i) in service.meals" :key="i" v-if="item.editStatus !== 3">
			<view class="item-head">
				<input type="text" v-model="item.name" class="name" placeholder="请输入套餐名称"/>
				<view class="del" @tap="delMeal(i, item.id)">
					删除
				</view>
			</view>
			<view class="item-body">
				<view class="item">
					<view class="item-title">销售价：</view>
					<view class="item-label">￥</view>
					<input type="number" v-model="item.sellPrice" class="item-value" placeholder="请设置价格"/>
				</view>
				<view class="item">
					<view class="item-title">划线价：</view>
					<view class="item-label">￥</view>
					<input type="number" v-model="item.markPrice" class="item-value" placeholder="请设置价格"/>
				</view>
			</view>
		</view>
		<view class="block-title">
			服务详情
		</view>
		<view class="block-title-s">请提供图文内容给车便捷客服，平台会帮您录入</view>
		<view class="action" @tap="addMeal()">新增套餐</view>
	</view>
</template>

<script>
	import {apiGoodFindUserServiceDetail, apiGoodReturnServiceClassify, apiGoodSaveService, apiGoodUpdateService} from '../../api.js'
	export default {
		data() {
			return {
				service: {
					classifyId: 0,
					details: "",
					id: 0,
					image: "",
					instruction: "",
					meals: [
						{
							editStatus: 0,
							id: 0,
							markPrice: "",
							name: "",
							sellPrice: ""
						}
					],
					name: "",
					notice: "",
					sort: 0
				},
				classifyName: '',
				classsifyIndex: 0,
				serviceList: [],
				shopId: ''
			}
		},
		onLoad(e) {
			const vm = this;
			vm.getServiceList();
			uni.getStorage({
				key: 'shopId',
				complete(res) {
					vm.shopId = res.data;
				}
			});
			if (e.serviceId) {
				vm.getService(e.serviceId);
			}
		},
		onNavigationBarButtonTap() {
			const vm = this;
			vm.submitService();
		},
		methods: {
			//获取服务详情
			getService(serviceId) {
				const vm = this;
				const url = vm.apiBaseUrl + '/api-good/api/app/services/findUserServiceDetail';
				apiGoodFindUserServiceDetail({id: serviceId}).then(res => {
					if (res.data.status === 2000000) {
						const data = res.data.data;
						for (let i = 0; i < data.meals.length; i +=1 ) {
							data.meals[i].editStatus = 2;
						}
						vm.service = data;
						// vm.classifyName = vm.serviceList[0].name;
						// vm.service.classifyId = vm.serviceList[0].id;
					} else {
						uni.showModal({
							title: '获取服务详情',
							content: res.data.message,
						});
					}
				});
			},
			bindPickerChange: function(e) {
				const vm = this;
				vm.classsifyIndex = e.target.value;
				vm.service.classifyId = vm.serviceList[vm.classsifyIndex].id;
				vm.classifyName = vm.serviceList[vm.classsifyIndex].name;
			},
			//获取服务分类列表
			getServiceList() {
				const vm = this;
				const url = vm.apiBaseUrl + '/api-good/api/app/shop/returnServiceClassify';
				apiGoodReturnServiceClassify().then(res => {
					if (res.data.status === 2000000) {
						vm.serviceList = res.data.data;
						vm.classifyName = vm.serviceList[0].name;
						vm.service.classifyId = vm.serviceList[0].id;
					} else {
						uni.showModal({
							title: '获取服务分类',
							content: res.data.message,
						});
					}
				});
			},
			//图片上传
			toImageUpload(imageSrc) {
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
									vm.service[imageSrc] = imageData.data[0];
								}
							});
						});
					}
				})
			},
			//检查套餐信息是否填写完整
			checkMeal() {
				const vm = this;
				const meals = vm.service.meals;
				let result = true;
				let message = '';
				if (!meals.length) {
					result = false;
					message = '请至少新增一个套餐';
				} else {
					for (let i = 0; i < meals.length; i += 1) {
						if (!meals[i].name || !meals[i].sellPrice || !meals[i].markPrice) {
							result = false;
						}
					}
					if (!result) {
						message = '套餐信息未填写完整';
					}
				}
				return {
					result: result,
					message: message
				};
			},
			//新增套餐
			addMeal() {
				const vm = this;
				vm.service.meals.push({
					editStatus: 1,
					id: 0,
					markPrice: "",
					name: "",
					sellPrice: ""
				});
			},
			//删除套餐
			delMeal(index, mealId) {
				const vm = this;
				if (mealId === 0) {
					vm.service.meals.splice(index, 1);
				} else {
					vm.service.meals[index].editStatus = 3;
				}
			},
			submitService() {
				const vm = this;
				const checkMealResult = vm.checkMeal();
				if (!vm.service.name) {
					uni.showToast({
						title: '请输入服务名称'
					});
				} else if (!vm.service.instruction) {
					uni.showToast({
						title: '请输入服务说明'
					});
				} else if (!vm.service.notice) {
					uni.showToast({
						title: '请输入购买须知'
					});
				} else if (!vm.service.image) {
					uni.showToast({
						title: '请上传服务缩略图'
					});
				} else if (!checkMealResult.result) {
					uni.showToast({
						title: checkMealResult.message
					});
				} else {
					if (!vm.service.id) {
						apiGoodSaveService(shopId, vm.service).then(res => {
							if (res.data.status === 2000000) {
								uni.showModal({
									content: '保存成功',
									complete() {
										uni.navigateBack();
									}
								});
							} else {
								uni.showModal({
									title: '新增服务',
									content: res.data.message,
								});
							}
						});
					} else {
						apiGoodUpdateService(vm.service).then(res => {
							if (res.data.status === 2000000) {
								uni.showModal({
									content: '保存成功',
									complete() {
										uni.navigateBack();
									}
								});
							} else {
								uni.showModal({
									title: '保存服务',
									content: res.data.message,
								});
							}
						});
					}
				}
			}
		}
	}
</script>

<style lang="less">
	.block-title {
		height: 100upx; font-size: 32upx; color: #333333; line-height: 100upx;
		margin: 0 20upx; font-weight: bold;
	}
	.block-title-s {
		height: 50upx; font-size: 30upx; color: #333333; line-height: 50upx;
		margin: 0 20upx;
	}
	.block-option {
		display: flex; align-items: center; height: 100upx; margin: 0 20upx; position: relative;
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
		.area-picker {
			position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 10;
		}
	}
	.meal-item {
		margin: 20upx;
		.item-head {
			display: flex; justify-content: space-between; font-size: 28upx;
			align-items: center;
			.name {}
			.del {
				width: 120upx; height: 58upx; line-height: 58upx;
				text-align: center; color: white; border-radius: 29upx;
				background: #FF183F;
			}
		}
		.item-body {
			margin-top: 10upx;
			.item {
				display: flex; font-size: 26upx; align-items: center;
				.item-label {
					color: #FA2B2B;
				}
				.item-value {
					color: #FA2B2B;
				}
			}
		}
	}
	.block-title-s {
		height: 50upx; font-size: 30upx; color: #333333; line-height: 50upx;
		margin: 0 20upx;
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
</style>
