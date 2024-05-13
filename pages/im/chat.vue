<template>
	<view class="page">
		<view :style="" style="width:100%;height:25px;background-color:#f2f3f5;" class="em"></view>
		<view title="header" class="ux-flex" style="background-color:#f2f3f5;">
			<view style="width:80px;min-height:100%;height:50px;" class="row">
				<navigator class="col-6 e c" style="height:100%;" url="#" open-type="navigateBack">
					<icon class="iconfont icon-fanhui1" style="font-size:20px;" type=""></icon>
				</navigator>
				<view class="col-6 e l" style="height:100%;">
					<view style="background-color:#e0e1e3;border-radius:15px;width:24px;height:20px;" class="e c">
						<text>11</text>
					</view>
				</view>
			</view>
			<view class="fixe e c" style="flex:1;min-height:100%;">
				<text style="position:absolute;width:178px;height:24px;left:18.5px;top:13px;z-index:1;font-size:16px;">工作通知:新微数字二...</text>
			</view>
			<view style="width:80px;min-height:100%;" class="row">
				<view class="col-6 e c" style="height:100%;">
					<icon class="iconfont icon-flashlightopen" style="font-size:25px;" type=""></icon>
				</view>
				<view class="col-6 e c" style="height:100%;">
					<icon class="iconfont icon-more" style="font-size:30px;" type=""></icon>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered" @refresherrefresh="onRefresh" @scrolltolower="onBot">
			<view class="ux-wraper" style="background-color:#f2f3f5;padding-top:10px;" @click="showPanel">
				<view class="ux-flex t" style="padding:10px 0px;" v-for="item in list">
					<view style="width:80px;min-height:100%;" class="c t">
						<view style="width:44px;height:44px;border-radius:90px;background-color:#1890ff;color:#ffffff;margin-top:-10px;" v-if="item.uid!=me.uid" class="e c">
							<img style="width:100%;height:100%;border-radius:90px;" mode="scaleToFill" :src="item.header"></img>
						</view>
					</view>
					<view v-if="item.uid!=me.uid" class="fixe l" style="flex:1;min-height:100%;">
						<view style="background-color:#ffffff;padding:10px;color:#000000;border-radius:5px;">
							<text>{{item.content}}</text>
						</view>
					</view>
					<view v-if="item.uid==me.uid" class="fixe r" style="flex:1;min-height:100%;">
						<view style="background-color:#1890ff;padding:10px;color:#ffffff;border-radius:20px;border-top-right-radius:0px;">
							<text>{{item.content}}</text>
						</view>
					</view>
					<view style="width:80px;min-height:100%;" class="c t">
						<view style="width:44px;height:44px;border-radius:90px;background-color:#1890ff;color:#ffffff;margin-top:-10px;" class="e c" v-if="item.uid==me.uid">
							<img style="width:100%;height:100%;border-radius:90px;" mode="scaleToFill" :src="item.header"></img>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="ux-flex b ux-b" style="background-color:#f2f3f5;padding:0px 10px;" @click="showPanel()">
			<navigator style="width:40px;min-height:60px;" class="e c" v-if="inputMode==1" url="#" open-type="navigate" @click="inputMode=2">
				<icon class="iconfont icon-sound" style="font-size:28px;" type=""></icon>
			</navigator>
			<navigator style="width:40px;min-height:60px;" class="e c" v-if="inputMode==2" url="#" open-type="navigate" @click="inputMode=1">
				<icon class="iconfont icon-comment" style="font-size:28px;padding-top:2px;" type=""></icon>
			</navigator>
			<view class="fixe e" style="flex:1;min-height:60px;height:100%;padding:5px;" v-if="inputMode==1">
				<view style="background-color:#ffffff;border:0;width:100%;min-height:32px;border-radius:20px;padding:8px 10px;">
					<textarea auto-height="true" style="width:100%;border:0;min-height:20px;outline:none;box-sizing: border-box;line-height:16px;height:16px;padding:0px 5px;overflow:hidden;font-size:16px;" v-model="content" @input="onContent" @confirm="onSend"></textarea>
				</view>
			</view>
			<view class="fixe e" style="flex:1;min-height:60px;padding:0px 5px;" v-if="inputMode==2">
				<navigator style="width:100%;background-color:#1890ff;color:#ffffff;height:36px;border-radius:90px;" class="e c">
					<text>按住说话</text>
				</navigator>
			</view>
			<navigator style="width:40px;min-height:60px;" class="e c" url="#" open-type="navigate" @click.stop="showPanel('emoji')">
				<icon class="iconfont icon-emoji" style="font-size:28px;" type=""></icon>
			</navigator>
			<navigator style="width:40px;min-height:60px;" class="e c" @click.stop="showPanel('sender')">
				<icon class="iconfont icon-roundadd" style="font-size:28px;" type=""></icon>
			</navigator>
		</view>
		<scroll-view scroll-y="true" style="height:100%;" v-if="panel=='emoji'">
			<view class="ux-wraper" style="padding:5px;">
				<navigator style="width:50px;height:50px;margin:1px;float:left;font-size:22px;" v-for="(item,index) in emojis" class="e c" url="#" open-type="navigate" @click="onEmoji(index)">{{emojis[index]}}</navigator>
				<view style="clear:both;"></view>
			</view>
			<view class="ux-flex" style="position:fixed;z-index:9;bottom:5px;right:5px;" v-if="content">
				<navigator style="width:66px;min-height:100%;height:44px;background-color:#ffffff;border-radius:5px;" class="e c" @click="onBackspace">删除</navigator>
				<navigator style="width:66px;min-height:100%;margin:5px;height:44px;background-color:#1890ff;border-radius:5px;" class="e c" @click="onSend">
					<text style="color:#ffffff;">发送</text>
				</navigator>
			</view>
		</scroll-view>
		<view class="row" style="width:100%;padding:10px;" v-if="panel=='sender'">
			<navigator class="col-3 c e" style="height:100px;">
				<view class="ux-flex" style="flex-flow:column;width:55px;height:88px;">
					<view style="min-width:100%;height:55px;background-color:#ffffff;border-radius:10px;" class="e c">
						<icon class="iconfont icon-tupian2" style="font-size:28px;color:#808080;"></icon>
					</view>
					<view class="fixe c e" style="min-width:100%;flex:1;">
						<text>照片</text>
					</view>
				</view>
			</navigator>
			<navigator class="col-3 c e" style="height:100px;">
				<view class="ux-flex" style="flex-flow:column;width:55px;height:88px;">
					<view style="min-width:100%;height:55px;background-color:#ffffff;border-radius:10px;" class="e c">
						<icon class="iconfont icon-cameraaddfill" style="font-size:28px;color:#808080;"></icon>
					</view>
					<view class="fixe c e" style="min-width:100%;flex:1;">
						<text>拍照</text>
					</view>
				</view>
			</navigator>
			<navigator class="col-3 c e" style="height:100px;">
				<view class="ux-flex" style="flex-flow:column;width:55px;height:88px;">
					<view style="min-width:100%;height:55px;background-color:#ffffff;border-radius:10px;" class="e c">
						<icon class="iconfont icon-recordfill" style="font-size:28px;color:#808080;"></icon>
					</view>
					<view class="fixe c e" style="min-width:100%;flex:1;">
						<text>视频</text>
					</view>
				</view>
			</navigator>
			<navigator class="col-3 c e" style="height:100px;">
				<view class="ux-flex" style="flex-flow:column;width:55px;height:88px;">
					<view style="min-width:100%;height:55px;background-color:#ffffff;border-radius:10px;" class="e c">
						<icon class="iconfont icon-unie62c" style="font-size:28px;color:#808080;"></icon>
					</view>
					<view class="fixe c e" style="min-width:100%;flex:1;">
						<text>位置</text>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>
