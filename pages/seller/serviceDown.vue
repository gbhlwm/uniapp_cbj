<template>
	<view class="page-service-on">
		<view class="block-search">
			<view class="type">
				<picker @change="bindPickerChange" :value="classifyIndex" :range="array" range-key="name">
					<view class="uni-input">
						<view class="select-value">{{array[classifyIndex].name}}</view>
						<image src="../../static/ic_down_n _white.png" mode=""></image>
					</view>
				</picker>
			</view>
			<mSearch class="search-action" :mode="2" button="inside" :show="false" @search="toSearch($event)"></mSearch>
		</view>
		<uni-swipe-action :options="options" v-for="item in services" :key="item.id" @click="toSwiperAction($event, item.id)">
			<view class='item'>
				<view class="item-cover" :style="{'background-image': 'url(' + item.image + ')'}"></view>
				<view class="item-body">
					<view class="shop-title">{{item.name}}</view>
					<view class="shop-label">{{item.classifyName}}</view>
				</view>
				<view class="item-price">
					<view class="total">￥{{item.price}}</view>
					<view class="market">￥{{item.marketPrice}}</view>
				</view>
			</view>
		</uni-swipe-action>
		<!-- <view class="action">
			<view class="btn-add" @tap="toAdd(false)">
				新增
			</view>
		</view> -->
	</view>
</template>

