<template>
	<view class="love">
		<uni-nav-bar :status-bar="true" background-color="#FEB389" color="#ffffff" left-icon="arrowleft" title="爱心基金" @click-left="back" fixed="true"/>
		<view class="loveTop" style="background: url('https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/trace/2019/12/20/663b2a4d-788c-4ae7-b18c-9f46ce9c0be5.png') no-repeat;background-size:contain">
			<view class="title">爱心基金说明</view>
			<view class="explain">爱心基金中出售成功的商品会结算一定的金额用于资助每个学校</view>
		</view>
		<view class="goods-list">
			<view class="goods-item">
				<view class="image-wrapper">
					<!-- <image :src="item.pictureUrl" mode="aspectFill"></image> -->
				</view>
				<text class="title">【华盛名酒-金典】</text>
				<!-- <text class="title clamp">【华盛名酒-金典】</text> -->
				<view class="subhead">
					52度浓香精酿白酒
				</view>
				<view class="price-box">
					<!-- <text></text> -->
					<text class="price">98.00</text>
					<!-- <span class="cartIcon"></span> -->
				</view>
			</view>
			
			<view class="goods-item">
				<view class="image-wrapper">
					<!-- <image :src="item.pictureUrl" mode="aspectFill"></image> -->
				</view>
				<text class="title">【华盛名酒-金典】</text>
				<!-- <text class="title clamp">【华盛名酒-金典】</text> -->
				<view class="subhead">
					52度浓香精酿白酒
				</view>
				<view class="price-box">
					<!-- <text></text> -->
					<text class="price">98.00</text>
					<!-- <span class="cartIcon"></span> -->
				</view>
			</view>
			
			<view class="goods-item">
				<view class="image-wrapper">
					<!-- <image :src="item.pictureUrl" mode="aspectFill"></image> -->
				</view>
				<text class="title">【华盛名酒-金典】</text>
				<!-- <text class="title clamp">【华盛名酒-金典】</text> -->
				<view class="subhead">
					52度浓香精酿白酒
				</view>
				<view class="price-box">
					<!-- <text></text> -->
					<text class="price">98.00</text>
					<!-- <span class="cartIcon"></span> -->
				</view>
			</view>
			
			<view class="goods-item">
				<view class="image-wrapper">
					<!-- <image :src="item.pictureUrl" mode="aspectFill"></image> -->
				</view>
				<text class="title">【华盛名酒-金典】</text>
				<!-- <text class="title clamp">【华盛名酒-金典】</text> -->
				<view class="subhead">
					52度浓香精酿白酒
				</view>
				<view class="price-box">
					<!-- <text></text> -->
					<text class="price">98.00</text>
					<!-- <span class="cartIcon"></span> -->
				</view>
			</view>
			
			<view class="goods-item">
				<view class="image-wrapper">
					<!-- <image :src="item.pictureUrl" mode="aspectFill"></image> -->
				</view>
				<text class="title">【华盛名酒-金典】</text>
				<!-- <text class="title clamp">【华盛名酒-金典】</text> -->
				<view class="subhead">
					52度浓香精酿白酒
				</view>
				<view class="price-box">
					<!-- <text></text> -->
					<text class="price">98.00</text>
					<!-- <span class="cartIcon"></span> -->
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
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			};
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="less">
.love {
	.loveTop {
		// background-color: pink;
		width: 100%;
		height: 400upx;
		.title {
			margin-left: 48rpx;
			padding-top: 74rpx;
			color: #FFFFFF;
			font-size: 28rpx;
			font-weight: bold;
		}
		.explain {
			width: 358rpx;
			margin-left: 48rpx;
			margin-top: 36rpx;
			color: #FFFFFF;
			font-size: 24rpx;
			font-weight: 400;
		}
	}
	/* 商品列表 */
	.goods-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0upx 20upx 20upx 20upx;
		.goods-item {
			display: flex;
			flex-direction: column;
			width: 48.3%;
			padding-bottom: 20upx;
			background-color: #fff;
			margin-top: 20upx;
			border: 1px solid #FFFFFF;
			border-radius: 15upx;
			box-shadow: 1px 2px 8px #d8d8d8;
			&:nth-child(2n+1) {
				margin-right: 2%;
			}
		}
	
		.image-wrapper {
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			background-color: pink;
			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.subhead {
			color: #808080;
			font-size: 30upx;
			margin-left: 10upx;
		}
		.title {
			font-size: 28upx;
			color: #333333;
			line-height: 60upx;
			font-weight: 500;
		}
	
		.price-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			color: #808080;
			font-weight: 400;
		}

		.price {
			padding: 5px;
			font-size: 38upx;
			color: #FF6967;
			line-height: 1;
			&:before {
				content: '￥';
				font-size: 26upx;
			}
		}
	}
}
</style>
