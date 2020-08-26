<template>
	<view>
		<!-- 导航 -->
		<view class="nav flex">
			<view class="flex_item flex_center">
				货物入库记录
			</view>
		</view>
		<!-- 日期选择 -->
		<picker class="selectDate" mode="date" @change="changeDate" :value="date">
			<view class="flex_contentbetween">
				<view class="text flex_items">
					<image src="../../static/images/icon_date.png"></image>
					日期选择
				</view>
				<view class="date flex_items">
					{{date}}
					<image src="../../static/images/icon_right.png"></image>
				</view>
			</view>
		</picker>
		<!-- 记录列表 -->
		<!-- <scroll-view scroll-y> -->
		<view class="recordBox">
			<view class="top flex_items">
				<image src="../../static/images/icon_number.png"></image>
				入库批次号：RK2019090978768765
			</view>
			<view class="flex_items cargo">
				<image src="#"></image>
				<view class="txt">
					<view class="time">入库时间：2019/09/09 14:34</view>
					<view>商品名称：<span>某某某某某1</span></view>
					<view>商品品牌：<span>某某某某某1</span></view>
					<view>商品数量：<span>某某某某某1</span></view>
					<view>商品规格：<span>某某某某某1</span></view>
					<view>货物来源：<span>某某某某某1某某某某某1</span></view>
				</view>
			</view>
		</view>
		<!-- </scroll-view> -->
	</view>
</template>

<style>
@import url('../../static/common/com.css');
@import url('../../static/common/result.css');
.nav view{
	color:#E92C33;
}
</style>

<script>
import com from '../../static/common/com.js';
export default {
	data() {
		return {
			date: '2019-09-25', //货物入库记录（日期选择）
			show: false ,//显示/隐藏弹窗
		};
	},
	methods: {
		// 日期选择
		changeDate(e) {
			const that = this;
			that.date = e.detail.value;
		}
	}
};
</script>
