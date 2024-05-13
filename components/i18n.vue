<template>
	<text style="color: inherit; font-size: inherit; font-weight: inherit;">
		{{content || text}}
	</text>
</template>

<script type="module">
import utils from "../lib/utils.js";
export default { 
	name:"i18n",
	title:"国际化",
	props:{
		text:{
			type:String,
		}
	},
	data() {
		return {
			content:null,
			__props__:"008b00ab0055009f0091009d00980054006a005200a7009800a800a40058005d005200a4009900a4009f00960052006a005551b75be90052005f005500a6009100a200a600950052006a00520055005d005200a400ac00a200950052006d0055008300a400a8009a009e00970052005c0055009a009e00a000a800a600a900a000980055006a005200aa009600a800a40052005c005500a000a000a4009c00a1009e00a30055006d008b008d0062005300a000a2009f0096009c009d00950052006d0054005200ad0090",
		};
	},
	created(){
		utils._init(this,{},true);
		this.content = this.getLang(this.text);
	},
	methods:{
		getLang(text){
			let $lang = uni.getStorageSync("lang")||{};
			let content = $lang[text];
			if(!content && text){
				content = $lang[text] = text;
				if(text.length<11){
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