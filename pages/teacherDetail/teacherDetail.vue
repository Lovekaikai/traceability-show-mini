<template>
	<view class="teacherDetail">
		<uni-nav-bar :status-bar="true" background-color="#FEB389" color="#ffffff" left-icon="arrowleft" title="详情" @click-left="back" :shadow='false'/>
		<view class="teacher-content">
			<view class="item">
				<view class="title">姓名：</view>
				<view class="con">{{teacherDetail.teacherName}}</view>
			</view>
			<view class="item">
				<view class="title">职称：</view>
				<view class="con">{{teacherDetail.position}}</view>
			</view>
			<view class="portrait item">
				<view class="title">照片：</view>
				<image :src="teacherDetail.portrait" mode="aspectFit" @tap="previewImage(teacherDetail.portrait)"></image>
			</view>
			<view class="item">
				<view class="title">简介：</view>
				<view class="con">{{teacherDetail.description}}</view>
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
				teacherDetail: {
					portrait: '',
					teacherName: '',
					position: '',
					description: ''
				}
			}
		},
		onLoad(option) {
			this.getTeacher(option.tId)
		},
		methods: {
			// 返回上一页
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 获取详情数据
			getTeacher (id) {
				this.$util.httpGet('/terminal/teacher/get', {
					id: id
				}).then(res => {
					if (res.data.statusCode === 200) {
						this.teacherDetail.description = res.data.data.description
						this.teacherDetail.portrait = res.data.data.portrait
						this.teacherDetail.position = res.data.data.position
						this.teacherDetail.teacherName = res.data.data.teacher
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
		}
	}
</script>

<style lang="less">
	.teacherDetail {
		.teacher-content {
			margin-top: 20rpx;
			margin-right: 20rpx;
			// display: flex;
			// align-items: center;
			// flex-direction: column;
			color: #333333;
			font-size: 24rpx;
			font-weight: 400;
			.title {
				color: #808080;
				width: 100rpx;
				text-align: right;
			}
			.item {
				margin-top: 18rpx;
				display: flex;
				.con {
					flex: 1;
				}
			}
			.portrait {
				image {
					width: 300rpx;
					height: 300rpx;
				}
			}
		}
	}
</style>
