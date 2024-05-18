<template>
	<view class="page">
		<scroll-view scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered" form="creatTodo" @refresherrefresh="onRefresh" @scrolltolower="onBot">
			<view class="ux-flex" style="height:60px;background-color:#ffffff;;padding:0px 15px;">
				<view style="min-width:72px;min-height:100%;padding-left:15px;" class="e r ux-b">
					<text style="color:#333333;font-size: 14px;font-weight:bold;">所属项目</text>
				</view>
				<view class="fixe e ux-b" style="flex:1;height:100%;padding-left:15px;font-size:16px">
					<combox :readonly="false" input="query" v-model="project" :text="project$" title="所属项目" type="default" style="height:100%; width:100%;"></combox>
				</view>
				<view style="width:33px;min-height:100%;" class="e ux-b">
					<icon class="iconfont icon-gengduo1" style="color:#808080;font-size:14px;"></icon>
				</view>
			</view>
			<view class="ux-flex" style="height:60px;background-color:#ffffff;;padding:0px 15px;">
				<view style="min-width:72px;min-height:100%;padding-left:15px;" class="e r ux-b">
					<text style="color:#333333;font-size: 14px;font-weight:bold;">提醒时间</text>
					<text style="color:#E33731;margin-left:5px;">*</text>
				</view>
				<view class="fixe e ux-b" style="flex:1;height:100%;padding-left:15px;font-size:16px">
					<datetime :readonly="false" v-model="begin" ptype="datetime" title="提醒时间" style="height:100%; width:100%;"></datetime>
				</view>
				<view style="width:33px;min-height:100%;" class="e ux-b">
					<icon class="iconfont icon-rili2" style="color:#808080;font-size:18px;"></icon>
				</view>
			</view>
			<view class="ux-flex" style="height:60px;background-color:#ffffff;margin-bottom:5px;;padding:0px 15px;">
				<view style="min-width:72px;min-height:100%;padding-left:15px;height:100%;" class="e r ">
					<text style="color:#333333;font-size: 14px;font-weight:bold;">日程标题</text>
				</view>
				<view class="fixe e " style="flex:1;height:100%;padding-left:15px;height:100%;font-size:16px">
					<input v-model="title" name="title" placeholder="请输入日程标题" type="text" level="4" style="border:0px;width:100%;height:100%;background:transparent;font-size:16px"></input>
				</view>
				<view style="width:33px;min-height:100%;height:100%;" class="e ">
					<text></text>
				</view>
			</view>
			<view class="ux-flex" style="flex-flow:column;background-color:#ffffff;margin-bottom:5px;;padding:0px 15px;">
				<view style="min-width:100%;height:36px;padding-top:5px;" class="row">
					<view class="col-6 e" style="height:100%;padding-left:15px;">
						<text style="color:#333333;font-size: 14px;font-weight:bold;">日程详情</text>
					</view>
					<view class="col-6 r e em" style="height:100%;padding-right:20px;">
						<text style="font-size:11px;color:#666666;">您还可以输入{{255-(detail||"").length||255}}个字</text>
					</view>
				</view>
				<view class="fixe " style="min-width:100%;flex:1;padding:15px;padding-top:5px;padding-bottom:15px;font-size:16px">
					<textarea v-if="!readonly" v-model="detail" maxlength="255" style="height:100px;width:100%;border:0;font-size:16px" placeholder="请输入日程详情..."></textarea>
				</view>
			</view>
			<view class="ux-flex" style="height:60px;background-color:#ffffff;;padding:0px 15px;">
				<view style="min-width:72px;min-height:100%;padding-left:15px;" class="e r ux-b">
					<text style="color:#333333;font-size: 14px;font-weight:bold;">重复</text>
				</view>
				<view class="fixe e ux-b" style="flex:1;height:100%;padding-left:15px;font-size:16px">
					<combox :readonly="false" v-model="repeat" items="[{'text':'不重复','value':'0'},{'text':'每天重复','value':'1'},{'text':'工作日重复','value':'2'},{'text':'每周重复','value':'3'},{'text':'每月重复','value':'4'}]" :text="repeat$" title="重复" type="default" style="height:100%; width:100%;"></combox>
				</view>
				<view style="width:33px;min-height:100%;" class="e ux-b">
					<icon class="iconfont icon-gengduo1" style="color:#808080;font-size:14px;"></icon>
				</view>
			</view>
		</scroll-view>
		<view class="auto-form-btn t c" style="height: 80px; padding: 5px 15px;">
			<navigator style="height:40px;width:100%;margin:5px;color:#ffffff;border-radius:80px;box-shadow:0 8px 8px rgba(0, 0, 0, 0.2);" class="e c" :style="{'background-color':vm.theme.themeColor}" @click="creatTodo()">提交</navigator>
		</view>
	</view>
</template>
<script type="module">
import utils from "../lib/utils.js";
export default{
	data(){
		return {
			entity:{},
			list:[],
			vm:{"isForm":true},
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
					path:"/pages/test",
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
			path:"/pages/test",
			imageUrl:this.pageImageUrl,
			query:this.optionstr
		}
	},
	onShow:function(){
		if(this._onShow)this._onShow();
	},
}
</script>
