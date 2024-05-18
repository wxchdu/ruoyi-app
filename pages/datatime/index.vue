<template>
	<view class="page">
		<view style="width:100%;height:50px;background-color:#ffffff;z-index:999;" :style="{height:(vm.statusBarHeight)+'px'}" class="em"></view>
		<view style="width:100%;height:50px;background-color:#ffffff;z-index:999;" :style="{height:(vm.statusBarHeight)+'px'}" class="em"></view>
		<navigator style="height:40px;background-color:#ffffff;line-height:15px;z-index:999;padding:5px 0;" class="ux-flex">
			<view class="e c" style="min-height:100%;height:100%;margin-left:15px;">
				<icon class="iconfont icon-rili2" style="font-size: 22px;"></icon>
			</view>
			<view class="fixe e l" style="flex:1;min-height:100%;font-size:20px;font-weight:bold;padding-left:15px;width:135px;height:100%;">{{time}}</view>
			<view style="width:138px;min-height:100%;height:100%;" class="row">
			</view>
		</navigator>
		<view class="calendar-content" >
			<view>
				<!-- 插入模式 -->
				<uni-calendar 
				class="uni-calendar--hook"  
				:ishidden="showCalendar" 
				:selected="info.selected" 
				:showMonth="false" 
				@change="change" 
				@monthSwitch="monthSwitch" 
				@transmit="getMessage" 
				@sendweeks="getweeks"
				 />
			</view>
		</view>
		<view>
			
		</view>
		<view class="example-body hideOnPc">
			<button class="calendar-button" style="box-shadow: 0px 5px 5px #E0E0E0; margin-bottom: 5px;" type="button" @click="open">
				<view style="height: 3px;width: 30px; margin: 5px auto; background-color: #E0E0E0;"></view>
			</button>
		</view>
		<scroll-view scroll-y="true" refresher-enabled="false"  >
			<view class="ux-flex ux-b" style="width: 100%; margin-top: 10px;">
				<timeline></timeline>
				<view style="width:65px;min-height:100%;">
					<view v-for="count in 25" v-if="count>=8" class="ux-t ux-r e c" style="height: 40px;">
						<text style="color: #E0E0E0;" class="e c">{{count}}:00</text>
					</view>
				</view>
				<scroll-view class="fixe" scroll-x="true" style="flex:1;height:100%;overflow-x: overlay;">
					<view class="ux-nowarp" style="height:100%;">
						<view v-for="(dataItem,dataItemIndex) in datas" style="width:120px;min-height:100%;">
							<view v-for="count in 25" v-if="count>=8" class="ux-t ux-r e c" style="height: 40px;">
								<text v-if="count==8" style="color: #E0E0E0; font-size: 11px;" class="e c">{{dataItem.date}}</text>
							</view>
							<view  class="ux-flex" v-for="(item,index) in dataItem.items" :style="{top: item.top,height:item.height}" style=" max-height: 600px; position:absolute;width: 100%;">
									<view  :class="[item.type=='TODO' ? 'todoClass' : 'taskClass']"  style="flex: 1; display: flex; margin-right: 1px;min-height:20px; height:100%;overflow: hidden;">
											<view style="height: 100%;width: auto; margin: 5px;">
												<view style="margin-left: 10px ;font-size: 11px; color: #ffffff ;height: 15px; ">{{item.title}}</view>
												<text style="height: 50px; color: #ffffff">{{item.detial}}</text>
											</view>
										<!-- <view  style="height: 100%;width: 3px;background-color: rgba(24, 144, 255, .8);"></view> -->
									</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</scroll-view>
		<Dialog :show="dialogShow" @update:show="closepop">
			<scroll-view scroll-y="true" style="background-color: #ffffff;height: 600px;">
					<uni-forms border="ture" :modelValue="formData" style="height: 100%;">
							<uni-forms-item label-width="100px" labelAlign="center" required label="所属项目" name="name" class="e">
								<picker  mode="multiSelector" @change="bindPickerChange" :value="index" :range="array" style=" height: 30px;;display: flex;font-size: 17px;">
									<text class="uni-input" style="border: 1px;">{{array[index]}}</text>
								</picker>
							</uni-forms-item>
							<uni-forms-item label-width="100px" labelAlign="center" label="提醒时间" name="age" style="border-top: 3px solid #E0E0E0;">
								<uni-datetime-picker
												type="date"
												:value="time"
												start="2021-3-20"
												end="2025-6-20"
												@change="change"
											/>
							</uni-forms-item>
							<uni-forms-item label-width="100px" labelAlign="center" required name="hobby" label="日程标题" style="height: 30px;border-top: 3px solid #E0E0E0;">
								<uni-easyinput v-model="value" :styles="styles" :placeholderStyle="placeholderStyle" placeholder="日程标题"@input="input"></uni-easyinput>
							</uni-forms-item>
							<uni-forms-item label-width="100px" labelAlign="center" name="hobby" label="日程详情" style="height: 30px;border-top: 3px solid #E0E0E0;">
								<textarea  placeholder="请输入日程详情"/>
							</uni-forms-item>
							<uni-forms-item label-width="100px" labelAlign="center" name="hobby" label="重复" style="height: 30px;border-top: 3px solid #E0E0E0;">
								  <uni-data-select
								      v-model="repeatValue"
								      :localdata="rangeRepeat"
								      @change="change"
								    ></uni-data-select>
							</uni-forms-item>
							<uni-forms-item label-width="100px" labelAlign="center" name="alert" label="提醒设置" style="height: 30px;border-top: 3px solid #E0E0E0;">
								  <uni-data-select
								      v-model="alertValue"
								      :localdata="rangeAlert"
								      @change="change"
								    ></uni-data-select>
							</uni-forms-item>
							<uni-forms-item label-width="100px" labelAlign="center" required name="time" label="事项工时" style="height: 30px;border-top: 3px solid #E0E0E0;">
								  <uni-easyinput v-model="value" :styles="styles" :placeholderStyle="placeholderStyle" placeholder="输入事项工时"@input="input"></uni-easyinput>
							</uni-forms-item>
					</uni-forms>
			</scroll-view>
		</Dialog>
		<Dialog :show="dialogShowTask" @update:show="closepop">
			<scroll-view scroll-y="true" style="background-color: #ffffff;height: 600px;">
					<uni-forms border="ture" :modelValue="formData" style="height: 100%;">
							<uni-forms-item label-width="100px" labelAlign="center" required label="所属项目" name="name" >
								<picker  mode="multiSelector" @change="bindPickerChange" :value="index" :range="array" style=" height: 30px;;display: flex;font-size: 17px;" class="e">
									<text class="uni-input" style="border: 1px">{{array[index]}}</text>
								</picker>
							</uni-forms-item>
							<uni-forms-item required label-width="100px" labelAlign="center" label="任务描述" name="age" style="height: 30px;border-top: 3px solid #E0E0E0;">
								<textarea  placeholder="请输入任务描述" />
							</uni-forms-item>
							<uni-forms-item label-width="100px" labelAlign="center" name="hobby" label="相关截图" style="height: 30px;border-top: 3px solid #E0E0E0;">
								<upload action="/common/upload" count=9></upload>
							</uni-forms-item>
							<uni-forms-item label-width="100px" labelAlign="center" name="hobby" label="所属分类" style="height: 30px;border-top: 3px solid #E0E0E0;">
								<textarea  placeholder="请输入日程详情"/>
							</uni-forms-item>
							<uni-forms-item label-width="100px" labelAlign="center" name="hobby" label="所属子类" style="height: 30px;border-top: 3px solid #E0E0E0;">
								  <uni-data-select
								      v-model="repeatValue"
								      :localdata="rangeRepeat"
								      @change="change"
								></uni-data-select>
							</uni-forms-item>
							<uni-forms-item label-width="100px" labelAlign="center" name="alert" label="任务类型" style="height: 30px;border-top: 3px solid #E0E0E0;">
								  <uni-data-select
								      v-model="categoryValue"
								      :localdata="rangeCategory"
								      @change="change"
								    ></uni-data-select>
							</uni-forms-item>
							<uni-forms-item label-width="100px" labelAlign="center"  name="emergency" label="紧急程度" style="height: 30px;border-top: 3px solid #E0E0E0;">
								<uni-data-select
								    v-model="emergencyValue"
								    :localdata="rangeEmergency"
								    @change="change"
								  ></uni-data-select>
							</uni-forms-item>
							<uni-forms-item label-width="100px" labelAlign="center"  name="resolve" label="处理思路" style="height: 30px;border-top: 3px solid #E0E0E0;">
								<textarea  />
							</uni-forms-item>
							<uni-forms-item label-width="100px" labelAlign="center"  name="time" label="开始时间" style="height: 30px;border-top: 3px solid #E0E0E0;">
								<uni-datetime-picker
												type="date"
												:value="time"
												start="2021-3-20"
												end="2025-6-20"
												@change="change"
												/>
							</uni-forms-item>
							
					</uni-forms>
			</scroll-view>
		</Dialog>
		<view @click="showDialog" style="position: fixed;right: 10px;bottom: 10px;border-radius: 90px">
			<icon class="iconfont icon-roundaddfill" style=" font-size: 40px;color: rgba(255, 87, 34, .85);border-radius: 90px;"></icon>
		</view>
		<view @click="showDialogtask" style="position: fixed;right: 10px;bottom: 50px;border-radius: 90px">
			<icon class="iconfont icon-roundaddfill" style=" font-size: 40px;color: rgba(24, 144, 255, .8);border-radius: 90px;"></icon>
		</view>
	</view>
