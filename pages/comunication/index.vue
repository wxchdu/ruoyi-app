<template>
	<view class="page">
		<view :style="" style="width:100%;height:25px;background-color:#ffffff;" class="em"></view>
		<view class="ux-flex" style="height:66px;background-color:#ffffff;">
			<view class="fixe e" style="flex:1;min-height:100%;font-weight:bold;font-size:19px;padding:0px 15px;">新微数字二零二四组</view>
			<view style="width:57px;min-height:100%;height:59px;" class="e c">
				<icon class="iconfont icon-my" style="font-size:28px;" type=""></icon>
			</view>
		</view>
		<scroll-view scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered" style="background-color:#f2f2f2;" @refresherrefresh="onRefresh" @scrolltolower="onBot">
			<view class="ux-wraper" style="background-color:#f2f2f2;margin-top:0px;margin-left:0px;margin-bottom:0px;margin-right:0px;">
				<view title="组织" style="height:200px;margin-right:1px;background-color:#ffffff;border-radius:10px;margin:10px 15px;" class="rows">
					<view style="height:33%;border-radius:10px;" class="ux-flex">
						<view style="width:65px;min-height:100%;" class="e c">
							<icon class="iconfont icon-peoplefill" style="font-size:31px;border-radius:5px;background-color:#ceeeff;color:#2196fc;padding:4px;" :style="" type=""></icon>
						</view>
						<view class="fixe e ux-flex" style="flex:1;min-height:100%;font-weight:bold;">
							<view class="fixe e" style="flex:1;min-height:100%;height:35px;font-size:17px;font-weight:600;">我的好友</view>
							<view style="width:51px;min-height:100%;height:35px;" class="e c">
								<icon class="iconfont icon-gengduo2" type=""></icon>
							</view>
						</view>
					</view>
					<view style="height:33%;border-radius:10px;" class="ux-flex">
						<view style="width:65px;min-height:100%;" class="e c">
							<icon class="iconfont icon-discover" style="font-size:31px;border-radius:5px;background-color:#ffe8b4;color:#ff7a45;padding:4px;" :style="" type=""></icon>
						</view>
						<view class="fixe e" style="flex:1;min-height:100%;font-weight:bold;">
							<view class="fixe e ux-flex" style="flex:1;min-height:100%;font-weight:bold;">
								<view class="fixe e" style="flex:1;min-height:100%;height:35px;font-size:17px;">好友推荐</view>
								<view style="width:51px;min-height:100%;height:35px;" class="e c">
									<icon class="iconfont icon-gengduo2" type=""></icon>
								</view>
							</view>
						</view>
					</view>
					<view style="height:33%;border-radius:10px;" class="ux-flex">
						<view style="width:65px;min-height:100%;" class="e c">
							<icon class="iconfont icon-attentionfavorfill-copy" style="font-size:31px;border-radius:5px;background-color:#caf4aa;color:#389e0d;padding:4px;" :style="" type=""></icon>
						</view>
						<view class="fixe e" style="flex:1;min-height:100%;font-weight:bold;">
							<view class="fixe e ux-flex" style="flex:1;min-height:100%;font-weight:bold;">
								<view class="fixe e" style="flex:1;min-height:100%;height:35px;font-size:17px;">同事列表</view>
								<view style="width:51px;min-height:100%;height:35px;" class="e c">
									<icon class="iconfont icon-gengduo2" type=""></icon>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view title="组织" style="height:200px;background-color:#ffffff;border-radius:10px;margin:10px 15px;" class="rows">
					<view class="ux-flex t l" style="height:30px;flex-flow:column;padding:10px;color:#b3b3b3;">
						<i18n text="企业内"></i18n>
					</view>
					<view style="height:55px;border-radius:10px;" class="ux-flex">
						<view>
							<view style="width:65px;min-height:100%;" class="e c">
								<icon class="iconfont icon-jichuguanli" style="font-size:31px;border-radius:5px;background-color:#87c8ff;color:#ffffff;padding:4px;margin:0px;line-height:NaN;" :style="" type=""></icon>
							</view>
						</view>
						<view class="fixe e ux-flex" style="flex:1;min-height:100%;font-weight:bold;">
							<svgw></svgw>
							<view class="fixe e ux-flex" style="flex:1;min-height:100%;height:50px;font-size:17px;width:149px;flex-flow: column;">
								<view style="min-width:100%;height:27px;padding-bottom:3px;" class="b">
									<i18n style="height:19px;" text="新微数字二零二四组"></i18n>
									<view style="width:29px;height:22px;" class="l t">
										<icon class="iconfont icon-gengduo" style="color:#c2c2c2;font-size:14px;line-height:12px;" type=""></icon>
									</view>
								</view>
								<view class="ux-flex l" style="height:23px;width:100%;">
									<view style="width:49px;min-height:100%;">
										<view style="font-size:11px;border-width:1px;border-color:#c2c2c2;background-color:#ffffff;box-shadow:0 3 10px rgba(0, 0, 0, 0.1);border-style:solid;padding:5px;width:45px;height:15px;margin:5px;border-radius:5px;margin-right:8px;color:#b3b3b3;" class="c e">
											<i18n text="未认证"></i18n>
										</view>
									</view>
									<view class="fixe" style="flex:1;min-height:100%;">
										<view style="font-size:11px;border-width:1px;border-color:#c2c2c2;background-color:#ffffff;box-shadow:0 3 10px rgba(0, 0, 0, 0.1);border-style:solid;padding:5px;width:45px;height:15px;margin:5px;border-radius:5px;margin-right:8px;color:#b3b3b3;" class="e c">
											<i18n text="已认证"></i18n>
										</view>
									</view>
								</view>
							</view>
							<view style="width:75px;min-height:100%;height:35px;border-width:1px;border-color:#000000;border-top-width:1px;border-right-width:1px;border-bottom-width:1px;border-left-width:1px;" class="e c">
								<view style="font-size:15px;border-width:1px;border-color:#c2c2c2;background-color:#ffffff;box-shadow:0 3 10px rgba(0, 0, 0, 0.1);border-style:solid;padding:5px;width:60px;height:30px;border-radius:5px;margin-right:14px;" class="e c">
									<i18n style="color:#999999;" text="邀请"></i18n>
								</view>
							</view>
						</view>
					</view>
					<view style="height:55px;border-radius:10px;" class="ux-flex">
						<view style="width:65px;min-height:100%;" class="e c">
							<icon class="iconfont icon-peoplefill" style="font-size:38px;border-radius:5px;background-color:#ffffff;color:#ffffff;" :style="" type=""></icon>
						</view>
						<view class="fixe e" style="flex:1;min-height:100%;font-weight:bold;">
							<view class="fixe e ux-flex" style="flex:1;min-height:100%;font-weight:bold;">
								<view class="fixe e" style="flex:1;min-height:100%;height:35px;font-size:17px;">组织机构</view>
							</view>
						</view>
					</view>
					<view style="height:55px;border-radius:10px;" class="ux-flex">
						<view>
							<view style="width:65px;min-height:100%;font-size:40px;" class="e c">
								<icon class="iconfont icon-peoplefill" style="font-size:38px;border-radius:5px;background-color:#ffffff;color:#ffffff;" :style="" type=""></icon>
							</view>
						</view>
						<view class="fixe e" style="flex:1;min-height:100%;font-weight:bold;">
							<view class="fixe e ux-flex" style="flex:1;min-height:100%;font-weight:bold;">
								<view class="fixe e" style="flex:1;min-height:100%;height:35px;font-size:17px;">AI助理</view>
							</view>
						</view>
					</view>
				</view>
				<view title="组织" style="height:100px;background-color:#ffffff;border-radius:10px;margin:10px 15px;" class="rows">
					<view class="ux-flex t l" style="height:30px;flex-flow:column;padding:10px;color:#b3b3b3;">
						<i18n text="企业间"></i18n>
					</view>
					<view style="height:65px;border-radius:10px;" class="ux-flex">
						<view style="width:65px;min-height:100%;font-size:38px;" class="e c">
							<icon class="iconfont icon-fuzhi1" style="font-size:31px;border-radius:5px;background-color:#fee2b2;color:#ff7a45;padding:4px;" :style="" type=""></icon>
						</view>
						<view class="fixe e ux-flex" style="flex:1;min-height:100%;font-weight:bold;">
							<view class="fixe e" style="flex:1;min-height:100%;height:35px;font-size:17px;">企典</view>
							<view style="width:51px;min-height:100%;height:35px;" class="e c">
								<icon class="iconfont icon-gengduo2" type=""></icon>
							</view>
						</view>
					</view>
				</view>
				<view title="组织" style="height:200px;background-color:#ffffff;border-radius:10px;margin:10px 15px;" class="rows">
					<view style="height:65px;border-radius:10px;" class="ux-flex">
						<view style="width:65px;min-height:100%;font-size:38px;" class="e c">
							<icon class="iconfont icon-search" style="font-size:31px;border-radius:5px;background-color:#ceefff;color:#0000ff;padding:4px;" :style="" type=""></icon>
						</view>
						<view class="fixe e ux-flex" style="flex:1;min-height:100%;font-weight:bold;">
							<view class="fixe e" style="flex:1;min-height:100%;height:35px;font-size:17px;">企典</view>
							<view style="width:51px;min-height:100%;height:35px;" class="e c">
								<icon class="iconfont icon-gengduo2" type=""></icon>
							</view>
						</view>
					</view>
					<view style="height:65px;border-radius:10px;" class="ux-flex">
						<view style="width:65px;min-height:100%;" class="e c">
							<icon class="iconfont icon-newshot" style="font-size:31px;border-radius:5px;background-color:#ceefff;color:#0000ff;padding:4px;" :style="" type=""></icon>
						</view>
						<view class="fixe e" style="flex:1;min-height:100%;font-weight:bold;">
							<view class="fixe e ux-flex" style="flex:1;min-height:100%;font-weight:bold;">
								<view class="fixe e" style="flex:1;min-height:100%;height:35px;font-size:17px;">服务窗</view>
								<view style="width:51px;min-height:100%;height:35px;" class="e c">
									<icon class="iconfont icon-gengduo2" type=""></icon>
								</view>
							</view>
						</view>
					</view>
					<view style="height:65px;border-radius:10px;" class="ux-flex">
						<view style="width:65px;min-height:100%;" class="e c">
							<view style="font-size:15px;width:40px;height:40px;background-color:#91d5ff;border-radius:5px;" class="e c">
								<icon class="iconfont icon-tongyonggengduo" style="font-size:31px;line-height:NaN;color:#1890ff;background-color:#ceefff;border-radius:5px;padding:4px;" type=""></icon>
							</view>
						</view>
						<view class="fixe e" style="flex:1;min-height:100%;font-weight:bold;">
							<view class="fixe e ux-flex" style="flex:1;min-height:100%;font-weight:bold;">
								<view class="fixe e" style="flex:1;min-height:100%;height:35px;font-size:17px;">更多</view>
								<view style="width:51px;min-height:100%;height:35px;" class="e c">
									<icon class="iconfont icon-gengduo2" type=""></icon>
								</view>
							</view>
						</view>
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
			vm:{"style":{"navigationBarTitleText":"通讯录","navigationStyle":"custom"}},
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
					path:"/pages/comunication/index",
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
			path:"/pages/comunication/index",
			imageUrl:this.pageImageUrl,
			query:this.optionstr
		}
	},
	onShow:function(){
		if(this._onShow)this._onShow();
	},
}
</script>
