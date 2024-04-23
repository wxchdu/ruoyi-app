<template>
	<view class="e" :style="{height:(type=='popup'||type=='bottom')?'100%':''}" style=" position: relative;  min-height:64rpx; width: 100%; font-size: inherit; color: inherit; text-indent: inherit; text-align: inherit;" @click.stop="onStop($event)">
		<view v-if="type=='popup'||type=='bottom'" class="e" style="min-height:64rpx; height: 100%; width: 100%; font-size: inherit; color: inherit; text-indent: inherit; text-align: inherit;">
			<view style="padding: 5px 0; width: 100%;font-size: inherit; color: inherit; text-indent: inherit; text-align: inherit;" @click="showOptions=true;">
				<text v-if="!values.length">请选择...</text>
				<text v-for="item in list" v-if="values.indexOf(Number(item.id||item.value))>-1" style="margin:0px 3px;">{{item.text || item.name || item.title  || item.label}}</text>
			</view>
		</view>
		<view v-if="type=='bottons'" class="e" style="min-height:64rpx; width: 100%; font-size: inherit; color: inherit; text-indent: inherit; text-align: inherit;">
			<view style="padding: 5px 0; width: 100%;font-size: inherit; color: inherit; text-indent: inherit; text-align: inherit;" @click="showOptions=true;">
				<view style="width:100%;padding:0rpx 20rpx;">
					<view style="float:left;" v-for="item in list" @click="onItem(item)">
						<view v-if="values.indexOf(Number(item.id||item.value))>-1" style="padding:5px 10px;margin:5px;background-color:rgba(24,144,255,0.20);border-color:#1890ff;border-width:1px;border-style:solid;">
							<text style="color:#096dd9;">{{item.text || item.name || item.title  || item.label}}</text>
						</view>
						<view v-if="values.indexOf(Number(item.id||item.value))==-1" style="padding:5px 10px;margin:5px;border-color:transparent;border-width:1px;border-style:solid;">
							<text>{{item.text || item.name || item.title  || item.label}}</text>
						</view>
					</view>
					<view style="clear:both;" class="em"></view>
				</view>
			</view>
		</view>
		<view v-if="type=='checkbox'" class="e" style="min-height:64rpx; width: 100%; font-size: inherit; color: inherit; text-indent: inherit; text-align: inherit;">
			<view style="padding: 5px 0; width: 100%;font-size: inherit; color: inherit; text-indent: inherit; text-align: inherit;" @click="showOptions=true;">
				<view style="width:100%;padding:0rpx 20rpx;">
					<view style="float:left;" v-for="item in list" @click="onItem(item)">
						<view class="e" style="padding:5px;border-color:transparent;border-width:1px;border-style:solid;">
							<icon v-if="values.indexOf(Number(item.id||item.value))==-1" class="iconfont icon-square" style="font-size:18px;color:#4d4d4d;margin-right: 5px; margin-top: 2px;"></icon>
							<icon v-if="values.indexOf(Number(item.id||item.value))>-1" class="iconfont icon-squarecheckfill" style="color:#1890ff;font-size:18px;margin-right: 5px;margin-top: 2px;"></icon>
							<text>{{item.text || item.name || item.title  || item.label}}</text>
						</view>
					</view>
					<view style="clear:both;" class="em"></view>
				</view>
			</view>
		</view>
		<view v-if="type=='popup' && showOptions" style=" position:fixed;width:100%;height:100%;background-color:rgba(0,0,0,0.50);z-index:999;top:0px;left:0px;color:#000;" :class="type=='bottom'?'b':'e'" :style="{padding:type=='bottom'?'0':'20px'}" @click.stop="showOptions=false" @touchmove.stop.prevent="">
			<view style="max-height:60%;height:fit-content; width:100%; z-index: 10;" @click.stop="">
				<view class="ux-wraper" style="height:auto;background-color:#ffffff;border-radius: 7px;">
					<view style="height:88rpx;" class="b ux-flex focus">
						<view style="width:40rpx;min-height:100%;" class="b c">
							<text></text>
						</view>
						<view v-if="icon" style="width:64rpx;min-height:100%;" class="b c">
							<text type="" :class="'iconfont '+icon" style="margin:0px 20rpx;"></text>
						</view>
						<view style="width:252rpx;min-height:100%;" class="b">
							<text style="font-weight:bold;">选择{{title}}</text>
						</view>
						<view class="fixe" style="flex:1;min-height:100%;">
							<text></text>
						</view>
						<view style="width:126rpx;min-height:100%;height:88rpx;" class="b c">
							<view style=" cursor:pointer; width:44rpx;height:44rpx;background-color:#F0F0F0;border-radius:180rpx;" class="e c" @click="showOptions=false">
								<text type="" class="iconfont icon-close" style=" font-size:24rpx;margin-top:2px;margin-left:2px;"></text>
							</view>
						</view>
					</view>
					<scroll-view scroll-y="true" style="width: 100%;">
						<view class="rows" style="width:100%;padding:20rpx;">
							<view style="height:88rpx;" class="ux-flex focus" v-for="item in list" @click="onItem(item)">
								<view class="fixe e" style="flex:1;min-height:100%;padding-left:40rpx;">
									<text>{{item.text || item.name || item.title  || item.label}}</text>
								</view>
								<view style="width:110rpx;min-height:100%;" class="e c">
									<text></text>
									<text style="color:#1890ff;" v-if="values.indexOf(Number(item.id||item.value))>-1" class="iconfont icon-check"></text>
								</view>
							</view>
							<view class="ux-data-empty" v-if="!list.length" title="没有数据">
								<view class="c" style="">
									<text style="color:#999999;">当前没有数据！</text>
								</view>
							</view>
						</view>
					</scroll-view>
					<view class="e c">
						<view style="height:102rpx;" class="row focus">
							<view class="col-6 e c" style="height:100%;">
								<navigator style="height:64rpx;background-color:#eeeeee;margin:0px 20rpx;color:#000000;width:210rpx;" class="e c" @click="onCancel">取消</navigator>
							</view>
							<view class="col-6 c e" style="height:100%;">
								<navigator style="height:64rpx;background-color:#1890ff;margin:0px 20rpx;color:#ffffff;width:210rpx;" class="e c" @click="onEmit">确定</navigator>
							</view>
						</view>
					</view>
					<view style="height: 40rpx;">
						<text></text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="type=='bottom' && showOptions" style=" position:fixed;width:100%;height:100%;background-color:rgba(0,0,0,0.50);z-index:999;top:0px;left:0px;color:#000;" :class="'b'" :style="{padding:0}" @click.stop="showOptions=false" @touchmove.stop.prevent="">
			<view style="max-height:60%;height:fit-content; width:100%; z-index: 10;" @click.stop="">
				<view class="ux-wraper" style="height:auto;background-color:#ffffff;">
					<scroll-view scroll-y="true" style="width: 100%;">
						<view style="width:100%;padding:40rpx 20rpx;">
							<view style="float:left;" v-for="item in list" @click="onItem(item)">
								<view v-if="values.indexOf(Number(item.id||item.value))>-1" style="padding:5px 10px;margin:5px;background-color:rgba(24,144,255,0.20);border-color:#1890ff;border-width:1px;border-style:solid;">
									<text style="color:#096dd9;">{{item.text || item.name || item.title  || item.label}}</text>
								</view>
								<view v-if="values.indexOf(Number(item.id||item.value))==-1" style="padding:5px 10px;margin:5px;border-color:transparent;border-width:1px;border-style:solid;">
									<text>{{item.text || item.name || item.title  || item.label}}</text>
								</view>
							</view>
							<view style="clear:both;" class="em"></view>
							<view class="ux-data-empty" v-if="!list.length" title="没有数据">
								<view class="c" style="">
									<text style="color:#999999;">当前没有数据！</text>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>
