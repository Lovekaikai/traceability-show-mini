<template>
	<view class="">
		<uni-nav-bar :status-bar="true" background-color="#FEB389" color="#ffffff" left-icon="arrowleft" title="学校视频" @click-left="back" fixed="true"/>
		<view class="videoContainer">
			<view class="item" v-for="(item) in 5">
				<image src="../../static/timg.jpg" mode=""></image>
				<view class="title">学校里的日常生活</view>
				<view class="context">学校里的日常生活，每天都很精彩！</view>
				<view class="time">2019-09-09</view>
			</view>

		</view>
	</view>
	
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
export default {
	components: {
		uniNavBar
	},
	data() {
		return {
			background: ['color1', 'color2', 'color3'],
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500
		}
	},
	methods: {
		back() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style lang="less">
	.videoContainer {
		background: #fff;
		padding: 0 15upx;
		display: flex;
		flex-wrap: wrap;
		margin-top: 15rpx;
		.item {
			margin: 15upx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 1px 22rpx 0px rgba(4, 0, 0, 0.08);
			border-radius: 10px;
			width: calc(50% - 30upx);

			image {
				border-radius: 10px;
				width: 100%;
				height: 336rpx;
			}

			.title {
				font-size: 28upx;
				font-family: PingFang SC;
				padding: 15upx 15upx 0;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
			}

			.context {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;
				padding: 15upx 15upx 0;
				color: rgba(128, 128, 128, 1);
			}

			.time {
				font-size: 20upx;
				font-family: PingFang SC;
				font-weight: 400;
				padding: 15upx;
				text-align: right;
				color: rgba(255, 105, 103, 1);
			}


		}

	}
</style>
