<template>
	<view>
		<view class="navis">
			<view class="item" :class="{active: naviType === item.type}" v-for="item in navis" :key="item.type">
				{{item.name}}
			</view>
		</view>
		<view class="order-list">
			<view class="item" v-for="i in 4" :key="i">
				<view class="item-head">
					<view>订单编号：2132123123132</view>
					<view class="status">待核销</view>
				</view>
				<view class="item-body">
					<view class="cover"></view>
					<view class="name">服务名称</view>
					<view class="label">套餐</view>
					<view class="price">
						<view class="value">￥110</view>
						<view class="num">x1</view>
					</view>
				</view>
				<view class="item-footer">
					<view class="total">
						<view class="title">共2件商品  总计：</view>
						<view class="value">$100</view>
					</view>
					<view class="action">
						核销
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
				navis: [
					{ name: '全部', type: '' },
					{ name: '待核销', type: 1 },
					{ name: '已核销', type: 2 }
				],
				naviType: ''
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	.navis {
		height: 92upx; display: flex; justify-content: center;
		 border-bottom: 1px solid #EDEDED;
		.item {
			flex-grow: 1; text-align: center;
			line-height: 92upx; font-size: 30upx;
			&.active {
				color: #1B82D2;
			}
		}
	}
	.order-list {
		.item {
			.item-head {
				padding: 0 30upx; border-bottom: 1px solid #EDEDED;
				height: 82upx; line-height: 82upx; font-size: 26upx;
				display: flex; justify-content: space-between;
				.status {
					color: #FF183F;
				}
			}
			.item-body {
				padding: 30upx 30upx 30upx 250upx; position: relative; height: 201upx;
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
					position: absolute; top: 30upx; right: 30upx;
					.value {
						font-size: 34upx; color: rgba(255,24,63,1);
					}
					.num {
						text-align: right; font-size: 30upx; color: rgba(153,153,153,1);
					}
				}
			}
			.item-footer {
				padding: 0 30upx; text-align: right; margin-bottom: 20upx;
				.total {
					font-size: 26upx; color: #666666; display: flex;
					justify-content: flex-end; height: 100upx; align-items: center;
					.value {
						color: #333333; font-size: 30upx;
					}
				}
				.action {
					height: 58upx; background: #FF183F; padding: 0 20upx;
					text-align: center; color: white; font-size: 32upx;
					line-height: 58upx; border-radius: 29upx; display: inline-block;
				}
			}
		}
	}
</style>
