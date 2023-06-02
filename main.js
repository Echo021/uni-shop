import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import { $http } from '@escook/request-miniprogram'

uni.$http = $http

//定义请求的基本地址
$http.baseUrl="https://api-hmugo-web.itheima.net"

$http.beforeRequest = function (options) {
  uni.showLoading({
  	"title":"加载中。。。"
  })
}

$http.afterRequest = function () {
  uni.hideLoading()
}

//自定义弹框事件
uni.$showMessage=function(title="数据请求失!",duration=1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif