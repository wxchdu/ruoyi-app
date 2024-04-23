<template>
	<view class="e" style=" position: relative;  min-height:32px; height: 100%; width: 100%; font-size: inherit; color: inherit; text-indent: inherit; text-align: inherit;">
		<switch v-if="inputtype=='switch'" :checked="checked" @change="onSwitch" :color="color"></switch>
		<radio v-if="inputtype=='radio'" @click="onRadio" :checked="checked" :color="color"></radio>
	</view>
</template>
<script type="module">
import utils from "../lib/utils.js";
export default{
	data(){
		return {
			entity:{},
			list:[],
			checked:false,
			vm:{},
		}
	},
	props:{
		value:{
			type:[Number,String,Boolean]
		},
		val:{
			type:[Number,String,Boolean]
		},
		inputtype:{
			type:String,default:"switch"
		},
		color:{
			type:String,
		},
	},
	name:"toggle",
	title:"切换器",
	profile:"如果val未设置值 ，则只对绑定的变量做true/false切换",
	model:{
		prop:"value",
		event:"change,input",
	},
	watch:{
		value(value){
			this.onInitValue(value);
		},
	},
	created:function(){
		utils._init(this,{});
		this.onInitValue(this.value);
	},
	methods:{
		onInitValue:function(value){
			//处理v-model传入的值与当前组件初始内容对应
			//如果val未设置值 ，则只对绑定的变量做true/false切换
			if(typeof(this.val)!="undefined" && (""+this.val)!="null"){
				if(value==this.val){
					this.checked = true;
				}else{
					this.checked = false; 
				}
			}else{
				this.checked = value;
			}
		},
		doChange:function(outputValue){
			//把当前的值，传给父类
			this.$emit("input", outputValue);
			this.$emit("change", outputValue);
		},
		onSwitch:function(e){
			this.onInitValue(e.detail.value);
			this.doChange(e.detail.value?this.val:0);
		},
		onRadio:function(e){
			if(typeof(this.val)!='undefined' && (""+this.val)!="null"){//定义了值 
				this.onInitValue(e.detail.value);
				this.doChange(this.val);
			}else{//未定义值，则做radio的切换
				this.checked=!this.checked;
				this.doChange(this.checked);
			}
		},
	},
}
</script>
