// let images = 'https://xnsmb.xnsoft.net.cn'
// let API_Url = "http://org-beta.cntracechain.com"
let API_Url = "http://org-beta.cntracechain.com"

export default class Util {
	// get请求封装
	static httpGet(url, param, loading = true) {
		if (loading) {
			Util.loading()
		}
		return new Promise((resolve, reject) => {
			url = API_Url + url
			uni.request({
				url: url,
				method: "GET",
				data: param,
				success: (res) => {
					resolve(res)
				},
				fail: (rej) => {
					reject(rej)
				},
				complete: () => {
					Util.hideLo()
				}
			})
		})
	}
	static get(url, param, loading = true) {
		if (loading) {
			Util.loading()
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				method: "GET",
				data: param,
				success: (res) => {
					resolve(res)
				},
				fail: (rej) => {
					reject(rej)
				},
				complete: () => {
					Util.hideLo()
				}
			})
		})
	}
	// post请求封装
	static httpPost(url, param, loading = true) {
		if (loading) {
			Util.loading()
		}
		return new Promise((resolve, reject) => {
			url = API_Url + url
			uni.request({
				url: url,
				method: "POST",
				data: param,
				success: (res) => {
					resolve(res)
				},
				fail: (rej) => {
					reject(rej)
				},
				complete: (data) => {
					Util.hideLo()
				}
			})
		})
	}
	static loading() {
		uni.showLoading({
			title: '加载数据中',
			duration: 1500
		})
	}
	static hideLo() {
		uni.hideLoading()
	}
	// 弹窗提醒
	static showtoast(text) {
		uni.showToast({
			title: text,
			icon: 'none',
			mask: true,
			duration: 2000,
		})
	}
	static navigateTo(url) {
		uni.navigateTo({
			url: url,
		});
	}
	// 获取当前时间并格式化为(xxxx-xx-xx)
	static newDate (date) {
		let year = date.getFullYear()
		let month = date.getMonth() + 1
		let day = date.getDate()
		month = month <= 9 ? '0'+month : month
		day = day <= 9 ? '0'+day : day
		let currentdate  = year + '-' + month + '-' + day
		return currentdate
	}
	// 高德地图key
	static map_key = '2649cf46ba2417b42f9fe36f53c57f63'
	static markers = [
		{
			address: "天府路1附近",
			height: 32,
			iconPath: undefined,
			id: 0,
			latitude: 23.124578,
			longitude: 113.361973,
			name: "天河区美林海岸逸江湾10区2座",
			width: 22
		},
		{
			address: "石牌街道广州天河区尚品天河一楼猪杂汤饭",
			height: 32,
			iconPath: undefined,
			id: 2,
			latitude: 23.124561,
			longitude: 113.361945,
			name: "猪杂汤饭",
			width: 22
		},
		{
			address: "黄埔大道中天府路1号天河路50号",
			height: 32,
			iconPath: undefined,
			id: 3,
			latitude: 23.124569,
			longitude: 113.36205,
			name: "迎园商行",
			width: 22
		},
		{
			address: "黄埔大道中天府路1号",
			height: 32,
			iconPath: undefined,
			id: 4,
			latitude: 23.124552,
			longitude: 113.362124,
			name: "cinderella",
			width: 22
		},
		{
			address: "天府路1号",
			height: 32,
			iconPath: undefined,
			id: 5,
			latitude: 23.124481,
			longitude: 113.362121,
			name: "FOR FUN",
			width: 22
		},
		{
			address: "天府路1号天河区政府",
			height: 32,
			iconPath: undefined,
			id: 6,
			latitude: 23.124842,
			longitude: 113.361575,
			name: "交通违法处理终端机(员村天河科技局)",
			width: 22,
			callout: {
				content: '交通违法处理终端机(员村天河科技局)',
				color: 'red',
				fontSize: 16,
				display: 'BYCLICK',
				bgColor: '#FFFFFF',
				padding: 10
			}
		},
		{
			address: "黄埔大道中天府路1号",
			height: 32,
			iconPath: undefined,
			id: 8,
			latitude: 23.12468,
			longitude: 113.3612,
			name: "温俊锋美食店",
			width: 22
		},
		{
			address: "天府路1号",
			height: 32,
			iconPath: undefined,
			id: 7,
			latitude: 23.124719,
			longitude: 113.361323,
			name: "秀眉坊",
			width: 22
		},
		{
			address: "黄埔大道中天府路1号",
			height: 32,
			iconPath: undefined,
			id: 9,
			latitude: 23.12468,
			longitude: 113.3612,
			name: "广州市天河区车陂陈进建快餐店",
			width: 22
		},
		{
			address: "员村二横路1号2层",
			height: 32,
			iconPath: undefined,
			id: 19,
			latitude: 23.12292,
			longitude: 113.361783,
			name: "东璟酒家(利口福东璟店)",
			width: 22
		},
		{
			address: "天源路180号",
			height: 32,
			iconPath: undefined,
			id: 18,
			latitude: 23.175774,
			longitude: 113.347848,
			name: "博纳大厦",
			width: 22,
			callout: {
				content: '博纳大夏',
				color: 'red',
				fontSize: 12,
				display: 'BYCLICK'
			}
		}
	]
}
// 账号：obor@kc5.net
// 密码：Zgzs2019.
