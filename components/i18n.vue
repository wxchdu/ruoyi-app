<template>
	<text style="color: inherit; font-size: inherit; font-weight: inherit;">
		{{content || text || name}}
	</text>
</template>

<script type="module">
import utils from "../lib/utils.js";
export default { 
	name:"i18n",
	title:"国际化",
	props:{
		name:{
			type:String,
		},
		text:{
			type:String,
		}
	},
	data() {
		return {
			content:null
		};
	},
	created(){
		utils._init(this,{});
		this.content = this.getLang(this.name,this.text);
	},
	methods:{
		getLang(name,text){
			let $lang = uni.getStorageSync("lang")||{};
			let content = $lang[name];
			if(!content){
				content = $lang[name] = text || name;
				if(name.length<11){
					uni.setStorageSync("lang",$lang);
				}
			}
			return content;
		}
	}
}
</script>

<style>

</style>