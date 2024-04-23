<template>
	<view class="page">
		<scroll-view scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered" @refresherrefresh="onRefresh" @scrolltolower="onBot">
			<view class="ux-wraper" style="background-color:#f7f7f7;">
				
			</view>
		</scroll-view>
	</view>
</template>
<script type="module">
import utils from "../lib/utils.js";
export default{
	data(){
		return {
			entity:{},
			list:[],
			vm:{"style":{"navigationBarTitleText":"首页","navigationStyle":"default"}},
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
					title:this.pageTitle||"首页",
					path:"/pages/index",
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
			title:this.pageTitle||"首页",
			path:"/pages/index",
			imageUrl:this.pageImageUrl,
			query:this.optionstr
		}
	},
	onShow:function(){
		if(this._onShow)this._onShow();
	},
}
</script>
