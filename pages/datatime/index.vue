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
			<uni-section title="插入模式" type="line"></uni-section>
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
			<button class="calendar-button" style="box-shadow: 0px 5px 5px #888888; margin-bottom: 5px;" type="button" @click="open">
				<view style="height: 3px;width: 30px; margin: 5px auto; background-color: #888888;"></view>
			</button>
		</view>
		<scroll-view scroll-y="true" refresher-enabled="true" :scroll-top='scrollTop' :refresher-triggered="triggered" @refresherrefresh="onRefresh" >
			<view >
				<view v-for="count in 25">
					<view class="ux-flex" style="font-size: 15px;margin-bottom: 20px;">
						<view style="width:65px;min-height:100%;color: #E0E0E0;" class="e c">{{count}}:00</view>
						<view class="fixe e ux-flex" style="flex:1;height:1px; background:#E0E0E0;"></view>
					</view>
				</view>
				<view class="ux-flex" :style="{top: topY}" style="position:absolute;width: 100%;">
					<view style="width:65px;min-height:100%;height: 100%;"></view>
					<view  style="flex: 1; display: flex;margin-right: 3px; background-color: #e1e9fe;height: 100px;border-radius: 5px;overflow: hidden;">
						<view style="height: 100%;width: 3px;background-color: #5494ff;"></view>
						<view style="height: 100%;width: auto;">
							<view style="color: #5494ff ;height: 15px; ">新主题</view>
							<text style="height: 50px;">日程安排</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>


<script>
	
	/**
		 * 获取任意时间
		 */
		function getDate(date, AddDayCount = 0) {
			if (!date) {
				date = new Date()
			}
			if (typeof date !== 'object') {
				date = date.replace(/-/g, '/')
			}
			const dd = new Date(date)
	
			dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
	
			const y = dd.getFullYear()
			const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
			const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
			return {
				fullDate: y + '-' + m + '-' + d,
				year: y,
				month: m,
				date: d,
				day: dd.getDay()
			}
		}
		export default {
			components: {},
			data() {
				return {
					scrollTop: '230px',
					topY:"20px",
					weeks: [],
					triggered:true,
					time:"",
					showCalendar: true,
					info: {
						lunar: true,
						range: true,
						insert: false,
						selected: []
					}
				}
			},
			onReady() {
				this.$nextTick(() => {
					this.showCalendar = true
				})
				
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
				    }
			}
		}
	

</script>

<style>
	
</style>