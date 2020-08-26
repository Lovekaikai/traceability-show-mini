<template>
	<view class="content1" style="height: 100vh;overflow: hidden;" @touchmove="handletouchmove" @touchstart="handletouchstart"
	 @touchend="handletouchend">
		<view class="content" v-bind:style="{  height: height}" @tap="tapContent"></view>
		<view class="bottom" @tap="tapBottom" :style="{  height: bottomHeight }"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				height: '',
				bottomHeight: 'calc( 100vh - ' + 200 + 'px - 44px)',
				or: false,
				flag: 0,
				text: '',
				lastX: 0,
				lastY: 0

			}
		},
		onLoad() {

		},
		mounted() {
			const query = wx.createSelectorQuery()
			query.select('.bottom').boundingClientRect()
			query.selectViewport().scrollOffset()
			let that = this
			query.exec((res) => {
				that.height = 'calc( 100vh - ' + res[0].height + 'px )'

				console.log('打印高度', res[0].height);
				console.log('打印demo的元素的信息', res);
			})
		},
		methods: {
			handletouchmove: function(event) {

				// console.log(event)
				if (this.flag !== 0) {
					return;
				}
				let currentX = event.touches[0].pageX;
				let currentY = event.touches[0].pageY;
				let tx = currentX - this.lastX;
				let ty = currentY - this.lastY;
				let text = '';
				this.mindex = -1;
				//左右方向滑动
				if (Math.abs(tx) > Math.abs(ty)) {
					if (tx < 0) {
						text = '向左滑动';
						this.flag = 1;
						//  this.getList();  //调用列表的方法
					} else if (tx > 0) {
						text = '向右滑动';
						this.flag = 2;
					}
				}
				//上下方向滑动
				else {
					if (ty < 0) {
						text = '向上滑动';
						this.tapContent()
						this.flag = 3;
						//  this.getList();  //调用列表的方法
					} else if (ty > 0) {
						text = '向下滑动';

						this.tapBottom()
						this.flag = 4;
					}
				}

				//将当前坐标进行保存以进行下一次计算
				this.lastX = currentX;
				this.lastY = currentY;
				this.text = text;
			},
			handletouchstart: function(event) {
				// console.log(event)
				this.lastX = event.touches[0].pageX;
				this.lastY = event.touches[0].pageY;
			},
			handletouchend: function(event) {
				this.flag = 0;
				this.text = '没有滑动';
			},
			tapContent() {
				this.or = false
				const query = wx.createSelectorQuery()
				query.select('.bottom').boundingClientRect()
				query.selectViewport().scrollOffset()
				let that = this
				query.exec((res) => {

					console.log(res)
					that.height = 'calc( 100vh - ' + (res[0].height) + 'px )'
					this.bottomHeight = 'calc( 100vh - ' + 200 + 'px - 44px)'
					// that.height=res[0].height
					console.log('打印高度', that.height);
					console.log('打印demo的元素的信息', res);
				})
			},
			tapBottom() {
				if (!this.or) {

					this.or = true
					const query = wx.createSelectorQuery()
					query.select('.bottom').boundingClientRect()
					query.selectViewport().scrollOffset()
					let that = this
					query.exec((res) => {

						console.log(res)
						that.height = 'calc( 100vh - ' + (res[0].height - 80) + 'px - 44px)'

						// that.height=res[0].height
						console.log('打印高度', that.height);
						console.log('打印demo的元素的信息', res);
					})

				}


			}
		}
	}
</script>

<style>
	.content {
		height: calc(500upx);
		width: 100vw;
		background: #007AFF;
		transition: all 0.1s linear;
	}

	.bottom {
		/* height:calc(100vh - 500upx - 44px); */
		width: 100vh;
		transition: all 0.1s linear;
		background: yellow;
	}
</style>