<script>
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue"
	export default {
		components: {uniSwipeAction, mSearch},
		data() {
			return {
				shopId: '',
				userId: '',
				searchKey: '',
				currentPage: 1,
				classifyId: '',
				classifyIndex: 0,
				array: [{name: ''}],
				services: [],
				options: [{
					text: '编辑',
					style: {
						backgroundColor: '#999999'
					}
				}, {
					text: '上架',
					style: {
						backgroundColor: '#1B82D2'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#FF183F'
					}
				}]
			}
		},
		onLoad() {
			const vm = this;
			uni.getStorage({
				key: 'shopId',
				complete(res) {
					vm.shopId = res.data;
					uni.getStorage({
						key: 'userId',
						complete(res) {
							vm.userId = res.data;
							uni.request({
								url: vm.apiBaseUrl + '/api-good/api/app/shop/returnServiceClassify',
								method: 'GET',
								complete(res) {
									if (res.statusCode === 200 && res.data.status === 2000000) {
										let arr = [{name: '全部', id: ''}];
										arr = arr.concat(res.data.data);
										vm.array = arr;
									} else if (res.statusCode === 200 && res.data.status !== 2000000) {
										uni.showModal({
											title: '获取门店服务类型',
											content: res.data.message,
										});
									} else {
										uni.showModal({
											title: '获取门店服务类型',
											content: '请求失败',
										});
									}
								}
							});
							vm.getServices();
						}
					})
				}
			});
		},
		onReachBottom() {
			const vm = this;
			vm.currentPage += 1;
			vm.getServices();
		},
		onPullDownRefresh() {
			const vm = this;
			vm.currentPage = 1;
			vm.getServices();
		},
		methods: {
			bindPickerChange: function(e) {
				const vm = this;
				vm.classifyIndex = e.target.value;
				vm.classifyId = vm.array[e.target.value].id;
				vm.currentPage = 1;
				vm.getServices();
			},
			//点击搜索
			toSearch(e) {
				const vm = this;
				console.log(e);
				vm.searchKey = e;
				vm.currentPage = 1;
				vm.getServices();
			},
			//获取在架服务列表
			getServices() {
				const vm = this;
				const url = vm.apiBaseUrl + '/api-good/api/app/services/findUserServiceList';
				const data = {
					pageNumber: vm.currentPage,
					id: vm.shopId,
					status: 2
				}
				if (vm.classifyId) {
					data.classifyId = vm.classifyId;
				}
				if (vm.searchKey) {
					data.name = vm.searchKey;
				}
				uni.request({
					url: url,
					method: 'GET',
					data: data,
					complete(res) {
						if (res.statusCode === 200 && res.data.status === 2000000) {
							const data = res.data.data[1];
							if (vm.currentPage === 1) {
								vm.services = data;
							} else {
								if (data.length) {
									for (let i = 0; i < data.length; i += 1) {
										vm.services.push(data[i]);
									}
								} else {
									uni.showToast({title: '到底了'});
								}
							}
						} else if (res.statusCode === 200 && res.data.status !== 2000000) {
							uni.showModal({
								title: '获取在架服务',
								content: res.data.message,
							});
						} else {
							uni.showModal({
								title: '获取在架服务',
								content: '请求失败',
							});
						}
					}
				})
			},
			//新增按钮
			toAdd(serviceId) {
				const vm = this;
				const url = serviceId ? '../seller/serviceOnEdit?serviceId=' + serviceId : '../seller/serviceOnEdit';
				uni.navigateTo({
					url: url
				});
			},
			//滑动选项点击事件
			toSwiperAction(e, serviceId) {
				const vm = this;
				console.log(e);
				console.log(serviceId);
				if (e.index === 1) {
					//点击上架
					uni.request({
						url: vm.apiBaseUrl + '/api-good/api/app/services/uplowerService?id=' + serviceId + '&status=1',
						method: 'PUT',
						complete(res) {
							if (res.statusCode === 200 && res.data.status === 2000000) {
								uni.showToast({title: '上架成功'});
								vm.currentPage = 1;
								vm.getServices();
							} else if (res.statusCode === 200 && res.data.status !== 2000000) {
								uni.showModal({
									title: '下架服务',
									content: res.data.message,
								});
							} else {
								uni.showModal({
									title: '下架服务',
									content: '请求失败',
								});
							}
						}
					})
				} else if (e.index === 0) {
					//点击编辑
					uni.navigateTo({
						url: '../seller/serviceOnEdit?serviceId=' + serviceId
					});
				} else {
					//删除服务
					uni.request({
						url: vm.apiBaseUrl + '/api-good/api/app/services/deleteService?id=' + serviceId,
						method: 'DELETE',
						complete(res) {
							if (res.statusCode === 200 && res.data.status === 2000000) {
								uni.showToast({title: '删除成功'});
								vm.currentPage = 1;
								vm.getServices();
							} else if (res.statusCode === 200 && res.data.status !== 2000000) {
								uni.showModal({
									title: '删除服务',
									content: res.data.message,
								});
							} else {
								uni.showModal({
									title: '删除服务',
									content: '请求失败',
								});
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.page-service-on {
		padding-bottom: 150upx;
	}
	.block-search {
		display: flex;
		.type {
			flex-grow: 3; display: flex; align-items: center; justify-content: center;
			.uni-input {
				display: flex; align-items: center; background: #1B82D2; height: 58upx; padding: 0 10upx;
				font-size: 28upx; color: white;
				image {
					width: 21upx; height: 13upx; margin-left: 5upx;
				}
			}
		}
		.search-action {
			flex-grow: 4; width: 400upx;
		}
	}
	.item {
		height: 164upx; padding: 30upx; display: flex; justify-content: space-between;
		.item-cover {
			width: 164upx; height: 164upx; background: 50% 50% #1B82D2 no-repeat; background-size: cover;
		}
		.item-body {
			flex-grow: 1; margin-left: 10upx;
			.shop-title { font-size: 36upx; color: #1B82D2; }
			.shop-label {
				margin-top: 50upx;
				font-size: 28upx; color: #666666; padding: 0 20upx; height: 58upx; background: #ededed;
				border-radius: 29upx; display: inline-block; line-height: 58upx;
			}
		}
		.item-price {
			.total { font-size: 36upx; color: #fa2b2b; }
			.market { font-size: 22upx; text-decoration: line-through; color: #999999; }
		}
	}
	.action {
		position: fixed; bottom: 0; left: 0; right: 0; height: 120upx;
		background: white;
		display: flex; justify-content: center; align-items: center;
	}
	.btn-add {
		width: 680upx; height: 98upx;
		line-height: 98upx; text-align: center; color: white;
		font-size: 38upx; background: #1B82D2; border-radius: 8upx;
	}
</style>
