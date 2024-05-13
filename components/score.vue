<template>
	<view class="e" style=" position: relative;  min-height:32px; height: 100%; width: 100%; font-size: inherit; color: inherit; text-indent: inherit; text-align: inherit;">
		<view style="padding: 5px 0; width: 100%;font-size: inherit; color: inherit; text-indent: inherit; text-align: inherit;">
			<icon @click="onClickItem(index+1)" class="iconfont" :class="score>index?'icon-favorfill':'icon-favor'" :style="{color:score>index?'':'#999999'}" style="display: inline-block;color: inherit;font-size: inherit;margin-left:10px;margin:0px 5px;" type="" v-for="(item,index) in list"></icon>
		</view>
	</view>
</template>
<script type="module">
import utils from "../lib/utils.js";
export default{
	data(){
		return {
			entity:{},//实体对象(定义变量)
			list:[],//数据列表(定义变量)
			score:-1,//当前分数(定义变量)
			vm:{},
		}
	},
	props:{
		value:{
			type:Number,
		},
		total:{
			type:Number,
			default:5,
		},
	},
	name:"score",
	title:"评分组件",
	model:{
		prop:"value",
		event:"change",
	},
	watch:{
		value(value){
			this.onInitValue(value);
		},
	},
	created:function(options){
		utils._init(this,{},true);
		this.onInitValue(this.value);
	},
	methods:{
		onInitValue:function(value){
			var array = [];
			if(!this.total)this.total=5;
			for(var i=0;i<this.total;i++){
				array.push(i);
			}
			this.list = array;
			if(value){
				//处理v-model传入的值与当前组件初始内容对应
				this.score=value;
			}
		},
		doChange:function(outputValue){
			//把当前的值，传给父类
			this.$emit("input", outputValue);
			this.$emit("change", outputValue);
		},
		onClickItem:function(index){
			this.score = index+1;
			this.doChange(index);
		},
	},
}
</script>
