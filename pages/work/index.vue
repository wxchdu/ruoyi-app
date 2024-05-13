<template>
	<view class="page">
		<view :style="" style="width:100%;height:25px;background-color:#91d5ff;" class="em"></view>
		<view class="ux-flex row rows" style="height:220px;background-color:#91d5ff;">
			<view style="width:100%;height:33%;" class="ux-flex">
				<view class="fixe e" style="flex:1;min-height:100%;font-weight:bold;font-size:21px;padding-left:15px;">新微数字二零二四组</view>
				<view style="min-height:100%;height:54px;width:120px;" class="row">
					<view class="col-6 r e" style="height:100%;">
						<icon class="iconfont icon-tubiao2" style="font-size:28px;" type=""></icon>
					</view>
					<view class="col-6 e" style="height:100%;font-weight:bold;">应用中心</view>
				</view>
			</view>
			<view style="width:100%;height:37px;border-radius:10px;background-color:#f7f7f7;margin:15px;margin-top:0px;margin-bottom:0px;" class="row">
				<view class="col-2 e r" style="height:100%;width:36px;color:#b3b3b3;">
					<icon class="iconfont icon-chazhao" style="font-size:20px;margin-right:5px;" type=""></icon>
				</view>
				<view class="col-10 e" style="height:100%;color:#999999;">搜索</view>
			</view>
			<view style="width:100%;height:33%;" class="row">
				<view class="col-10 ux-flex" style="height:100%;">
					<view style="width:80px;min-height:100%;font-weight:bold;color:#666666;" class="e c">常用</view>
					<view class="fixe e l" style="flex:1;min-height:100%;font-weight:bold;">全员</view>
				</view>
				<view class="col-2 e c" style="height:100%;">
					<icon class="iconfont icon-sortlight" style="font-size:28px;" type=""></icon>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered" style="background-color:#ffffff;" @refresherrefresh="onRefresh" @scrolltolower="onBot">
			<view style="height:133px;background:-webkit-linear-gradient(top,#91d5ff 0%,#eeeeee 100%);">
				<view title="公告" style="height:130px;background-color:#1890ff;color:#ffffff;padding-left:20px;opacity:1.0;margin:8px;margin-top:0px;border-radius:10px;margin-bottom:8px;" class="e l row">
					<i18n class="col-6 d e" style="height:100%;font-weight:bold;font-size:20px;" text="打造数字化组织\n从工作台开始"></i18n>
					<view class="col-6 r b" style="height:100%;width:165px;">
						<view style="height:20px;padding:3px 10px;margin:10px;background-color:rgba(255,255,255,0.40);border-radius:3px;padding-right:8px;" class="e c">
							<i18n style="font-size:11px;" text="全部公告"></i18n>
							<view class="e c" style="width:12px;height:12px;">
								<icon class="iconfont icon-right" style="font-size:12px;margin-top:2px;margin-bottom:9px;" type=""></icon>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="ux-wraper" style="background-color:#f2f2f2;">
				<view class="row" style="width:100%;background-color:#eeeeee;">
					<view class="col-6" style="">
						<view class="row" style="margin:8px;background:-webkit-linear-gradient(left,#40a9ff 0%,#91d5ff 100%);border-radius:10px;margin-top:5px;margin-bottom:5px;margin-right:5px;">
							<view class="col-9 e l" style="height:69px;padding:15px;">
								<i18n style="color:#ffffff;font-size:18px;" text="考勤打卡"></i18n>
							</view>
							<view class="col-9 e l" style="height:69px;padding:15px;width:43px;">
								<icon class="iconfont icon-refresharrow" style="transform: rotateX(0deg) rotateY(0deg) rotateZ(-90deg) translateY(0px);color:#0000ff;" type=""></icon>
							</view>
						</view>
					</view>
					<view class="col-6" style="">
						<view class="row" style="margin:8px;background:-webkit-linear-gradient(left,#40a9ff 0%,#91d5ff 100%);border-radius:10px;height:69px;margin-left:5px;margin-top:5px;margin-bottom:5px;">
							<view class="col-9 e" style="height:69px;">
								<i18n style="padding:15px;color:#ffffff;font-size:18px;" text="签到"></i18n>
							</view>
							<view class="col-9 e l" style="height:69px;padding:15px;width:43px;">
								<icon class="iconfont icon-refresharrow" style="transform: rotateX(0deg) rotateY(0deg) rotateZ(-90deg) translateY(0px);color:#0000ff;" type=""></icon>
							</view>
						</view>
					</view>
				</view>
				<view title="常用" style="height:200px;background-color:#ffffff;border-radius:10px;margin:8px;margin-top:5px;" class="ux-flex row l t">
					<view class="col-3 l ux-flex" style="height:91px;flex-flow: column;" wx:for="8">
						<view style="min-width:100%;height:67px;" class="c b">
							<icon class="iconfont icon-peoplefill" style="font-size:48px;background-color:#ffd591;color:#ff0000;border-radius:5px;" type=""></icon>
						</view>
						<view class="fixe e c" style="min-width:100%;flex:1;">0A审批</view>
					</view>
				</view>
				<view title="200" style="height:400px;margin:8px;border-radius:10px;background-color:#ffffff;flex-flow: column;" class="ux-flex">
					<view style="min-width:100%;height:42px;" class="ux-flex">
						<view class="fixe row e c" style="flex:1;min-height:100%;">
							<i18n class="col-0 e c" style="font-weight:bold;height:100%;" text="行政"></i18n>
							<i18n class="col-0 e c" style="font-weight:bold;height:100%;color:#666666;" text="人事"></i18n>
							<i18n class="col-0 e c" style="font-weight:bold;height:100%;color:#666666;" text="财务"></i18n>
							<i18n class="col-0 e c" style="font-weight:bold;height:100%;color:#666666;" text="销售"></i18n>
							<i18n class="col-0 e c" style="font-weight:bold;height:100%;color:#666666;" text="未分组"></i18n>
						</view>
						<view style="width:44px;min-height:100%;height:100%;" class="e c">
							<icon class="iconfont icon-sortlight" style="font-size:28px;" type=""></icon>
						</view>
					</view>
					<view class="fixe" style="min-width:100%;flex:1;">
						<view class="col-3 l ux-flex" style="height:100px;flex-flow: column;width:60px;margin:5px;" wx:for="15">
							<view style="min-width:100%;height:56.69230769230769px;width:77px;" class="e c">
								<icon class="iconfont icon-shouye-copy" style="font-size:47px;background-color:#FF5722;border-radius:5px;" type=""></icon>
							</view>
							<view class="fixe e c" style="min-width:100%;flex:1;">企业综合防疫方案</view>
						</view>
					</view>
				</view>
				<view title="打卡" style="height:200px;flex-flow: column;background-color:#ffffff;border-radius:10px;margin:8px;padding:5px 10px;" class="ux-flex">
					<view style="min-width:100%;height:75px;flex-flow: column;" class="ux-flex">
						<view style="min-width:100%;height:40px;padding-top:10px;" class="ux-flex">
							<view style="width:26px;min-height:100%;" class="e l">
								<view>
									<view style="background-color:#1890ff;width:23px;height:21px;border-radius:5px;" class="e c">
										<icon class="iconfont icon-calendar" style="font-size:15px;border-radius:5px;color:#ffffff;padding:3px;" type=""></icon>
									</view>
								</view>
							</view>
							<view class="fixe e l" style="flex:1;min-height:100%;font-weight:bold;">
								<i18n style="font-size:15px;" text="考勤打卡"></i18n>
								<icon class="iconfont icon-gengduo" style="color:#b3b3b3;margin:5px;" type=""></icon>
							</view>
						</view>
						<view class="fixe ux-flex" style="min-width:100%;flex:1;">
							<view style="width:23px;min-height:100%;" class="e c">
								<icon class="iconfont icon-countdown" style="font-size:17px;color:#999999;" type=""></icon>
							</view>
							<view class="fixe e" style="flex:1;min-height:100%;">
								<i18n style="color:#808080;font-size:13px;" text="上下班时间 09:00-18:00"></i18n>
							</view>
						</view>
					</view>
					<view class="fixe row" style="min-width:100%;flex:1;">
						<view class="row" style="width:100%;">
							<view class="col-6" style="padding:4px;">
								<view class="ux-flex" style="height:63px;flex-flow: column;background-color:#f2f2f2;border-radius:5px;padding:1px;margin-right:0px;">
									<view style="min-width:100%;height:35px;font-size:20px;padding:9px;" class="t">
										<i18n style="font-size:18px;margin:0px;font-weight:bold;margin-right:5px;" text="上班09:00"></i18n>
									</view>
									<view class="fixe l b" style="min-width:100%;flex:1;padding:10px;">
										<i18n style="color:#4d4d4d;" text="08:59已打卡"></i18n>
									</view>
								</view>
							</view>
							<view class="col-6" style="padding:4px;">
								<view class="ux-flex" style="height:63px;flex-flow: column;background-color:#f2f2f2;border-radius:5px;padding:1px;margin-left:0px;">
									<view style="min-width:100%;height:35px;font-size:20px;padding:9px;" class="t">
										<i18n style="font-size:18px;font-weight:bold;" text="下班18:00"></i18n>
									</view>
									<view class="fixe l b" style="min-width:100%;flex:1;padding:10px;">
										<i18n style="color:#4d4d4d;" text="未打卡"></i18n>
									</view>
								</view>
							</view>
						</view>
						<view class="col-6 ux-flex" style="height:63px;flex-flow: column;background-color:#f2f2f2;border-radius:5px;padding:1px;margin:4px;margin-left:0px;">
							<view style="min-width:100%;height:35px;font-size:20px;padding:9px;" class="t">
								<i18n style="font-size:18px;font-weight:bold;" text="下班18:00"></i18n>
							</view>
							<view class="fixe l b" style="min-width:100%;flex:1;padding:10px;">
								<i18n style="color:#4d4d4d;" text="未打卡"></i18n>
							</view>
						</view>
					</view>
					<view style="min-width:100%;height:50px;margin:0px 10px;" class="row">
						<view class="col-6 e c" style="height:51px;">
							<view class="row" style="border-width:1px;border-color:#9254de;border-style:solid;height:36px;margin:5px;border-radius:5px;width:100%;">
								<view class="col-3 e c" style="height:100%;">
									<icon class="iconfont icon-magic1" style="color:#2548ad;" type=""></icon>
								</view>
								<i18n class="col-9 e l" style="height:100%;" text="体验人事AI助理"></i18n>
							</view>
						</view>
						<view class="col-6 e c" style="height:51px;">
							<view class=" d e c" style="height:36px;font-size:16px;color:#ffffff;background-color:#1890ff;border-radius:5px;width:100%;margin:5px;">去打卡</view>
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
			vm:{"style":{"navigationBarTitleText":"工作台","navigationBarBackgroundColor":"#f7f7f7","navigationStyle":"custom"}},
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
					path:"/pages/work/index",
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
			path:"/pages/work/index",
			imageUrl:this.pageImageUrl,
			query:this.optionstr
		}
	},
	onShow:function(){
		if(this._onShow)this._onShow();
	},
}
</script>
