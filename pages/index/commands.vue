<template>
	<view>
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
</style>
