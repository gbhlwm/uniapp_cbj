<template>
	<view>
		<view class="block-swiper">
			<view class="swiper">
				<view class="swiper-box">
					<swiper circular="true" autoplay="true" @change="swiperChange">
						<swiper-item v-for="(item, index) in shopDetail.images" :key="index">
							<div class="swiper-bg" :style="{'background-image': 'url(' + item + ')'}"></div>
						</swiper-item>
					</swiper>
					<view class="indicator">
						<view
							class="dots"
							v-for="(item, index) in shopDetail.images"
							:class="[currentSwiper == index ? 'on' : '']"
							:key="index"
						></view>
					</view>
				</view>
			</view>
			<view class="back-navigate" @tap="toBack()">
				<image src="../../static/common_nav_ic_back_black.png" mode=""></image>
			</view>
			<view class="open-time">营业时间: {{shopDetail.operatStartTime.substr(0,5)}}-{{shopDetail.operatEndTime.substr(0,5)}}</view>
		</view>
		<view class="block-info">
			<view class="shop-name">
				<view class="name">{{shopDetail.name}}</view>
				<view class="label">{{shopDetail.classifyName}}</view>
			</view>
			<view class="shop-label">
				<view class="label-item" v-if="!shopDetail.serviceClassifyList.length">
					无服务类型
				</view>
				<view class="label-item" v-for="(item, index) in shopDetail.serviceClassifyList" :key="index">{{item}}</view>
			</view>
			<view class="shop-eval">
				总评分 {{shopDetail.star}}    |    总订单 {{shopDetail.orderNumber}}+
			</view>
			<view class="shop-distance">
				<image src="../../static/common_nav_ic_send.png"></image>
				{{shopDetail.distance}}km
			</view>
		</view>
		<view class="block-navi">
			<view class="navi-item" @tap="chooseAction('services')"
			:class="[currentNavi == 'services' ? 'active' : '']">
				服务列表
			</view>
			<view class="navi-item"  @tap="chooseAction('details')"
			:class="[currentNavi == 'details' ? 'active' : '']">
				门店详情
			</view>
		</view>
		<view class="navi-list" v-if="currentNavi == 'services'">
			<view class="list-item" v-for="item in shopDetail.serviceList" :key="item.id" @tap="toService(item.id)">
				<view class="item-cover" :style="{'background-image': 'url(' + item.images[0] + ')'}"></view>
				<view class="item-name">{{item.name}}</view>
				<view class="item-labels">
					<view class="item">{{item.classifyName}}</view>
				</view>
				<view class="item-price">
					<view class="price-up">￥{{item.price}}</view>
					<view class="price-down">￥{{item.marketPrice}}</view>
				</view>
			</view>
		</view>
		<rich-text class="shop-detail" :nodes="shopDetail.details" v-if="currentNavi == 'details'"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopDetail: {
					operatEndTime: '',
					operatStartTime: '',
					serviceList: [],
					serviceClassifyList: []
				},
				currentSwiper: 0,
				currentNavi: 'services',
				latitude: '23.13559',
				longitude: '113.335367'
			}
		},
		onLoad(e) {
			const vm = this;
			vm.shopId = e.shopId;
			vm.getPosition();
		},
		methods: {
			//获取定位
			getPosition() {
				const vm = this;
				uni.getLocation({
					geocode: true,
					complete: (res) => {
						if (res.latitude && res.longitude) {
							vm.latitude = res.latitude;
							vm.longitude = res.longitude;
							vm.getShopDetail();
						} else {
							uni.showModal({
								title: '获取定位',
								content: '失败',
							});
							vm.getShopDetail();
						}
					}
				})
			},
			//
			chooseAction(action) {
				const vm = this;
				vm.currentNavi = action;
			},
			//返回
			toBack() {
				uni.navigateBack();
			},
			//轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
			},
			//跳转服务详情页面
			toService(serviceId) {
				uni.navigateTo({
					url: '../index/service?serviceId=' + serviceId
				});
			},
			//获取门店详情
			getShopDetail() {
				const vm = this;
				const url = vm.apiBaseUrl + '/api-good/api/app/shop/findShopDetail';
				uni.request({
					method: 'GET',
					url: url,
					data: {
						id: vm.shopId,
						lat: vm.latitude,
						lon: vm.longitude
					},
					complete: (res) => {
						if (res.statusCode === 200 && res.data.status === 2000000) {
							const detail = res.data.data;
							detail.images = detail.image.split(',');
							for (let i = 0; i < detail.serviceList.length; i++) {
								detail.serviceList[i].images = detail.serviceList[i].image.split(',');
							}
							vm.shopDetail = detail;
						} else if (res.statusCode === 200 && res.data.status !== 2000000) {
							uni.showModal({
								title: '获取门店详情',
								content: res.data.message,
							});
						} else {
							uni.showModal({
								title: '获取门店详情',
								content: '请求失败',
							});
						}
					}
				});
			}
		}
	}
