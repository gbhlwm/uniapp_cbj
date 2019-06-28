<template>
	<view>
		<view class="head">
			<view class="area" @tap="cityShow = true;">
				<view class="city">{{city}}</view>
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
					<swiper-item v-for="item in banners" :key="item.id" @tap="chooseBanner(item.id, item.type)">
						<div class="swiper-bg"
							:style="{'background-image': 'url(' + item.image + ')'}">
						</div>
					</swiper-item>
				</swiper>
				<view class="indicator">
					<view
						class="dots"
						v-for="(item, index) in banners"
						:class="[currentSwiper == index ? 'on' : '']"
						:key="item.id"
					></view>
				</view>
			</view>
		</view>
		<view class="query-options">
			<view class="item" @tap="queryChoose('areaListShow')">
				<view class="item-value">{{area}}</view>
				<image class="item-img" src="../../static/home_ic_down_n.png"></image>
			</view>
			<view class="item" @tap="queryChoose('serviceListShow')">
				<view class="item-value">服务</view>
				<image class="item-img" src="../../static/home_ic_down_n.png"></image>
			</view>
			<view class="item" @tap="queryChoose('sortListShow')">
				<view class="item-value">{{sortName}}</view>
				<image class="item-img" src="../../static/home_ic_down_n.png"></image>
			</view>
			<view class="item" @tap="queryChoose('queryListShow')">
				<view class="item-value">筛选</view>
				<image class="item-img active" src="../../static/home_ic_shuaixuan.png"></image>
			</view>
			<view class="area-list" v-if="areaListShow">
				<view class="area-item" v-for="item in areas" :key="item.id" @tap="chooseArea(item.id, item.name)">
					<view>{{item.name}}</view>
					<image v-if="item.id === areaId" src="../../static/common_ic_choice_big_s.png"></image>
				</view>
			</view>
			<view class="area-list" v-if="serviceListShow">
				<view class="list-block">
					<view class="list-block-title">
						门店服务分类
					</view>
					<view class="choice-list">
						<view class="choice" :class="{active: item.id === serviceClassifyId}" @tap="chooseService(item.id)" v-for="item in serviceList" :key="item.id">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
			<view class="area-list active" v-if="sortListShow">
				<view class="area-item" v-for="item in sortTypeList" :key="item.sortType" @tap="chooseSortType(item.sortType, item.name)">
					<view>{{item.title}}</view>
					<image v-if="item.sortType === sortType" src="../../static/common_ic_choice_big_s.png"></image>
				</view>
			</view>
			<view class="area-list" v-if="queryListShow">
				<view class="list-block">
					<view class="list-block-title">
						门店资质级别
					</view>
					<view class="choice-list">
						<view class="choice" 
							:class="{active: item.id === qualification}" 
							v-for="item in qualificationList" @tap="chooseQualification(item.id)"
							:key="item.id">
								{{item.title}}
						</view>
					</view>
					<view class="list-block-title">
						门店属性
					</view>
					<view class="choice-list">
						<view class="choice" 
							:class="{active: item.id === attribute}" 
							v-for="item in attributeList" @tap="chooseAttribute(item.id)"
							:key="item.id">
								{{item.title}}
						</view>
					</view>
					<view class="list-block-title">
						门店服务认证
					</view>
					<view class="choice-list">
						<view class="choice" 
							:class="{active: item.id === shopClassifyId}" 
							v-for="item in classList" @tap="chooseClass(item.id)"
							:key="item.id">
								{{item.name}}
						</view>
					</view>
				</view>
				<view class="action">
					<view class="action-btn" @tap="queryReset()">重置</view>
					<view class="action-btn active" @tap="getShops()">确定</view>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="item" @tap="toShop(shop.id)" v-for="shop in shops" :key="shop.id">
				<view class="item-cover" :style="{'background-image': 'url(' + shop.cover + ')'}"></view>
				<view class="item-content">
					<view class="item-content-block title">{{shop.name}}</view>
					<view class="item-content-block first">
						<view class="block-item point">总评分: {{shop.star}}</view>
						<view class="block-item order">总订单 {{shop.orderNumber}}+</view>
						<view class="block-item shop">{{shop.shopClassifyName}}</view>
					</view>
					<view class="item-content-block second">
						<view class="block-item address">{{shop.address}}</view>
						<view class="block-item distance">{{shop.distance}}km</view>
					</view>
				</view>
			</view>
		</view>
		<uni-indexed-list v-if="cityShow" :options="cityList" :showSelect="cityShow" @click="cityClick"></uni-indexed-list>
	</view>
