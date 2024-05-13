<template>
	<view class="page">
		<scroll-view scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered" @refresherrefresh="onRefresh" @scrolltolower="onBot">
			<view class="ux-wraper" style="background-color:#f7f7f7;">
				<view class="ux-flex t ux-m" style="padding:20px 10px;background-color:#ffffff;margin-bottom:5px;padding-right:25px;">
					<view style="width:48px;height:48px;border-radius:90px;margin:6px;overflow:hidden;background-color:#1890ff;" class="e c">
						<icon class="iconfont icon-form" style="font-size:32px;color:#ffffff;"></icon>
					</view>
					<view class="fixe" style="flex:1;min-height:100%;margin-left:10px;">
						<view class="ux-flex focus" style="padding:5px 0;">
							<view class="fixe l d" style="flex:1;min-height:100%;">
								<text style="font-size:16px;color:#000000;">列表项目的主标题，建议一行</text>
							</view>
							<view style="min-height:100%;padding:0px 15px;" class="c">
								<text style="font-size:16px;color:#E33731;font-weight:600;">300</text>
							</view>
						</view>
						<view class="l">
							<text style="text-align:left;font-size:12px;overflow:hidden;color:#808080;">列表项简介或者付标题，介意文字控制在两行以内，如果没有，可以不用显示</text>
						</view>
						<view class="ux-flex" style="padding:5px 0;">
							<view title="适应宽度" class="fixe d e" style="flex:1;min-height:100%;">
								<text style="font-size:12px;">00-00-00 00:00</text>
							</view>
							<view style="min-height:100%;padding:0px 15px;" class="d e">
								<text style="color:#808080;font-size:12px;">状态值</text>
							</view>
						</view>
					</view>
				</view>
				<view class="ux-data-empty" wx:if="{{!list.length || vm.dev}}" title="没有数据" style="margin-top:5px;">
					<view style="height:288px;" class="c b">
						<img src="../assets/empty.png" style="width:267px;height:234px;background-color:#E33731;" mode="scaleToFill"></img>
					</view>
					<view class="c" style="height:37px;">
						<span style="color:#999999;">当前没有数据！</span>
					</view>
					<view style="height:73px;" class="e c">
						<navigator style="background-color:#E33731;width:180px;height:44px;border-radius:90px;box-shadow:0 8px 8px rgba(0, 0, 0, 0.2);" class="e c" url="#" open-type="navigateBack">
							<span style="color:#ffffff;">返回</span>
						</navigator>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
<script type="module">
import utils from "../lib/utils.js";
export default {
	data() {
		return {
			entity:{},
			list:[]
		}
	},
	onLoad:function(options){//系统初始化
		utils._init(this,options);
	},
	methods: {
		
	}
}
</script>