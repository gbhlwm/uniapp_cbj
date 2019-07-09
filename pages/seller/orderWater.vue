<template>
	<view>
		<view class="navis">
			<view class="item" :class="{active: naviType === item.type}" @tap="orderSelectType(item.type)"
				v-for="item in navis" :key="item.type">
				{{item.name}}
			</view>
		</view>
		<view class="water-item" v-for="item in orders" :key="item.id">
			<view class="item-head">
				<view class="number">
					订单编号：{{item.paySn}}
				</view>
				<view class="status" v-if="naviType === 1">收入</view>
				<view class="status" v-if="naviType === 2">支出</view>
			</view>
			<view class="item-body">
				<view class="item" v-if="naviType === 1">类型：订单收入</view>
				<view class="item" v-if="naviType === 2">类型：订单支出</view>
				<view class="item">时间：{{item.createTime}}</view>
				<view class="item">金额：￥{{item.price}}</view>
			</view>
		</view>
		<w-picker mode="yearMonth" startYear="2000" endYear="9999" step="1" :current="true" @confirm="onConfirm" ref="picker" themeColor="#f00"></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components:{
		    wPicker
		},
		data() {
			return {
				navis: [
					{name: '收入', type: 1},
					{name: '支出', type: 2}
				],
				naviType: 1,
				currentPage: 1,
				orders: [],
				startTime: false,
				endTime: false,
				shopId: ''
			}
		},
		onNavigationBarButtonTap() {
			const vm = this;
			vm.$refs.picker.show();
		},
		onReachBottom() {
			const vm = this;
			vm.currentPage += 1;
			vm.getWaters();
		},
		onPullDownRefresh() {
			const vm = this;
			vm.currentPage = 1;
			vm.getWaters();
		},
		onLoad() {
			const vm = this;
			uni.getStorage({
				key: 'shopId',
				complete(res) {
					if (res.data) {
						vm.shopId = res.data;
						vm.getWaters();
					}
				}
			})
		},
		methods: {
			//收入类型选择
			orderSelectType(type) {
				const vm = this;
				vm.naviType = type;
				vm.currentPage = 1;
				vm.getWaters();
			},
			//年月选择
			onConfirm(e) {
				const vm = this;
				console.log(e);
				const year = e.result.substr(0,4); //年份字符串
				const month = e.result.substr(5,2); //月份字符串，包含0
				vm.startTime = year + month + '01';
				const lastDay = vm.getLastDay(parseInt(year), parseInt(month))
				vm.endTime = year + month + String(lastDay);
				vm.currentPage = 1;
				vm.getWaters();
			},
			//获取指定月份最后一天
			getLastDay(year, month) {
				const new_year = year;     //取当前的年份          
				const new_month = month++; //取下一个月的第一天，方便计算（最后一天不固定）          
				if (month > 12) {         
					new_month -= 12;        //月份减          
					new_year++;            //年份增          
				}         
				const new_date = new Date(new_year, new_month, 1);                //取当年当月中的第一天 
				return (new Date(new_date.getTime() - 1000*60*60*24)).getDate();//获取当月最后一天日期
			},
			//获取订单流水
			getWaters() {
				const vm = this;
				const url = vm.apiBaseUrl + '/api-order/api/app/order/findFinance';
				const data = {
					pageNumber: vm.currentPage,
					type: vm.naviType,
					shopId: vm.shopId
				};
				if (vm.startTime) {
					data.startTime = vm.startTime;
					data.endTime = vm.endTime;
				}
				uni.request({
					url: url,
					method: 'GET',
					data: data,
					complete(res) {
						if (res.statusCode === 200 && res.data.status === 2000000) {
							const data = res.data.data;
							if (vm.currentPage === 1) {
								vm.orders = data;
							} else {
								if (data.length) {
									for (let i = 0; i < data.length; i += 1) {
										vm.orders.push(data[i]);
									}
								} else {
									uni.showToast({title: '到底了'});
								}
							}
						} else if (res.statusCode === 200 && res.data.status !== 2000000) {
							uni.showModal({
								title: '获取订单流水',
								content: res.data.message,
							});
						} else {
							uni.showModal({
								title: '获取订单流水',
								content: '请求失败',
							});
						}
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.navis {
		display: flex; border-top: 1px solid #999999; border-bottom: 1px solid #999999;
		.item {
			width: 50%; height: 100upx; line-height: 100upx; text-align: center;
			color: #333333; background: white; font-size: 30upx;
			&.active {
				color: white; background: #1B82D2;
			}
		}
	}
	.water-item {
		.item-head {
			height: 100upx; padding: 0 30upx; display: flex;
			justify-content: space-between; align-items: center;
			border-bottom: 1px solid #EDEDED; font-size: 26upx;
			.number { color: #333333; }
			.status { color: #FF183F; }
		}
		.item-body {
			border-bottom: 1px solid #ededed;
			.item {
				height: 60upx; line-height: 60upx; padding: 0 30upx;
				font-size: 26upx; color: #333333;
			}
		}
	}
</style>
