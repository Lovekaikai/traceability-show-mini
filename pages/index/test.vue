<template>
	<view class="relative">
		<!-- 地图 -->

		<map id='mapId' :latitude="latitude" :longitude="longitude" :markers="markers" scale="15" @markertap="clickMark"
		 show-location="true" @regionchange="moveMao" @callouttap="clickCall"></map>
		<cover-view class="selec">
			<cover-view class="select-title" @tap="toSelect">
				查找地点
			</cover-view>
			<!-- <cover-image src="../../static/images/icon_search.png"></cover-image> -->

		</cover-view>
		<!-- 手动定位 -->
		<cover-view class="positioning" @tap="tapReGeo">
			<cover-image src="../../static/images/positioning.png"></cover-image>
		</cover-view>
	</view>
</template>

<script>
	import throttle from '../../static/common/throttle.js';
	import amap from '../../static/common/amap-wx.js';
	export default {
		data() {
			return {
				map: '',
				city: '',
				latitude: '', //中心纬度
				longitude: '', //中心经度
				markers: [],
				markers1: '',
				// 地图控件
				controls: [{
					id: 1,
					iconPath: '/static/images/icon_search.png',
					position: {
						left: 15,
						top: 15
						// height: 50,
						// width: 300
					}
				}],
				merchantType: '',
				timeId: '',
				timeSec: '',
				isScroll: true
			};
		},
		mounted() {

		},
		onLoad(option) {
			// console.log(option)
			if (option.longitude) {
				this.longitude = option.longitude
				this.latitude = option.latitude
				this.city = option.city
				let _destination = []
				_destination.push(this.longitude)
				_destination.push(this.latitude)
				let param = {
					destination: _destination.join(',')
					// city: this.city
					// name: '测试账号'
				}
				this.getMerchantList(param)
			} else {
				let myAmapFun = new amap.AMapWX({
					key: this.$util.map_key
				})
				let that = this
				myAmapFun.getRegeo({
					success: (res) => {
						let _destination = []
						_destination.push(res[0].longitude)
						_destination.push(res[0].latitude)
						let param = {
							destination: _destination.join(',')
							// city: res[0].regeocodeData.addressComponent.city
							// name: '测试账号'
						}
						that.city = res[0].regeocodeData.addressComponent.city
						that.latitude = res[0].latitude
						that.longitude = res[0].longitude
						that.getMerchantList(param, true)
					}
				})
			}
		},
		watch: {},
		methods: {
			// 获取周围商家的列表
			getMerchantList(param, loding) {
				this.$util.httpGet('/exhibition/map/search', param, loding).then(res => {
					if (res.data.statusCode === 200) {
						// console.log(res)
						let _data = res.data.data
						let _markers = []
						for (let i = 0; i < _data.length; i++) {
							_markers.push({
								id: _data[i].merchantId,
								latitude: _data[i].latitude,
								longitude: _data[i].longitude,
								width: 40,
								height: 40,
								iconPath: '/static/images/icon.png',
								callout: {
									content: _data[i].merchantName,
									color: '#E92C33',
									fontSize: 14,
									bgColor: '#FFFFFF',
									padding: 8,
									display: 'ALWAYS',
									textAlign: 'center'
								}
							})
						}
						this.markers = _markers
						this.markers1 = _data
					} else {
						this.markers = []
						this.markers1 = []
					}
				})
			},
			
			moveMao: throttle.throttleFunc(function(e) {
				console.log(e)
				let that = this 
				uni.createMapContext('mapId').getCenterLocation({
					success(res) {
							console.log(res)
							let _destination = []
							_destination.push(res.longitude)
							_destination.push(res.latitude)
							let param = {
								destination: _destination.join(',')
								// city: res[0].regeocodeData.addressComponent.city
							} 
							that.getMerchantList(param, false)
							that.latitude = res.latitude
							that.longitude = res.longitude
					}
				})
			}, 1500),
			// 点击地图标记点事件
			clickMark(e) {
				// console.log(e);
				// #ifdef MP-WEIXIN
				// console.log(e.markerId)
				for (let item of this.markers1) {
					if (item.merchantId === e.markerId) {
						this.merchantType = item.merchantType
						// this.$util.navigateTo('../shopResult/shopResult?mid='+item.merchantId+'&mtype='+item.merchantType)
						this.$util.navigateTo('../schoolHome/schoolHome?mid=' + item.merchantId + '&mName=' + item.merchantName)
					}
				}
				// #endif
				// #ifdef H5
				console.log(e.detail.markerId);
				// #endif
			},
			// 点击标记点对应的气泡时触发
			clickCall(e) {
				// console.log(e)
				for (let item of this.markers1) {
					if (item.merchantId === e.markerId) {
						this.merchantType = item.merchantType;
						// this.$util.navigateTo('../shopResult/shopResult?mid='+item.merchantId+'&mtype='+item.merchantType)
						this.$util.navigateTo('../schoolHome/schoolHome?mid=' + item.merchantId + '&mName=' + item.merchantName +
							'&mType=' + item.merchantType)
					}
				}
			},
			// 重新定位
			tapReGeo() {
				let myAmapFun = new amap.AMapWX({
					key: this.$util.map_key
				})
				let that = this
				myAmapFun.getRegeo({
					success: (res) => {
						// let _destination = []
						// _destination.push(res[0].longitude)
						// _destination.push(res[0].latitude)
						// let param = {
						// 	destination: _destination.join(',')
						// 	// city: res[0].regeocodeData.addressComponent.city
						// 	// name: '测试账号'
						// }
						that.city = res[0].regeocodeData.addressComponent.city
						that.latitude = res[0].latitude
						that.longitude = res[0].longitude
						// that.getMerchantList(param, true)
					}
				})
			},
			// 获得搜索值
			inputValue(e) {
				console.log(e.detail.value)
				let markers = this.markers
				for (let i in markers) {
					if (markers[i].address.includes(e.detail.value) || markers[i].name.includes(e.detail.value)) {
						console.log(i, markers[i])
					}
				}
			},
			toSelect() {
				this.$util.navigateTo('../selectM/selectM?latitude=' + this.latitude + '&longitude=' + this.longitude + '&city=' +
					this.city)
			}
		}
	};
