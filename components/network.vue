<template>
	<view>
		<slot></slot>
	</view>
</template>
<script type="module">
import utils from "../lib/utils.js";
export default{
	data(){
		return {
			entity:{},
			list:[],
			vm:{},
		}
	},
	props:{
		action:{
			type:String,
		},
		title:{
			type:String,
		},
		subtit:{
			type:String,
		}
	},
	model:{
		prop:"value",
		event:"change",
	},
	name:"network",
	created:function(){
		utils._init(this,{},true);
		if(this.action){
			utils.request({
				url:this.action,
				success:(protocol)=>{
					if(protocol.success){
						var data = protocol.data;
						if(!data.title)
							data.title = this.title;
						if(!data.subtit)
							data.subtit = this.subtit;
						this.doChange(data);
					}
				}
			});
		}
	},
	methods:{
		doChange:function(value){
			//把当前的值，传给父类
			this.$emit("input", value);
			this.$emit("change", value);
		},
	},
}
</script>
