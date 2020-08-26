<template>
	<view>
		<!-- <view class="nav flex_center">货物入库详细追溯信息</view> -->
		<!-- <view class="detail-con"> -->
			<view class="recordBox">
				<view class="top flex_items">
					<image src="../../static/images/icon_number.png"></image>
					入库批次号：{{stockDetail.batchNumber}}
				</view>
				<view class="content">
					<view class="flex kind">
						<view class="kindConent">入库批次号：</view>
						<view style="flex: 1">{{stockDetail.batchNumber}}</view>
					</view>
					<view class="flex kind">
						<view class="kindConent">入库时间：</view>
						<view style="flex: 1">{{stockDetail.enterTime}}</view>
					</view>
					<view class="flex kind">
						<view class="kindConent">同类货物上次入库时间：</view>
						<view style="flex: 1">{{stockDetail.nearestTime}}</view>
					</view>
					<view class="flex kind">
						<view class="kindConent">商品名称：</view>
						<view style="flex: 1">{{stockDetail.goodsName}}</view>
					</view>
					<view class="flex kind">
						<view class="kindConent">商品数量：</view>
						<view style="flex: 1">{{stockDetail.repertory}}</view>
					</view>
					<view class="flex kind">
						<view class="kindConent">货物来源：</view>
						<view style="flex: 1">{{stockDetail.stockSource}}</view>
					</view>
					
					<view class="flex kind">
						<view class="kindConent">货物来源联系人电话：</view>
						<view style="flex: 1">{{stockDetail.contactNumber}}</view>
					</view>
					<view class="flex kind">
						<view class="kindConent">货物来源地址：</view>
						<view style="flex: 1">{{stockDetail.sourceSite}}</view>
					</view>
					<view class="flex kind">
						<view class="kindConent">货物经手人：</view>
						<view style="flex: 1">{{stockDetail.contact}}</view>
					</view>
					<view class="flex kind">
						<view class="kindConent">货物存放库房：</view>
						<view style="flex: 1">{{stockDetail.warehouse}}</view>
					</view>
					<!-- <view class="flex kind">
						<view class="kindConent">库房单号：</view><view>某某某</view>
					</view> -->
					<view class="flex kind">
						<view class="kindConent">库房编号：</view>
						<view style="flex: 1">{{stockDetail.warehouseId}}</view>
					</view>
				</view>
			</view>
			
			<view class="goodsInfo">
				<view class="title">商品参数</view>
				<swiper class="swiper-box" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="(pimg, iidx) in goodDetail.images" :key='iidx'>
						<view class="swiper-item">
							<image :src="pimg.url" mode="scaleToFill"></image>
						</view>
					</swiper-item>
				</swiper>
				<!-- <image :src="goodDetail.images[0].url"></image> -->
				
				<!-- <view class="flex property">
					<view class="name">品牌：</view>
					<view class="content">ZL＆2/嘉汇</view>
				</view> -->
				<view class="flex property" v-for="(pitem, pid) in goodDetail.property" :key='pidx' v-if="pitem.value">
					<view class="name">{{pitem.key}}：</view>
					<view class="content">{{pitem.value}}</view>
				</view>
				<view class="flex property">
					<view class="name">商品详情：</view>
					<view class="content">
						<rich-text :nodes="goodDetail.introduction | formatRichText"></rich-text>
					</view>
				</view>
			</view>
		<!-- </view> -->
		
	</view>
</template>

<style>
	@import url('../../static/common/com.css');
	@import url("../../static/common/result.css");
	.nav {
		width: 100%;
		height: 98upx;
		border-bottom: 1px solid #e5e5e5;
	}
	.detail-con {
		position: absolute;
		top: 100upx;
	}
	.goodsInfo{
		margin: 55upx 32upx 0;
		font-size: 24upx;
		padding-bottom:30upx;
	}
	.goodsInfo .title{
		color:#E92C33;
		font-size: 32upx;
		text-align: center;
		padding: 20upx 0;
	}
	.swiper-box {
		height: 500upx;
	}
	
	.swiper-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: #eee;
		color: #fff;
	}
	
	.swiper-item image {
		width: 100%;
		height: 100%;
	}
	.goodsInfo .property{
		margin-top:40upx;
	}
	.goodsInfo .property .name{
		width:150upx;
		color:#808080;
		margin-right: 40upx;
		text-align: right;
	}
	.goodsInfo .property .content{
		width:456upx;
	}
	.content p img {
		width: 100%;
	}
</style>

<script>
// import com from '../../static/common/com.js';
export default {
	data() {
		return {
			introduction: '',
			stockDetail: '',
			goodDetail: ''
		};
	},
	onLoad(option) {
		this.getDetail(option.sid, option.mtype)
	},
	methods: {
		// 获取货源详情和商品详情
		getDetail (sid, mtype) {
			this.$util.httpGet('/exhibition/source/detail', {
				stockId: Number(sid),
				merchantType:Number(mtype)
			}).then(res => {
				this.stockDetail = res.data.data
				this.$util.httpGet('/exhibition/source/goods', {
					goodsId: res.data.data.goodsId,
					merchantType: Number(mtype)
				}).then(res => {
					this.goodDetail = res.data.data
					this.introduction = res.data.data.introduction
				})
			})
		}
	},
	filters: {
		//控制小程序中html代码中的图片大小
		formatRichText (html) {
			let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
				match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
				match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
				match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
				return match;
			});
			newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
				match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
				return match;
			});
			newContent = newContent.replace(/<br[^>]*\/>/gi, '');
			newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
			return newContent;
		}
	}
};
</script>
