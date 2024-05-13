<template>
	<cover-view style="position:fixed;left:0px;top:0px;width:100%;height:100%;z-index:999999;background-color:rgba(0,0,0,0.70);" class="e c popup" v-if="coupondata && coupondata.length">
		<cover-view class="ux-flex" style="flex-flow:column;width:96%;">
			<cover-view  style="min-width:100%; position: relative;" open-type="navigate">
				<cover-image border="0" src="https://5deli.oss-cn-hangzhou.aliyuncs.com/XMALL-A-24/2023/10/11/1635501393467.png" mode="widthFix" style="width:100%;"/>
				<cover-view style="position: absolute; top:150px; left:50px; bottom:66px; right: 55px; overflow-y: scroll;">
					<cover-view v-for="item in coupondata" style="width: 100%; height: 66px; margin-top: 8px; position: relative;"> 
						<cover-image src="../static/item.png" mode="widthFix" style="width: 100%;"/>
						<cover-view style="position: absolute; top:0px; left:-10px; width: 100%; height: 100%; z-index: 2; ">
							<cover-view class="e c" style="position: absolute; top:0px; left:-10px; height: 100%; width: 100px;">
								<cover-view v-if="item.mode==0" style="color: #fff;">￥</cover-view>
								<cover-view v-if="item.mode==0" style="color: #fff; font-size: 16px; font-weight: bold; ">{{toFixed(item.ammout)}}</cover-view>
								<cover-view v-if="item.mode==1" style="color: #fff; font-size: 16px; font-weight: bold; ">{{toFixed(item.ammout*10)}}</cover-view>
								<cover-view v-if="item.mode==1" style="color: #fff;">折</cover-view>
							</cover-view> 
							<cover-view style="position: absolute; top:0px; left:88px;height: 100%; right: 0px; ">
								<cover-view class="b" style="font-size: 14px; font-weight: bold; height: 50%; padding-left: 0px;">
									<cover-view>{{item.name}}</cover-view>
								</cover-view>
								<cover-view style="height: 50%; padding-left: 0px;">
									<cover-view style="font-size: 11px;">有效期{{item.validity$}}</cover-view>
								</cover-view>
							</cover-view>
						</cover-view>
					</cover-view>
				</cover-view>
				<cover-view class="e c" style="position: absolute; height:44px; left:45px; bottom:15px; right: 50px; ">
					<cover-view @click="drawCoupon" class="e c" style="height: 36px; border-radius: 90px;background-color: #ffdc1d; width: 80%;font-size: 16px; color: #b56408;">
						<cover-view>全部收下</cover-view>
					</cover-view>
				</cover-view>
			</cover-view>
			<cover-view style="min-width:100%; position: relative; height: 66px;" class="c">
				<cover-view style="position:absolute;top:20px;">
					<cover-view style="width:25px;height:25px;border-color:rgba(255,255,255,0.70);border-width:1px;border-style:solid;border-radius:90px;background-color:rgba(0,0,0,0.60);" class="e c" @click="coupondata=null">
						<cover-image src="../static/close.png" style="width: 100%; height: 100%;"/>
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
			coupondata:null
		}
	},
	props:{
		couponData:{
			type:Array,
		},
		couponSharer:{
			type:String
		},
		success:{
			type:Function
		}
	},
	name:"coupon",
	title:"弹窗组件",
	profile:"{image,url,button:{title(如果有为空，按钮则透明背景),bottom(按钮底部位置),width(按钮宽度),heigh(按钮高度)}}",
	model:{
		prop:"value",
		event:"change",
	},
	watch:{
		couponData(value){
			this.coupondata = value;
		},
	},
	created:function(options){
		utils._init(this,{},true);
	},
	methods:{
		toFixed(n){
			return n.toFixed(2);
		},
		drawCoupon(){
			utils.request({
				url:'/api/coupon/draw.do',
				data:{
					SHARE:uni.getStorageSync('SHARE')
				},
				success:(protocol)=>{
					if(protocol.success){
						var data = {};
						for(var o in protocol.data)data[o]=protocol.data[o];
						this.setData(data);
						uni.removeStorageSync("SHARE");
					}
					this.coupondata = null;
				}
			});
		},
		onInitValue:function(value){
			
		},
		onClick:function(){
			this.coupondata = null;
		}
	},
}
</script>
