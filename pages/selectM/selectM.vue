<template>
	<view class="relative">
		<view class="selec-top">
			<view class="search flex_items">
				<image src="../../static/images/icon_search.png"></image>
				<input type="text" placeholder="查找地点" @input="inputValue" @focus="focusTap"/>
			</view>
			<view class="select-button" v-if="selectShow">
				<view class="button" @tap="searchMap">搜索</view>
			</view>
			<!-- <view class="" v-if="markers.length > 0">
				确定
			</view> -->
		</view>
			<view class="selec-content">
				<view class="resultBox flex_items" v-for="(item,index) in markers" :key="index" @tap="toShopResult(index)">
					<image src="../../static/images/icon.png"></image>
					<view class="recordBox-right">
						<view>{{item.name}}</view>
						<view class="address" v-if="Number(item.typecode) !== 150700">{{item.district}}{{item.address}}</view>
						<!-- <view class="" v-else>
							
						</view> -->
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				city: '',
				selectShow: false,
				markers: [],
				latitude: '', //纬度
				longitude: '',//经度
				name: '',
				pageSize: 10,
				pageNo: 1,
				total: ''
			}
		},
		onLoad(option) {
			this.latitude = option.latitude
			this.longitude = option.longitude
			this.city = option.city
		},
		methods: {
			// 获得搜索值
			inputValue(e) {
				// console.log(e.detail.value)
				this.name = e.detail.value
			},
			// 搜索按钮显示
			focusTap() {
				this.selectShow = true
			},
			// 高德地图api中的web服务中的输入提示功能
			searchMap() {
				let _destination = []
				_destination.push(this.longitude)
				_destination.push(this.latitude)
				let param = {
					key: '90e88d16cc676bef245bc402d7cb170f',
					// destination: _destination.join(','),
					// city: this.city,
					// citylimit: true,
					keywords: this.name
				}
				this.getMerchantList(param)
			},
			getMerchantList (param) {
				this.$util.get('https://restapi.amap.com/v3/assistant/inputtips', param).then(res => {
					if (Number(res.data.status) === 1) {
						// console.log(res.data)
						let _markers = res.data.tips
						let _data = []
						_markers.forEach(item => {
							if (item.location.length > 0) {
								_data.push(item)
							}
						})
						
						this.markers = _data
						// this.markers = res.data.tips
						// this.markers = res.data.data.list
						// this.total = res.data.data.total
					} else {
						this.markers = []
						// this.markers1 = []
					}
				})
			},
			// 跳转到shopResult页面
			toShopResult(idx) {
				let item = this.markers[idx]
				// console.log(item)
				let _location = item.location.split(',')
				uni.navigateTo({
					url: '../index/index?latitude='+_location[1]+'&longitude='+_location[0]+'&city='+this.city
				})
			}
		}
	}
</script>

<style>
	@import url('../../static/common/com.css');
	.selec-top {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #FFFFFF;
		z-index: 100;
	}
	/* 搜索框 */
	.search {
		/* width: 686upx; */
		flex: 1;
		height: 64upx;
		background: #f2f2f2;
		border-radius: 10upx;
		margin: 25upx;
	}
	.search image {
		width: 36upx;
		height: 36upx;
		margin-left: 23upx;
	}
	input {
		/* width: 581upx; */
		height: 64upx;
		padding: 0 23upx;
	}
	.select-button {
		width: 100upx;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10upx;
	}
	.select-button .button {
		width: 100%;
		height: 64upx;
		line-height: 64upx;
		font-size: 28upx;
		background: #E92C33;
		color: #FFFFFF;
		text-align: center;
		border-radius: 8upx;
	}
	.selec-content {
		width: 100vw;
		border-top: 1upx solid #ccc;
		position: absolute;
		top: 112upx;
		left: 0;
		height: calc(100vh - 56px);
	}
	/* .scroll-Y {
		position: absolute;
		top: 112upx;
		left: 0;
		height: calc(100vh - 56px);
	} */
	.result {
		overflow: scroll;
	}
	.result .title {
		font-size: 32upx;
		margin: 30upx 0;
		text-align: center;
	}
	.resultBox {
		padding: 24upx 32upx;
		border-bottom: 1px solid #e6e6e6;
	}
	.resultBox image {
		width: 48upx;
		height: 48upx;
		margin-right: 30upx;
	}
	
	.resultBox .address {
		font-size: 24upx;
		color: #808080;
		margin-top: 20upx;
	}
	.recordBox-right {
		flex: 1;
	}
</style>
