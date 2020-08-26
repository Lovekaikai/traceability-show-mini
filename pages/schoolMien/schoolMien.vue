<template>
	<view class="schoolMine">
		<uni-nav-bar :status-bar="true" background-color="#FEB389" color="#ffffff" left-icon="arrowleft" title="校园风采" @click-left="back" fixed="true"/>
		<view class="uni-margin-wrap">
			<swiper
				class="swiper"
				circular
				:indicator-dots="indicatorDots"
				:interval="interval"
				:duration="duration"
				indicator-active-color="#FEB389"
				indicator-color="rgba(255, 255, 255, 1)"
				:disable-touch="true"
			>
				<swiper-item v-for="(purl, pidx) in infoUrls" :key='purl'>
					<image :src="purl" mode=""></image>
				</swiper-item>
			</swiper>
			<!-- <view class="schoolmien" @tap="toLoveFund">
				<view class="img"><image src="../../static/images/mien.gif" mode=""></image></view>
				<view class="title">爱心基金</view>
			</view> -->
		</view>
		<view class="schoolMine-intro schoolMine-itemCon">
			<view class="title">学校简介 ></view>
			<view class="con schoolMine-intro-con">
				{{merchantDescription}}
			</view>
		</view>
		<!-- 学校师资 -->
		<view class="schoolMine-itemCon">
			<view class="school-title">
				<view class="title">学校师资 ></view>
				<view class="more" @tap="toPage(1)">查看更多</view>
			</view>
			
			<view class="con">
				<view class="teachers" v-if="teacherList.length > 0">
					<view class="teachers-item" v-for="(teaItem, teaIdx) in teacherList" :key='teaIdx' @tap="toReacherDetail(teaItem.id)">
						<view class="teacher-buddha">
							<image :src="teaItem.portrait" mode="" @tap.stop="previewImage(teaItem.portrait)"></image>
						</view>
						<view class="teacher-name">{{teaItem.teacher}}</view>
						<view class="teacher-grade">{{teaItem.position}}</view>
					</view>
				</view>
				<view class="no-data" v-else>
					---学校管理员暂无上传资料---
				</view>
			</view>
		</view>
		<!-- 头条资讯 -->
		<view class="schoolMine-itemCon">
			<view class="school-title">
				<view class="title">头条资讯 ></view>
				<view class="more" @tap="toPage(2)">查看更多</view>
			</view>
			<view class="con">
				<view class="schoolMine-news" v-if="headlinesList.length > 0">
					<view class="reviewCard" v-for="(hItem, hidx) in headlinesList" :key='hidx' @tap="toInformation(hItem.id)">
						<view class="reviewTop">
							<view class="reviewUesrName">
								<text class="Tname">{{hItem.title}}</text>
							</view>
						</view>
						<view class="reviewDuction" v-html="hItem.content"></view>
						<view class="reviewImgBox">
							<view class="reviewImg" v-for="(hImg, hgIdx) in hItem.imageList" :key='hgIdx'>
								<image :src="hImg.imageUrl" mode="aspectFit" @tap.stop="previewImage(hImg.imageUrl)"></image>
							</view>
							<view class="reviewImg" v-for="(hVideo, hvIdx) in hItem.videoList" :key='hvIdx' @tap.stop="empty">
								<video :id="'myVideo'+hvIdx" :src="hVideo.videoUrl" controls ></video>
							</view>
						</view>
						<!-- <view class="reviewImgBox">
							<view class="reviewImg" v-for="(hVideo, hvIdx) in hItem.videoList" :key='hvIdx' @tap.stop="empty">
								<video :id="'myVideo'+hvIdx" :src="hVideo.videoUrl" controls ></video>
							</view>
						</view> -->
						<view class="like">
							<view class="date">{{hItem.createTime}}</view>
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
				<view class="no-data" v-else>
					---暂无头条资讯---
				</view>
			</view>
		</view>
		<!-- 学校视频 -->
		<!-- <view class="schoolMine-itemCon">
			<view class="school-title">
				<view class="title">学校视频 ></view>
				<view class="more" @tap="toPage(3)">查看更多</view>
			</view>
			<view class="con">
				<view class="schoolMine-videos">
					<view class="videoItem" v-for="item in 3" :key='item'>
						<view class="video-con"></view>
						<view class="video-title">学校的日常生活</view>
						<view class="video-date">2019-09-09</view>
					</view>
				</view>
			</view>
		</view> -->
		<!-- 学校意见箱 -->
		<view class="schoolMine-itemCon">
			<view class="school-title">
				<view class="title">学校意见箱 ></view>
				<view class="more" @tap="feedbackShow = !feedbackShow">{{feedbackShow ? '收缩' : '展开'}}</view>
			</view>
			
			<view class="con" v-if="feedbackShow">
				<view class="schoolMine-opinion">
					<textarea v-model="value1" placeholder="不超过100字" />
					<view class="opinion-button">
						<view class="" @tap="feedbackAdd">
							<view class="opinion-icon">
								<uni-icons type="checkmarkempty" color="#FFFFFF" size="20"></uni-icons>
							</view>
							<view class="opinion-title">提交</view>
						</view>
						
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue'
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
export default {
	components: {
		uniNavBar,
		uniIcons
	},
	data() {
		return {
			merchantId: '',
			background: ['color1', 'color2', 'color3'],
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			infoUrls: [], // 学校图片列表
			merchantDescription: '', // 学校简介
			teacherList: [], // 学校师资列表
			headlinesList: [], //学校头条资讯列表
			videoContext: '',
			value1: '',
			feedbackShow: false
		};
	},
	onLoad(option) {
		this.merchantId = option.mid
		this.getImageList(option.mid)
		this.getHeadlines(option.mid)
	},
	methods: {
		// 返回上一页
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		// 获取学校图片
		getImageList (mid) {
			this.$util.httpGet('/terminal/headlines/image', {
				merchantId: mid
			}).then(res => {
				if(res.data.statusCode === 200) {
					this.infoUrls = res.data.data
				} else {
					this.infoUrls = []
				}
			})
		},
		// 获取学校风采数据
		getHeadlines (mid) {
			this.$util.httpGet('/terminal/headlines/style', {
				merchantId: mid
			}).then(res => {
				if (res.data.statusCode === 200) {
					this.infoUrls = res.data.data.papersUrl
					this.merchantDescription = res.data.data.merchantDescription
					this.teacherList = res.data.data.teacherList
					this.headlinesList = res.data.data.headlinesList
				}
			})
		},
		// 预览图片
		previewImage (url) {
			let _url = [
				url
			]
			uni.previewImage({
				urls: _url
			})
		},
		// 跳转到教师详情页
		toReacherDetail (id) {
			this.$util.navigateTo('../teacherDetail/teacherDetail?tId='+id)
		},
		// 跳转头条资讯页面
		toInformation (id) {
			this.$util.navigateTo('../Information/Information?hid='+id)
		},
		requestFullScreen (idx) {
			this.videoContext = uni.createVideoContext('myVideo'+idx);
			    // 进入全屏状态
			this.videoContext.requestFullScreen();
		},
		toLoveFund () {
			this.$util.navigateTo('../loveFund/loveFund')
		},
		toPage (idx) {
			if (idx === 1) {
				this.$util.navigateTo('../teacherContainer/teacherContainer?mid='+this.merchantId)
			} else if (idx === 2) {
				this.$util.navigateTo('../schoolNews/schoolNews?mid='+this.merchantId)
			} else {
				this.$util.navigateTo('../videoContainer/videoContainer')
			}
		},
		empty () {
			console.log(111)
		},
		// 提交意见
		feedbackAdd () {
			if(!this.value1) {
				this.$util.showtoast('提交意见的内容为空')
			} else {
				this.$util.httpPost('/terminal/feedback/add', {
					merchantId: this.merchantId,
					content: this.value1
				}).then(res => {
					if (res.data.statusCode === 200) {
						this.$util.showtoast('提交意见成功')
						this.value1 = ''
					}
				})
			}
			
		}
	}
};
</script>