<script type="module">
import utils from "../../lib/utils.js";
export default{
	data(){
		return {
			cid:112233,//会话标识(页面参数)
			nickname:null,//对方昵称(页面参数)
			header:null,//对方头像(页面参数)
			me:{"uid":888888},//我的信息(接口返回)
			ta:{},//TA的信息(接口返回)
			list:[],//数据列表(接口返回)
			inputMode:1,//输入模式(定义变量)
			height:16,
			textarea:null,
			emojis:["😀","😃","😄","😁","😆","😅","🤣","😂","🙂","🙃","😉","😊","😇","🥰","😍","🤩","😘","😗","😚","😙","😋","😛","😜","🤪","😝","🤑","🤗","🤭","🤫","🤔","🤐","🤨","😐","😑","😶","😏","😒","🙄","😬","🤥","😌","😔","😪","🤤","😴","😷","🤒","🤕","🤢","🤮","🤧","🥵","🥶","🥴","😵","🤯","🤠","🥳","😎","🤓","🧐","😕","😟","🙁","😮","😯","😲","😳","🥺","😦","😧","😨","😰","😥","😢","😭","😱","😖","😣","😞","😓","😩","😫","🥱","😤","😡","😠","🤬","😈","👿","💀","☠","*","🤡","👹","👺","👻","👽","👾","🤖","😺","😸","😹","😻","😼","😽","🙀","😿","😾","🙈","🙉","🙊","💋","💌","💘","💝","💖","💗","💓","💞","💕","💟","❣","💔","❤","🧡","💛","💚","💙","💜","🤎","🖤","🤍","💯","💢","💥","💫","💦","💨","🕳","💣","💬","🗨","🗯","💭","💤"],//表情符号(定义变量)
			content:null,//输入内容(定义变量)
			panel:null,//显示面板类型(定义变量)
			entity:{},//实体对象(定义变量)
			triggered:true,
			vm:{"style":{"navigationBarTitleText":"新微数字","navigationStyle":"custom"},"flag":"8764244b175a0f9eb779cb22a0d13670"},
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
			this.content="";
		},
		onReset:function(){
			this.showEmoji=false;
		},
		showPanel:function(/*面板类型*/type){
			this.panel=type;
		},
		onEmoji(index){
			this.content+=this.emojis[index];
		},
		onBackspace:function(){
			if(!this.content)return;
			this.content=this.content.trim();
			if((/([\uD800-\uDBFF][\uDC00-\uDFFF])$/).test(this.content)){
				this.content = this.content.substring(0,this.content.length-2)
			}else{
				this.content = this.content.substring(0,this.content.length-1)
			}
		},
		onContent(e){
			// 注意：想要拿到元素实例，需要在实例已经挂载到页面上才可以
			const query = uni.createSelectorQuery().in(this);
			query.select('#textarea').boundingClientRect(data => {
				console.log(data)
			}).exec();
		},
		onSend:function(){
			this.content = "";	
		  
		},
	},
	onShareAppMessage:function(options){
	    const promise = new Promise(resolve => {
			utils.request({
				url:'/api/lib/share.vo',
				data:{
					title:"会话",
					path:"/pages/im/chat",
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
	onShow:function(){
		this._onShow();
	},
	onShareTimeline:function(options){
		return {
			title:this.pageTitle||this.getLang("会话","{title}"),
			path:"/pages/im/chat",
			imageUrl:this.pageImageUrl,
			query:this.optionstr
		}
	},
}
</script>
