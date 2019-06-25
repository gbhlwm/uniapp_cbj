<template>
	<view>
		<view class="head">
			<view class="area">
				<view class="city">广州市</view>
				<image class="city-img" src="../../static/ic_down_s.png"></image>
			</view>
			<view class="search">
				<image class="search-img" src="../../static/nav_btn_search.png"></image>
				<view class="search-title">请搜索</view>
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
			<view class="item">
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
				<view class="services">
					<view class="services-item">
						<view class="item-name">汽车保养</view>
						<view class="item-price">￥999.00    > </view>
					</view>
					<view class="services-item">
						<view class="item-name">汽车保养</view>
						<view class="item-price">￥999.00    > </view>
					</view>
				</view>
				<view class="enter-shop">
					进入门店 >>
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
				currentSwiper: 0
			}
		},
		onLoad() {

		},
		methods: {
			//轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
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
				top: 30upx; left: 30upx; background: 50% 50% #1B82D2 no-repeat;
				background-size: cover;
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
			.services {
				margin-top: 60upx;
				.services-item {
					margin-bottom: 30upx;
					border-top-left-radius: 30upx; border-bottom-left-radius: 30upx;;
					width: 510upx; height: 60upx; line-height: 60upx;
					float: right; border-top: 1px solid #3F91D8; margin-right: -30upx;
					border-bottom: 1px solid #3F91D8; border-left: 1px solid #3F91D8;
					.item-name {
						display: inline-block; margin-left: 30upx;
						font-size: 30upx; font-weight: 500; color: rgba(51,51,51,1);
					}
					.item-price {
						float: right; margin-right: 30upx;
						font-size: 30upx; font-weight: 500; color: rgba(250,43,43,1);
					}
				}
			}
			.enter-shop {
				font-size: 26upx; font-weight: 500; color: rgba(153,153,153,1); line-height: 50upx;
			}
		}
	}
</style>
