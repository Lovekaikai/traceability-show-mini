<template>
	<view class="">
		<uni-nav-bar :status-bar="true" background-color="#FEB389" color="#ffffff" left-icon="arrowleft" title="校园师资" @click-left="back" fixed="true"/>
		<!-- <scroll-view :scroll-y="true" :lower-threshold='10' @scrolltolower="lower">
			
		</scroll-view> -->
		<view class="teacherContainer">
			<view class="item" v-for="(terItem, terIdx) in tercherList" :key="terIdx" @tap="toReacherDetail(terItem.id)">
				<image :src="terItem.portrait" mode="" @tap.stop="previewImage(terItem.portrait)"></image>
				<view class="title">{{terItem.teacher}}</view>
				<view class="context">教师职称：{{terItem.position}}</view>
				<view class="context">简介：{{terItem.description}}</view>
			</view>
		</view>
		<view class="examine-more" @tap="lower" v-if="tercherList.length < total">
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
			tercherList: [],
			total: 0
		}
	},
	onLoad(option) {
		this.merchantId = option.mid
		this.getTercherList()
	},
	methods: {
		// 返回上一页
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		// 获取师资列表
		getTercherList () {
			this.$util.httpGet('/terminal/teacher/list', {
				merchantId: this.merchantId,
				pageNum: this.pageNum,
				pageSize: this.pageSize
			}).then(res => {
				if (res.data.statusCode === 200) {
					// this.tercherList.push(res.data.data.rows)
					let _data = res.data.data.rows
					_data.forEach(item => {
						this.tercherList.push(item)
					})
					this.total = res.data.data.total
				}
			})
		},
		lower () {
			console.log(11111)
			if (this.tercherList.length < this.total) {
				this.pageNum += 1
				this.pageSize = 10
				this.getTercherList()
			}
		},
		// 跳转到教师详情页
		toReacherDetail (id) {
			this.$util.navigateTo('../teacherDetail/teacherDetail?tId='+id)
		},
		// 预览图片
		previewImage (url) {
			// console.log(111)
			let _url = [
				url
			]
			uni.previewImage({
				urls: _url
			})
		},
	}
};
</script>

<style lang="less">
	.teacherContainer {
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
			display: flex;
			align-items: center;
			flex-direction: column;

			image {
				border-radius: 50%;

				width: 200upx;
				height: 200upx;
				margin: 30upx auto 0;
			}

			.title {
				font-size:30upx;
				font-family: PingFang SC;
				padding: 15upx 15upx 0;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
			}

			.context {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				margin: 15upx;
				color: rgba(128, 128, 128, 1);
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
	scroll-view {
		height: calc(100% - 60rpx);
	}
	.examine-more {
		text-align: center;
		line-height: 40rpx;
		margin-bottom: 10rpx;
	}
</style>