<style lang="less" scoped>
.schoolMine {
	.uni-margin-wrap {
		position: relative;
		.swiper {
			height: 425upx;
			image {
				width: 100%;
				height: 100%;
			}
			.swiper-item {
				display: block;
				height: 425upx;
				line-height: 425upx;
				text-align: center;
			}
		}
		.swiper-list {
			margin-top: 40upx;
			margin-bottom: 0;
		}
		.schoolmien {
			z-index: 9999;
			position: absolute;
			right: 22rpx;
			bottom: -34rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.img {
				width: 74rpx;
				height: 82rpx;
				// background: #D8D8D8;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.title {
				font-size: 24rpx;
				font-weight: bold;
				color: #ffffff;
				-webkit-text-stroke: 1rpx #feb389;
				// -webkit-text-fill-color: transparent;
				text-stroke: 2rpx #feb389;
				// -webkit-text-fill-color: #ffdaa6;
			}
		}
	}
	.schoolMine-intro {
		// margin-top: 52rpx;
		.schoolMine-intro-con {
			color: #808080;
			font-size: 28rpx;
			font-weight: 400;
		}
	}
	.schoolMine-itemCon {
		width: 686rpx;
		margin: 52rpx auto 52rpx;
		.school-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.more {
				font-size: 24rpx;
				color: #333333;
			}
		}
		.title {
			color: #ff6967;
			font-size: 32rpx;
			font-weight: bold;
		}
		.con {
			margin-top: 30rpx;
			.teachers {
				display: flex;
				justify-content: space-between;
				.teachers-item {
					width: 220rpx;
					// height: 311rpx;
					background: rgba(255, 255, 255, 1);
					box-shadow: 0px 1px 22rpx 0px rgba(4, 0, 0, 0.08);
					border-radius: 20rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					// justify-content: center;
					.teacher-buddha {
						margin-top: 36rpx;
						width: 120rpx;
						height: 120rpx;
						// background: #dd524d;
						image {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
					.teacher-name {
						margin-left: 10rpx;
						margin-right: 10rpx;
						margin-top: 34rpx;
						color: #333333;
						font-size: 26rpx;
						font-weight: 400;
					}
					.teacher-grade {
						margin: 24rpx 10rpx 10rpx;
						// margin-top: 24rpx;
						// margin-left: 10rpx;
						// margin-right: 10rpx;
						// margin-bottom: 10rpx;
						color: #808080;
						font-size: 24rpx;
						font-weight: 400;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 4;
						line-clamp: 4;
						-webkit-box-orient: vertical;
					}
				}
			}
			.schoolMine-news {
				padding-bottom: 16rpx;
				.reviewCard {
					display: flex;
					flex-direction: column;
					box-sizing: border-box;
					width: 100%;
					background-color: #fff;
					margin-top: 30upx;
					border: 1px solid #ffffff;
					border-radius: 20upx;
					box-shadow: 0px 1px 22rpx 0px rgba(4,0,0,0.08);;
					padding: 20upx;

					.reviewTop {
						display: flex;
						// padding: 0 20upx;
						margin-bottom: 20rpx;
						.reviewUesrName {
							display: flex;
							// flex-direction: column;
							// margin-left: 20upx;
							border-left: 4rpx solid #ff6766;
							padding-left: 10upx;

							.Tname {
								font-size: 28rpx;
								font-weight: 600;
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
						margin: 20upx;
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
			.schoolMine-videos {
				display: flex;
				justify-content: space-between;
				.videoItem {
					.video-con {
						width: 200rpx;
						height: 200rpx;
						background: #000000;
						opacity: 0.4;
						border-radius: 10rpx;
					}
					.video-title {
						color: #333333;
						font-weight: bold;
						font-size: 28rpx;
						margin-top: 20rpx;
					}
					.video-date {
						margin-top: 20rpx;
						color: #808080;
						font-size: 24rpx;
						font-weight: 400;
					}
				}
			}
			.schoolMine-opinion {
				background:rgba(255,255,255,1);
				box-shadow:0px 1px 22rpx 0px rgba(4,0,0,0.08);
				border-radius:10px;
				padding: 34rpx 28rpx;
				.opinion-button {
					display: flex;
					flex-direction: row-reverse;
					.opinion-icon {
						width: 48rpx;
						height: 48rpx;
						// text-align: center;
						// line-height: 48rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						// font-size: 32rpx;
						background: linear-gradient(-90deg,rgba(255,103,102,1),rgba(254,179,137,1));
						border-radius: 50%;
						color: #FFFFFF;
						uni-icons {
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
					.opinion-title {
						color: #FF6967;
						font-size: 24rpx;
						font-weight: 500;
					}
				}
			}
		}
	}
}
.uni-bg-green {
	background: green;
}
.no-data {
	text-align: center;
	color: #808080;
	font-size: 28rpx;
}
.uni-bg-red {
	background: red;
}
.uni-bg-blue {
	background: blue;
}
</style>
