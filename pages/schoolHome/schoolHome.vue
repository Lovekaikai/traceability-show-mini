<template>
	<view class="schoolHome">
		<uni-nav-bar :status-bar="true" background-color="#FEB389" color="#ffffff" left-icon="arrowleft" title="食材追溯"
		 @click-left="back" :shadow='false' fixed="true" />
		 <!-- 学校图片展示及学校风采按钮 -->
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :interval="interval" :duration="duration"
			 indicator-active-color="#FEB389" indicator-color="rgba(255, 255, 255, 1)" :disable-touch='true'>
				<swiper-item v-for="(purl, pidx) in ImagesList" :key='purl'>
					<image :src="purl" mode=""></image>
				</swiper-item>
			</swiper>
			<view class="schoolmien" @tap="toSchoolMine" v-if="merchantType === 1">
				<view class="img">
					<image src="../../static/images/mien.gif" mode=""></image>
				</view>
				<view class="title">校园风采</view>
			</view>
		</view>
		<!-- 显示食堂 -->
		<view class="schoolHome-careen">
			<view class="selectDate-right" @tap="open">
				<view class="canteen">
					{{canteenName}}
				</view>
				<view class="down"></view>
			</view>
		</view>
		<!-- 选择食材追溯或其他资料按钮 -->
		<view class="schoolHome-category">
			<view class="category-item" v-for="(cteItem, cteIdx) in categoryList" :key='cteIdx' @tap="tapCategroyId(cteItem.id)" v-if="cteItem.id === 5 ? videoSurveillanceList.length > 0 : true">
				<view class="category-item-img" :class="cteItem.id === categoryId ? 'category-item-active' : ''">
					<image :src="cteItem.url" mode=""></image>
				</view>
				<view class="category-item-title">{{cteItem.title}}</view>
			</view>
		</view>
		<!-- 食材追溯 -->
		<view class="" v-if="categoryId === 1">
			<view class="schoolHome-selectData">
				<picker class="selectDate" mode="date" @change="changeDate">
					<view class="selectDate-left">
						<view class="date">{{date}}</view>
						<image src="../../static/images/icon_date1.png"></image>
					</view>
				</picker>
			
				<!-- <view class="selectDate-right" @tap="canteenDrawer = true">
					<view class="canteen">
						{{canteenName}}
					</view>
					<view class="down"></view>
				</view> -->
			</view>
			<view class="schoolHome-resultcon">
				<view class="resultBox" v-if="canteenList.length === 0">
					<view class="resultBox-top">
						<image src="../../static/images/icon_number.png"></image>
						<!-- <view>入库批次号：{{sitem.batchNumber}}</view> -->
					</view>
					<view class="resultBox-con">
						暂无数据
					</view>
				</view>
				<view class="resultBox" v-for="(citem, cidx) in canteenList" :key='cidx'>
					<view class="resultBox-top">
						<image src="../../static/images/icon_number.png"></image>
						<block>入库批次号：{{citem.batchNumber}}</block>
					</view>
					<view class="resultBox-con" @tap="toFoodMaterial(citem.foodId, citem.stockId)">
						<image :src="citem.imageUrl" mode="" @tap.stop='previewImage(citem.imageUrl)'></image>
						<view class="resultBox-con-right">
							<view class="time">入库时间：{{citem.createTime}}</view>
							<view class="txt">
								<text>食材名称：</text>
								<text>{{citem.foodName}}</text>
							</view>
							<view class="txt">
								<text>食材分类：</text>
								<text>{{citem.category}}</text>
							</view>
							<view class="txt">
								<text>食材重量：</text>
								<text>{{citem.quantity}}</text>
							</view>
							<view class="txt">
								<text>供应商：</text>
								<text>{{citem.merchantName}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-loadmore" v-if="canteenList.length > 0">{{canteenList.length > total ? loadMoreText : '没有更多数据了'}}</view>
			</view>
		</view>
		
		<!-- 食堂工作人员 -->
		<view class="schoolHome-canteenStaff" v-if="categoryId === 2">
			<!-- 负责人 -->
			<view class="cateringStaff">
				<view class="cateringStaff-title">负责人 ></view>
				<view class="cateringStaff-data" v-if="leaderList.length > 0">
					<view class="cateringStaff-data-item" v-for="(leItem, leIdx) in leaderList" :key='leIdx'>
						<view class="item-img">
							<image :src="leItem.picUrl" mode="" @tap="previewImage(leItem.picUrl)"></image>
						</view>
						<view class="item-information">
							<view class="item-information-name">{{leItem.realName}}</view>
							<view class="item-information-phone">{{leItem.mobile}}</view>
						</view>
					</view>
				</view>
				<view class="noData" v-else>
					暂无数据，请联系管理员添加数据
				</view>
			</view>
			<!-- 员工 -->
			<view class="cateringStaff">
				<view class="cateringStaff-title cateringStaff-title2">员工 ></view>
				<view class="cateringStaff-data" v-if="staffCanteenList.length > 0">
					<view class="cateringStaff-data-item" v-for="(staItem, staIdx) in staffCanteenList" :key='staIdx'>
						<view class="item-img">
							<image :src="staItem.staffImage" mode="" @tap="previewImage(staItem.staffImage)"></image>
						</view>
						<view class="item-information">
							<view class="item-information-name">{{staItem.staffName}}</view>
							<view class="item-information-phone">{{staItem.staffPhone}}</view>
							<view class="item-information-healthCertificate" @tap="previewImage(staItem.healthCertificate)">查看健康证</view>
						</view>
					</view>
				</view>
				<view class="uni-loadmore" v-if="staffCanteenList.length > 0">{{loadMoreText}}</view>
				<view class="noData" v-else>暂无数据，请联系管理员添加数据</view>
			</view>
		</view>
		
		<!-- 每日菜谱 -->
		<view class="schoolHome-menu" v-if="categoryId === 3">
			<view class="schoolHome-menu-title">
				每日菜谱 >
			</view>
			<!-- 选择星期几 -->
			<view class="schoolHome-menu-weekList">
				<view class="week" v-for="(week, weekIdx) in weekList" :key="weekIdx" :class="week.weekId === weekId ? 'week-active' : ''" @tap="selectWeek(week.weekId)">
					{{week.weekName}}
				</view>
			</view>
			<view class="schoolHome-menu-data" v-if="cookBookList.length > 0">
				<view class="menu-data-item" v-for="(cookItem, cookIdx) in cookBookList" :key='cookIdx'>
					<view class="menu-data-item-img">
						<image :src="cookItem.imageUrl" @tap="previewImage(cookItem.imageUrl)" mode="aspectFit"></image>
					</view>
					<view class="menu-data-item-name">{{cookItem.dishName}}</view>
					<view class="rawMaterial">原材料：{{cookItem.foodMaterial}}</view>
				</view>
			</view>
			<view class="uni-loadmore staff-loadmore" v-if="cookBookList.length > 0">{{loadMoreText}}</view>
			<view class="noData" v-else>暂无数据，请联系管理员添加数据</view>
		</view>
		
		<!-- 清洁记录 -->
		<view class="schoolHome-cleanRecord" v-if="categoryId === 4">
			<view class="schoolHome-cleanRecord-title">清洁记录 ></view>
			<view class="schoolHome-selectData">
				<picker class="selectDate" mode="date" @change="changeDate2">
					<view class="selectDate-left">
						<view class="date">{{cleanDate}}</view>
						<image src="../../static/images/icon_date.png"></image>
					</view>
				</picker>
			
				<!-- <view class="selectDate-right" @tap="canteenDrawer = true">
					<view class="canteen">
						{{canteenName}}
					</view>
					<view class="down"></view>
				</view> -->
			</view>
			<view class="schoolHome-cleanRecord-data" v-if="cleanList.length > 0">
				<view class="cleanRecord-data-item" v-for="(cleanItem, cleanIdx) in cleanList" :key='cleanIdx'>
					<view class="identical identical2">
						<text class="title">清洁项目：</text>
						<text class="datas">{{cleanItem.cleanProject}}</text>
					</view>
					<view class="identical identical1">
						<text class="title">清洁员：</text>
						<text class="datas">{{cleanItem.staffName}}</text>
					</view>
					<view class="identical identical2">
						<view class="title">清洁详情：</view>
						<view class="imglist" v-if="cleanItem.imageUrlArr.length > 0">
							<view class="imgItem" v-for="(img, imgIdx) in cleanItem.imageUrlArr">
								<image :src="img" :mode="aspectFill" @tap="previewImage(img)"></image>
							</view>
						</view>
					</view>
					<view class="identical identical2" v-if="cleanItem.videoUrl">
						<view class="title">视频：</view>
						<view class="videolist">
							<view class="videoItem">
								<video :src="cleanItem.videoUrl" controls></video>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-loadmore">{{loadMoreText}}</view>
			</view>
			<view class="noData" v-else>暂无数据，请联系管理员添加数据</view>
		</view>
		
		<!-- 视频监控 -->
		<view class="schoolHome-monitoring" v-if="categoryId === 5">
			<view class="schoolHome-monitoring-list" v-if="videoSurveillanceList.length > 0">
				<view class="monitoring-list-item" v-for="(video, vidx) in videoSurveillanceList" :key="vidx">
					<live-player mode="RTC" :src="video.monitorUrl" :id="'livePusher'+vidx" @statechange="statechange"></live-player>
					<cover-view class="monitoring-list-item-play" v-if="playShop[vidx]">
						<cover-image src="../../static/images/pause.png" @tap="startLive('livePusher'+vidx, vidx)"></cover-image>
					</cover-view>
					<cover-view class="monitoring-list-item-full">
						<cover-image src="../../static/images/quanping.png" @tap="fullScreen('livePusher'+vidx, vidx)"></cover-image>
					</cover-view>
					<cover-view class="monitoring-list-item-pause" v-if="!playShop[vidx]">
						<cover-image src="../../static/images/play.png" @tap="pauseLive('livePusher'+vidx, vidx)"></cover-image>
					</cover-view>
					
					<!-- <cover-view class="monitoring-list-item-play iconfont icon-GroupCopy"></cover-view> -->
					<!-- <button type="primary" @tap="startLive">开始播放</button>
					<button type="primary" @tap="stopLive">停止播放</button> -->
				</view>
				<!-- <view class="monitoring-list-item"></view> -->
			</view>
			<view class="noData" v-else>暂无数据，请联管理员添加数据</view>
		</view>
		
		<uni-drawer :visible="canteenDrawer" mode='right' @close='canteenDrawer = false'>
			<view class="canteenlist">
				<view class="item" v-for="(caItem, caidx) in canteen" :key='caidx' @tap="select(caItem)">
					{{caItem.canteen}}
				</view>
			</view>
		</uni-drawer>
		
		<uni-popup type="center" ref='popup'>
			<view class="canteenlist">
				<view class="item" v-for="(caItem, caidx) in canteen" :key='caidx' @tap="select(caItem)">
					{{caItem.canteen}}
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniNavBar,
			uniDrawer,
			uniPopup
		},
		data() {
			return {
				merchantId: '',
				merchantName: '',
				merchantType: '',
				loadMoreText: "加载中...",
				categoryList: [
					{id: 1, title: '食材追溯', url: '../../static/images/foodTraceability.png'},
					{id: 2, title: '工作人员', url: '../../static/images/staff.png'},
					{id: 3, title: '每日菜谱', url: '../../static/images/cookbook.png'},
					{id: 4, title: '清洁记录', url: '../../static/images/cleanRecord.png'},
					{id: 5, title: '视频监控', url: '../../static/images/videoSurveillance.png'}
				],
				weekList: [
					{weekName: '周一', weekId: 1},
					{weekName: '周二', weekId: 2},
					{weekName: '周三', weekId: 3},
					{weekName: '周四', weekId: 4},
					{weekName: '周五', weekId: 5},
					{weekName: '周六', weekId: 6},
					{weekName: '周日', weekId: 7},
				],
				weekId: '', // 星期几
				categoryId: 1, // 选择查看的类型
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				canteenName: '', // 食堂名称
				canteenId: '', // 食堂id
				date: '', // 日期
				pageNum: 1, // 页数
				pageSize: 10, // 条数
				ImagesList: [], // 图片列表
				canteen: [], // 食堂列表
				canteenList: [], // 食材入库列表
				leaderList: [], // 食堂负责人列表
				staffPageNum: 1, // 请求饭堂员工列表参数：页数
				staffPagesize: 10, // 请求饭堂员工列表参数：条数
				staffTotal: 0, // 员工总数
				staffCanteenList: [], // 饭堂员工列表
				cookPageNum: 1, // 请求食堂菜谱列表参数：页数
				cookPagesize: 10, // 请求食堂菜谱列表参数：条数
				cookTotal: 0, // 菜谱总数
				cookBookList: [], // 食堂菜谱列表
				videoSurveillanceList: [], // 视频监控列表
				cleanDate: '', // 获取清洁记录所需参数：日期
				cleanPageNum: 1, // 获取清洁记录所需参数：页数
				cleanPageSize: 10, // 获取清洁记录所需参数：条数
				cleanTotal: 0, // 清洁记录总数
				cleanList: [], // 清洁记录列表
				total: 0,
				canteenDrawer: false,
				enableCamera: false,
				context: null,
				playShop: []
			};
		},
		onReady() {
			this.context = uni.createLivePlayerContext('livePusher', this)
		},
		onLoad(option) {
			console.log(option)
			this.date = this.$util.newDate(new Date)
			this.cleanDate = this.$util.newDate(new Date)
 			this.weekId = new Date().getDay()
			this.merchantId = option.mid
			this.merchantName = option.mName
			this.merchantType = Number(option.mType)
			this.getImageList(option.mid)
			this.getCanteenList(option.mid)
			setTimeout(() => {
				this.getRetrospectList()
			}, 900)
			
			// this.getRetrospectList()
		},
		onReachBottom() {
			// if (this.canteenList.length === this.total) {
			// 	this.loadMoreText = '没有更多数据了'
			// 	return false
			// }
			// this.pageNum += 1
			this.concant()
		},
		onPullDownRefresh() {
			this.getCanteenList(this.merchantId)
			this.selectRetList()
			// setTimeout(() => {
			// 	this.getRetrospectList()
			// }, 300)
		},
		methods: {
			// 先请求监控视频，再根据列表判断要不要屏蔽视频监控按钮
			getMonitorList () {
				this.$util.httpGet('/terminal/monitor/list?canteenId='+this.canteenId).then(res => {
					if(res.data.statusCode === 200) {
						this.videoSurveillanceList = res.data.data
						// let _plays = []
						// res.data.data.forEach(item => {
						// 	_plays.push(true)
						// })
						// this.playShop = _plays
						// uni.stopPullDownRefresh()
					} else {
						this.videoSurveillanceList = []
					}
				})
			},
			
			statechange(e){
				console.log('live-player code:', e.detail.code)
			},
			EnableCamera() {
				this.enableCamera = true;
			},
			// 播放
			startLive(id, idx) {
				uni.createLivePlayerContext(id, this).play({
					success: a => {
						console.log(this.playShop[idx])
						this.$set(this.playShop, idx, false)
						// this.playShop[idx] = !this.playShop[idx]
						console.log('livePusher.start:' + JSON.stringify(a));
					}
				});
			},
			// 暂停
			pauseLive(id, idx) {
				uni.createLivePlayerContext(id, this).pause({
					success: a => {
						// this.playShop[idx] = true
						this.$set(this.playShop, idx, true)
						console.log('暂停了')
					}
				})
			},
			// 停止
			stopLive(id) {
				uni.createLivePlayerContext(id, this).stop({
					success: a => {
						console.log(JSON.stringify(a));
					}
				});
			},
			// 全屏
			fullScreen(id) {
				uni.createLivePlayerContext(id, this).requestFullScreen({
					direction: 90,
					success: a => {
						console.log('全屏时')
					}
				})
			},
			open() {
				this.$refs.popup.open()
			},
			// 返回上一页
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 获取学校图片
			getImageList(mid) {
				this.$util.httpGet('/terminal/headlines/image', {
					merchantId: mid
				}).then(res => {
					if (res.data.statusCode === 200) {
						this.ImagesList = res.data.data
					} else {
						this.ImagesList = []
					}
				})
			},
			// 获取食堂列表
			getCanteenList(mid) {
				this.$util.httpGet('/terminal/canteen/pull', {
					merchantId: mid
				}).then(res => {
					if (res.data.statusCode === 200) {
						if (res.data.data.length > 0) {
							this.canteen = res.data.data
							this.canteenId = this.canteen[0].id
							this.canteenName = this.canteen[0].canteen
							this.getMonitorList()
						} else {
							// this.$util.showtoast('当前学校还没有添加食堂')
							uni.showToast({
							    title: '没有添加食堂',
							    duration: 2000
							});
						}
						
					} else {
						this.canteen = []
					}
				})
			},
			// 获取追溯列表
			getRetrospectList() {
				if (this.categoryId === 1) {
					// 食材追溯
					// if (this.canteen.length > 0) {
						
					// } else {
						
					// }
					this.$util.httpPost('/terminal/foods/trace/search', {
						canteenId: this.canteenId,
						startDate: this.date,
						pageNum: this.pageNum,
						pageSize: this.pageSize
					}).then(res => {
						if (res.data.statusCode === 200) {
							this.canteenList = res.data.data.rows
							this.total = res.data.data.total
							uni.stopPullDownRefresh()
						} else {
							this.canteenList = []
							this.total = 0
						}
					})
				} else if (this.categoryId === 2) {
					// 饭堂负责人
					this.$util.httpGet('/terminal/canteenAccount/principal?canteenId='+ this.canteenId).then(res => {
						if(res.data.statusCode === 200) {
							this.leaderList = res.data.data
							uni.stopPullDownRefresh()
						} else {
							this.leaderList = []
						}
					})
					// 饭堂员工
					this.$util.httpGet('/terminal/staff/staffList', {
						canteenId: this.canteenId,
						pageNum: this.staffPageNum,
						pageSize: this.staffPagesize
					}).then(res => {
						if(res.data.statusCode === 200) {
							this.staffCanteenList = res.data.data.rows
							this.staffTotal = res.data.data.total
							uni.stopPullDownRefresh()
						} else {
							this.staffCanteenList = []
							this.staffTotal = 0
						}
					})
				} else if (this.categoryId === 3) {
					// 每日菜谱
					this.$util.httpGet('/terminal/menu/day', {
						weekId: this.weekId,
						canteenId: this.canteenId,
						pageNum: this.cookPageNum,
						pageSize: this.cookPagesize
					}).then(res => {
						if(res.data.statusCode === 200) {
							this.cookBookList = res.data.data.rows
							this.cookTotal = res.data.data.total
							uni.stopPullDownRefresh()
						} else {
							this.cookBookList = []
							this.cookTotal = 0
						}
					})
				} else if (this.categoryId === 5) {
					// 视频监控
					this.playShop = true
					this.$util.httpGet('/terminal/monitor/list?canteenId='+this.canteenId).then(res => {
						if(res.data.statusCode === 200) {
							this.videoSurveillanceList = res.data.data
							let _plays = []
							res.data.data.forEach(item => {
								_plays.push(true)
							})
							this.playShop = _plays
							uni.stopPullDownRefresh()
						} else {
							this.videoSurveillanceList = []
						}
					})
				} else if (this.categoryId === 4) {
					// 清洁记录
					this.$util.httpPost('/terminal/clean/search', {
						canteenId: this.canteenId,
						pageNum: this.cleanPageNum,
						pageSize: this.cleanPageSize,
						startDate: this.cleanDate
					}).then(res => {
						if (res.data.statusCode === 200) {
							this.cleanList = res.data.data.rows
							this.cleanTotal = res.data.data.total
							uni.stopPullDownRefresh()
						} else {
							this.cleanList = []
						}
					})
				}
				
			},
			concant() {
				if (this.categoryId === 1) {
					// 食材追溯
					if (this.canteenList.length === this.total) {
						this.loadMoreText = '没有更多数据了'
						return false
					}
					this.pageNum += 1
					this.$util.httpPost('/terminal/foods/trace/search', {
						canteenId: this.canteenId,
						startDate: this.date,
						pageNum: this.pageNum,
						pageSize: this.pageSize
					}).then(res => {
						if (res.data.statusCode === 200) {
							this.canteenList = this.canteenList.concat(res.data.data.rows)
							// this.total = res.data.data.total
							uni.stopPullDownRefresh()
						} else {
							this.canteenList = []
							this.total = 0
						}
					})
				} else if (this.categoryId === 2) {
					// 饭堂负责人
					// this.$util.httpGet('/terminal/canteenAccount/principal?canteenId='+ this.canteenId).then(res => {
					// 	if(res.data.statusCode === 200) {
					// 		this.leaderList = this.leaderList.concat(res.data.data)
					// 		uni.stopPullDownRefresh()
					// 	} else {
					// 		this.leaderList = []
					// 	}
					// })
					if (this.staffCanteenList.length >= this.staffTotal) {
						this.loadMoreText = '没有更多数据了'
						return false
					}
					// 饭堂员工
					this.staffPageNum += 1
					this.$util.httpGet('/terminal/staff/staffList', {
						canteenId: this.canteenId,
						pageNum: this.staffPageNum,
						pageSize: this.staffPagesize
					}).then(res => {
						if(res.data.statusCode === 200) {
							this.staffCanteenList = this.staffCanteenList.concat(res.data.data.rows)
							this.staffTotal = res.data.data.total
							uni.stopPullDownRefresh()
						} else {
							this.staffCanteenList = []
							this.staffTotal = 0
						}
					})
				} else if (this.categoryId === 3) {
					// 每日菜谱
					if (this.cookBookList.length >= this.cookTotal) {
						this.loadMoreText = '没有更多数据了'
						return false
					}
					this.cookPageNum += 1
					this.$util.httpGet('/terminal/menu/day', {
						weekId: this.weekId,
						canteenId: this.canteenId,
						pageNum: this.cookPageNum,
						pageSize: this.cookPagesize
					}).then(res => {
						if(res.data.statusCode === 200) {
							this.cookBookList = this.cookBookList.concat(res.data.data.rows)
							this.cookTotal = res.data.data.total
							uni.stopPullDownRefresh()
						} else {
							this.cookBookList = []
							this.cookTotal = 0
						}
					})
				} else if (this.categoryId === 5) {
					return false
					// 视频监控
					
					this.$util.httpGet('/terminal/monitor/list?canteenId='+this.canteenId).then(res => {
						if(res.data.statusCode === 200) {
							this.videoSurveillanceList = res.data.data
							uni.stopPullDownRefresh()
						} else {
							this.videoSurveillanceList = []
						}
					})
				} else if (this.categoryId === 4) {
					// 清洁记录
					if (this.cleanList.length >= this.cleanTotal) {
						this.loadMoreText = '没有更多数据了'
						return false
					}
					this.cleanPageNum += 1
					this.$util.httpPost('/terminal/clean/search', {
						canteenId: this.canteenId,
						pageNum: this.cleanPageNum,
						pageSize: this.cleanPageSize,
						startDate: this.cleanDate
					}).then(res => {
						if (res.data.statusCode === 200) {
							this.cleanList = this.cleanList.concat(res.data.data.rows)
							this.cleanTotal = res.data.data.total
							uni.stopPullDownRefresh()
						} else {
							this.cleanList = []
						}
					})
				}
			},
			selectRetList() {
				this.pageNum = 1
				this.pageSize = 10
				this.cookPageNum = 1
				this.staffPageNum = 1
				this.cleanPageNum = 1
				this.getRetrospectList()
			},
			// 选择食材追溯还是别的
			tapCategroyId (id) {
				this.categoryId = id
				// this.getRetrospectList()
				this.selectRetList()
			},
			// 选择食堂
			select(item) {
				this.canteenId = item.id
				this.canteenName = item.canteen
				// this.canteenDrawer = false
				this.$refs.popup.close()
				this.selectRetList()
			},
			// 每日菜谱中选择周几
			selectWeek (id) {
				this.weekId = id
				this.cookPageNum = 1
				this.selectRetList()
			},
			// 图片预览
			previewImage(url) {
				// console.log(111)
				let _url = [
					url
				]
				uni.previewImage({
					urls: _url
				})
			},
			// 食材追溯：选择时间
			changeDate(e) {
				this.date = e.detail.value
				this.selectRetList()
			},
			// 清洁记录：选择时间
			changeDate2(e) {
				this.cleanDate = e.detail.value
				this.selectRetList()
			},
			toSchoolMine() {
				this.$util.navigateTo('../schoolMien/schoolMien?mid=' + this.merchantId)
			},
			// 跳转到追溯详细信息页面
			toFoodMaterial(gid,sid) {
				this.$util.navigateTo('../foodMaterial/foodMaterial?gid=' + gid + '&mName=' + this.merchantName + '&cName=' + this.canteenName + '&sid=' + sid)
			}
		}
	};