<script type="module">
import utils from "../lib/utils.js";
export default{
	data(){
		return {
			text:"",
			index:0,
			showOptions:false,
			list:[],
			values:[],
			entity:{},
			vm:{},
			triggered:true,
		}
	},
	props:{
		title:{
			type:String,
		},
		items:{
			type:[String,Array,Object],
			default:() => {},
		},
		type:{
			type:String,
			default:"popup",
		},
		action:{
			type:String,
		},
		value:{
			type:[Number,String],
		},
	},
	model:{
		prop:"value",
		event:"change",
	},
	name:"choices",
	title:"多选",
	watch:{
		value(value){
			this.onInitValue();
		},
		items(items){
			this.list = this.convert(items);
			this.onInitValue();
		},
	},
	created:function(){
		utils._init(this,{});
		if(this.action){
			this.getList();
		}else{
			this.list = this.convert(this.items);
			this.onInitValue();
		}
	},
	methods:{
		convert(value){
			if(value && typeof(value)=="string"){
				value = JSON.parse(value.replace(/[']/g,"\""));
			}
			var array = [];
			if(Array.isArray(value)){
				for(var o in value){
					var item = value[o];
					if(typeof(item)=="object"){
						array.push(item);
					}else {
						array.push({
							text:item,value:item
						})
					}
				}
			}else if(typeof(value)=="object"){
				for(var o in value){
					array.push({
						value:o,text:value[o]
					})
				}
			}
			return array;
		},
		onInitValue(){
			var values = [];
			if(Array.isArray(this.value)){
				this.values = this.value;
			}else if(typeof(this.value)=="string"){
				this.values = JSON.parse(this.value||"[]")
			}else{
				this.values = [];
			}
			for(var o in this.values){
				this.values[o] = Number(this.values[o]);
			}
		},
		getList(){
			utils.request({
				url:this.action,
				data:{},
				success:(protocol)=>{
					if(protocol.success){
						this.setData(protocol.data);
						this.onInitValue();
					}
				}
			});
		},
		onItem(item){
			var value = Number(item.id || item.value);
			if(this.values.indexOf(value)>-1){
				this.values.splice(this.values.indexOf(value),1);
			}else{
				this.values.push(value);
			}
			for(var o in this.values){
				this.values[o] = Number(this.values[o]);
			}
			if(this.type!="popup")
				this.onEmit()
		},
		onCancel(){
			this.onInitValue();
			this.showOptions = false;
		},
		onEmit(){
			try{
				this.$emit("input", this.values);
				this.$emit("change", this.values);
			}catch(ex){
				console.error(ex);
			}
			this.showOptions = false;
		},
		onStop(e){
			e.preventDefault();
			return false;
		},
	},
}
</script>
