import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import moment from "moment";
// 引入uView对小程序分享的mixin封装
let mpShare = require('uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare);
Vue.use(uView);
Vue.config.productionTip = false
App.mpType = 'app'
/**
 * 分享
 */
Vue.prototype.share = function(title = '', path = '', image = '') {
	// 该对象已集成到this.$u中，内部属性如下
	this.$u.mpShare = {
		title: title == '' ? app.globalData.title : title, // 默认为小程序名称，可自定义
		path: path, // 默认为当前页面路径，一般无需修改，QQ小程序不支持
		// 分享图标，路径可以是本地文件路径、代码包文件路径或者网络图片路径。
		// 支持PNG及JPG，默认为当前页面的截图
		imageUrl: image
	}
}
/**
 * moment.js日期处理类
 */
Vue.prototype.$date = moment();
/**
 * 通用Post
 */
Vue.prototype.post = function(url, param = {}, callback, type = 'get') {
	let that = this;
	uni.showLoading({
		title: "加载中"
	});
	if (type == 'get') {
		that.$u.get(url, {
			...param
		}).then(res => {
			if (callback) {
				callback(res);
			} else {
				return res;
			}
		}).catch(err => {});
	} else {
		that.$u.post(url, {
			...param
		}).then(res => {
			if (callback) {
				callback(res);
			} else {
				return res;
			}
		}).catch(err => {});
	}
}

/**
 * 通用提示
 */
Vue.prototype.showMsg = function(msg, status = 'none', callback, time = 1500) {
	uni.showToast({
		title: msg,
		icon: status,
		duration: time,
		success: () => {
			if (callback) {
				setTimeout(function() {
					callback();
				}, time - 100);
			}
		}
	});
	return false;
}
/**
 * 统一跳转
 */
Vue.prototype.jump = function(url = '', type = 'nt', def = '/') {
	switch (type) {
		case 'nt':
			uni.navigateTo({
				url: def + 'pages/' + url
			});
			break;
		case 'rt':
			uni.redirectTo({
				url: def + 'pages/' + url
			});
			break;
		case 'rl':
			uni.reLaunch({
				url: def + 'pages/' + url
			});
			break;
		case 'nb':
			uni.navigateBack({
				delta: url
			});
			break;
		case 'st':
			uni.switchTab({
				url: def + 'pages/' + url
			});
			break;
	}
}
/**
 * \n转成<br/>
 */
Vue.prototype.nl2br = function(str) {
	if (str) {
		str = str.replace(/\\r\\n/ig, '<br/>');
		str = str.replace(/\r\n/ig, '<br/>');
		str = str.replace(/\\r/ig, '<br/>');
		str = str.replace(/\r/ig, '<br/>');
		str = str.replace(/\\n/ig, '<br/>');
		str = str.replace(/\n/ig, '<br/>');
		return str;
	} else {
		return '';
	}
}

Vue.prototype.closeTips = function() {
	this.tipsShow = false;
}
const app = new Vue({
	...App
})
// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from '@/common/http.interceptor.js';
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app);
app.$mount()