</script>

<style lang="less">
	// @import url("../../");
	.schoolHome {
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
		}

		.schoolmien {
			z-index: 777;
			position: absolute;
			right: 22rpx;
			bottom: 14rpx;
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
				font-size: 28rpx;
				font-weight: bold;
				color: #ffffff;
				-webkit-text-stroke: 1rpx #FEB389;
				// -webkit-text-fill-color: transparent;
				// text-stroke: 2rpx #FEB389;
				// -webkit-text-fill-color: #ffdaa6;
			}
		}
		.schoolHome-careen {
			margin-top: 40rpx;
			display: flex;
			justify-content: center;
			.selectDate-right {
				min-width: 172rpx;
				max-width: 300rpx;
				height: 48rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #FF6967;
				.canteen {
					margin-left: 16rpx;
					margin-right: 22rpx;
					font-size: 24rpx;
					color: #333333;
					font-weight: 500;
				}
			
				.down {
					margin-right: 6rpx;
					width: 0;
					height: 0;
					border-top: 12rpx solid #FF6967;
					border-right: 8rpx solid rgba(0, 0, 0, 0);
					border-bottom: 0rpx solid rgba(0, 0, 0, 0);
					border-left: 8rpx solid rgba(0, 0, 0, 0);
					// background: #FF6967;
				}
			}
		}
		
		.schoolHome-selectData {
			width: 686upx;
			margin: 26upx auto;
			display: flex;
			justify-content: space-between;

			.selectDate-left {
				display: flex;
				align-items: center;

				.date {
					color: #FF6867;
					font-size: 28rpx;
					font-weight: 500;
					margin-right: 26rpx;
				}

				image {
					width: 32rpx;
					height: 32rpx;
				}
			}
		}
		.schoolHome-category {
			width: 686rpx;
			height: 198rpx;
			margin: 26rpx auto;
			background:rgba(255,255,255,1);
			box-shadow:0px 0px 8px 0px rgba(255,193,178,1);
			border-radius:20rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.category-item {
				.category-item-img {
					width: 84rpx;
					height: 84rpx;
					border-radius: 50%;
					background: rgba(179, 179, 179, 1);
					display: flex;
					align-items: center;
					justify-content: center;
					image {
						width: 52rpx;
						height: 52rpx;
					}
				}
				.category-item-active {
					background:linear-gradient(-90deg,rgba(255,103,102,1),rgba(254,179,137,1));
				}
				.category-item-title {
					color: #333333;
					font-size: 22rpx;
					margin-top: 14rpx;
				}
			}
		}
		.schoolHome-resultcon {
			width: 686upx;
			margin: 26upx auto;

			.resultBox {
				background: rgba(255, 255, 255, 1);
				box-shadow: 0px 1px 22rpx 0px rgba(4, 0, 0, 0.08);
				border-radius: 8rpx;
				margin-bottom: 20rpx;
				.resultBox-top {
					height: 72rpx;
					background: linear-gradient(-90deg, rgba(255, 103, 102, 1), rgba(254, 179, 137, 1));
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
					}
				}
			}
		}
		.schoolHome-canteenStaff {
			padding-top: 30rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 20rpx;
			.cateringStaff {
				width: 686rpx;
				.cateringStaff-title2 {
					margin-top: 40rpx;
				}
			}
			.cateringStaff-title {
				
				// height: 198rpx;
				// margin: 26rpx auto;
				font-size:32rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(255,105,103,1);
			}
			.cateringStaff-data {
				// width: 686rpx;
				// height: 198rpx;
				// margin: 26rpx auto;
				margin-top: 28rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.cateringStaff-data-item {
					margin-bottom: 26rpx;
					width: 324rpx;
					height: 380rpx;
					background: rgba(255,255,255,1);
					box-shadow: 0px 0px 8rpx 0px rgba(255,193,178,1);
					border-radius: 20rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					text-align: center;
					justify-content: space-around;
					.item-img {
						width: 160rpx;
						height: 160rpx;
						background: rgba(255,255,255,1);
						// border: 1px solid rgba(204,204,204,1);
						image {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
					.item-information {
						.item-information-name {
							color: rgba(51, 51, 51, 1);
							font-size: 28rpx;
						}
						.item-information-phone {
							color: rgba(128, 128, 128, 1);
							font-size: 24rpx;
							margin-top: 20rpx;
						}
						.item-information-healthCertificate {
							margin-top: 24rpx;
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 500;
							text-decoration: underline;
							color: rgba(33,144,236,1);
						}
					}
				}
			}
		}
		.schoolHome-menu {
			padding-top: 30rpx;
			.schoolHome-menu-title {
				width: 686rpx;
				// height: 198rpx;
				margin: 26rpx auto;
				font-size:32rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(255,105,103,1);
			}
			.schoolHome-menu-weekList {
				box-shadow: 0px 0px 8px 0px #ffc1b2;
				border-radius: 14rpx;
				display: flex;
				width: 686rpx;
				margin: 26rpx auto;
				height: 80rpx;
				line-height: 80rpx;
				align-items: center;
				// justify-content: space-between;
				.week {
					// color: #feb389;
					flex-grow: 0;
					flex: 1;
					text-align: center;
					font-size: 24rpx;
				}
				.week-active {
					background: linear-gradient(-90deg, #ff6766, #feb389);
					color: #FFFFFF;
				}
			}
			.schoolHome-menu-data {
				width: 686rpx;
				// height: 198rpx;
				margin: 26rpx auto;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.menu-data-item {
					// padding: 0 20rpx;
					margin-bottom: 26rpx;
					width: 326rpx;
					// width: 49%;
					height: 504rpx;
					background: rgba(255,255,255,1);
					box-shadow: 0px 0px 8rpx 0px rgba(255,193,178,1);
					border-radius: 20rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					// text-align: center;
					justify-content: space-around;
					.menu-data-item-img {
						width: 284rpx;
						height: 284rpx;
						image {
							width: 100%;
							height: 100%;
						}
					}
					.menu-data-item-name {
						width: 284rpx;
						font-size: 28rpx;
						color: rgba(51, 51, 51, 1);
					}
					.rawMaterial {
						width: 284rpx;
						font-size: 24rpx;
						color: rgba(128, 128, 128, 1);
					}
				}
			}
		}
		.schoolHome-cleanRecord {
			padding-top: 30rpx;
			.schoolHome-cleanRecord-title {
				width: 686rpx;
				// height: 198rpx;
				margin: 26rpx auto;
				font-size:32rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(255,105,103,1);
			}
			.schoolHome-cleanRecord-data {
				width: 684rpx;
				margin: 26rpx auto;
				display: flex;
				flex-direction: column;
				// justify-content: center;
				align-items: center;
				.cleanRecord-data-item {
					width: 100%;
					// height: 863rpx;
					background: rgba(255,255,255,1);
					box-shadow: 0px 0px 8rpx 0px rgba(255,193,178,1);
					border-radius: 20rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-bottom: 46rpx;
					padding-bottom: 30rpx;
					// justify-content: space-between;
					.identical {
						width: 586rpx;
						.title {
							font-size: 28rpx;
							color: rgba(128, 128, 128, 1);
							font-weight: 400;
						}
						.datas {
							color: rgba(51, 51, 51, 1);
							font-size: 28rpx;
							font-weight: 500;
						}
						.imglist {
							display: flex;
							// justify-content: space-between;
							flex-wrap: wrap;
							margin-top: 16rpx;
							.imgItem {
								margin: 8rpx;
								width: 180rpx;
								height: 180rpx;
								background: #D8D8D8;
								image {
									width: 100%;
									height: 100%;
								}
							}
							.imgItem:nth-child(3n) {
								margin-left: 0;
							}
						}
						.videolist {
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							margin-bottom: 68rpx;
							margin-top: 8rpx;
							.videoItem {
								width: 100%;
								height: 328rpx;
								background: #4CD964;
								video {
									width: 100%;
									height: 100%;
								}
							}
						}
					}
					.identical1 {
						margin-top: 30rpx;
					}
					.identical2 {
						margin-top: 36rpx;
					}
					
				}
			}
		}
		.schoolHome-monitoring {
			display: flex;
			justify-content: center;
			margin-bottom: 30rpx;
			.schoolHome-monitoring-list {
				width: 684rpx;
				padding: 44rpx 0;
				// height: 863px;
				background:rgba(255,255,255,1);
				box-shadow: 0px 0px 8rpx 0px rgba(255,193,178,1);
				border-radius: 20rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				// justify-content: center;
				.monitoring-list-item {
					margin-bottom: 32rpx;
					// width: 638rpx;
					// height: 358rpx;
					// background:rgba(0,0,0,1);
					// opacity: 0.2;
					position: relative;
					// live-player {
					// 	background: none;
					// }
					.monitoring-list-item-play {
						position: absolute;
						top: 50%;
						left: 50%;
						color: #FFFFFF;
						transform: translate(-50%, -50%);
						width: 60rpx;
						height: 60rpx;
					}
					.monitoring-list-item-full {
						position: absolute;
						color: #FFFFFF;
						bottom: 30rpx;
						right: 28rpx;
						// transform: translate(-50%, -50%);
						width: 30rpx;
						height: 30rpx;
					}
					.monitoring-list-item-pause {
						position: absolute;
						bottom: 30rpx;
						left: 34rpx;
						width: 48rpx;
						height: 48rpx;
					}
				}
			}
		}
		
		.canteenlist {
			background: #fff;
			width: 400rpx;
			padding: 20rpx;
			max-height: 400rpx;
			overflow-y: scroll;
			.item {
				color: #333333;
				font-weight: 400;
				line-height: 60rpx;
				margin-left: 20rpx;
				padding-left: 10rpx;
				border-bottom: 1rpx solid #FF6967;

				&:last-child {
					margin-top: 10rpx;
					border: none;
				}
			}
		}
	}

	.uni-bg-green {
		background: green;
	}

	.uni-bg-red {
		background: red;
	}

	.uni-bg-blue {
		background: blue;
	}
	.noData {
		width: 666rpx;
		margin: 26rpx auto;
		background: rgba(255,255,255,1);
		box-shadow: 0px 0px 8px 0px rgba(255,193,178,1);
		// border-radius: 20px;
		line-height: 80rpx;
		padding-left: 20rpx;
		color: #333333;
		font-weight: 500;
		font-size: 28rpx;
		height: 120rpx;
	}
	.uni-loadmore {
		text-align: center;
		color: #808080;
		line-height: 48rpx;
	}
	.staff-loadmore {
		margin-bottom: 18rpx;
	}
</style>
