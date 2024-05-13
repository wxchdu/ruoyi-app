<template>
	<view style="margin-bottom: 5px;">
		<view v-for="property in innerPropertys" v-if="property.edit!='none' && ((property.edit!='none' && showAll) || (!showAll && property.not_null && property.edit!='readonly') || (editype!='insert' && editype!='modify'))" class="ui-col ux-flex" style="overflow-x: hidden;min-height:60px;background-color:#ffffff;" :class="'ui-col-'+property.input+(property.wide?' ui-col-wide':'')+(property.br?' ui-col-br':' ux-b')">
			<view style="height:100%;" class="e l ui-col-left">
				<view class="ui-col-caption e r">
					<text :style="{'font-weight':property.edit=='editable'?'bold':'500'}" style="color:#333333; min-width: 65px; font-size: 14px; text-align: justify;  text-justify: distribute-all-lines; font-weight: bold;">{{property.caption}} :</text>
					<text v-if="property.not_null && property.edit=='editable'" style="color:#E33731;margin-left:5px;">*</text>
					<text v-if="property.input=='textarea' && property.edit=='editable'" style="font-size:13px;color:#333333; margin-left: auto; margin-right: 20px;">您还可以输入{{255-(entity[property.name]||"").length||255}}个字</text>
				</view>
			</view>
			<view class="fixe e ui-col-warper" :style="{'padding-left':property.br?'20px':'5px'}" style=" overflow-x: hidden; flex:1;padding-left:5px;height:100%;width:100%;">
				<template v-if="property.edit!='readonly'">
					<template v-if="property.input=='text'">
							<input @change="onChange" v-model="entity[property.name]" :placeholder="'请输入'+property.caption" type="text" level="4" style="border:0px;width:100%;height:100%;background:transparent;">
					</template>
					<template v-if="property.input=='number'">
						<view class="ux-flex" style="height:56px;background-color:#ffffff;">
							<input @change="onChange" v-model="entity[property.name]" :placeholder="'请输入'+property.caption" type="text" style="border:0px;width:100%;height:100%;background:transparent;">
						</view>
					</template>
					<template v-if="property.input=='menoy'">
						<input @change="onChange" v-model="entity[property.name]" :placeholder="'请输入'+property.caption" type="text" style="border:0px;width:100%;height:100%;background:transparent;">
					</template>
					<template v-if="property.input=='select'">
						<combox @change="onChange" v-model="entity[property.name]" input="select" :items="property.options" :action="property.action" :text="entity[property.name+'$']" :title="property.caption" type="default" style="height:100%; width:100%;"></combox>
					</template>
					<template v-if="property.input=='query'">
						<combox @change="onChange" v-model="entity[property.name]" input="query" :items="property.options" :action="property.action" :query="true" :text="entity[property.name+'$']" :title="property.caption" type="default" style="height:100%; width:100%;"></combox>
					</template>
					<template v-if="property.input=='combox'">
						<combox @change="onChange" v-model="entity[property.name]" input="select" :items="property.options" :action="property.action" :text="entity[property.name+'$']" :title="property.caption" type="default" style="height:100%; width:100%;"></combox>
					</template>
					<template v-if="property.input=='tree'">
						<combox @change="onChange" v-model="entity[property.name]" input="tree" :items="property.options" :action="property.action" :text="entity[property.name+'$']" :title="property.caption" type="default" style="height:100%; width:100%;"></combox>
					</template>
					<template v-if="property.input=='place'">
						<place @change="onChange" v-model="entity[property.name]"  style="height:100%; width:100%;"></place>
					</template>
					<template v-if="property.input=='datetime'">
						<datetime @change="onChange" v-model="entity[property.name]" ptype="datetime" style="height:100%; width:100%;"></datetime>
					</template>
					<template v-if="property.input=='date'">
						<datetime @change="onChange" v-model="entity[property.name]" ptype="date" style="height:100%; width:100%;"></datetime>
					</template>
					<template v-if="property.input=='score'">
						<score @change="onChange" v-model="entity[property.name]" style="height:100%; width:100%;color:#E33731;"></score>
					</template>
					<template v-if="property.input=='switch'">
						<toggle @change="onChange" v-model="entity[property.name]" val="1" type="switch" style="width:100%;height:100%;text-align:right;"></toggle>
					</template>
					<template v-if="property.input=='textarea'">
						<textarea @change="onChange" v-model="entity[property.name]" maxlength="255" style="height:100px;width:100%;border:0;" :placeholder="'请输入'+property.caption"></textarea>
					</template>
					<template v-if="property.input=='html'">
						<textarea @change="onChange" v-model="entity[property.name]" maxlength="255" style="height:100px;width:100%;border:0;" :placeholder="'请输入'+property.caption"></textarea>
					</template>
					<template v-if="property.input=='images'||property.input=='imagelist'">
						<upload @change="onChange" v-model="entity[property.name]" count="6"></upload>
					</template>
					<template v-if="property.input=='image'">
						<upload @change="onChange" v-model="entity[property.name]" count="1"></upload>
					</template>
					<template v-if="property.input=='file'">
						<el-upload class="upload-demo e" action="https://jsonplaceholder.typicode.com/posts/"
						  :on-change="handleChange" :file-list="fileList">
						  <el-button size="small" type="primary">点击上传</el-button>
						  <view slot="tip" class="el-upload__tip" style="margin: 0px 15px;">请上传文件，文件大小不超过500kb</view>
						</el-upload>
					</template>
					<template v-if="property.input=='radio'">
						<label v-for="item in property.options">
							<radio @change="onChange" v-model="entity[property.name]" :value="item.value" style="color:#1890ff;border-color:#1890ff;"></radio>
							<text>{{item.text}}</text>
						</label>
					</template>
				</template>
				<template v-if="property.edit=='readonly'">
					<template v-if="property.input=='images'||property.input=='imagelist'">
						<upload @change="onChange" v-model="entity[property.name]" count="6" :readonly="true"></upload>
					</template>
					<template v-else-if="property.input=='image'">
						<upload @change="onChange" v-model="entity[property.name]" count="1" :readonly="true"></upload>
					</template>
					<view v-else :class="property.br?'':'d'" style="width: 100%; height: 100%;">
						{{entity[property.name+'$']||entity[property.name]||"-"}}
					</view>
				</template>
			</view>
			<view :style="{width:property.more && property.edit=='editable'?'30px':'10px'}" style="min-height:100%;height:100%;" class="e">
				<icon v-if="property.more && property.edit=='editable'" class="iconfont icon-gengduo1" style="color:#808080;font-size:14px;" type=""></icon>
			</view>
		</view>
	</view>
