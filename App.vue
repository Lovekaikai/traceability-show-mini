<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			this.updateManager()
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			updateManager () {
				const updateManager = uni.getUpdateManager()
				updateManager.onCheckForUpdate(function (res) {
					console.log(res.hasUpdate)
				})
				updateManager.onUpdateReady(function (res) {
					uni.showModal({
						title: '更新提示',
						content: '新版本已经准备好，是否重启应用？',
						success(res) {
							if (res.confirm) {
								updateManager.applyUpdate()
								// console.log('1111')
							}
						}
					})
				})
			}
		}
	}
</script>

<style lang="less">
	// @import '/static/css/iconfont/iconfont.css';
	/*每个页面公共css */
</style>