</script>
	
<style lang="less">
	.block-swiper {
		position: relative;
		.swiper {
			.swiper-box {
				position: relative; height: 460upx;
				swiper {
					height: 460upx;
					.swiper-bg {
						background: 50% 50% #1B82D2 no-repeat; background-size: cover;
						width: 100%; height: 100%;
					}
				}
				.indicator {
					position: absolute; bottom: 20upx; left: 0; right: 0;
					text-align: center;
					.dots {
						width: 20upx; height: 4upx; background: rgba(255,255,255,0.5);
						display: inline-block; margin: 0 4upx;
						&.on {
							background: white; width: 38upx;
						}
					}
				}
			}
		}
		.back-navigate {
			position: absolute; width: 55upx; height: 55upx; background: rgba(0,0,0,0.5);
			line-height: 55upx; color: white; font-size: 36upx; text-align: center;
			border-radius: 100%; top: 20upx; left: 20upx;
			image {
				display: inline-block; width: 13upx; height: 20upx;
				transform: rotate(180deg);
			}
		}
		.open-time {
			position: absolute; bottom: 60upx; left: 0;
			width: 300upx; padding: 0 20upx; height: 50upx;
			line-height: 50upx; color: white; border-top-right-radius: 25rpx;
			border-bottom-right-radius: 25rpx; font-size: 24upx;
			background-color: #1B82D2; opacity: 0.7; box-shadow: 1upx 1upx 1upx rgba(0,0,0,0.5);
		}
	}
	.block-info {
		padding: 25upx; position: relative;
		.shop-name {
			display: flex; height: 60upx; justify-content: space-between;
			.name {
				font-size: 32upx; line-height: 60upx;
				width: 500upx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
			}
			.label {
				width: 150upx; height: 60upx; background: #1B82D2; text-align: center;
				line-height: 60upx; border-radius: 30upx; color: white; font-size: 24upx;
			}
		}
		.shop-label {
			width: 500upx; display: flex; flex-wrap: wrap;
			.label-item {
				background: #E6E6E6; border-radius: 22upx; margin-bottom: 10upx; margin-right: 20upx;
				padding: 5upx 10upx; font-size: 22upx; font-weight: 500; color: rgba(51,51,51,1); line-height: 38upx;
			}
		}
		.shop-eval {
			margin-top: 40upx; font-size: 30upx; font-weight: 500; color: rgba(51,51,51,1);
			line-height: 38upx;
		}
		.shop-distance {
			position: absolute; right: 25upx; bottom: 25upx;
			font-size: 30upx; font-weight: 500; color:rgba(51,51,51,1); line-height: 38upx;
			image {
				width: 50upx; height: 48upx; display: block; margin: auto;
			}
		}
	}
	.block-navi {
		height: 98upx; border-bottom: 1px solid #E6E6E6;
		.navi-item {
			width: 50%; line-height: 98upx; display: inline-block; text-align: center;
			font-size: 30upx; font-weight: 500; color:rgba(51,51,51,1); position: relative;
			&.active {
				&::after {
					position: absolute; content: ''; display: block;
					background: #1B82D2; height: 4upx; width: 200upx;
					bottom: 0; left: 0; right: 0; margin: auto;
				}
			}
		}
	}
	.navi-list {
		.list-item {
			position: relative; padding: 25upx 25upx 25upx 210upx; height: 120upx;
			.item-cover {
				position: absolute; top: 0; bottom: 0; margin: auto;
				left: 25upx; height: 120upx; width: 160upx;
				background: 50% 50% #1B82D2 no-repeat; background-size: cover;
			}
			.item-name {
				font-size: 30upx; font-weight: 500; color: rgba(51,51,51,1); line-height: 38upx;
			}
			.item-labels {
				display: flex; margin-top: 35upx;
				.item {
					background: #E6E6E6; border-radius: 22upx; margin-bottom: 10upx; margin-right: 20upx;
					padding: 5upx 10upx; font-size: 22upx; font-weight: 500; color: rgba(51,51,51,1); line-height: 38upx;
				}
			}
			.item-price {
				position: absolute; top: 25upx; right: 25upx;
				.price-up {
					font-size: 30upx; font-weight: 500; color: rgba(255,24,63,1); line-height: 38upx;
				}
				.price-down {
					text-decoration: line-through;
					font-size: 26upx; font-weight: 500; color: rgba(153,153,153,1); line-height: 38upx;
				}
			}
		}
	}
</style>
