import Vue from 'vue'
import App from './App'
import util from './static/common/com.js'
Vue.config.productionTip = false
Vue.prototype.$util = util
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
