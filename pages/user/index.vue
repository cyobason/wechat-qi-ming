<template>
	<view class="page">
		<view class="userBox">
			<block v-if="Object.keys(userinfo).length > 0">
				<view class="userAvatar">
					<open-data type="userAvatarUrl"></open-data>
				</view>
				<view class="userInfo c-info">
					<view class="u-m-b-10">
						<open-data type="userNickName"></open-data>
					</view>
					<view>
						{{userinfo.info ? userinfo.info : '这个人很懒,啥也没写'}}
					</view>
				</view>
			</block>
			<block v-else>
				<view class="userAvatar" @click="getLogin">
					<image src="/static/images/avatar.png"></image>
				</view>
				<view class="userInfo c-info" @click="showLogin = true">
					<view class="u-m-b-10">
						未登录
					</view>
					<view>
						点击登录授权
					</view>
				</view>
			</block>
		</view>
		<u-cell-group class="u-m-t-20">
			<u-cell-item title="版本号" :value="version" :arrow="false" hover-class="none"></u-cell-item>
		</u-cell-group>		
		<!-- #ifdef MP -->
		<!-- 小程序才有的弹窗授权 -->
		<ff-show-login :showLogin="showLogin"></ff-show-login>
		<!-- #endif -->
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				showLogin: false,
				userinfo: app.globalData.userinfo,
				version: app.globalData.version,
			}
		},
		onLoad() {
			let that = this;
			uni.$on('login', function(res) {
				that.showLogin = res.showLogin;
				that.userinfo = res.userinfo;
			});
		},
		onShow() {

		},
		onUnload() {
			uni.$off('login');
		},
		methods: {

		}
	}
</script>

<style>

</style>
