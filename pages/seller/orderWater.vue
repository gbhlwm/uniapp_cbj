<template>
	<view>
		<view class="navis">
			<view class="item" :class="{active: naviType === item.type}" 
				v-for="item in navis" :key="item.type">
				{{item.name}}
			</view>
		</view>
		<view class="water-item">
			<view class="item-head">
				<view class="number">
					订单编号：313654564
				</view>
				<view class="status">收入</view>
				<view class="status">支出</view>
			</view>
			<view class="item-body">
				<view class="item">类型：订单收入</view>
				<view class="item">时间：2019-05-12 12:12:12</view>
				<view class="item">金额：￥656</view>
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
				endTime: false
			}
		},
		onNavigationBarButtonTap() {
			const vm = this;
			vm.$refs.picker.show();
		},
		methods: {
			onConfirm(e) {
				console.log(e);
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
