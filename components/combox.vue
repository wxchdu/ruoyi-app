<template>
	<view @tap.stop="onStop()" class="e" style=" position: relative;  min-height:32px; height: 100%; width: 100%; font-size: inherit; color: inherit; text-indent: inherit; text-align: inherit;">
		<view v-if="etype=='default' && !action" @click="onShowSheet" style="padding: 5px 0; width: 100%;font-size: inherit; color: inherit; text-indent: inherit; text-align: inherit;">{{label||"请选择..."}}</view>
		<view v-if="etype=='picker'" style="padding: 5px 0; width: 100%;font-size: inherit; color: inherit; text-indent: inherit; text-align: inherit;">{{label||"请选择..."}}</view>
		<view v-if="etype=='picker'" style="position:absolute; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 2; ">
			<picker @change="bindPickerChange" :value="index" range-key="text" :range="list" style=" color: red; width: 100%; height: 100%;">
				<view style="position:absolute; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 2; "></view>
			</picker>
		</view>
		<view v-if="(etype=='popup' || action)" class="e" style="min-height:32px; height: 100%; width: 100%; font-size: inherit; color: inherit; text-indent: inherit; text-align: inherit;">
			<view @click="onShowPopup" class="d" style="padding: 5px 0; width: 100%;font-size: inherit; color: inherit; text-indent: inherit; text-align: inherit;">{{label||"请选择..."}}</view>
		</view>
		<root-portal>
			<view v-if="(etype=='popup' || action) && showOptions" @touchmove.stop.prevent="" style=" position:fixed;width:100%;height:100%;background-color:rgba(0,0,0,0.30);z-index:999;top:0px;left:0px;color:#000;" :class="type=='bottom'?'b':'e'" :style="{padding:type=='bottom'?'0':'0px'}">
				<view class="ux-flex" style="flex-flow:column; width: 100%; height:100%;overflow: hidden;background-color:#ffffff;">
					<view style="height:60px;width:100%;" class="ux-b ux-flex focus">
						<view style="width:15px;height:100%;" class="b c">
							<span></span>
						</view>
						<view v-if="icon && input!='query'" style="width:32px;height:100%;" class="e c">
							<span :class="'iconfont '+icon" style="margin:0px 10px;"></span>
						</view>
						<view v-if="!icon && input=='query'" style="width:32px;height:100%;" class="e c">
							<span class="iconfont icon-search" style="margin:0px 10px;"></span>
						</view>
						<view v-if="!icon && input=='select'" style="width:32px;height:100%;" class="e c">
							<span class="iconfont icon-zhage1" style="margin:0px 10px; font-size: 20px;"></span>
						</view>
						<view v-if="!icon && input=='tree'" style="width:32px;height:100%;" class="e c">
							<span class="iconfont icon-gongzuoliucheng" style="margin:0px 10px; font-size: 22px;"></span>
						</view>
						<view class="fixe e" style="flex:1;height:100%;">
							<span v-if="input!='query'" style=" font-size: 16px; font-weight: bold;">选择{{title}}</span>
							<input v-if="input=='query'" v-model="keyword" @input="onKeyword" type="text" style=" border:0px;width:100%;height:100%;background:transparent;margin:0px;color:#000000;font-size:14px;line-height:32px;padding:0px;border-radius:0px;" placeholder="请输入要搜索的内容..."></input>
						</view>
						<view @click="onItem(null)" style="width:44px;height:100%;height:44px;" class="e c">
							<icon class="iconfont icon-delete" style="font-size:18px;color:#000000;"></icon>
						</view>
						<view @click="showOptions=false" style="width:44px;height:100%;height:44px;" class="e c">
							<icon class="iconfont icon-close" style="font-size:18px;color:#000000;"></icon>
						</view>
						<view class="em" style="width: 10px; height: 100%;"></view>
					</view>
					<scroll-view class="fixe" scroll-y="true" @click.stop="" style="flex:1;width:100%; overflow: auto; z-index: 10;">
						<view class="ux-wraper" style="height:auto;">
							<view class="rows">
								<template v-if="input=='tree'">
									<navigator @click="onItem(item)" url="#" style="height:50px;" class="ux-flex ux-b focus" v-for="item in tree">
										<view @click.stop="onNode(item)" class="e r" :style="{width:(50+item.LEVEL*25)+'px'}" style="height: 100%; width: 50px; padding-right: 10px;">
											<icon v-if="item.requested && !(item.children||[]).length" style="font-size: 14px; color: #999999;" class="iconfont icon-jinyong"></icon>
											<icon v-else-if="item.expand" style="font-size: 14px;" class="iconfont icon-triangledownfill"></icon>
											<icon v-else style="font-size: 14px;" class="iconfont icon-playfill"></icon>
										</view>
										<view class="fixe e d" style="flex:1;min-height:100%;">
											<view class="d" style="width:100%; font-size: 16px;">{{item.text||item.title||item.name}}</view>
										</view>
										<view style="width:55px;min-height:100%; font-weight: bold;" class="e c d">
											<icon v-if="(item.id||item.value)==(entity.id||entity.value)" style="font-size: 22px;" class="iconfont icon-check"></icon>
										</view>
									</navigator>
								</template>
								<template v-if="input!='tree'">
									<navigator @click="onItem(item)" url="#" style="height:50px;" class="ux-flex ux-b focus" v-for="item in list">
										<view class="em" style="width: 25px; height: 100%;"></view>
										<view class="fixe e d" style="flex:1;min-height:100%;">
											<view class="d" style="width:100%; font-size: 16px;">{{item.text||item.title||item.name}}</view>
										</view>
										<view style="width:55px;min-height:100%; font-weight: bold;" class="e c d">
											<icon v-if="(item.id||item.value)==(entity.id||entity.value)" style="font-size: 22px;" class="iconfont icon-check"></icon>
										</view>
									</navigator>
								</template>
								<view style="height: 20px;"><span></span></view>
								<view class="ux-data-empty" v-if="input!='tree' && !list.length" title="没有数据">
									<view class="c" style="">
										<span style="color:#999999;">当前没有数据！</span>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<view style="height: 20px;width:100%;"><text></text></view>
				</view>
			</view>
		</root-portal>
	</view>
