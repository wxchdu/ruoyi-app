<template>
	<view class="ux-flex" :class="count==1?'c':'l'" style="width:100%;padding: 2px;">
		<view v-for="(item,index) in list" test="false" class="e c" :style="{width:(Number(size||80)+4)+'px',height:(Number(size||80)+4)+'px'}" style="position: relative;">
			<view :style="{width:(size||80)+'px',height:(size||80)+'px'}" style="width:80px;height:80px; flex-flow: column;" class="c t">
				<img border="0" :src="item" style="width:100%;height:100%;" @click="onUpload(index)">
				<view v-if="count>1" style="position:absolute;width:36rpx;height:36rpx;top:-9px;z-index:1;background-color:#E33731;border-radius:180rpx;right:-9px;" class="e c" @click="onRemove(index)">
					<icon class="iconfont icon-close" style="color:#ffffff;font-size:22rpx;border-radius:180rpx;"></icon>
				</view>
				<input v-if="count==1 && (vm.platform=='DUTE'||vm.platform=='H5')" @change="doUpload" accept="image/*" type="file" style="border:0px;width:100%;height:100%;background:transparent;position:absolute;z-index:9;top:0px;left:0px;opacity:0;">
			</view>
		</view>
		<view v-if="list.length==0 || count>1" class="e c" :style="{width:(Number(size||80)+4)+'px',height:(Number(size||80)+4)+'px'}" style="position: relative;">
			<view v-if="!readonly" :style="{width:(size||80)+'px',height:(size||80)+'px'}" style="width:80px;height:80px; border:1px dashed #D2D0D0;flex-flow: column;" class="c t ux-flex" @click="onUpload()">
				<view class="fixe c e" style="min-width:100%;flex:1;">
					<icon class="iconfont icon-cameraadd" :style="{'font-size':(size||80)/3+'px'}" style="font-size: 28px;color: rgb(153, 153, 153);" type=""></icon>
				</view>
				<view style="min-width:100%;height:30px;" class="c t">
					<text style="font-size: 24rpx; color: rgb(153, 153, 153);">上传图片</text>
				</view>
			</view>
			<input v-if="vm.platform=='DUTE'||vm.platform=='H5'" @change="doUpload" accept="image/*" type="file" style="border:0px;width:100%;height:100%;background:transparent;position:absolute;z-index:9;top:0px;left:0px;opacity:0;">
		</view>
	</view>
</template>
<script type="module">
import utils from "../lib/utils.js";
export default{
	data(){
		return {
			entity:{},
			isArray:false,
			list:[],
			vm:{},
			triggered:true,
		}
	},
	props:{
		count:{
			type:Number,
			default:1,
		},
		action:{
			type:String,
		},
		value:{
			type:[Number,String],
		},
		size:{
			type:Number,
			default:80,
		},
		readonly:{
			type:Boolean
		}
	},
	model:{
		prop:"value",
		event:"change",
	},
	name:"upload",
	title:"图片上传",
	watch:{
		value(value){
			if(!this.list||!this.list.length){
				this.onInitValue(value);
			}
		},
	},
	created:function(options){
		utils._init(this,{},true);
		this.onInitValue(this.value);
	},
	methods:{
		onInitValue:function(value){
			if(value){
				if(Array.isArray(value)){
					this.list = value;
					this.isArray = true;
				}else if(value.startsWith("[")){
					this.list = JSON.parse(value);
					this.isArray = true;
				}else{
					this.list = value.split(",");
				}
			}
		},
		onChange:function(){
			if(this.isArray){
				this.$emit("input", this.list);
				this.$emit("change", this.list);
			}else{
				this.$emit("input", this.list.join(","));
				this.$emit("change", this.list.join(","));
			}
		},
		onRemove:function(index){
			this.list.splice(index,1);
			this.onChange();
		},
		onUploaded:function(url,index){
			if(typeof(index)!="undefined"){
				this.list[index] = url;
			}else{
				this.list.push(url);
				if(this.list.length>this.count){
					this.list.splice(0,this.list.length-this.count);
				}
			}
			var list = this.list;
			this.list = null;
			this.setData({
				list:list
			});
			this.onChange();
		},
		onUpload:function(index){
			if(this.readonly){
				return;
			}
			uni.chooseImage({
				count: this.count||1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album',"camera"], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
				success: (res)=>{
					//res.tempFilePaths 图片的本地文件路径列表
					for(var o in res.tempFilePaths){
						utils.upload({
							url: this.action || "/api/lib/upload.vo",
							path:res.tempFilePaths[o],
							success:(protocol)=>{
								//返回图片地址为：protocol.data.url
								this.onUploaded(protocol.data.url,index);
							}
						});
					}
				}
			});
		},
		doUpload(e){
			var config = this.getConfig();
			var imgFile = e.target.files[0]; //获取图片文件
			var formData = new FormData();  // 创建form对象
			formData.append('file', imgFile);  // 通过append向form对象添加数据
			$.ajax({
			    url: config.apiHost + ("/api/lib/upload.vo"), //请求的接口地址
			    type: 'POST',
			    cache: false, //上传文件不需要缓存
			    data: formData,
			    processData: false, // 不要去处理发送的数据
			    contentType: false, // 不要去设置Content-Type请求头
			    success: (protocol)=>{
			        if(protocol.success){
						this.onUploaded(protocol.data.url);
					}
			    },
			    error: function(err){
			        console.log(err)
			    }
			})
		}
	},
}
</script>
