<template>
	<view>
		<view class="status" v-if="from === 'scan'">待使用</view>
		<view class="status" v-if="from !== 'scan'">待核销</view>
		<view class="status" v-if="from !== 'scan'">已核销</view>
		<view class="status" v-if="from !== 'scan'">已取消</view>
		<view class="block-info">
			<view class="info-shop">
				<image src="../../static/ic_store.png"></image>
				车便捷旗舰店
			</view>
			<view class="info-content">
				<view class="service-cover"></view>
				<view class="service-detail">
					<view class="title">车便捷旗舰店 广州中山路201号旗舰店10元起洗车保养服务...</view>
					<view class="service-label">标准养护</view>
					<view class="eval">
						<view class="price">$88</view>
						<view class="number">x1</view>
					</view>
				</view>
			</view>
		</view>
		<view class="block-eval">
			<view class="item">
				<view class="title">商品总价</view>
				<view class="price">$88</view>
			</view>
			<!-- <view class="item">
				<view class="title">优惠金额</view>
				<view class="price">-$10</view>
			</view> -->
			<view class="item">
				<view class="title">总计</view>
				<view class="price active">$88</view>
			</view>
		</view>
		<view class="block-order">
			<view class="title">
				<view class="title-label"></view>
				订单信息
			</view>
			<view class="item">
				<view class="item-title">用户昵称：</view>
				<view class="item-value">用户昵称</view>
				<view class="item-action">
					<!-- <view class="btn-copy">复制</view> -->
				</view>
			</view>
			<view class="item">
				<view class="item-title">用户手机号：</view>
				<view class="item-value">1502444456</view>
				<view class="item-action">
					<!-- <view class="btn-copy">复制</view> -->
				</view>
			</view>
			<view class="item">
				<view class="item-title">订单号：</view>
				<view class="item-value">21561512545121</view>
				<view class="item-action">
					<view class="btn-copy">复制</view>
				</view>
			</view>
			<view class="item">
				<view class="item-title">创建时间：</view>
				<view class="item-value">2020-12-31 23:23:59</view>
				<view class="item-action">
					<!-- <view class="btn-copy">复制</view> -->
				</view>
			</view>
			<view class="item">
				<view class="item-title">付款时间：</view>
				<view class="item-value">2020-12-31 23:23:59</view>
				<view class="item-action">
					<!-- <view class="btn-copy">复制</view> -->
				</view>
			</view>
		</view>
		<view class="btn-confirm">核销</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(e) {
			const vm = this;
			vm.from = e.from;
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	.status {
		height: 100upx; line-height: 100upx; padding: 0 30upx;
		color: #1B82D2; font-size: 30upx;
	}
	.block-info {
		padding: 0 30upx; margin-top: 30upx;
		.info-shop {
			height: 100upx; line-height: 100upx; font-size: 28upx;
			display: flex; align-items: center;
			border-bottom: 1px solid #EDEDED;
			image {
				width: 41upx; height: 39upx; margin-right: 20upx;
			}
		}
		.info-content {
			display: flex; justify-content: space-between; margin-top: 20upx;
			.service-cover {
				width: 200upx; height: 200upx;
				background: #1B82D2 50% 50% no-repeat; background-size: cover;
			}
			.service-detail {
				width: 450upx;
				.title {
					height: 100upx; line-height: 50upx; font-size: 30upx;
					overflow: hidden; text-overflow: ellipsis;
					display:-webkit-box; -webkit-box-orient:vertical;
					-webkit-line-clamp:2;
				}
				.service-label {
					margin-top: 20upx; font-size: 26upx; color: #999999;
				}
				.eval {
					display: flex; justify-content: space-between; align-self: flex-end;
					.price {
						font-size: 34upx; color: #FF183F;
					}
					.number {
						font-size: 30upx; color: #999999;
					}
				}
			}
		}
	}
	.block-eval {
		margin-top: 40upx;
		.item {
			padding: 0 30upx; height: 66upx; display: flex;
			justify-content: space-between; color: #333333;
			.title {
				font-size: 30upx;
			}
			.price {
				font-size: 28upx;
				&.active {
					color: #FF4354;
				}
			}
		}
	}
	.block-order {
		padding: 0 30upx;
		.title {
			height: 100upx; line-height: 100upx; display: flex;
			font-size: 30upx; color: #333333;
			align-items: center;
			.title-label {
				width: 6upx; height: 26upx; background: #1B82D2;
				border-radius: 3upx; margin-right: 10upx;
			}
		}
		.item {
			height: 50upx; display: flex; justify-content: space-between;
			align-items: center; font-size: 26upx; color: #333333;
			.item-title {
				width: 160upx;
			}
			.item-value {
				flex-grow: 6;
			}
			.item-action {
				flex-grow: 2; width: 100upx; display: flex; align-items: center;
				.btn-copy {
					text-align: center;
					width: 122upx; height: 48upx; line-height: 48upx;
					border: 1px solid rgba(51,51,51,1); border-radius: 24upx;
				}
			}
		}
	}
	.btn-confirm {
		background: #1B82D2; width: 690upx; margin: 80upx auto 30upx auto;
		color: white; height: 100upx; line-height: 100upx; border-radius: 10upx;
		font-size: color; font-size: 36upx; text-align: center;
	}
</style>
