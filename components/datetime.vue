<template>
	<view class="e" style="height:100%;width:100%;min-height:32px;">
		<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" style="float: left; min-width: 78px;">
			<view>{{date||"请选择日期"}}</view>
		</picker>
		<picker v-if="ptype=='datetime'||ptype=='time'" mode="time" :value="time" start="00:00" end="23:59" @change="bindTimeChange" style="flex: 1; padding-left: 5px;">
			<view>{{time||""}}</view>
		</picker>
	</view>
</template>
<script type="module">
import utils from "../lib/utils.js";
function getDate(type,ptype,inDate) {
	const date = inDate?new Date(inDate):new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hour = date.getHours();
	let minute = date.getMinutes();
	if (type === 'start') {
		year = year - 10;
	} else if (type === 'end') {
		year = year + 10;
	}
	month = month > 9 ? month : '0' + month;
	day = day > 9 ? day : '0' + day;
	hour = hour > 9 ? hour : '0' + hour;
	minute = minute > 9 ? minute : '0' + minute;
	if(ptype=="year"){
		return ''+year;
	}
	if(ptype=="month"){
		return year+'-'+month;
	}
	if(ptype=="day"){
		return year+'-'+month+'-'+day;
	}
	if(ptype=="time"){
		return hour+':'+minute+":00";
	}
	if(ptype=="datetime"||ptype=="date"){
		return year+'-'+month+'-'+day;
	}
}
export default{
	data(){
		return {
			date:"",
			time:"",
			startDate:"",
			endDate:"",
			entity:{},
			list:[],
			innerValue:null
		}
	},
	props:{
		ptype:{
			type:String,
			default:"day",
		},
		value:{
			type:[Number,String],
		}
	},
	model:{
		prop:"value",
		event:"change",
	},
	name:"datetime",
	title:"日期选择",
	watch:{
		//监听值变化，再赋值给modelVal
		value(value){
			this.innerValue=value;
			if(this.innerValue){
				this.date = getDate(null,"date",this.ptype=="datetime"?this.innerValue:null);
				this.time = getDate(null,"time",this.ptype=="datetime"?this.innerValue:null);
				this.startDate = getDate('start',this.ptype,this.ptype=="datetime"?this.innerValue:null);
				this.endDate = getDate('end',this.ptype,this.ptype=="datetime"?this.innerValue:null);
				if(this.ptype=="date" && this.innerValue){
					this.date = this.innerValue;
				}
				if(this.ptype=="time" && this.innerValue){
					this.time = this.innerValue;
				}
			}
		}
	},
	mounted:function(){
		utils._init(this,{});
		this.innerValue=this.value;
		if(this.innerValue){
			this.date = getDate(null,"date",this.ptype=="datetime"?this.innerValue:null);
			this.time = getDate(null,"time",this.ptype=="datetime"?this.innerValue:null);
			this.startDate = getDate('start',this.ptype,this.ptype=="datetime"?this.innerValue:null);
			this.endDate = getDate('end',this.ptype,this.ptype=="datetime"?this.innerValue:null);
			if(this.ptype=="date" && this.innerValue){
				this.date = this.innerValue;
			}
			if(this.ptype=="time" && this.innerValue){
				this.time = this.innerValue;
			}
		}
	},
	methods:{
		onChange(){
			var strValue = this.date;
			if(this.ptype=="date"){
				strValue = this.date;
			}else if(this.ptype=="time"){
				strValue = this.time;
			}else if(this.ptype=="datetime"){
				strValue = this.date+" "+this.time;
			}
			this.$emit("input", strValue);
			this.$emit("change", strValue);
		},
		bindTimeChange:function(e) {
			this.time = e.detail.value+":00";
			this.onChange();
		},
		bindDateChange:function(e) {
			this.date = e.detail.value;
			this.onChange();
		},
	},
}
</script>
