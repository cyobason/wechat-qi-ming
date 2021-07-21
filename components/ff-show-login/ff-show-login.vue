<template>
	<u-popup v-model="showLogin" mode="center" border-radius="50" :mask-close-able="false">
		<view class="showLogin">
			<view class="showLogin_title">您还未登录</view>
			<view class="showLogin_des">请先登录再进行操作</view>
			<image :src="'/static/images/' + img + '.png'" mode="aspectFit"></image>
			<u-row justify="between">
				<u-col span="6">
					<u-button size="medium" type="error" plain @click="exitLogin">暂不登录</u-button>
				</u-col>
				<u-col span="6">
					<block v-if="showPhone && Object.keys(userinfo).length > 0">
						<u-button size="medium" type="success" open-type="getPhoneNumber"
							@getphonenumber="getPhoneNumber">手机授权</u-button>
					</block>
					<block v-else>
						<u-button size="medium" type="error" @click="getUserInfo">微信授权</u-button>
					</block>
				</u-col>
			</u-row>
		</view>
	</u-popup>
</template>

<script>
	const app = getApp();
	export default {
		name: 'login',
		props: {
			showLogin: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				img: 'login',
				showPhone: false,
				userinfo: {}
			}
		},
		methods: {
			exitLogin() {
				//暂不登录
				uni.removeStorageSync('userinfo');
				this.showPhone = false;
				this.img = 'login';
				uni.$emit('login', {
					showLogin: false,
					userinfo: {}
				});
			},
			getUserInfo(e) {
				let that = this;
				uni.getUserProfile({
					desc: '获取用户信息授权',
					lang: 'zh_CN',
					success: function(res) {
						let sexType = ['未知', '男', '女'];
						let sex = sexType[res.userInfo.gender];
						that.userinfo = {
							openid: '',
							nickname: res.userInfo.nickName,
							avatar: res.userInfo.avatarUrl,
							sex: sex,
							country: res.userInfo.country,
							province: res.userInfo.province,
							city: res.userInfo.city,
							phone: '',
							info: ''
						};
						that.showPhone = true;
					}
				});
			},
			getPhoneNumber(e) {
				let that = this;
				if (typeof e.detail.iv != 'undefined') {
					uni.login({
						provider: 'weixin',
						success: function(code) {
							that.post(app.globalData.api_url + '/api/kuaiqiming/login', {
								code: code.code,
								userinfo: JSON.stringify(that.userinfo),
								iv: e.detail.iv,
								content: e.detail.encryptedData
							}, function(rss) {
								that.showMsg(rss.msg, 'success', function() {
									uni.clearStorageSync();
									app.globalData.userinfo = rss.data;
									uni.setStorageSync('userinfo', rss.data);
									uni.$emit('login', {
										showLogin: false,
										userinfo: rss.data
									});
								});
							}, 'post');
						}
					});
				}
			}
		}
	}
</script>