</template>
<script type="module">
import utils from "../lib/utils.js";
export default{
	data(){
		return {
			label:"",
			index:0,
			showOptions:false,
			entity:{},
			list:[],
			root:[],
			tree:[],
			etype:"default",
			keyword:null,
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
			default:"default",
		},
		action:{
			type:String,
		},
		value:{
			type:[Number,String],
		},
		text:{
			type:String
		},
		input:{
			type:String
		}
	},
	model:{
		prop:"value",
		event:"change",
	},
	name:"combox",
	title:"下拉列表",
	watch:{
		//监听值变化，再赋值给modelVal
		value(value){
			this.onInitValue();
		},
		text(value){
			this.label = this.text;
		},
		items(items){
			this.list = this.convert(items);
			this.onInitValue();
		},
		type(value){
			this.etype = this.type;
		}
	},
	created:function(){
		utils._init(this,{});
		this.label = this.text;
		this.etype = this.type;
		if(this.items && this.items.length){
			this.list = this.convert(this.items);
			this.onInitValue();
		}
	},
	methods:{
		onShowPopup(){
			this.showOptions = true;
			if(this.input=="select"){
				this.getList({},(list)=>{
					this.list = list;
					this.onInitValue();
				});
			}else if(!this.list.length){
				this.getList({parent:0},(list)=>{
					this.root = [{
						text:"顶级节点",
						value:0,
						expand:true,
						requested:true,
						children:list
					}];
					this.tree = this.convertTree(this.root);
				});
			}
		},
		onKeyword(){
			this.getList({q:this.keyword},(list)=>{
				this.list = list;
				this.onInitValue();
			});
		},
		onNode(item){
			item.expand = !item.expand;
			if(!item.requested){
				this.getList({parent:item.value},(list)=>{
					item.children = list;
					item.requested = true;
					this.tree = this.convertTree(this.root);
				});
			}else{
				this.tree = this.convertTree(this.root);
			}
		},
		convertTree(list, parentId = 0, level = 0) {
			const result = [];
			for(var o in list) {
				var item = list[o];
				item.PARENT = parentId;
				item.LEVEL = level;
				result.push(item);
				if(item.expand){
					var children = this.convertTree(item.children,item.value,level+1);
					result.push(...children);
				}
			}
			return result;
		},
		getList(params,callback){
			utils.request({
				url:this.action,
				data:params,
				header:{Authorization:"Bearer "+uni.getStorageSync("Bearer")},
				success:(protocol)=>{
					if(protocol.success||protocol.code==200){
						if(callback){
							callback(protocol.data);
						}
						this.list = protocol.data;
						this.onInitValue();
					}
				}
			});
		},
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
			for(var o in this.list){
				if((this.list[o].value||this.list[o].id)==this.value){
					var item = this.entity = this.list[o];
					this.index = o;
					this.label = item.text || item.title || item.name;
					break;
				}
			}
			if(this.list.length>6){
				this.etype = "popup";
			}
		},
		onShowSheet(){
			var itemList=[];
			for(var o in this.list){
				var item = this.list[o];
				itemList.push(item.text || item.title || item.name);
			}
			uni.showActionSheet({
				itemList: itemList,
				success: (res)=>{
					this.index = res.tapIndex;
					this.onItem(this.list[this.index]);
				},
				fail: (res)=>{
					console.log(res.errMsg);
				}
			},this);
		},
		bindPickerChange(e){
			this.index = e.detail.value;
			this.onItem(this.list[e.detail.value]);
		},
		onItem(item){
			this.entity=item;
			if(!item){
				this.label = null;
				this.$emit("input", null);
				this.$emit("change", null);
			}else{
				this.label = item.text || item.title || item.name;
				try{
					if(typeof(item.id)!="undefined"){
						this.$emit("input", item.id);
						this.$emit("change", item.id);
					}else if(typeof(item.value)!="undefined"){
						this.$emit("input", item.value);
						this.$emit("change", item.value);
					}
				}catch(ex){
					console.error(ex);
				}
			}
			this.showOptions=false;
		},
		onStop(e){
			//e.preventDefault();
			return false;
		}
	}
}
</script>
