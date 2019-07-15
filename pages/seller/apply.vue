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
			<picker class="area-picker" @change="bindPickerChangeClassify" :value="classifyIndex" :range="classList" range-key="name"></picker>
			<view class="option-title">门店服务认证</view>
			<input v-model="shopClassify" class="option-value" placeholder="请选择门店服务认证" disabled="true">
			<view class="option-btn">
				<image src="../../static/common_nav_ic_more.png" mode=""></image>
			</view>
		</view>
		<view class="block-option" @tap="cityShow = true;">
			<view class="option-title">门店所在城市</view>
			<input v-model="city" class="option-value" placeholder="请选择门店所在城市" disabled="true">
			<view class="option-btn"></view>
		</view>
		<view class="block-option">
			<picker class="area-picker" @change="bindPickerChange" :value="areaIndex" :range="areas" range-key="name"></picker>
			<view class="option-title">门店所在地区</view>
			<input v-model="area" class="option-value" placeholder="请选择门店所在地区" disabled="true">
			<view class="option-btn"></view>
		</view>
		<view class="block-option">
			<view class="option-title">门店所在地经度</view>
			<input v-model="shopInfo.lat" class="option-value" placeholder="门店所在地经度">
			<view class="option-btn"></view>
		</view>
		<view class="block-option">
			<view class="option-title">门店所在地纬度</view>
			<input v-model="shopInfo.lon" class="option-value" placeholder="门店所在地纬度">
			<view class="option-btn"></view>
		</view>
		<view class="block-option">
			<view class="option-title">门店门店详细地址</view>
			<input v-model="shopInfo.address" class="option-value" placeholder="请输入门店详细地址">
			<view class="option-btn"></view>
		</view>
		<view class="block-option">
			<picker class="area-picker" mode="time" :value="shopInfo.operatStartTime" start="00:00" end="23:59" @change="bindStartTimeChange"></picker>
			<view class="option-title">开始营业时间</view>
			<input v-model="shopInfo.operatStartTime" class="option-value" placeholder="开始营业时间">
			<view class="option-btn">
				<image src="../../static/common_nav_ic_more.png" mode=""></image>
			</view>
		</view>
		<view class="block-option">
			<picker class="area-picker" mode="time" :value="shopInfo.operatEndTime" start="00:00" end="23:59" @change="bindEndTimeChange"></picker>
			<view class="option-title">结束营业时间</view>
			<input v-model="shopInfo.operatEndTime" class="option-value" placeholder="结束营业时间">
			<view class="option-btn">
				<image src="../../static/common_nav_ic_more.png" mode=""></image>
			</view>
		</view>
		<view class="block-option">
			<picker class="area-picker" :value="attrIndex" @change="bindAttrChange" :range="attrArr" range-key="name"></picker>
			<view class="option-title">门店属性</view>
			<input v-model="attributeName" class="option-value" placeholder="门店属性" disabled="true">
			<view class="option-btn">
				<image src="../../static/common_nav_ic_more.png" mode=""></image>
			</view>
		</view>
		<view class="block-option">
			<picker class="area-picker" :value="qualIndex" @change="bindQualChange" :range="qualArr" range-key="name"></picker>
			<view class="option-title">门店资质</view>
			<input v-model="qualificationName" class="option-value" placeholder="门店资质" disabled="true">
			<view class="option-btn">
				<image src="../../static/common_nav_ic_more.png" mode=""></image>
			</view>
		</view>
		<view class="block-option">
			<view class="option-title">门店电话</view>
			<input v-model="shopInfo.mobile" class="option-value" placeholder="请输入门店电话">
			<view class="option-btn"></view>
		</view>
		<view class="block-option">
			<view class="option-title">联系人</view>
			<input v-model="shopInfo.contacts" class="option-value" placeholder="请输入联系人">
			<view class="option-btn"></view>
		</view>
		<view class="block-option">
			<view class="option-title">联系手机号</view>
			<input v-model="shopInfo.telephone" class="option-value" placeholder="请输入联系手机号">
			<view class="option-btn"></view>
		</view>
		<view class="block-title">
			店长身份证
		</view>
		<view class="image-upload">
			<view class="upload-item" @tap="toImageUpload('identityCardImageA')" v-if="identityCardImageA" :style="{'background-image': 'url(' + identityCardImageA + ')'}">
				<view class="upload-item-title">上传身份证正面</view>
			</view>
			<view class="upload-item" @tap="toImageUpload('identityCardImageA')" v-if="!identityCardImageA">
				<view class="upload-item-title">上传身份证正面</view>
			</view>
			<view class="upload-item" @tap="toImageUpload('identityCardImageB')" v-if="identityCardImageB" :style="{'background-image': 'url(' + identityCardImageB + ')'}">
				<view class="upload-item-title">上传身份证反面</view>
			</view>
			<view class="upload-item" @tap="toImageUpload('identityCardImageB')" v-if="!identityCardImageB">
				<view class="upload-item-title">上传身份证反面</view>
			</view>
		</view>
		<view class="block-title">
			营业执照
		</view>
		<view class="image-upload" v-if="businessLicenseImage">
			<view class="upload-item" @tap="toImageUpload('businessLicenseImage')" :style="{'background-image': 'url(' + businessLicenseImage + ')'}">
				<view class="upload-item-title">上传营业执照照片</view>
			</view>
		</view>
		<view class="image-upload" v-if="!businessLicenseImage">
			<view class="upload-item" @tap="toImageUpload('businessLicenseImage')">
				<view class="upload-item-title">上传营业执照照片</view>
			</view>
		</view>
		<view class="block-title">
			门店详情
		</view>
		<view class="block-title-s">请提供图文内容给车便捷客服，平台会帮您录入</view>
		<view class="action" @tap="toNext()">下一步</view>
		<uni-indexed-list v-if="cityShow" :options="cityList" :showSelect="cityShow" @click="cityClick"></uni-indexed-list>
	</view>
