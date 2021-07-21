<template>
	<view class="page">		
		<!-- #ifdef MP -->
		<!-- 小程序才编译 -->
		<view class="tips" :style="tipsShow ? '' : 'display:none;'" @click="closeTips">
			<view class="tipsJT"></view>
			<view class="tipsText">添加到我的小程序</view>
			<view class="tipsClose">X</view>
		</view>
		<!-- #endif -->
		<view class="u-text-center bold" style="margin-top:70rpx;font-size: 1.5rem;">{{title}}</view>
		<view class="soBox bs">
			<u-subsection :list="topBar" :current="index" @change="topBarChange" bg-color="#fff" button-color="#2979ff"
				active-color="#fff"></u-subsection>

			<block v-if="index == 0">
				<view class="soInput u-m-t-30 u-m-b-30">
					<u-input v-model="zi" maxlength="1" :border="true" :clearable="false" placeholder="请输入指定字(1个字)"
						height="100" />
				</view>
				<view class="soInput u-m-b-30">
					<u-input v-model="zishu" :border="true" type="select" @click="zishuShow = true" :clearable="false"
						placeholder="请选择字数" height="100" />
					<u-select v-model="zishuShow" mode="single-column" :list="zishuList" @confirm="zishuChange">
					</u-select>
				</view>
				<u-button type="primary" class="bold" @click="getList">{{title}}</u-button>
				<view class="soInfo u-m-t-30">
					<view>【<text class="c-error bold">{{appName}}</text>】为大家提供各类商标品牌起名。</view>
					<view>当消费者在了解公司的内容之前最先接触到的就是公司的名称，一个好听的公司名字就起到了非常重要的作用。</view>
				</view>
			</block>

			<block v-if="index == 1">
				<view class="soInput u-m-t-30 u-m-b-30">
					<u-input v-model="diqu" :border="true" :clearable="false" placeholder="请输入地区,如:惠州,广州,深圳"
						height="100" />
				</view>
				<view class="soInput u-m-b-30">
					<u-input v-model="hangye" :border="true" :clearable="false"
						placeholder="请输入行业词,如:科技,家具,软件,女装,五金,酒水,餐厅,奶茶等等" height="100" />
				</view>
				<view class="soInput u-m-b-30">
					<u-input v-model="zishu" :border="true" type="select" @click="zishuShow = true" :clearable="false"
						placeholder="请选择字数" height="100" />
					<u-select v-model="zishuShow" mode="single-column" :list="zishuList" @confirm="zishuChange">
					</u-select>
				</view>
				<u-button type="primary" class="bold" @click="getList">{{title}}</u-button>
				<view class="soInfo u-m-t-30">
					<view>【<text
							class="c-error bold">{{appName}}</text>】一个公司的名称很大程度上是决定了这个公司的品牌形象，因为公司名称是让消费者呼唤的，让消费者一目了然的。
					</view>
					<view>当消费者在了解公司的内容之前最先接触到的就是公司的名称，一个好听的公司名字就起到了非常重要的作用。</view>
				</view>
			</block>

			<block v-if="index == 2">
				<view class="soInput u-m-t-30 u-m-b-30">
					<u-input v-model="xing" :border="true" :clearable="false" placeholder="请输入您的姓氏" height="100" />
					<view class='soSex'>
						<view :class="sex == 1 ? 'soSexItem active' : 'soSexItem'" @click="radioChange('sex',1)">男
						</view>
						<view :class="sex == 0 ? 'soSexItem active' : 'soSexItem'" @click="radioChange('sex',0)">女
						</view>
					</view>
				</view>
				<view class="soInput u-m-b-30">
					<u-input v-model="shijianLabel" @click="shijianShow = true" :disabled="true" :border="true"
						:clearable="false" placeholder="请选择出生日期(公历)" height="100" />
					<u-picker v-model="shijianShow" mode="time" :params="shijianParam" @confirm="shijianChange">
					</u-picker>
				</view>
				<view class="soInput u-m-b-30">
					<u-input v-model="zi" maxlength="1" :border="true" :clearable="false" placeholder="请输入指定字(1个字)"
						height="100" :disabled="ziStatus" />
					<view class='soSex'>
						<view :class="dan == 0 ? 'soSexItem active' : 'soSexItem'" @click="radioChange('dan',0)">双
						</view>
						<view :class="dan == 1 ? 'soSexItem active' : 'soSexItem'" @click="radioChange('dan',1)">单
						</view>
					</view>
				</view>
				<u-button type="primary" class="bold" @click="getList">{{title}}</u-button>
				<view class="soInfo u-m-t-30">
					<view>【<text class="c-error bold">{{appName}}</text>】一个好名字伴随人的一生。</view>
					<view>父母给孩子起名，具有强烈的期望意义，希望孩子健康长寿，幸福快乐，凭借吉祥名字表达对美好生活的追求。</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				tipsShow: true,
				appName: app.globalData.title,
				//通用变量
				title: '',
				zi: '',
				zishu: 2,
				zishuShow: false,
				zishuList: [{
						label: 2,
						value: 2
					},
					{
						label: 3,
						value: 3
					},
					{
						label: 4,
						value: 4
					}
				],
				index: 2,
				//公司起名变量
				diqu: '',
				hangye: '',
				//宝宝起名变量
				dan: 0,
				ziStatus: false,
				sex: 1,
				xing: '',
				shijianLabel: '',
				shijianValue: '',
				shijianShow: false,
				shijianParam: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: false,
					second: false
				},
				topBar: [{
						name: '商标起名'
					},
					{
						name: '公司起名'
					},
					{
						name: '宝宝起名'
					}
				]
			}
		},
		onLoad() {
			this.title = this.topBar[this.index].name;
			//分享
			this.share(app.globalData.title);
		},
		methods: {
			getList() {
				let that = this;
				switch (that.index) {
					case 0:
						uni.navigateTo({
							url: '/pages/index/view?param=' + encodeURI(JSON.stringify({
								index: that.index,
								title: that.title,
								zi: that.zi,
								zishu: that.zishu
							}))
						});
						break;
					case 1:
						if (!that.hangye) {
							that.showMsg('请输入行业词,如:科技,家具,软件,女装,五金,酒水,餐厅,奶茶等等');
							return false;
						}
						uni.navigateTo({
							url: '/pages/index/view?param=' + encodeURI(JSON.stringify({
								index: that.index,
								title: that.title,
								diqu: that.diqu,
								hangye: that.hangye,
								zishu: that.zishu,
								limit: 1
							}))
						});
						break;
					case 2:
						if (!that.xing) {
							that.showMsg('请输入您的姓氏');
							return false;
						}
						if (!that.shijianValue) {
							that.showMsg('请选择出生日期(公历)');
							return false;
						}
						uni.navigateTo({
							url: '/pages/index/view?param=' + encodeURI(JSON.stringify({
								index: that.index,
								title: that.title,
								xing: that.xing,
								shiChen: that.shijianValue,
								sex: that.sex,
								dan: that.dan,
								zi: that.zi,
								limit: 1
							}))
						});
						break;
				}
			},
			topBarChange(e) {
				//通用初始化参数
				this.index = e;
				this.title = this.topBar[e].name;
				this.zi = '';
				this.zishu = 2;
				//公司起名初始化参数
				this.diqu = '';
				this.hangyi = '';
				//宝宝起名初始化参数
				this.dan = 0;
				this.ziStatus = false;
				this.sex = 1;
				this.xing = '';
				this.shijianLabel = '';
				this.shijianValue = '';
				this.shijianShow = false;
			},
			radioChange(k, v) {
				if (k == 'sex') {
					this.sex = v;
				}

				if (k == 'dan') {
					this.dan = v;
					if (v == 1) {
						this.zi = '';
						this.ziStatus = true;
					} else {
						this.ziStatus = false;
					}
				}
			},
			shijianChange(e) {
				this.shijianLabel = e.year + '年' + e.month + '月' + e.day + '日' + e.hour + '时'
				this.shijianValue = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':00'
			},
			zishuChange(e) {
				this.zishu = e[0].value;
			}
		}
	}
</script>

<style>

</style>
