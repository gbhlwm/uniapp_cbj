<template>
	<view>
		<view class="history-item">
			<view class="item-head">
				<view class="head-cover"></view>
				<view class="head-content">
					<view class="content-name">门店名称</view>
					<view class="content-date">2020-12-31  23:56:59</view>
				</view>
			</view>
			<view class="item-body">
				<view class="body-content">
					平台同意退款申请，交易款项99.99元已原路退回
				</view>
				<view class="body-detail">
					<view class="item">退款类型：</view>
					<view class="item">退款金额：</view>
					<view class="item">退款原因：</view>
					<view class="item">退款描述：</view>
				</view>
				<view class="body-photos">
					<view class="item"></view>
					<view class="item"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	.history-item {
		padding: 30upx;
		.item-head {
			display: flex; padding: 10upx 0;
			.head-cover {
				margin-right: 20upx; width: 70upx; height: 70upx;
				background: 50% 50% #1B82D2 no-repeat; background-size: cover;
			}
			.head-content {
				height: 70upx;
				.content-name {
					font-size: 28upx; color: #424242;
				}
				.content-date {
					font-size: 26upx; color: #999999;
				}
			}
		}
		.item-body {
			margin-top: 30upx;
			.body-content {
				color: #424242; font-size: 30upx;
			}
			.body-detail {
				margin-top: 10upx;
				.item {
					height: 60upx; line-height: 80upx;
					color: #333333; font-size: 26upx;
				}
			}
			.body-photos {
				margin-top: 20upx; display: flex;
				.item {
					margin-right: 20upx; width: 130upx; height: 130upx;
					background: 50% 50% #1B82D2 no-repeat; background-size: cover;
				}
			}
		}
	}
</style>
