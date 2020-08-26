<template>
	<view>
		<!-- 导航 -->
		<view class="nav flex">
			<!-- <view class="flex_item flex_center" v-for="(item, index) in navs" :key="index" :class="[navId == index ? 'active' : '']" @click="changeNav(index)">{{ item }}</view> -->
			<view class="flex_item flex_center" :class="navId === 0 ? 'active' : ''" @tap="changeNav(0)">货物入库记录</view>
			<view class="flex_item flex_center" :class="navId === 1 ? 'active' : ''" @tap="changeNav(1)" v-if="mtype === '1'">商品追溯记录</view>
		</view>
		<!-- 日期选择 -->
		<view class="select-con">
			<picker class="selectDate" mode="date" @change="changeDate" :value="navId == 0 ? date : date1">
				<view class="flex_contentbetween">
					<view class="text flex_items">
						<image src="../../static/images/icon_date.png"></image>
						日期选择
					</view>
					<view class="date flex_items">
						{{ navId == 0 ? date : date1 }}
						<image src="../../static/images/icon_right.png"></image>
					</view>
				</view>
			</picker>
		</view>
		<!-- 记录列表 -->
		<!-- 货物入库记录 -->
		<view class="result-con" v-if="navId == 0">
			<view class="recordBox" v-if="stockList.length === 0">
				<view class="top flex_items">
					<image src="../../static/images/icon_number.png"></image>
					<!-- <view>入库批次号：{{sitem.batchNumber}}</view> -->
				</view>
				<view class="flex_items cargo">
					暂无数据
				</view>
			</view>
			<view class="recordBox" v-for="(sitem, sidx) in stockList" :key='sidx' v-else  @tap="toDetail(sitem.stockId)">
				<view class="top flex_items">
					<image src="../../static/images/icon_number.png"></image>
					<block>入库批次号：{{sitem.batchNumber}}</block>
				</view>
				<view class="flex_items cargo">
					<image :src="sitem.image"></image>
					<view class="txt">
						<view class="time">入库时间：{{sitem.enterTime}}</view>
						<view>
							商品名称：
							<span>{{sitem.goodsName}}</span>
						</view>
						<!-- <view>
							商品品牌：
							<span>{{sitem.}}</span>
						</view> -->
						<view>
							商品数量：
							<span>{{sitem.repertory}}</span>
						</view>
						<!-- <view>
							商品规格：
							<span>某某某某某1</span>
						</view> -->
						<view>
							货物来源：
							<span>{{sitem.stockSrouce}}</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- </scroll-view> -->
		<!-- 商品追溯记录 -->
		<view class="result-con" v-else>
			<view class="recordBox" v-if="ascendList.length === 0">
				<view class="top flex_items">
					<image src="../../static/images/icon_number.png"></image>
					<!-- <view>入库批次号：{{sitem.batchNumber}}</view> -->
				</view>
				<view class="flex_items cargo">
					暂无数据
				</view>
			</view>
			<view class="recordBox" v-for="(aitem, aidx) in ascendList" :key='aidx' v-else>
				<view class="top flex_items">
					<image src="../../static/images/icon_number.png"></image>
					<view>追溯批次号：{{aitem.traceCodeNumber}}</view>
				</view>
				<view class="">
					<view class="content" v-for="(reitem, ridx) in aitem.records" :key='ridx'>
						<view class="flex kind">
							商品名称：
							<view class="bottom" @tap="changeShow(reitem.goodsId)">{{reitem.goodsName}}</view>
						</view>
						<view class="flex kind">
							商品编号：
							<view class="kindConent">{{reitem.goodsNum}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 弹窗 -->
		<view class="shade" v-if="show" @tap="show = false"></view>
		<view class="totast fixed_center" v-if="show">
			<view class="title">商品参数</view>
			<image :src="goodDetail.images[0].url"></image>
			<view class="flex kindBox" v-for="(pitem, pidx) in goodDetail.property">
				<view class="name">{{pitem.key}}：</view>
				<view class="content">{{pitem.value}}</view>
			</view>
			<image src="../../static/images/icon_close.png" class="icon_close absolute" @tap="show = false"></image>
		</view>
	</view>
</template>

<style>
	@import url('../../static/common/com.css');
	@import url('../../static/common/result.css');
	/* 弹窗 */
	.totast {
		z-index: 100;
		background: #fff;
		width: 512upx;
		max-height: 80%;
		overflow: auto;
		padding: 40upx 48upx 25upx;
		font-size: 24upx;
		border-radius: 20upx;
	}
	.totast .title {
		font-size: 32upx;
		color: #e92c33;
		text-align: center;
	}
	.totast image {
		display: block;
		width: 512upx;
		height: 512upx;
		background: #e6e6e6;
		margin: 30upx auto 0upx;
	}
	.kindBox {
		margin-top: 40upx;
	}
	.totast .name {
		width: 140upx;
		text-align: right;
		margin-right: 40upx;
	}
	.totast .content {
		width: 332upx;
	}
	.totast .icon_close {
		width: 22upx;
		height: 22upx;
		top: 10upx;
		right: 40upx;
		background: #fff;
	}
</style>

<script>
// import com from '../../static/common/com.js';
export default {
	data() {
		return {
			mid: '',
			mtype: '',
			navs: ['货物入库记录', '商品追溯记录'],
			navId: 0,
			date: '', //货物入库记录（日期选择）
			date1: '', //商品追溯记录（日期选择）
			show: false, //显示/隐藏弹窗
			stockList: [], //货物入库列表
			ascendList: [],
			goodDetail: '', // 商品信息
		};
	},
	onLoad(option) {
		console.log(option)
		this.mid = option.mid
		this.mtype = String(option.mtype)
		// let _date = new Date()
		// let _date1 = new Date()
		// console.log(_date)
		this.date = this.$util.newDate(new Date)
		this.date1 = this.$util.newDate(new Date)
		if(Number(option.mtype) === 1) {
			this.getTraceList(option.mid)
		}
		this.getStock(option.mid, option.mtype)
		
	},
	watch: {
		// date (newV, oldV) {
		// 	this.getStock(this.mid, this.mtype)
		// },
		date1 (newV, oldV) {
			this.getTraceList(this.mid)
		}
	},
	methods: {
		// 切换导航
		changeNav(index) {
			const that = this;
			that.navId = index;
		},
		// 获取入库记录
		getStock(mid, mtype) {
			this.$util.httpGet('/exhibition/source/stock', {
				merchantId: Number(mid),
				merchantType: Number(mtype),
				times: Date.parse(this.date) / 1000
			}).then(res => {
				if (res.data.statusCode === 200) {
					this.stockList = res.data.data
				} else {
					this.stockList = []
				}
				// console.log(res.data)
			})
		},
		// 获取追溯记录列表
		getTraceList(mid) {
			this.$util.httpGet('/exhibition/trace/getByTimeAndId', {
				merchantId: Number(mid),
				times: Date.parse(this.date1)
			}).then(res => {
				if (res.data.statusCode === 200) {
					this.ascendList = res.data.data
				} else {
					this.ascendList = []
				}
			})
		},
		// 日期选择
		changeDate(e) {
			const that = this;
			switch (that.navId) {
				case 0:
					that.date = e.detail.value;
					this.getStock(this.mid, this.mtype)
					break;
				case 1:
					that.date1 = e.detail.value;
					break;
			}
		},
		// 显示/隐藏弹窗
		changeShow(gid) {
			this.$util.httpGet('/exhibition/source/goods', {
				goodsId: gid,
				merchantType: 1
			}).then(res => {
				if(res.data.statusCode === 200) {
					this.goodDetail = res.data.data
					this.show = true
				}
			})
			// const that = this;
			// that.show = !that.show;
		},
		toDetail(sid) {
			this.$util.navigateTo('../detail/detail?mtype='+this.mtype+'&sid='+sid);
		}
	}
};
</script>
