<template>
	<view>
		<view class="block">
			<view class="shop-title">
				<image class="shop-img" src="../../static/common_tab_ic_shop_s.png"></image>
				<view>{{orderData.shopName}}</view>
			</view>
		</view>
		<view class="info">
			<view class="cover" :style="{'background-image': 'url(' + orderData.image + ')'}"></view>
			<view class="name">{{orderData.serviceName}}</view>
			<view class="label">{{orderData.mealName}}</view>
			<view class="price">
				<view class="value">￥{{orderData.price}}</view>
				<view class="num">x{{orderData.number}}</view>
			</view>
		</view>
		<!-- <view class="block">
			<view>优惠券</view>
			<view class="cupon">
				<view>优惠券</view>
				<image src="../../static/common_nav_ic_more.png"></image>
			</view>
		</view> -->
		<view class="block">
			<view class="input-action">
				<view>订单备注： </view>
				<input type="text" v-model="remark" value="" placeholder="请输入"/>
			</view>
		</view>
		<view class="s-block">
			<view>商品总价</view>
			<view>￥{{orderData.total}}</view>
		</view>
		<!-- <view class="s-block">
			<view>优惠金额</view>
			<view>￥18400.00</view>
		</view> -->
		<view class="s-block">
			<view>总计</view>
			<view>￥{{orderData.total}}</view>
		</view>
		<view class="footer">
			<view class="price">
				合计：<view class="value">￥{{orderData.total}}</view>
			</view>
			<view class="action-btn" @tap="toPay()">
				提交订单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mealId: '',
				number: '',
				orderData: {},
				remark: ''
			}
		},
		onLoad(e) {
			const vm = this;
			vm.mealId = e.mealId;
			vm.number = e.number;
			vm.getOrderSubmitData();
		},
		methods: {
			// 获取订单结算数据
			getOrderSubmitData() {
				const vm = this;
				const url = vm.apiBaseUrl + '/api-order/api/app/order/countOrder';
				uni.request({
					method: 'GET',
					url: url,
					data: {
						mealId: vm.mealId,
						number: vm.number
					},
					complete: (res) => {
						if (res.statusCode === 200 && res.data.status === 2000000) {
							vm.orderData = res.data.data;
						} else if (res.statusCode === 200 && res.data.status !== 2000000) {
							uni.showModal({
								title: '获取订单数据',
								content: res.data.message,
							});
						} else {
							uni.showModal({
								title: '获取订单数据',
								content: '请求失败',
							});
						}
					}
				});
			},
			//跳转支付页面
			toPay() {
				const vm = this;
				const url = vm.apiBaseUrl + '/api-order/api/app/order/setOrder';
				vm.getToken(() => {
					uni.request({
						method: 'POST',
						url: url,
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						data: {
							userId: vm.userId,
							nickName: vm.userNickName,
							userPhone : vm.account,
							mealId: vm.mealId,
							number: vm.number,
							userRemark: vm.remark
						},
						complete: (res) => {
							if (res.statusCode === 200 && res.data.status === 2000000) {
								uni.showModal({
									content: '下单成功',
									complete() {
										uni.navigateTo({
											url: '../index/orderPay?orderId=' + res.data.data.id + '&orderPrice=' + res.data.data.totalFee
										});
									}
								});
							} else if (res.statusCode === 200 && res.data.status !== 2000000) {
								uni.showModal({
									title: '获取订单数据',
									content: res.data.message,
								});
							} else {
								uni.showModal({
									title: '获取订单数据',
									content: '请求失败',
								});
							}
						}
					});
				});
			}
		}
	}
</script>

<style lang="less">
	.block {
		padding: 0 30upx; font-size: 28upx;
		height: 90upx; display: flex; align-items: center; justify-content: space-between;
		.shop-title {
			display: flex; align-items: center;
		}
		.shop-img {
			width: 41upx; height: 39upx; margin-right: 10upx;
		}
		.cupon {
			display: flex; align-items: center;
			image {
				width: 17upx; height: 28upx; margin-left: 10upx;
			}
		}
		.input-action {
			display: flex; align-items: center;
			
		}
	}
	.info {
		padding: 0 30upx 0 250upx; position: relative; height: 201upx;
		.cover {
			background: 50% 50% #1B82D2 no-repeat;
			background-size: cover; width: 201upx; height: 201upx;
			position: absolute; top: 0; bottom: 0; left: 30upx;
			margin: auto;
		}
		.name {
			width: 300upx; height: 84upx; font-size: 30upx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
		.label {
			color: rgba(153,153,153,1); font-size: 26upx; margin-top: 20upx;
		}
		.price {
			position: absolute; top: 0; right: 30upx;
			.value {
				font-size: 34upx; color: rgba(255,24,63,1);
			}
			.num {
				text-align: right; font-size: 30upx; color: rgba(153,153,153,1);
			}
		}
	}
	.s-block {
		padding: 0 30upx; font-size: 30upx;
		height: 66upx; display: flex; align-items: center; justify-content: space-between;
	}
	.footer {
		position: absolute; height: 100upx; bottom: 0;
		left: 0; right: 0; border-top: 1px solid #E8EAED;
		display: flex; justify-content: space-between; align-items: center;
		.price {
			display: flex; font-size: 34upx; padding-left: 30upx;
			.value {
				color: #FF183F;
			}
		}
		.action-btn {
			height: 100upx; background: #1B82D2; width: 240upx;
			text-align: center; color: white; font-size: 32upx;
			line-height: 100upx;
		}
	}
</style>
