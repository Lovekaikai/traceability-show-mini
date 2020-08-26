<template>
	<view class="demo">
		<view class="item1" ref='item1' @tap="moveItem1">
			
		</view>
		<view class="item2">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			moveItem1() {
				const item = this.$refs.item1
				item.style.height = '70%'
			}
		}
	}
</script>

<style>
	.demo {
		height: 100vh;
	}
.item1 {
	height: 50%;
	max-height: 70%;
	background: #007AFF;
	transition: max-height .4s;
}
.item2 {
	height: 50%;
	max-height: 70%;
	background: #4CD964;
	transition: max-height .4s;
}
</style>
