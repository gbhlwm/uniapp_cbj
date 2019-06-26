<template>
	<view>
		<view class="block-swiper">
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
			<view class="back-navigate" @tap="toBack()"> < </view>
		</view>
		<view class="block-info">
			<view class="price">$199.00-555.00</view>
			<view class="name">服务名称</view>
			<view class="desc">服务简介</view>
			<view class="sell-num">已售：1700件</view>
		</view>
		<view class="block-option">
			选择
			<view class="case">服务套餐</view>
			<image src="../../static/common_nav_ic_more.png"></image>
		</view>
		<view class="block-shop">
			<view class="shop-name">门店名称</view>
			<view class="shop-address">广州市天河区棠安路口188号</view>
			<view class="distance">
				1.3km
				<image src="../../static/common_nav_ic_send.png"></image>
			</view>
		</view>
		<view class="block-detail">
			<view class="title">商品详情</view>
			<rich-text class="content" nodes=""></rich-text>
		</view>
		<view class="service-eval">
			<view class="point">
				<view>评分</view>
				<view class="stars">
					<image v-for="i in 3" v-bind:key="i" src="../../static/c1_icon_star_s.png"></image>
					<image v-for="i in 2" v-bind:key="i" src="../../static/c1_icon_star_n.png"></image>
				</view>
				<view>3.0</view>
			</view>
			<view class="more" @tap="toAll(1)">999条评价    ></view>
		</view>
		<view class="commands">
			<view class="command">
				<view class="command-info">
					<view class="head"></view>
					<view class="name">用户名</view>
					<view class="time">2019-06-28</view>
					<view class="point">
						3.0
						<image v-for="i in 3" v-bind:key="i" src="../../static/c1_icon_star_s.png"></image>
						<image v-for="i in 2" v-bind:key="i" src="../../static/c1_icon_star_n.png"></image>
					</view>
				</view>
				<view class="command-content">
					不得不说这是很棒的键盘，指尖挨到键帽的时候，有很强的贴合感，案件压力合适，红轴写代码感觉案件压力合适，红轴...
				</view>
				<view class="command-images">
					<view class="item"></view>
					<view class="item"></view>
					<view class="item"></view>
				</view>
				<view class="service-choose">
					选购：套餐A
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="contact">
				<image src="../../static/ic_phone.png"></image>
				联系门店
			</view>
			<view class="action" @tap="toOrder()">立即购买</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentSwiper: 0
			}
		},
		methods: {
			//轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
			},
			//返回上一页
			toBack() {
				uni.navigateBack();
			},
			//跳转全部评价页面
			toAll(serviceId) {
				uni.navigateTo({
					url: '../index/commands?serviceId=' + serviceId
				});
			},
			//跳转结算页面
			toOrder() {
				uni.navigateTo({
					url: '../index/orderSubmit'
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
		padding: 30upx;
		.price {
			font-size: 40upx; font-weight: bold; color: rgba(230,54,31,1); line-height: 35upx;
		}
		.name {
			margin-top: 40upx;
			font-size: 40upx; font-weight: 500; color: rgba(51,51,51,1); line-height: 35upx;
		}
		.desc {
			margin-top: 20upx;
			overflow: hidden; text-overflow: ellipsis; display:-webkit-box;
			-webkit-box-orient:vertical; -webkit-line-clamp:2;
			height: 88upx; font-size: 32upx; font-weight: 500; color: rgba(66,66,66,1); line-height: 44upx;
		}
		.sell-num {
			margin-top: 20upx; text-align: right;
			font-size: 28upx; font-weight: 500; color: rgba(66,66,66,1); line-height: 42upx;
		}
	}
	.block-option {
		height: 100upx; line-height: 100upx;
		font-size: 30upx; color: rgba(153,153,153,1); padding: 0 30upx;
		.case {
			display: inline-block; color: rgba(51,51,51,1); margin-left: 20upx;
		}
		image {
			float: right; width: 13upx; height: 22upx; margin: 39upx 0;
		}
	}
	.block-shop {
		height: 150upx; padding: 0 30upx;
		.shop-name {
			display: inline-block;
			font-size: 30upx; font-weight: 500; color: rgba(51,51,51,1);
			line-height: 39upx; width: 400upx;
		}
		.shop-address {
			white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
			margin-top: 30upx; display: inline-block;
			font-size: 30upx; font-weight: 500; color: rgba(153,153,153,1);
			line-height: 39upx; width: 400upx;
		}
		.distance {
			float: right; height: 48upx; line-height: 48upx;
			image {
				width: 50upx; height: 48upx; float: right; margin-left: 20upx;
			}
		}
	}
	.block-detail {
		margin-top: 50upx;
		.title {
			text-align: center;
			font-size: 32upx; font-weight: 400; color: rgba(66,66,66,1); line-height: 39upx;
		}
		.content {
			margin-top: 30upx; padding: 0 30upx;
			img {
				width: 100%; height: auto;
			}
		}
	}
	.service-eval {
		margin-top: 50upx; height: 90upx; display: flex; padding: 0 30upx;
		font-size: 30upx; color: rgba(51,51,51,1); align-items: center;
		justify-content: space-between;
		.point {
			width: 350upx;
			display: flex; align-items: center; justify-content: space-between;
			.stars {
				display: flex; align-items: center; justify-content: space-between;
				width: 180upx;
				image {
					width: 33upx; height: 31upx;
				}
			}
		}
		.more {
			
		}
	}
	.commands {
		padding-bottom: 120upx;
		.command {
			padding: 30upx; margin-bottom: 20upx;
			.command-info {
				padding-left: 90upx; position: relative;
				.head {
					width: 70upx; height: 70upx; position: absolute; top: 0;
					bottom: 0; margin: auto; left: 0; background: 50% 50% #1B82D2 no-repeat;
					background-size: cover;
				}
				.name {
					font-size: 28upx; font-weight: 500; color: rgba(66,66,66,1); line-height: 39upx;
				}
				.time {
					font-size: 26upx; font-weight: 500; color: rgba(153,153,153,1); line-height: 39upx;
				}
				.point {
					position: absolute; top: 0; right: 0; display: flex; align-items: center;
					font-size: 30upx; font-weight: 500; color: rgba(51,51,51,1); line-height: 39upx;
					image {
						width: 33upx; height: 31upx; margin: 0 5upx;
					}
				}
			}
			.command-content {
				margin-top: 20upx;
				font-size: 30upx; font-weight: 500; color: rgba(66,66,66,1); line-height: 40upx;
			}
			.command-images {
				margin-top: 20upx;
				.item {
					width: 130upx; height: 130upx; margin-right: 20upx;
					display: inline-block; background: 50% 50% #1B82D2 no-repeat;
					background-size: cover;
				}
			}
			.service-choose {
				font-size: 26upx; font-weight: 500; color: rgba(66,66,66,1); line-height: 40upx; margin-top: 30upx;
			}
		}
	}
	.footer {
		display: flex; height: 120upx; position: fixed; justify-content: space-around;
		bottom: 0; left: 0; right: 0; background: white; align-items: center;
		.contact {
			width: 310upx; font-size: 22upx; text-align: center;
			image {
				display: block; width: 40upx; height: 40upx; margin: 10upx auto;
			}
		}
		.action {
			line-height: 86upx; color: white; font-size: 30upx; text-align: center;
			width: 310upx; height: 86upx; background: rgba(27,130,210,1); border-radius: 43upx;
		}
	}
</style>