</script>

<style>
	@import url('../../static/common/com.css');

	page {
		color: #333;
		font-size: 28upx;
	}

	/* 地图 */
	map {
		width: 100%;
		height: calc(100vh);
	}

	.selec {
		width: 100%;
		position: absolute;
		top: 20upx;
		right: 0;
		display: flex;
		align-items: center;
		font-size: 32upx;
		/* font-weight: 600; */
	}

	.selec .select-title {
		margin: 0 20upx;
		padding-left: 14upx;
		background: #FFFFFF;
		color: #939496;
		width: 100%;
		line-height: 100upx;
		border-radius: 14upx;
	}

	.selec cover-image {
		width: 64upx;
		height: 64upx;
	}

	.positioning {
		background: #FFFFFF;
		position: absolute;
		right: 30upx;
		bottom: 200upx;
		width: 80upx;
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.positioning cover-image {
		width: 60upx;
		height: 60upx;
	}

	/* 下面部分 */
	.box {
		max-height: 621upx;
		width: 100%;
		z-index: 100;
		background: #fff;
	}

	/* 搜索框 */
	.search {
		width: 686upx;
		height: 64upx;
		background: #f2f2f2;
		border-radius: 10upx;
		margin: 25upx auto;
	}

	.search cover-image {
		width: 36upx;
		height: 36upx;
		margin-left: 23upx;
	}

	input {
		width: 581upx;
		height: 64upx;
		padding: 0 23upx;
	}

	/* 结果列表 */
	.result {
		overflow: scroll;
	}

	.result .title {
		font-size: 32upx;
		margin: 30upx 0;
		text-align: center;
	}

	.result .resultBox {
		padding: 24upx 32upx;
		border-bottom: 1px solid #e6e6e6;
	}

	.resultBox cover-image {
		width: 48upx;
		height: 48upx;
		margin-right: 30upx;
	}

	.resultBox .address {
		font-size: 24upx;
		color: #808080;
		margin-top: 20upx;
	}
</style>