</template>

<script>
	import {apiGoodFindAllCityDetail, apiGoodFindCityByName, apiGoodFindAllCity, apiGoodReturnShopClassify} from '../../api.js'
	import uniIndexedList from "@/components/uni-indexed-list/uni-indexed-list.vue"
	export default {
		components: {uniIndexedList},
		data() {
			return {
				cityShow: false,
				latitude: '23.13559',
				longitude: '113.335367',
				shopInfo: {
					name: '',
					shopClassifyId: '',
					lon: '113.335367',
					lat: '23.13559',
					address: '',
					addressId: 174,
					operatStartTime:'00:00',
					operatEndTime: '00:00',
					qualification: 1,
					attribute: 1,
					telephone: '',
					contacts:'',
					mobile:'',
					identityCardImage: '',
					businessLicenseImage: ''
				},
				classList: [],
				classifyIndex: 0,
				city: '广州市',
				cityId: 167,
				areas: [
					{id: 168, name: '从化区', longitude: '113.335367', latitude: '23.545283'},
					{id: 169, name: '增城区', longitude: '113.829579', latitude: '23.290497'},
					{id: 170, name: '南沙区', longitude: '113.53738', latitude: '22.794531'},
					{id: 171, name: '花都区', longitude: '113.211184', latitude: '23.39205'},
					{id: 172, name: '黄埔区', longitude: '113.450761', latitude: '23.103239'},
					{id: 173, name: '白云区', longitude: '113.262831', latitude: '23.162281'},
					{id: 174, name: '天河区', longitude: '113.335367', latitude: '23.13559'},
					{id: 175, name: '海珠区', longitude: '113.262008', latitude: '23.103131'},
					{id: 176, name: '荔湾区', longitude: '113.243038', latitude: '23.545283'},
					{id: 177, name: '越秀区', longitude: '113.280714', latitude: '23.125624'},
					{id: 178, name: '番禺区', longitude: '113.364619', latitude: '22.938582'},
				],
				areaId: 174,
				area: '天河区',
				areaIndex: 6,
				businessLicenseImage:'',
				identityCardImageA:'',
				identityCardImageB:'',
				shopClassify: '',
				shopAddress: '',
				attributeName: '独立自营',
				attrIndex: 0,
				attrArr: [
					{name: '独立自营', attrId: 1},
					{name: '连锁直营', attrId: 2},
					{name: '连锁加盟', attrId: 3}
				],
				qualIndex: 0,
				qualArr: [
					{name: '一类', qualId: 1},
					{name: '二类', qualId: 2},
					{name: '三类', qualId: 3}
				],
				qualificationName: '一类'
			}
		},
		onLoad() {
			const vm = this;
			vm.getAllCity();
			vm.getPosition();
			vm.getClassList();
			// vm.getAreas();
		},
		methods: {
			//获取服务认证列表
			getClassList() {
				const vm = this;
				apiGoodReturnShopClassify().then(res => {
					if (res.data.status === 2000000) {
						vm.classList = res.data.data;
						vm.shopClassify = vm.classList[0].name;
						vm.shopInfo.shopClassifyId = vm.classList[0].id;
					} else {
						uni.showModal({
							title: '获取服务认证',
							content: res.data.message,
						});
					}
				});
			},
			//获取定位
			getPosition() {
				const vm = this;
				uni.getLocation({
					geocode: true,
					complete: (res) => {
						if (res.address && res.address.city) {
							vm.city = res.address.city;
							vm.shopInfo.lat = res.latitude;
							vm.shopInfo.lon = res.longitude;
							vm.getCityId(vm.city, (res) => {
								if (res.statusCode === 200 && res.data.status === 2000000) {
									vm.cityId = res.data.data.id;
									vm.getAreas();
								} else if (res.statusCode === 200 && res.data.status !== 2000000) {
									uni.showModal({
										title: '获取城市',
										content: res.data.message,
									});
									// vm.getShops();
								} else {
									uni.showModal({
										title: '获取城市请求',
										content: '失败',
									});
									// vm.getShops();
								}
							});
						} else {
							// uni.showModal({
							// 	title: '获取定位',
							// 	content: '失败',
							// });
							// vm.getShops();
						}
					}
				})
			},
			bindStartTimeChange(e) {
				this.shopInfo.operatStartTime = e.target.value;
			},
			bindEndTimeChange(e) {
				this.shopInfo.operatEndTime = e.target.value;
			},
			bindPickerChangeClassify: function(e) {
				const vm = this;
				vm.classifyIndex = e.target.value;
				vm.shopInfo.shopClassifyId = vm.classList[vm.classifyIndex].id;
				vm.shopClassify = vm.classList[vm.classifyIndex].name;
			},
			bindAttrChange: function(e) {
				const vm = this;
				vm.attrIndex = e.target.value;
				vm.shopInfo.attribute = vm.attrArr[vm.attrIndex].attrId;
				vm.attributeName = vm.attrArr[vm.attrIndex].name;
			},
			bindQualChange: function(e) {
				const vm = this;
				vm.qualIndex = e.target.value;
				vm.shopInfo.qualification = vm.qualArr[vm.qualIndex].qualId;
				vm.qualificationName = vm.qualArr[vm.qualIndex].name;
			},
			bindPickerChange: function(e) {
				const vm = this;
				vm.areaIndex = e.target.value;
				vm.shopInfo.addressId = vm.areas[vm.areaIndex].id;
				vm.area = vm.areas[vm.areaIndex].name;
			},
			//获取城市下城区列表
			getAreas(callBack = () => {}) {
				const vm = this;
				apiGoodFindAllCityDetail({parentId: vm.cityId}).then(res => {
					if (res.data.status === 2000000) {
						vm.areas = res.data.data;
						vm.area = vm.areas[0].name
						vm.shopInfo.addressId = vm.areas[0].id
					} else {
						uni.showModal({
							title: '获取城区',
							content: res.data.message,
						});
					}
				});
			},
			//选择城市
			cityClick(option) {
				const vm = this;
				console.log(option);
				const city = option.item.name;
				let cityId = 0;
				for (let i = 0; i < vm.citys.length; i++) {
					if (city === vm.citys[i].name) {
						cityId = vm.citys[i].id
					}
				}
				vm.city = city;
				vm.cityId = cityId;
				vm.getAreas();
				this.cityShow = false;
			},
			// 获取所有城市
			getAllCity() {
				const vm = this;
				apiGoodFindAllCity().then(res => {
					if (res.data.status === 2000000) {
						const list = res.data.data;
						const arr = [
							{letter: 'A', data: []},
							{letter: 'B', data: []},
							{letter: 'C', data: []},
							{letter: 'D', data: []},
							{letter: 'E', data: []},
							{letter: 'F', data: []},
							{letter: 'G', data: []},
							{letter: 'H', data: []},
							{letter: 'I', data: []},
							{letter: 'J', data: []},
							{letter: 'K', data: []},
							{letter: 'L', data: []},
							{letter: 'M', data: []},
							{letter: 'N', data: []},
							{letter: 'O', data: []},
							{letter: 'P', data: []},
							{letter: 'Q', data: []},
							{letter: 'R', data: []},
							{letter: 'S', data: []},
							{letter: 'T', data: []},
							{letter: 'U', data: []},
							{letter: 'V', data: []},
							{letter: 'W', data: []},
							{letter: 'X', data: []},
							{letter: 'Y', data: []},
							{letter: 'Z', data: []}
						];
						for (let i = 0; i < list.length; i++) {
							for (let j = 0; j < arr.length; j++) {
								if (list[i].initials === arr[j].letter) {
									arr[j].data.push(list[i].name);
								}
							}
						}
						vm.cityList = arr;
						vm.citys = list;
					} else {
						uni.showModal({
							title: '获取城市列表',
							content: res.data.message,
						});
					}
				});
			},
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
									vm[imageSrc] = imageData.data;
								}
							});
						});
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
				} else if (!vm.shopInfo.shopClassifyId) {
					uni.showModal({
						content: '请选择门店服务认证'
					});
				} else if (!vm.shopInfo.lon) {
					uni.showModal({
						content: '门店所在地纬度'
					});
				} else if (!vm.shopInfo.lat) {
					uni.showModal({
						content: '门店所在地经度'
					});
				} else if (!vm.shopInfo.address) {
					uni.showModal({
						content: '请填写门店位置'
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
				} else if (!vm.identityCardImageA) {
					uni.showModal({
						content: '请上传身份证正面'
					});
				} else if (!vm.identityCardImageB) {
					uni.showModal({
						content: '请上传身份证反面'
					});
				} else if (!vm.businessLicenseImage) {
					uni.showModal({
						content: '请上传营业执照照片'
					});
				} else {
					vm.shopInfo.identityCardImage = vm.identityCardImageA + ',' + vm.identityCardImageB;
					vm.shopInfo.businessLicenseImage = vm.businessLicenseImage;
					uni.navigateTo({
						url: '../seller/applyPassword?shopInfo=' + JSON.stringify(vm.shopInfo)
					});
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.uni-indexed {
		position: absolute; top: 0; bottom: 0; left: 0; right: 0; overflow: scroll; background: white;
		z-index: 99;
	}
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
