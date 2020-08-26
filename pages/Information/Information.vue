<template>
	<view class="Information">
		<uni-nav-bar :status-bar="true" background-color="#FEB389" color="#ffffff" left-icon="arrowleft" title="资讯" @click-left="back"  fixed="true" />
		<view class="content">
			<view class="headline">{{title}}</view>
			<view class="createTime">{{createTime}}</view>
			<view class="con" v-html="content"></view>
			<view class="imagelist">
				<view class="img" v-for="(imgItem, imgIdx) in imageUrls" :key='imgIdx'>
					<image :src="imgItem.imageUrl" mode="widthFix" @tap="previewImage(imgItem.imageUrl)"></image>
				</view>
			</view>
			<view class="videolist">
				<view class="" v-for="(vitem, vidx) in videoList" :key='vidx'>
					<video :src="vitem.videoUrl" controls></video>
				</view>
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
				title: '', // 标题
				createTime: '', // 时间
				content: '', // 内容
				imageUrls: [], // 图片列表
				videoList: [] // 视频列表
			}
		},
		onLoad(option) {
			this.getInformation(option.hid)
		},
		methods: {
			// 返回上一页
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 获取头条资讯详情
			getInformation (id) {
				this.$util.httpGet('/terminal/headlines/get', {
					id: id
				}).then(res => {
					if (res.data.statusCode === 200) {
						this.title = res.data.data.title
						this.createTime = res.data.data.createTime
						this.content = res.data.data.content
						this.imageUrls = res.data.data.imageList
						this.videoList = res.data.data.videoList
					}
				})
			},
			previewImage (url) {
				// console.log(111)
				let _url = [
					url
				]
				uni.previewImage({
					urls: _url
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.Information {
		.content {
			margin: 20rpx;
		}
		.headline {
			color: #333333;
			font-weight: bold;
			font-size: 32rpx;
		}
		.createTime {
			margin-top: 20rpx;
			font-size: 24rpx;
			color: #808080;
		}
		.con {
			margin-top: 30rpx;
			color: #808080;
			font-size: 28rpx;
		}
		.imagelist {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 18rpx;
			.img {
				width: 100%;
				image {
					width: 100%;
					// height: 100%;
				}
			}
		}
		.videolist {
			video {
				width: 100%;
			}
		}
	}
</style>
