<template>
	<view style="height:100%;min-height:32px;width:100%;" class="ux-flex">
		<view class="e" style=" position: relative;  min-height:32px; height: 100%; width: 100%; font-size: inherit; color: inherit; text-indent: inherit; text-align: inherit;">
			<view class="ux-ddd" style="padding: 5px 0; width: 100%;font-size: inherit; color: inherit; text-indent: inherit; text-align: inherit;"  @click="onSelect">{{entity.text||"请选择..."}}</view>
			<view v-if="haveChoose" style="height:100%;padding:0px 10px;margin-left:10px;" class="e" @click="onChoose">
				<icon class="iconfont icon-target" style="margin-top:2px;" type=""></icon>
				<text style="white-space:nowrap;margin-left:5px;">选择</text>
			</view>
		</view>
		<view class="ux-flex" style="position:fixed;flex-flow:column;width:100%;height:100%;background-color:rgba(0,0,0,0.50);z-index:999;left:0px;top:0px;" v-if="showSelector">
			<view style="width:100%;height:30%;" @click="showSelector=false">
				<text></text>
			</view>
			<view style="min-width:100%;height:55px;background-color:#ffffff;border-top-left-radius:10px;border-top-right-radius:10px;" class="ux-flex focus">
				<view class="fixe e" style="flex:1;min-height:100%;">
					<text style="font-size:16px;font-weight:bold;margin-left:25px;">请选择所在地区</text>
				</view>
				<view style="width:66px;min-height:100%;" class="e c">
					<view style=" cursor:pointer; width:22px;height:22px;background-color:#F0F0F0;border-radius:90px;" class="e c" @click="showSelector=false">
						<icon class="iconfont icon-close" style="font-size:12px;margin-top:2px;margin-left:2px;text-indent: 0px;"></icon>
					</view>
				</view>
			</view>
			<scroll-view style="height:50px;overflow-y:hidden;overflow-x: overlay;background-color:#ffffff;padding-left:10px;">
				<view class="ux-nowarp" id="123" style="height:100%;">
					<view v-if="!current.id" style="min-height:100%;margin-left:15px;padding:0px 5px;">
						<text style="font-size:14px;font-weight:bold;">请选择</text>
					</view>
					<navigator v-for="item in current.list" style="min-height:100%;margin-left:15px;padding:0px 5px;" :style="{'color':current.id==item.id?'#1890ff':'inherit'}" url="#" open-type="navigate" @click="onParent(item)">
						<text style="font-size:14px;font-weight:bold;">{{item.name}}</text>
					</navigator>
				</view>
			</scroll-view>
			<scroll-view class="fixe" style="min-width:100%;flex:1;">
				<view class="ux-wraper" style="padding:0px 15px;background-color:#ffffff;">
					<navigator style="float:left;height:36px;padding:0px 8px;border-width:1px;border-style:solid;margin:4px;" class="e" v-for="item in list" :style="{'borderColor':current.id==item.id?'#1890ff':'#fff','backgroundColor':current.id==item.id?'rgba(24,144,255,0.10)':'#fff'}" url="#" open-type="navigate" @click="onItem(item)">
						<text style="font-size:12px;">{{item.name}}</text>
					</navigator>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script type="module">
import utils from "../lib/utils.js";
export default{
	data(){
		return {
			showSelector:false,
			initValue:null,
			entity:{},
			list:[],
			current:{},
			vm:{},
			haveChoose:false,
			triggered:true,
		}
	},
	props:{
		title:{
			type:String,
		},
		hold:{
			type:String,
		},
		level:{
			type:Number,
		},
		value:{
			type:[Number,String],
		},
	},
	model:{
		prop:"value",
		event:"change",
	},
	watch:{
		value(value){
			if(value && !this.initValue){
				this.initValue = value;
				this.getPlace(this.initValue);
			}
		},
	},
	name:"place",
	title:"省市地区",
	created:function(){//系统初始化
		utils._init(this,{},true);
		this.getPlace();
		if(this.vm.platform=="mp-weixin" && this.$parent && this.$parent.onChooseAddress){
			this.haveChoose=true;
		}
	},
	methods:{
		getPlace(id){
			if(id){
				utils.request({
					url:"/api/lib/place.get.vo",
					data:{
						id:id
					},
					success:(protocol)=>{
						if(protocol.success){
							this.setData(protocol.data);
						}
					}
				});
			}
		},
		onChoose(e){
			uni.chooseLocation({
				success:(res)=>{
					utils.request({
						url:'/api/lib/place.by.vo',
						data:{
							latitude:res.latitude,
							longitude:res.longitude,
						},
						success:(protocol)=>{
							if(protocol.success && protocol.data && protocol.data.entity){
								this.onSelected(protocol.data.entity);
								var address = res.address;
								if(address.indexOf(protocol.data.entity.name)>-1){
									address = address.substring(address.indexOf(protocol.data.entity.name)+protocol.data.entity.name.length);
								}else if(address.indexOf(protocol.data.entity.parent$)>-1){
									address = address.substring(address.indexOf(protocol.data.entity.parent$)+protocol.data.entity.parent$.length);
								}
								if(this.$parent.onChooseAddress){
									this.$parent.onChooseAddress(address,res);
								}
							}
						}
					});
				},
				fail: (res) => {
					console.log("######",res);
				}
			});
		},
		onSelected(item){
			this.entity = item;
			this.showSelector = false;
			var value = item.value||item.id;
			this.value = value;
			this.$emit("input", value);
			this.$emit("change", value);
		},
		getList(parent,selector,byClick){
			utils.request({
				url:"/api/lib/place.list.vo",
				data:{
					parent:parent||"0",
					active:(selector||{})["id"]
				},
				success:(protocol)=>{
					if(protocol.success){
						if(!protocol.data.list.length){
							if(byClick){
								this.onSelected(protocol.data.entity);
							}
						}else{
							this.setData({
								list:protocol.data.list,
								current:protocol.data.entity||{}
							});
						}
						if(byClick && protocol.data.entity && this.level && protocol.data.entity.level>=this.level){
							this.onSelected(protocol.data.entity);
						}
					}
				}
			});
		},
		onSelect(){
			this.showSelector = true;
			this.getList(this.entity.parent||0,this.entity);
		},
		onItem(item){
			this.getList(item.id||0,item,true);
		},
		onParent(item){
			this.getList(item.parent||0,item);
		},
	},
}
</script>
