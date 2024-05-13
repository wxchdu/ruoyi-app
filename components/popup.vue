<template>
	<cover-view style="position:fixed;left:0px;top:0px;width:100%;height:100%;z-index:999;background-color:rgba(0,0,0,0.70);" class="e c popup" v-if="popupdata">
		<cover-view class="ux-flex" style="flex-flow:column;width:80%;">
			<cover-view  @click="onClick" v-if="popupdata.image" style="min-width:100%;" :url="popupdata.url" open-type="navigate">
				<img border="0" :src="popupdata.image" mode="widthFix" style="width:100%;">
			</cover-view>
			<cover-view  @click="onClick" v-if="popupdata.html" style="min-width:100%;" v-html="popupdata.html" :url="popupdata.button?'#':popupdata.url" open-type="navigate"></cover-view>
			<view v-if="popupdata.button" style="min-width:100%;z-index:999;" class="c">
				<cover-view class="c">
					<cover-view @click="onClick" :url="popupdata.url" open-type="navigate" v-if="popupdata.button.title" :style="{'background-color':vm.theme.themeColor}" style="height:40px;width:100%;margin:5px; margin-top: 20px; color:#ffffff;padding:0px 40px;border-radius:90px;" class="e c">{{popupdata.button.title}}</cover-view>
				</cover-view>
				<cover-view style="position:absolute;bottom:15px;" :style="{'bottom':popupdata.button.bottom||15}" class="c">
					<cover-view @click="onClick" :url="popupdata.url" open-type="navigate" v-if="!popupdata.button.title" :style="{'bottom':popupdata.button.bottom||15,width:popupdata.button.width,height:popupdata.button.height}" class="e c"></cover-view>
				</cover-view>
			</view>
			<cover-view style="min-width:100%; position: relative; height: 66px;" class="c">
				<cover-view style="position:absolute;top:20px;">
					<cover-view style="width:25px;height:25px;border-color:rgba(255,255,255,0.70);border-width:1px;border-style:solid;border-radius:90px;background-color:rgba(0,0,0,0.60);" class="e c" @click="popupdata=null">
						<icon class="iconfont icon-close" style="color:rgba(255,255,255,0.90);margin-top:2px;" type=""></icon>
					</cover-view>
				</cover-view>
			</cover-view>
		</cover-view>
	</cover-view>
</template>
<script type="module">
import utils from "../lib/utils.js";
export default{
	data(){
		return {
			entity:{},
			list:[],
			vm:{},
			popupdata:null,
		}
	},
	props:{
		popupData:{
			type:Object,
		},
		success:{
			type:Function
		}
	},
	name:"popup",
	title:"弹窗组件",
	profile:"{image,url,button:{title(如果有为空，按钮则透明背景),bottom(按钮底部位置),width(按钮宽度),heigh(按钮高度)}}",
	model:{
		prop:"value",
		event:"change",
	},
	watch:{
		popupData(value){
			this.popupdata = value;
		},
	},
	created:function(options){
		utils._init(this,{},true);
	},
	methods:{
		onInitValue:function(value){
			
		},
		onClick:function(){
			this.popupdata = null;
		}
	},
}
</script>