</template>


<script>
import	BASE_URL from "../../utils/url.js"
import timeline from "../../components/timelie.vue"
import Dialog from"./dialog.vue"
import upload from"../../components/upload.vue"
	/**
		 * 获取任意时间
		 */
		
		export default {
			components: {
				timeline,
				Dialog,
				upload
			},
			data() {
				return {
					dialogShow:false,
					dialogShowTask:false,
					user:null,
					scrollTop: '0px',
					topY:"20px",
					weeks: [],
					datas: [],
					triggered:true,
					time:"",
					showCalendar: true,
					info: {
						lunar: true,
						range: true,
						insert: false,
						selected: []
					},
					works:[],
					offset:{
						top: "",
						bottom: "",
						left: "",
						right: "",
						zIndex: "",
					},
					formData:{
						name:"",
						age:"",
						hobby:""
					},
					 array: ["企业数字化"],
					 index: 0,
					 repeatValue: 1,
					 alertValue: 1,
					 emergencyValue:1,
					 categoryValue:1,
						rangeCategory:[
							{ value: 0, text: "默认" },
							{ value: 1, text: "缺陷" },
							{ value: 2, text: "优化" },
							{ value: 3, text: "需求" },
						],
						rangeRepeat: [
					         { value: 0, text: "不重复" },
					         { value: 1, text: "每天重复" },
					         { value: 2, text: "每工作日" },
							 { value: 3, text: "每周重复" },
							 { value: 4, text: "每月重复" },
					       ],
						rangeAlert:[
							{ value: 0, text: "不提前" },
							{ value: 1, text: "提前半小时" },
							{ value: 2, text: "提前一小时" },
							{ value: 3, text: "提前两小时" },
							{ value: 4, text: "提前六小时" },
							{ value: 5, text: "提前十二小时" },
						],
						rangeEmergency:[
							{ value: 0, text: "较低" },
							{ value: 1, text: "一般" },
							{ value: 2, text: "优先" },
							{ value: 3, text: "紧急" },
							{ value: 4, text: "严重" },
						]
				}
			},
			onReady() {
				this.$nextTick(() => {
					this.showCalendar = true
				})
				this.getInfo()
				// TODO 模拟请求异步同步数据
				// setTimeout(() => {
				// 	this.info.date = getDate(new Date(),-30).fullDate
				// 	this.info.startDate = getDate(new Date(),-60).fullDate
				// 	this.info.endDate =  getDate(new Date(),30).fullDate
				// 	this.info.selected = [{
				// 			date: getDate(new Date(),-3).fullDate,
				// 			info: '打卡'
				// 		},
				// 		{
				// 			date: getDate(new Date(),-2).fullDate,
				// 			info: '签到',
				// 			data: {
				// 				custom: '自定义信息',
				// 				name: '自定义消息头'
				// 			}
				// 		},
				// 		{
				// 			date: getDate(new Date(),-1).fullDate,
				// 			info: '已打卡'
				// 		}
				// 	]
				// }, 2000)
			},
			methods: {
				closepop(){
					this.dialogShow = false;
					this.dialogShowTask=false;
					console.log(this.dialogShow);
				},
				showDialog() {  
					console.log(this.dialogShow);
				      this.dialogShow = true; // 显示弹层  
				    } ,
				showDialogtask(){
						this.dialogShowTask = true; // 显示弹层  
					},
				getInfo(){
					uni.request({
						url: BASE_URL+"/getInfo",
						method: 'GET',
						header: {Authorization:uni.getStorageSync('token')},
						success: (res) => {
							this.user=res.data.user;
							this.getTask();
						}
					})
				},
				getTask(){
					uni.request({
						url:BASE_URL+"/pms/index.do",
						method: 'GET',
						data: {
							userIds:this.user.id,
							dateType:7,
							date:this.time,
						},
						header: {Authorization:uni.getStorageSync('token')},
						success: (res) => {
							 this.datas=res.data.data.datas;
							 this.datas.forEach(dataItem=>{
								 dataItem.items.forEach(item=>{
									 item.top=item.top/3*2+1+"px"
									 item.height=item.height/3*2+"px"
								 });
							 })
						}
					})
				},
				getTopY(){
					this.topY= '20px';
				},
				getweeks(weeks){
					this.weeks=weeks;
					console.log(this.weeks);
				},
				open() {
					this.showCalendar= !this.showCalendar;
				},
				close(){
					console.log('弹窗关闭');
				},
				change(e) {
					console.log('change 返回:', e)
					// 模拟动态打卡
					// if (this.info.selected.length > 5) return
					// this.info.selected.push({
					// 	date: e.fulldate,
					// 	info: '打卡'
					// })
				},
				confirm(e) {
					console.log('confirm 返回:', e)
				},
				monthSwitch(e) {
					console.log('monthSwitchs 返回:', e)
				},
				getMessage(data) {
				        this.time = data.fullDate; //data即为子组件发送的数据
						this.getTask();
				    }
			}
		}
	

</script>

<style>
	.todoClass{
		background-color: rgba(255, 87, 34, .85);
	}
	.taskClass{
		background-color: rgba(24, 144, 255, .8);
	}
	.textBorder{
		border: 1px solid black;
	}
</style>