</template>

<script>
	import uniIndexedList from "@/components/uni-indexed-list/uni-indexed-list.vue"
	export default {
		components: {uniIndexedList},
		data() {
			return {
				title: 'Hello',
				currentSwiper: 0,
				cityShow: false,
				citys: [],
				cityList: [],
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
				latitude: '23.13559',
				longitude: '113.335367',
				serviceClassifyId: '',
				sortType: 1,
				sortName: '综合',
				shopClassifyId: '',
				qualification: '',
				attribute: '',
				currentPage: 1,
				banners: [],
				shops: [],
				areaListShow: false,
				serviceListShow: false,
				queryListShow: false,
				sortListShow: false,
				sortTypeList: [
					{name: '综合', sortType: 1, title: '综合排序'},
					{name: '评分', sortType: 2, title: '评分最高'},
					{name: '订单', sortType: 3, title: '累计订单'},
					{name: '附近', sortType: 4, title: '附近优先'},
				],
				serviceList: [],
				classList: [],
				qualificationList: [
					{id: 1, title: '一类'},
					{id: 2, title: '二类'},
					{id: 3, title: '三类'},
				],
				attributeList: [
					{id: 1, title: '独立自营'},
					{id: 2, title: '连锁直营'},
					{id: 3, title: '连锁加盟'},
				]
			}
		},
		onLoad() {
			const vm = this;
			vm.getAllCity();
			vm.getBanners();
			vm.getServiceList();
			vm.getClassList();
			vm.getPosition();
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			const vm = this;
			vm.currentPage = 1;
			vm.getPosition();
			uni.stopPullDownRefresh();
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom(){
			const vm = this;
			vm.currentPage += 1
			vm.getPosition();
		},
		methods: {
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
				vm.getAreas(vm.getShops);
				this.cityShow = false;
			},
			// 获取所有城市
			getAllCity() {
				const vm = this;
				const url = vm.apiBaseUrl + ':8012/api/app/shop/findAllCity';
				uni.request({
					method: 'GET',
					url: url,
					complete: (res) => {
						if (res.statusCode === 200 && res.data.status === 2000000) {
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
						} else if (res.statusCode === 200 && res.data.status !== 2000000) {
							uni.showModal({
								title: '获取城市列表',
								content: res.data.message,
							});
						} else {
							uni.showModal({
								title: '获取城市列表',
								content: '请求失败',
							});
						}
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
							vm.latitude = res.latitude;
							vm.longitude = res.longitude;
							vm.getCityId(vm.city, (res) => {
								if (res.statusCode === 200 && res.data.status === 2000000) {
									vm.cityId = res.data.data.id;
									vm.getAreas(vm.getShops);
								} else if (res.statusCode === 200 && res.data.status !== 2000000) {
									uni.showModal({
										title: '获取城市',
										content: res.data.message,
									});
									vm.getShops();
								} else {
									uni.showModal({
										title: '获取城市请求',
										content: '失败',
									});
									vm.getShops();
								}
							});
						} else {
							uni.showModal({
								title: '获取定位',
								content: '失败',
							});
							vm.getShops();
						}
					}
				})
			},
			//点击banner跳转处理
			chooseBanner(bannerId, bannerType) {
				uni.navigateTo({
					url: '../index/bannerDetail?bannerId=' + bannerId + '&bannerType=' + bannerType
				})
			},
			//点击重置
			queryReset() {
				const vm = this;
				vm.qualification = '';
				vm.attribute = '';
				vm.shopClassifyId = '';
				vm.currentPage = 1;
				vm.getPosition();
				vm.queryListShow = false;
			},
			//筛选条件显示
			queryChoose(queryName) {
				const vm = this;
				vm.areaListShow = queryName === 'areaListShow' ? !vm.areaListShow : false;
				vm.sortListShow = queryName === 'sortListShow' ? !vm.sortListShow : false;
				vm.serviceListShow = queryName === 'serviceListShow' ? !vm.serviceListShow : false;
				vm.queryListShow = queryName === 'queryListShow' ? !vm.queryListShow : false;
			},
			//点击选择资质
			chooseQualification(qualification) {
				const vm = this;
				vm.qualification = qualification;
			},
			//点击选择认证类型
			chooseClass(shopClassifyId) {
				const vm = this;
				vm.shopClassifyId = shopClassifyId;
			},
			//点击选择门店属性
			chooseAttribute(attr) {
				const vm = this;
				vm.attribute = attr;
			},
			//点击选择门店服务
			chooseService(serviceId) {
				const vm = this;
				vm.serviceClassifyId = serviceId;
				vm.currentPage = 1;
				vm.getPosition();
				vm.serviceListShow = false;
			},
			//选择城区
			chooseArea(areaId, areaName) {
				const vm = this;
				vm.areaId = areaId;
				vm.area = areaName;
				vm.currentPage = 1;
				vm.getPosition();
				vm.areaListShow = false;
			},
			//选择排序
			chooseSortType(sortTypeId, sortTypeName) {
				const vm = this;
				vm.sortType = sortTypeId;
				vm.sortName = sortTypeName;
				vm.currentPage = 1;
				vm.getPosition();
				vm.sortListShow = false;
			},
			//获取服务分类列表
			getServiceList() {
				const vm = this;
				const url = vm.apiBaseUrl + ':8012/api/app/shop/returnServiceClassify';
				uni.request({
					method: 'GET',
					url: url,
					complete: (res) => {
						if (res.statusCode === 200 && res.data.status === 2000000) {
							res.data.data.push({
								id: '',
								name: '全部'
							});
							vm.serviceList = res.data.data;
						} else if (res.statusCode === 200 && res.data.status !== 2000000) {
							uni.showModal({
								title: '获取服务分类',
								content: res.data.message,
							});
						} else {
							uni.showModal({
								title: '获取服务分类',
								content: '请求失败',
							});
						}
					}
				});
			},
			//获取服务认证列表
			getClassList() {
				const vm = this;
				const url = vm.apiBaseUrl + ':8012/api/app/shop/returnShopClassify';
				uni.request({
					method: 'GET',
					url: url,
					complete: (res) => {
						if (res.statusCode === 200 && res.data.status === 2000000) {
							vm.classList = res.data.data;
						} else if (res.statusCode === 200 && res.data.status !== 2000000) {
							uni.showModal({
								title: '获取服务认证',
								content: res.data.message,
							});
						} else {
							uni.showModal({
								title: '获取服务认证',
								content: '请求失败',
							});
						}
					}
				});
			},
			//获取banners
			getBanners() {
				const vm = this;
				const url = vm.apiBaseUrl + ':7011/api/app/advertisement/findAdvertisement?pageNumber=1&pageSize=999';
				uni.request({
					method: 'GET',
					url: url,
					complete: (res) => {
						if (res.statusCode === 200 && res.data.status === 2000000) {
							vm.banners = res.data.data;
						} else if (res.statusCode === 200 && res.data.status !== 2000000) {
							uni.showModal({
								title: '获取广告',
								content: res.data.message,
							});
						} else {
							uni.showModal({
								title: '获取广告',
								content: '请求失败',
							});
						}
					}
				});
			},
			//根据城市名获取城市id
			getCityId(cityName, callback = () => {}) {
				const vm = this;
				const url = vm.apiBaseUrl + ':8012/api/app/shop/findCityByName?name=' + cityName;
				uni.request({
					url: url,
					complete: (res) => {
						callback(res);
					}
				})
			},
			//获取城市下城区列表
			getAreas(callBack = () => {}) {
				const vm = this;
				const url = vm.apiBaseUrl + ':8012/api/app/shop/findAllCityDetail?parentId=' + vm.cityId;
				uni.request({
					url: url,
					complete: (res) => {
						if (res.statusCode === 200 && res.data.status === 2000000) {
							vm.areas = res.data.data;
							vm.area = vm.areas[0].name
							vm.areaId = vm.areas[0].id
							callBack();
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
			//根据获取门店列表
			getShops() {
				const vm = this;
				const url = vm.apiBaseUrl + ':8012/api/app/shop/findShopByParam';
				const data = {
					lon: vm.longitude,
					lat: vm.latitude,
					addressId: vm.areaId,
					pageNumber: vm.currentPage
				}
				if (vm.serviceClassifyId) {
					data.serviceClassifyId = vm.serviceClassifyId;
				}
				if (vm.sortType) {
					data.sortType = vm.sortType;
				}
				if (vm.shopClassifyId) {
					data.shopClassifyId = vm.shopClassifyId;
				}
				if (vm.qualification) {
					data.qualification = vm.qualification;
				}
				if (vm.attribute) {
					data.attribute = vm.attribute;
				}
				if (vm.queryListShow) {
					vm.queryListShow = false;
				}
				uni.request({
					method: 'GET',
					url: url,
					data: data,
					complete: (res) => {
						if (res.statusCode === 200 && res.data.status === 2000000) {
							const list = res.data.data;
							for (let i = 0; i < list.length; i += 1) {
								const imgs = list[i].shopImage.split(',');
								list[i].cover = imgs[0];
							}
							if (vm.currentPage === 1) {
								vm.shops = list;
							} else {
								if (list.length) {
									// const oldList = JSON.parse(JSON.stringify(vm.shops));
									// const newList = oldList.concat(list);
									// vm.shops = newList;
									for (let i = 0; i < list.length; i += 1) {
										vm.shops.push(list[i]);
									}
									// vm.shops = vm.shops.contact(list);
								} else {
									uni.showToast({title: '到底了'});
								}
							}
						} else if (res.statusCode === 200 && res.data.status !== 2000000) {
							uni.showModal({
								title: '获取门店',
								content: res.data.message,
							});
						} else {
							uni.showModal({
								title: '获取门店',
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
			toShop(shopId) {
				uni.navigateTo({
					url: '../index/shop?shopId=' + shopId
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.uni-indexed {
		position: fixed; top: 0; bottom: 0; left: 0; right: 0; overflow: scroll; background: white;
	}
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
					box-shadow: 0 0 2px rgba(0,0,0,0.2);
					&.on {
						background: white;
					}
				}
			}
		}
	}
	.query-options {
		display: flex; height: 98upx; align-items: center; justify-content: center; position: relative;
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
		.area-list {
			position: absolute; top: 99upx; background: white; z-index: 99; left: 0; right: 0;
			height: 500upx; overflow-y: scroll; box-shadow: 0 1px 1px rgba(0,0,0,0.5);
			&.active {
				height: 400upx;
			}
			.area-item {
				display: flex; justify-content: space-between; height: 100upx; align-items: center;
				padding: 0 30upx;
				image {
					width: 40upx; height: 40upx;
				}
			}
			.list-block {
				height: 400upx; overflow-y: scroll;
				.list-block-title {
					padding: 0 30upx; height: 60upx; line-height: 60upx;
					font-size: 30upx; font-weight: bold; color:rgba(51,51,51,1);
				}
				.choice-list {
					display: flex; padding: 30upx; flex-wrap: wrap;
					.choice {
						font-size: 28upx; margin-right: 20upx;
						width: 184upx; height: 64upx; text-align: center; line-height: 64upx;
						&.active {
							background: #1B82D2; color: white;
						}
					}
				}
			}
			.action {
				height: 100upx; width: 100%;
				.action-btn {
					line-height: 100upx; text-align: center; background: #EDEDED;
					font-size: 34upx; color: rgba(51,51,51,1); width: 50%; display: inline-block;
					&.active {
						color: white; background: #1B82D2;
					}
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