</template>

<script type="module">
import utils from "../lib/utils.js";
export default {
	name:"dynamic",
	props:{
		//[{edit,not_null,input,br,caption,name,options,more,action}]
		propertys:{
			type:[Object,Array]
		},
		showAll:{
			type:Boolean,
			default:true
		},
		editype:{
			type:String
		},
		value:{
			type:String,
		},
		readonly:{
			type:Boolean
		}
	},
	data() {
		return {
			entity:{},
			innerPropertys:[]
		};
	},
	watch:{
		value(){
			this.entity = JSON.parse(this.value||"{}");
		},
		propertys(){
			this.innerPropertys = this.getPropertys(this.propertys);
		}
	},
	model:{
		prop:"value",
		event:"change",
	},
	created() {
		utils._init(this,{},true);
		this.innerPropertys = this.getPropertys(this.propertys);
		this.entity = JSON.parse(this.value||"{}");
	},
	methods:{
		onChange(){
			var strValue = JSON.stringify(this.entity);
			this.$emit("input", strValue);
			this.$emit("change", strValue);
		},
		getPropertys(propertys){
			if(!propertys)return [];
			var innerPropertys = [];
			propertys.forEach(property=>{
				innerPropertys.push({...property});
			});
			innerPropertys.forEach(property=>{
				if(property.input.match(/textarea|images|image|imagelist|file|files|filelist|grid/g)){
					property.wide = true;
				}
				if(!this.readonly && typeof(property.edit)=="undefined"){
					property.edit = "editable";
				}
				if(property.options && typeof(property.options)=="string"){
					property.options = JSON.parse(property.options);
				}
				if(property.input.match(/select|combox|query|tree/g)){
					property.more = true;
				}
				if(property.not){
					property.not_null=true;
				}
			});
			return innerPropertys;
		}
	}
}
</script>
<style scoped>
.ui-col{
	flex: 1;
	flex-basis: 50%;
	padding: 0px 15px;
}
.ui-col-hidden{
	display: none;
}
.ui-col-wide{
	flex-basis: 100%;
}
.ui-col-br{
	margin-bottom: 10px;
	padding-bottom: 15px;
}
.ui-col-warper{
	font-size: 16px;
}
.ui-col-br .ui-col-warper{
	padding-top: 5px;
	padding-bottom: 5px;	
}
.ui-col-left{
	min-width: 72px;
	min-height: 44px;
}
.ui-col-caption{
	min-width: 72px;
	padding-left: 15px;
}
.ui-col-br .ui-col-caption{
	width: 100%;
	justify-content: start;
	height: 44px !important;
}
.ui-col-wide .ui-col-left{
	width:100%;
}
.ui-col-wide .ui-col-warper{
	padding-top: 5px;
	padding-bottom: 15px;
}
</style>