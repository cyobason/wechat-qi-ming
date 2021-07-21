<script>
	const update = uni.getUpdateManager();
	export default {
		globalData: {
			title: '快起名',
			api_url: 'https://www.k86.cn',
			appKey: '',
			appSecret: '',
			weixin: {
				appKey: '',
				appSecret: ''
			},
			winH: 0,
			version: '1.0.4',
			userinfo: {}
		},
		onLaunch: function() {
			this.globalData.winH = uni.getSystemInfoSync().windowHeight;
			//#ifdef MP
			update.onCheckForUpdate(function(res) {
				if (res.hasUpdate) {
					//微信小程序/支付宝小程序/百度小程序/字节跳动小程序/QQ小程序/360小程序 # 条件更新处理
					update.onUpdateReady(function(res) {
						uni.showModal({
							title: '更新提示',
							content: '新版本已经准备好，请重启应用！',
							showCancel: false,
							success(res) {
								if (res.confirm) {
									//清空本地缓存的查询记录
									uni.clearStorageSync();
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									update.applyUpdate();
								}
							}
						});
					});
				}
			});
			//#endif
			this.globalData.userinfo = uni.getStorageSync('userinfo');
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	@import 'static/css/style.css';
</style>
