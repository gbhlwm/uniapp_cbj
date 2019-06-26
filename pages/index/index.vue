<template>
	<view>
		<view class="head">
			<view class="area">
				<view class="city">广州市</view>
				<image class="city-img" src="../../static/ic_down_s.png"></image>
			</view>
			<view class="search" @tap="toSearch()">
				<image class="search-img" src="../../static/nav_btn_search.png"></image>
				<view class="search-title">请搜索</view>
			</view>
		</view>
		<view class="swiper">
			<view class="swiper-box">
				<swiper circular="true" autoplay="true" @change="swiperChange">
					<swiper-item v-for="(index, i) in 6" :key="i">
						<div class="swiper-bg"></div>
					</swiper-item>
				</swiper>
				<view class="indicator">
					<view
						class="dots"
						v-for="(index, i) in 6"
						:class="[currentSwiper == index ? 'on' : '']"
						:key="i"
					></view>
				</view>
			</view>
		</view>
		<view class="query-options">
			<view class="item">
				<view class="item-value">天河区</view>
				<image class="item-img" src="../../static/home_ic_down_n.png"></image>
			</view>
			<view class="item">
				<view class="item-value">服务</view>
				<image class="item-img" src="../../static/home_ic_down_n.png"></image>
			</view>
			<view class="item">
				<view class="item-value">综合</view>
				<image class="item-img" src="../../static/home_ic_down_n.png"></image>
			</view>
			<view class="item">
				<view class="item-value">筛选</view>
				<image class="item-img active" src="../../static/home_ic_shuaixuan.png"></image>
			</view>
		</view>
		<view class="list">
			<view class="item" @tap="toShop()">
				<view class="item-cover"></view>
				<view class="item-content">
					<view class="item-content-block title">店名</view>
					<view class="item-content-block first">
						<view class="block-item point">总评分: 5.0</view>
						<view class="block-item order">总订单 999+</view>
						<view class="block-item shop">综合服务店</view>
					</view>
					<view class="item-content-block second">
						<view class="block-item address">地址</view>
						<view class="block-item distance">15km</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				currentSwiper: 0,
				city: '广州市',
				cityId: 167,
				areas: []
			}
		},
		onLoad() {
			const vm = this;
			uni.getLocation({
				geocode: true,
				complete: (res) => {
					if (res.address && res.address.city) {
						vm.city = res.address.city;
						vm.getCityId(vm.city, (res) => {
							if (res.statusCode === 200 && res.data.status === 2000000) {
								vm.cityId = res.data.data.id;
								vm.getAreas();
							} else if (res.statusCode === 200 && res.data.status !== 2000000) {
								uni.showModal({
									title: '获取城市',
									content: res.data.message,
								});
								vm.city = '广州市';
								vm.cityId = 167;
								vm.getAreas();
							} else {
								vm.city = '广州市';
								vm.cityId = 167;
								vm.getAreas();
							}
						});
					} else {
						vm.city = '广州市';
						vm.cityId = 167;
						vm.getAreas();
					}
				}
			})
		},
		methods: {
			//根据城市名获取城市id
			getCityId(cityName, callback = () => {}) {
				const vm = this;
				const url = 'http://192.168.0.106:8012/api/app/shop/findCityByName?name=' + cityName;
				uni.request({
					url: url,
					complete: (res) => {
						callback(res);
					}
				})
			},
			//获取城市下城区列表
			getAreas() {
				const vm = this;
				const url = 'http://192.168.0.106:8012/api/app/shop/findAllCityDetail?parentId=' + vm.cityId;
				uni.request({
					url: url,
					complete: (res) => {
						if (res.statusCode === 200 && res.data.status === 2000000) {
							vm.areas = res.data.data;
						} else if (res.statusCode === 200 && res.data.status !== 2000000) {
							uni.showModal({
								title: '获取城区',
								content: res.data.message,
							});
						} else {
							uni.showModal({
								title: '获取城区',
								content: '请求失败',
							});
						}
					}
				})
			},
			//轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
			},
			//跳转搜索页面
			toSearch(e) {
				uni.navigateTo({
					url: '../index/search'
				});
			},
			//跳转到门店详情
			toShop(e) {
				uni.navigateTo({
					url: '../index/shop'
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.head {
		display: flex; padding: 19upx;
		.area {
			display: flex; align-items: center;
			.city {
				font-size: 28upx; font-weight: 500; color: rgba(27,130,210,1);
				width: 100upx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
			}
			.city-img {
				width: 17upx; height: 11upx; margin-left: 10upx;
			}
		}
		.search {
			display: flex; align-items: center; margin-left: 20upx;
			width: 540upx; height: 64upx; background: rgba(237,237,237,1); border-radius: 10upx;
			.search-img {
				width: 42upx; height: 40upx; margin: 0 20upx;
			}
			.search-title {
				font-size: 30upx; font-family: PingFang-SC-Medium; font-weight: 500; color: rgba(204,204,204,1);
			}
		}
	}
	.swiper {
		.swiper-box {
			position: relative; height: 286upx;
			swiper {
				height: 286upx;
				.swiper-bg {
					background: 50% 50% #1B82D2 no-repeat; background-size: cover;
					width: 100%; height: 100%;
				}
			}
			.indicator {
				position: absolute; bottom: 20upx; left: 0; right: 0;
				text-align: center;
				.dots {
					width: 17upx; height: 17upx; background: rgba(255,255,255,0.5);
					border-radius: 100%; display: inline-block; margin: 0 8upx;
					&.on {
						background: white;
					}
				}
			}
		}
	}
	.query-options {
		display: flex; height: 98upx; align-items: center; justify-content: center;
		.item {
			display: flex; align-items: center; flex-grow: 1; justify-content: center;
			.item-value {}
			.item-img {
				width: 21upx; height: 13upx; margin-left: 10upx;
				&.active {
					width: 19upx; height: 21upx;
				}
			}
		}
	}
	.list {
		.item {
			border-top: 1upx solid #CDCDCD;
			position: relative; padding: 30upx 30upx 30upx 230upx;
			.item-cover {
				width: 166upx; height: 166upx; position: absolute;
				top: 0; bottom: 0; left: 30upx; background: 50% 50% #1B82D2 no-repeat;
				background-size: cover; margin: auto;
			}
			.item-content {
				height: 166upx;
				.item-content-block {
					&.title {
						font-size: 36upx; font-weight: 500; color: rgba(51,51,51,1);
					}
					&.first {
						margin-top: 35upx;
						font-size: 26upx; font-weight: 500; color: rgba(103,103,103,1);
					}
					&.second {
						margin-top: 10upx;
						font-size: 26upx; font-weight: 500; color: rgba(103,103,103,1);
					}
					.block-item {
						display: inline-block;
						&.order {
							margin-left: 10upx;
						}
						&.shop {
							float: right;
							height: 38upx; line-height: 38upx; text-align: center; padding: 0 10upx;
							color: white; border-radius: 4upx; background-color: #FA2B2B; font-size: 22upx;
						}
						&.distance {
							float: right;
							font-size: 22upx; font-weight: 500; color: rgba(103,103,103,1);
						}
					}
				}
			}
		}
	}
</style>
