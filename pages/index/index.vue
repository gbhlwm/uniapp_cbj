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
		<view class="swiper">
			<view class="swiper-box">
				<swiper circular="true" autoplay="true">
					<swiper-item v-for="swiper in swiperList" :key="swiper.id">
						<image :src="swiper.img"></image>
					</swiper-item>
				</swiper>
				<view class="indicator">
					<view
						class="dots"
						v-for="(swiper, index) in swiperList"
						:class="[currentSwiper >= index ? 'on' : '']"
						:key="index"
					></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

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
</style>
