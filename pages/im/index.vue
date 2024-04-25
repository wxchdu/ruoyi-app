<template>
	<view class="page">
		<view :style="" style="width:100%;height:32px;background-color:#ffffff;z-index:999;" class="em"></view>
		<navigator style="height:40px;background-color:#ffffff;line-height:15px;z-index:999;" class="ux-flex e c">
			<view style="min-height:100%;height:100%;margin-left:15px;">
				<image border="0" src="https://xinvay.oss-cn-hangzhou.aliyuncs.com/DUTE-D-0/2023/06/24/2205106329264.png?x-oss-process=image/resize,w_500" style="width:100%;overflow:hidden;opacity:1.0;height:100%;padding-left:15px;padding:0px;border-radius:10px;"></image>
			</view>
			<view class="fixe e l" style="flex:1;min-height:100%;font-size:20px;font-weight:bold;padding-left:20px;width:135px;height:100%;">新微数字</view>
			<view style="width:138px;min-height:100%;height:100%;" class="row">
				<view class="col-4 e c" style="height:100%;">
					<icon class="iconfont icon-magic" style="font-size:25px;" type=""></icon>
				</view>
				<view class="col-4 e c" style="height:100%;">
					<icon class="iconfont icon-wang" style="font-size:25px;" type=""></icon>
				</view>
				<view class="col-4 e c" style="height:100%;">
					<icon class="iconfont icon-add" style="font-size:25px;" type=""></icon>
				</view>
			</view>
		</navigator>
		<view style="background-color:#ffffff;padding:5px;z-index:999;">
			<view style="height:35px;background-color:#eeeeee;padding-left:0px;padding-right:0px;margin-left:5px;margin-right:5px;border-radius:5px;margin:0px;margin-top:5px;width:365px;z-index:999;" class="e l">
				<icon class="iconfont icon-chazhao" style="font-size:20px;margin:5px;" type=""></icon>
				<view style="width:305px;height:30px;color:#666666;" class="e">[AI助理市场] 上线</view>
			</view>
		</view>
		<view style="position:fixed;width:100%;height:100%;top:0px;left:0px;z-index:998;background-color:rgba(0,0,0,0.70);flex-flow: column;" class="ux-flex" title="弹出层" v-if="showPopup">
			<view style="min-width:100%;height:116px;"></view>
			<view style="min-width:100%;height:266px;background-color:#ffffff;overflow:scroll;margin-left:7px;" class="rows">
				<view class="rows">
					<view>
						<view class="row" style="height:30px;">
							<view class="col-8 e" style="font-weight:bold;height:100%;padding:5px;">首页应用</view>
							<view class="col-4 row" style="height:100%;">
								<view class="col-6 e c" style="height:30px;width:60px;">编辑</view>
								<view class="col-6 e c" style="height:30px;width:59px;">收起</view>
							</view>
						</view>
					</view>
					<view>
						<view style="height:46px;" class="row">
							<view class="col-3 e c" style="width:79px;background-color:#dddddd;border-radius:10px;height:30px;margin:5px;" wx:for="4">日历</view>
						</view>
					</view>
				</view>
				<view class="rows" style="height:113px;">
					<view>
						<view class="row" style="height:30px;">
							<view class="col-8 e" style="font-weight:bold;height:100%;padding:5px;width:368px;">协同办公</view>
						</view>
					</view>
					<view>
						<view style="height:46px;" class="row">
							<view class="col-3 e c" style="width:79px;background-color:#dddddd;border-radius:10px;height:30px;margin:5px;" wx:for="6">文档</view>
						</view>
					</view>
				</view>
				<view class="rows">
					<view>
						<view class="row" style="height:30px;">
							<view class="col-8 e" style="font-weight:bold;height:100%;padding:5px;width:339px;">团队管理</view>
						</view>
					</view>
					<view>
						<view style="height:46px;" class="row">
							<view class="col-3 e c" style="width:79px;background-color:#dddddd;border-radius:10px;height:30px;margin:5px;">人事</view>
						</view>
					</view>
				</view>
				<view class="rows">
					<view>
						<view class="row" style="height:30px;">
							<view class="col-8 e" style="font-weight:bold;height:100%;padding:5px;width:339px;">业务流程</view>
						</view>
					</view>
					<view>
						<view style="height:46px;" class="row">
							<view class="col-3 e c" style="width:79px;background-color:#dddddd;border-radius:10px;height:30px;margin:5px;" wx:for="3">人事</view>
						</view>
					</view>
				</view>
			</view>
			<view class="fixe" style="min-width:100%;flex:1;" @click="showPopup=false"></view>
		</view>
		<view class="ux-flex" style="height:44px;flex-flow:column;">
			<view style="min-width:100%;height:30px;" class="row ux-b">
				<view class="col-0 c e" style="height:100%;color:#666666;">日历</view>
				<view class="col-0 e c" style="height:100%;color:#666666;">待办</view>
				<view class="col-0 e c" style="height:100%;color:#666666;">DING</view>
				<view class="col-0 e c" style="height:100%;color:#666666;">打卡</view>
				<view class="col-0 e c" style="height:100%;color:#666666;" @click="showPopup=true">更多</view>
			</view>
		</view>
		<view class="ux-flex" style="height:40px;">
			<view class="fixe" style="flex:1;min-height:100%;height:34px;">
				<scroll-view scroll-x="true" style="height:36px;overflow-y:hidden;overflow-x: overlay;">
					<view class="ux-nowarp" style="height:38px;">
						<view style="width:76px;min-height:100%;height:20px;">
							<view class="col-0 e c" style="height:25px;margin:5px;background-color:#91d5ff;border-radius:20px;width:52px;color:#0000ff;">全部</view>
						</view>
						<view style="width:74px;min-height:100%;">
							<view class="col-0 e c" style="height:25px;margin:5px;background-color:#e2e2e2;border-radius:20px;width:50px;">未读</view>
						</view>
						<view style="width:71px;min-height:100%;">
							<view class="col-0 e c" style="height:25px;margin:5px;background-color:#e2e2e2;border-radius:20px;width:50px;">@我</view>
						</view>
						<view style="width:76px;min-height:100%;">
							<view class="col-0 e c" style="height:25px;margin:5px;background-color:#e2e2e2;border-radius:20px;width:50px;">单聊</view>
						</view>
						<view style="width:80px;min-height:100%;">
							<view class="col-0 e c" style="height:25px;margin:5px;background-color:#e2e2e2;border-radius:20px;width:50px;">群聊</view>
						</view>
						<view style="width:80px;min-height:100%;">
							<view class="col-0 e c" style="height:25px;margin:5px;background-color:#e2e2e2;border-radius:20px;width:50px;">未读</view>
						</view>
						<view style="width:80px;min-height:100%;">
							<view class="col-0 e c" style="height:25px;margin:5px;background-color:#e2e2e2;border-radius:20px;width:50px;">未读</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view style="width:57px;min-height:100%;height:36px;" class="e c">
				<icon class="iconfont icon-sortlight" style="font-size:28px;" type=""></icon>
			</view>
		</view>
		<scroll-view scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered" @refresherrefresh="onRefresh" @scrolltolower="onBot">
			<view class="ux-wraper" style="background-color:#ffffff;">
				<navigator style="padding:5px 10px;" url="/pages/im/chat" open-type="navigate">
					<view class="ux-flex" style="height:55px;margin:5px 5px;">
						<view style="width:55px;min-height:100%;">
							<img border="0" src="../../assets/head.0.png" style="width:100%;height:100%;border-radius:10px;"></img>
						</view>
						<view class="fixe ux-flex" style="flex:1;min-height:100%;flex-flow: column;padding-left:10px;">
							<view style="min-width:100%;height:25px;" class="e l ux-flex">
								<view class="fixe" style="flex:1;min-height:100%;">
									<i18n text="天猫 - 唐晓加"></i18n>
								</view>
								<view style="min-height:100%;" class="e r">
									<i18n style="font-size:12px;" text="4月3日"></i18n>
								</view>
							</view>
							<view class="fixe" style="min-width:100%;flex:1;">
								<i18n style="font-size:11px;color:#808080;" text="文字内容"></i18n>
							</view>
						</view>
					</view>
				</navigator>
			</view>
		</scroll-view>
	</view>
</template>
<script type="module">
import utils from "../../lib/utils.js";
export default{
	data(){
		return {
			entity:{},//实体对象(定义变量)
			list:[],//数据列表(定义变量)
			vm:{"style":{"navigationBarTitleText":"消息","navigationStyle":"custom","backgroundColor":"#ffffff"}},
			triggered:true,
			showPopup:false,
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
					path:"/pages/im/index",
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
			path:"/pages/im/index",
			imageUrl:this.pageImageUrl,
			query:this.optionstr
		}
	},
	onShow:function(){
		if(this._onShow)this._onShow();
	},
}
</script>
