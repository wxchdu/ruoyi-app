<template>
	<view class="page">
		<scroll-view scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered" @refresherrefresh="onRefresh" @scrolltolower="onBot">
			<view class="ux-wraper" style="background-color:#f7f7f7;">
				<view class="ux-flex t ux-m" style="padding:20px 10px;background-color:#ffffff;margin-bottom:5px;padding-right:25px;">
					<view style="width:48px;height:48px;border-radius:90px;margin:6px;overflow:hidden;background-color:#1890ff;" class="e c">
						<icon class="iconfont icon-form" style="font-size:32px;color:#ffffff;" type=""></icon>
					</view>
					<view class="fixe" style="flex:1;min-height:100%;margin-left:10px;">
						<view class="ux-flex" style="padding:5px 0;">
							<view class="fixe l d" style="flex:1;min-height:100%;">
								<i18n style="font-size:16px;color:#000000;" text="列表项目的主标题，建议一行"></i18n>
							</view>
							<view style="min-height:100%;padding:0px 15px;" class="c">
								<i18n style="font-size:16px;color:#E33731;font-weight:600;" text="300"></i18n>
							</view>
						</view>
						<view class="l">
							<i18n style="text-align:left;font-size:12px;overflow:hidden;color:#808080;" text="列表项简介或者付标题，介意文字控制在两行以内，如果没有，可以不用显示"></i18n>
						</view>
						<view class="ux-flex" style="padding:5px 0;">
							<view class="fixe d e" style="flex:1;min-height:100%;">
								<i18n style="font-size:12px;" text="00-00-00 00:00"></i18n>
							</view>
							<view style="min-height:100%;padding:0px 15px;" class="d e">
								<i18n style="color:#808080;font-size:12px;" text="状态值"></i18n>
							</view>
						</view>
					</view>
				</view>
				<view class="ux-data-empty" v-if="!list.length || vm.dev" title="没有数据" style="margin-top:5px;">
					<view style="height:288px;" class="c b">
						<img src="../../assets/empty.png" style="width:267px;height:234px;background-color:#E33731;" mode="scaleToFill"></img>
					</view>
					<view class="c" style="height:37px;">
						<i18n style="color:#999999;" text="当前没有数据！"></i18n>
					</view>
					<view style="height:73px;" class="e c">
						<navigator style="background-color:#E33731;width:180px;height:44px;border-radius:90px;box-shadow:0 8px 8px rgba(0, 0, 0, 0.2);" class="e c" url="#" open-type="navigateBack">
							<i18n style="color:#ffffff;" text="返回"></i18n>
						</navigator>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
<script type="module">
import utils from "../../lib/utils.js";
export default{
	data(){
		return {
			entity:{},
			list:[],
			vm:{"style":{"navigationBarTitleText":"我的","navigationStyle":"custom"}},
			triggered:true,
		}
	},
	onLoad:function(options){
		utils._init(this,options);
	},
	methods:{
		onExecute:function(options){
			/** <自动页面初始化加载数据> **/
			/** </自动页面初始化加载数据> **/
			this.onInitialize(options);
		},
		onInitialize:function(options){
			//在此添加你的页面初始化数据...
		},
	},
	onShareAppMessage:function(options){
	    const promise = new Promise(resolve => {
			utils.request({
				url:'/api/lib/share.vo',
				data:{
					title:this.pageTitle||this.getLang("","{title}"),
					path:"/pages/my/index",
					options:this.__options__
				},
				success:(protocol)=>{
					if(protocol.success){
						resolve(protocol.data)
					}
				}
			});
	    })
	    return {promise};
	},
	onShareTimeline:function(options){
		return {
			title:this.pageTitle||this.getLang("","{title}"),
			path:"/pages/my/index",
			imageUrl:this.pageImageUrl,
			query:this.optionstr
		}
	},
	onShow:function(){
		if(this._onShow)this._onShow();
	},
}
</script>
