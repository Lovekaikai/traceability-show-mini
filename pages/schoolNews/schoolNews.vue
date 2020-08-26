<template>
	<view class="dynamic">
		<uni-nav-bar :status-bar="true" background-color="#FEB389" color="#ffffff" left-icon="arrowleft" title="校园风采" @click-left="back" fixed="true"/>
		<view class="dynamicBox">
			<view class="reviewCard" v-for="(newItem, newIdx) in newsList" :key='newIdx' @tap="toInformation(newItem.id)">
				<view class="reviewTop">
					<view class="reviewUesrName">
						<text class="Tname">{{newItem.title}}</text>
						<!-- <text class="reviewDate">2019/09/19</text> -->
					</view>
				</view>
				<view class="reviewDuction" v-html="newItem.content"></view>
				<view class="reviewImgBox">
					<view class="reviewImg" v-for="(hImg, hgIdx) in newItem.imageList" :key='hgIdx'>
						<image :src="hImg.imageUrl" mode="aspectFit" @tap.stop="previewImage(hImg.imageUrl)"></image>
					</view>
					<view class="reviewImg" v-for="(hVideo, hvIdx) in newItem.videoList" :key='hvIdx' @tap.stop="empty">
						<video :id="'myVideo'+hvIdx" :src="hVideo.videoUrl" controls></video>
					</view>
				</view>
				<view class="like">
					<view class="date">2019/09/09 13:59</view>
					<!-- <view class="IconBox">
						<view class="like-item">
							<view class="likeIcon"></view>
							<view class="shu">121</view>
						</view>
						<view class="like-item">
							<view class="likeIcon"></view>
							<view class="shu">121</view>
						</view>
						<view class="like-item">
							<view class="likeIcon"></view>
							<view class="shu">121</view>
						</view>
					</view> -->
				</view>
			</view>
		</view>
		<view class="examine-more" @tap="lower" v-if="newsList.length < total">
			---查看更多---
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
			merchantId: '',
			background: ['color1', 'color2', 'color3'],
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			pageNum: 1,
			pageSize: 10,
			total: 0,
			newsList: [],
			videoContext: ''
		}
	},
	onLoad(option) {
		this.merchantId = option.mid
		this.getNewsList()
	},
	methods: {
		// 返回上一页
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		// 获取头条资讯列表
		getNewsList () {
			this.$util.httpGet('/terminal/headlines/list', {
				merchantId: this.merchantId,
				pageNum: this.pageNum,
				pageSize: this.pageSize
			}).then(res => {
				if(res.data.statusCode === 200) {
					// this.newsList = res.data.data.rows
					let _data = res.data.data.rows
					_data.forEach(item => {
						this.newsList.push(item)
					})
					this.total = res.data.data.total
				}
			})
		},
		// 跳转头条资讯页面
		toInformation (id) {
			this.$util.navigateTo('../Information/Information?hid='+id)
		},
		// 获取更多
		lower () {
			if (this.newsList.length < this.total) {
				this.pageNum += 1
				this.getNewsList()
			}
		},
		requestFullScreen (idx) {
			this.videoContext = uni.createVideoContext('myVideo'+idx);
			    // 进入全屏状态
			this.videoContext.requestFullScreen();
		},
		previewImage (url) {
			// console.log(111)
			let _url = [
				url
			]
			uni.previewImage({
				urls: _url
			})
		},
		empty () {
			console.log(111)
		}
	}
};
</script>

<style lang="less" scoped>
.dynamic {
	.dynamicBox {
		padding: 20upx;

		.reviewCard {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			width: 100%;
			background-color: #fff;
			margin-top: 30upx;
			border: 1px solid #ffffff;
			border-radius: 15upx;
			box-shadow: 0px 1px 22rpx 0px rgba(4,0,0,0.08);;
			padding: 20upx;

			.reviewTop {
				display: flex;
				// padding: 0 20upx;
				.reviewUesrName {
					display: flex;
					// flex-direction: column;
					// margin-left: 20upx;
					border-left: 3px solid #ff6766;
					padding-left: 10upx;

					.Tname {
						font-size: 30upx;
						font-weight: bold;
						color: #333333;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						display: -webkit-inline-box;
						display: -webkit-box;
						text-overflow: ellipsis;
						overflow: hidden;
					}

					.reviewDate {
						margin-top: 10upx;
						color: #808080;
						font-size: 28upx;
					}
				}
			}

			.reviewDuction {
				margin: 10upx;
				// margin-top: 20upx;
				font-size: 30upx;
				color: #808080;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 4;
				line-clamp: 4;
				-webkit-box-orient: vertical;
			}

			.reviewImgBox {
				display: flex;
				flex-wrap: wrap;

				.reviewImg {
					width: 190upx;
					height: 190upx;
					// background-color: #4cd964;
					margin: 10upx 10upx;
					image {
						width: 100%;
						height: 100%;
					}
					video {
						width: 100%;
						height: 100%;
					}
				}
			}

			.like {
				margin-top: 20upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-top: 1px solid #e6e6e6;
				padding-top: 20upx;
				.date {
					font-size: 20rpx;
					color: #808080;
				}

				.IconBox {
					display: flex;

					.like-item {
						display: flex;
						align-items: center;
						margin-left: 20upx;

						.likeIcon {
							width: 40upx;
							height: 40upx;
							background-color: #f0ad4e;
							margin: 0 10upx;
						}

						.shu {
							font-size: 28upx;
						}
					}
				}
			}
		}
	}
	.examine-more {
		text-align: center;
		line-height: 40rpx;
		margin-bottom: 10rpx;
	}
}
</style>
