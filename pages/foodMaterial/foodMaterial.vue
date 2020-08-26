<template>
	<view class="foodMaterial">
		<uni-nav-bar :status-bar="true" background-color="#FEB389" color="#ffffff" left-icon="arrowleft" title="食材追溯" @click-left="back" fixed="true"/>
		<view class="title">{{merchantName}}{{canteenName}} ></view>
		<view class="">
			<view class="resultBox">
				<view class="resultBox-top">
					<image src="../../static/images/icon_number.png"></image>
					<block>入库批次号：{{info.batchNumber}}</block>
				</view>
				<view class="resultBox-con">
					<image :src="info.imageUrl" mode="" @tap.stop='previewImage(info.imageUrl)'></image>
					<view class="resultBox-con-right">
						<view class="time">入库时间：{{info.createTime}}</view>
						<view class="txt">
							<text>食材名称：</text>
							<text>{{info.foodName}}</text>
						</view>
						<view class="txt">
							<text>食材分类：</text>
							<text>{{info.category}}</text>
						</view>
						<view class="txt">
							<text>食材重量：</text>
							<text>{{info.quantity}}</text>
						</view>
						<view class="txt">
							<text>存放库房：</text>
							<text>{{info.warehouseName}}</text>
						</view>
						<view class="txt">
							<text>入库编号：</text>
							<text>{{info.stockOrder}}</text>
						</view>
						<view class="txt">
							<text>库房编号：</text>
							<text>{{info.warehouseId}}</text>
						</view>
						<view class="txt">
							<text>入库人：</text>
							<text>{{info.staffName}}</text>
						</view>
						<view v-for="(fbItem, fbIdx) in foodAttributesList" :key='fbIdx' class="txt">
							<text>{{fbItem.attributeName}}：</text>
							<text>{{fbItem.attributeValue}}</text>
						</view>
						<!-- <view class="spot-check">
							<text>抽检报告下载</text> -->
							<!-- <text>{{info.staffName}}</text> -->
						<!-- </view> -->
					</view>
				</view>
			</view>
		</view>
		<view class="title">供应信息 ></view>
		<view class="supply">
			<view class="supply-1" v-if="zsInfo.commercialTenant && zsInfo.commercialMobile">
				<view class="supply-1-left">
					<image src="../../static/images/supply.png" mode=""></image>
					<view class="arrows">
						<view class="arrows-rectangle"></view>
						<view class="arrows-triangle"></view>
					</view>
				</view>
				<view class="supply-1-right">
					<view class="supply-data">
						<view>商户信息：</view>
						<view>{{zsInfo.commercialTenant}}</view>
					</view>
					<view class="supply-data">
						<view>商户手机号：</view>
						<view>{{zsInfo.commercialMobile}}</view>
					</view>
				</view>
			</view>
			<view class="supply-1">
				<view class="supply-1-left">
					<image src="../../static/images/supply.png" mode=""></image>
					<view class="arrows" v-if="!zsInfo.commercialTenant && !zsInfo.commercialMobile">
						<view class="arrows-rectangle"></view>
						<view class="arrows-triangle"></view>
					</view>
				</view>
				<view class="supply-1-right">
					<view class="supply-data">
						<view>供应公司：</view>
						<view>{{zsInfo.merchantName}}</view>
					</view>
					<view class="supply-data">
						<view>采购时间：</view>
						<view v-if="zsInfo.allocateTime">{{zsInfo.allocateTime}}</view>
						<view v-else>{{zsInfo.createTime}}</view>
					</view>
					<view class="supply-data">
						<view>负责人：</view>
						<view>{{zsInfo.principal}}</view>
					</view>
					<view class="supply-data">
						<view>负责人电话：</view>
						<view>{{zsInfo.mobile}}</view>
					</view>
					<view class="supply-data" v-if="zsInfo.spotCheck">
						<view>抽检项目：</view>
						<view>{{zsInfo.spotCheck}}</view>
					</view>
					<view class="supply-data" v-if="zsInfo.checkResult">
						<view>抽检结果：</view>
						<view>{{zsInfo.checkResult}}</view>
					</view>
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
				info: {
					createTime: '',
					foodName: '',
					category: '',
					quantity: '',
					warehouseName: '',
					stockOrder: '',
					warehouseId: '',
					staffName: '',
					imageUrl: ''
				},
				foodAttributesList: [], // 食材属性集合
				zsInfo: '',
				merchantName: '',
				canteenName: ''
			};
		},
		onLoad(option) {
			// console.log(option)
			this.merchantName = option.mName
			this.canteenName = option.cName
			this.getMaterial(option.gid, option.sid)
		},
		methods: {
			// 返回上一页
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 获取追溯信息
			getMaterial (mid, sid) {
				this.$util.httpGet('/terminal/foods/trace/data', {
					foodId: mid,
					stockId: sid
				}).then(res => {
					if(res.data.statusCode === 200) {
						// this.info = res.data.data.goods
						this.info = {
							batchNumber: res.data.data.batchNumber,
							imageUrl: res.data.data.imageUrl,
							createTime: res.data.data.createTime,
							foodName: res.data.data.foodName,
							category: res.data.data.category,
							quantity: res.data.data.quantity,
							warehouseName: res.data.data.warehouseName,
							warehouseId: res.data.data.warehouseId,
							stockOrder: res.data.data.stockOrder,
							staffName: res.data.data.staffName
						}
						this.foodAttributesList = res.data.data.foodAttributesList
						this.zsInfo = res.data.data.foodSupply
					}
				})
			},
			// 图片预览
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
	.foodMaterial {
		.title {
			width: 686rpx;
			margin: 54rpx auto 0 ;
			color: #FF6967;
			font-size: 32rpx;
			font-weight: bold;
			margin-top: 54rpx;
		}
		.resultBox {
			width: 686upx;
			margin: 26upx auto;
			background:rgba(255,255,255,1);
			box-shadow: 0px 1px 22rpx 0px rgba(4,0,0,0.08);
			border-radius: 8rpx;
			.resultBox-top {
				height: 72rpx;
				background: linear-gradient(-90deg,rgba(255,103,102,1),rgba(254,179,137,1));
				display: flex;
				align-items: center;
				padding: 0 20rpx;
				font-size: 26rpx;
				font-weight: 500;
				color: #FFFFFF;
				image {
					width: 42rpx;
					height: 40rpx;
					margin-right: 10rpx;
				}
			}
			.resultBox-con {
				display: flex;
				// align-items: center;
				padding: 38rpx 26rpx;
				image {
					width: 220rpx;
					height: 220rpx;
				}
				.resultBox-con-right {
					flex: 1;
					margin-left: 42rpx;
					.time {
						color: #FF6867;
						font-size: 24rpx;
						font-weight: 500;
					}
					.txt {
						font-size: 24rpx;
						font-weight: 500;
						margin-top: 20rpx;
						text {
							color: #808080;
						}
						text:last-child {
							color: #333333;
						}
					}
					.text:last-child {
						margin-top: 28rpx;
					}
					.spot-check {
						font-size: 24rpx;
						text-decoration: underline;
						color: rgb(51,153,255);
					}
				}
			}
		}
		.supply {
			width: 616upx;
			margin: 26upx auto;
			background:rgba(255,255,255,1);
			box-shadow: 0px 1px 22rpx 0px rgba(4,0,0,0.08);
			border-radius: 8rpx;
			padding: 40rpx 38rpx;
			.supply-1 {
				display: flex;
				.supply-1-left {
					margin-top: 7rpx;
					display: flex;
					flex-direction: column;
					// justify-content: center;
					// align-items: center;
					image {
						width: 32rpx;
						height: 32rpx;
					}
					.arrows {
						// height: 76rpx;
						margin-top: 12rpx;
						// width: 10rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						.arrows-rectangle {
							height: 70rpx;
							width: 6rpx;
							background: rgba(255, 105, 103, 1);
						}
						.arrows-triangle {
							width: 0;
							height: 0;
							border-top: 12rpx solid rgba(255, 105, 103, 1);
							border-right: 6rpx solid  rgba(0,0,0,0);
							border-bottom: 0rpx solid rgba(0,0,0,0);
							border-left: 6rpx solid  rgba(0,0,0,0);
						}
					}
				}
				.supply-1-right {
					margin-left: 30rpx;
					.supply-data {
						display: flex;
						&:first-child {
							margin-top: 0;
						}
						view {
							margin-top: 20rpx;
							color: rgba(128, 128, 128, 1);
							font-weight: 500;
							font-size: 24rpx;
							&:last-child {
								color: rgba(51, 51, 51, 1);
								flex: 1;
							}
						}
					}
				}
			}
		}
	}
</style>
