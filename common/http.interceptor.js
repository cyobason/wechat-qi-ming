import sha1 from "sha1";
// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'https://api.k86.cn',
		dataType: 'json',
		originalData: false,
		loadingText: '加载中',
	});
	// //请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		let time = Date.now();
		config.header.appKey = vm.globalData.appKey;
		config.header.appSecret = sha1(vm.globalData.appKey + 'UZ' + vm.globalData.appSecret + 'UZ' + time) +
			'.' + time;
		return config;
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if (res.detail) {
			switch (res.detail) {
				default:
					vm.disabled = false;
					vm.showMsg(res.detail);
					return false;
			}
		} else if (res.code == 0) {
			vm.disabled = false;
			vm.showMsg(res.msg);
			return false;
		} else {
			return res;
		}
	}
}

export default {
	install
}
