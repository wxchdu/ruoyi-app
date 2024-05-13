<template>
	<view class="uni-calendar" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
		<view v-if="!insert&&show" class="uni-calendar__mask" :class="{'uni-calendar--mask-show':aniMaskShow}" @click="clean"></view>
		<view v-if="insert || show" class="uni-calendar__content" :class="{'uni-calendar--fixed':!insert,'uni-calendar--ani-show':aniMaskShow}">
			<view v-if="!insert" class="uni-calendar__header uni-calendar--fixed-top">
				<view class="uni-calendar__header-btn-box" @click="close">
					<text class="uni-calendar__header-text uni-calendar--fixed-width">{{cancelText}}</text>
				</view>
				<view class="uni-calendar__header-btn-box" @click="confirm">
					<text class="uni-calendar__header-text uni-calendar--fixed-width">{{okText}}</text>
				</view>
			</view>
			<view class="uni-calendar__header">
				<view class="uni-calendar__header-btn-box" @click.stop="pre">
					<view class="uni-calendar__header-btn uni-calendar--left"></view>
				</view>
				<picker mode="date" :value="date" fields="month" @change="bindDateChange">
					<text class="uni-calendar__header-text">{{ (nowDate.year||'') +' / '+( nowDate.month||'')}}</text>
				</picker>
				<view class="uni-calendar__header-btn-box" @click.stop="next">
					<view class="uni-calendar__header-btn uni-calendar--right"></view>
				</view>
				<text class="uni-calendar__backtoday" @click="backToday">{{todayText}}</text>

			</view>
			<view class="uni-calendar__box">
				<view v-if="showMonth" class="uni-calendar__box-bg">
					<text class="uni-calendar__box-bg-text">{{nowDate.month}}</text>
				</view>
				<view class="uni-calendar__weeks">
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">{{SUNText}}</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">{{monText}}</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">{{TUEText}}</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">{{WEDText}}</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">{{THUText}}</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">{{FRIText}}</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">{{SATText}}</text>
					</view>
				</view>
				<view class="uni-calendar__weeks" v-for="(item,weekIndex) in weeks" :key="weekIndex" v-if="!ishidden">
					<view class="uni-calendar__weeks-item" v-for="(weeks,weeksIndex) in item" :key="weeksIndex">
						<calendar-item class="uni-calendar-item--hook" :weeks="weeks" :calendar="calendar" :selected="selected" :lunar="lunar" @change="choiceDate"></calendar-item>
					</view>
				</view>
				<view class="uni-calendar__weeks" v-if="ishidden">
					<view class="uni-calendar__weeks-item" v-for="(item,weeksIndex) in selectedweeks" :key="weeksIndex">
						<calendar-item class="uni-calendar-item--hook" :weeks="item" :calendar="calendar" :selected="selected" :lunar="lunar" @change="choiceDate"></calendar-item>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Calendar from './util.js';
	import CalendarItem from './uni-calendar-item.vue'

	import { initVueI18n } from '@dcloudio/uni-i18n'
	import i18nMessages from './i18n/index.js'
	const {	t	} = initVueI18n(i18nMessages)

	/**
	 * Calendar 日历
	 * @description 日历组件可以查看日期，选择任意范围内的日期，打点操作。常用场景如：酒店日期预订、火车机票选择购买日期、上下班打卡等
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=56
	 * @property {String} date 自定义当前时间，默认为今天
	 * @property {Boolean} lunar 显示农历
	 * @property {String} startDate 日期选择范围-开始日期
	 * @property {String} endDate 日期选择范围-结束日期
	 * @property {Boolean} range 范围选择
	 * @property {Boolean} insert = [true|false] 插入模式,默认为false
	 * 	@value true 弹窗模式
	 * 	@value false 插入模式
	 * @property {Boolean} clearDate = [true|false] 弹窗模式是否清空上次选择内容
	 * @property {Array} selected 打点，期待格式[{date: '2019-06-27', info: '签到', data: { custom: '自定义信息', name: '自定义消息头',xxx:xxx... }}]
	 * @property {Boolean} showMonth 是否选择月份为背景
	 * @event {Function} change 日期改变，`insert :ture` 时生效
	 * @event {Function} confirm 确认选择`insert :false` 时生效
	 * @event {Function} monthSwitch 切换月份时触发
	 * @example <uni-calendar :insert="true":lunar="true" :start-date="'2019-3-2'":end-date="'2019-5-20'"@change="change" />
	 */
	export default {
		components: {
			CalendarItem
		},
		emits:['close','confirm','change','monthSwitch'],
		props: {
			date: {
				
				type: String,
				default: ''
			},
			selected: {
				type: Array,
				default () {
					return []
				}
			},
			ishidden: {
				type: Boolean,
				default: false
			},
			lunar: {
				type: Boolean,
				default: false
			},
			startDate: {
				type: String,
				default: ''
			},
			endDate: {
				type: String,
				default: ''
			},
			range: {
				type: Boolean,
				default: false
			},
			insert: {
				type: Boolean,
				default: true
			},
			showMonth: {
				type: Boolean,
				default: true
			},
			clearDate: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				startX: '', // 触摸起始点横坐标
				delta:'',
				show: false,
				weeks: [],
				selectedweeks: [],
				calendar: {},
				nowDate: '',
				aniMaskShow: false
			}
		},
		computed:{
			/**
			 * for i18n
			 */

			okText() {
				return t("uni-calender.ok")
			},
			cancelText() {
				return t("uni-calender.cancel")
			},
			todayText() {
				return t("uni-calender.today")
			},
			monText() {
				return t("uni-calender.MON")
			},
			TUEText() {
				return t("uni-calender.TUE")
			},
			WEDText() {
				return t("uni-calender.WED")
			},
			THUText() {
				return t("uni-calender.THU")
			},
			FRIText() {
				return t("uni-calender.FRI")
			},
			SATText() {
				return t("uni-calender.SAT")
			},
			SUNText() {
				return t("uni-calender.SUN")
			},
			selectedData() {
				let y, m, d;
				[y, m, d] = this.calendar.fullDate.split("-")
				
				for(let i = 0;i < 6;i++){
					for(let j = 0;j < this.weeks[i].length;j++){
						if(this.weeks[i][j].date==d && this.weeks[i][j].month==m){
							this.selectedweeks = this.weeks[i];
						}
					}
				}
			}
		},
		watch: {
			date(newVal) {
				// this.cale.setDate(newVal)
				this.init(newVal)
			},
			startDate(val){
				this.cale.resetSatrtDate(val)
				this.cale.setDate(this.nowDate.fullDate)
				this.weeks = this.cale.weeks
			},
			endDate(val){
				this.cale.resetEndDate(val)
				this.cale.setDate(this.nowDate.fullDate)
				this.weeks = this.cale.weeks
			},
			selected(newVal) {
				this.cale.setSelectInfo(this.nowDate.fullDate, newVal)
				this.weeks = this.cale.weeks
			},
			
		},
		created() {
			this.cale = new Calendar({
				selected: this.selected,
				startDate: this.startDate,
				endDate: this.endDate,
				range: this.range,
			})
			this.init(this.date)
			this.sendweeks()
				
		},
		methods: {
			
			touchStart(event) {
			      // 记录触摸起始点的横坐标
			      this.startX = event.touches[0].clientX;
			    },
			    touchMove(event) {
			      // 计算滑动距离
			      const currentX = event.touches[0].clientX;
			      this.deltaX = currentX - this.startX;
			    },
			    touchEnd() {
			// 判断滑动方向
			      if (this.deltaX > 50) {
					  this.pre();
			        // 向右滑动逻辑   这里只建议写一些性能消耗小的逻辑，比如：this.status = !this.status 因为当他的横坐标大于或小于50时，每隔一个数字都会执行一次，所以...非常消化性能
			        console.log('向右滑动逻辑')
			      } else if (this.deltaX < -50) {
					  this.next();
			        // 向左滑动逻辑   这里只建议写一些性能消耗小的逻辑，比如：this.status = !this.status 因为当他的横坐标大于或小于50时，每隔一个数字都会执行一次，所以...非常消化性能
			        console.log('向左滑动逻辑')
			      }
				  this.startX='0';
				  this.deltaX='0';
			      // 清除触摸起始点记录，这里也可以写一些比较复杂的逻辑，每滑动一次松后执行。
			    },
			// 取消穿透
			clean() {},
			sendweeks(){
				this.$emit("sendweeks",this.weeks);
			},
			bindDateChange(e) {
				const value = e.detail.value + '-1'
				this.setDate(value)
				this.calendar=this.nowDate;
				this.sendcalendar();
				this.sendweeks();
				const { year,month } = this.cale.getDate(value)
				this.$emit('monthSwitch', {
					year,
					month
				})
			},
			sendcalendar() {
			                // transmit为父组件定义的监听器
			                // this.game为发送的数据
			                this.$emit('transmit', this.calendar)
			            },
			/**
			 * 初始化日期显示
			 * @param {Object} date
			 */
			init(date) {
				this.cale.setDate(date)
				this.weeks = this.cale.weeks
				this.nowDate = this.calendar = this.cale.getInfo(date)
				this.sendcalendar();
			},
			/**
			 * 打开日历弹窗
			 */
			open() {
				// 弹窗模式并且清理数据
				if (this.clearDate && !this.insert) {
					this.cale.cleanMultipleStatus()
					// this.cale.setDate(this.date)
					this.init(this.date)
				}
				this.show = true
				this.$nextTick(() => {
					setTimeout(() => {
						this.aniMaskShow = true
					}, 50)
				})
			},
			/**
			 * 关闭日历弹窗
			 */
			close() {
				this.aniMaskShow = false
				this.$nextTick(() => {
					setTimeout(() => {
						this.show = false
						this.$emit('close')
					}, 300)
				})
			},
			/**
			 * 确认按钮
			 */
			confirm() {
				this.setEmit('confirm')
				this.close()
			},
			/**
			 * 变化触发
			 */
			change() {
				if (!this.insert) return
				this.setEmit('change')
			},
			/**
			 * 选择月份触发
			 */
			monthSwitch() {
				let {
					year,
					month
				} = this.nowDate
				this.$emit('monthSwitch', {
					year,
					month: Number(month)
				})
				this.calendar=this.nowDate;
				this.sendcalendar();
				this.sendweeks();
			},
			/**
			 * 派发事件
			 * @param {Object} name
			 */
			setEmit(name) {
				let {
					year,
					month,
					date,
					fullDate,
					lunar,
					extraInfo
				} = this.calendar
				this.$emit(name, {
					range: this.cale.multipleStatus,
					year,
					month,
					date,
					fulldate: fullDate,
					lunar,
					extraInfo: extraInfo || {}
				})
			},
			/**
			 * 选择天触发
			 * @param {Object} weeks
			 */
			choiceDate(weeks) {
				if (weeks.disable) return
				this.calendar = weeks
				this.nowDate=this.calendar
				console.log("11111",this.nowDate.fullDate)
				// 设置多选
				this.cale.setMultiple(this.calendar.fullDate)
				this.weeks = this.cale.weeks
				this.change()
				this.sendcalendar()
				console.log(this.calendar.fullDate)
			},
			/**
			 * 回到今天
			 */
			backToday() {
				const nowYearMonth = `${this.nowDate.year}-${this.nowDate.month}`
				const date = this.cale.getDate(new Date())
        const todayYearMonth = `${date.year}-${date.month}`

				this.init(date.fullDate)

        if(nowYearMonth !== todayYearMonth) {
          this.monthSwitch()
        }

				this.change()
			},
			/**
			 * 上个月
			 */
			pre() {
				if(this.ishidden){
					this.preweek()
				}else{
					const preDate = this.cale.getDate(this.nowDate.fullDate, -1, 'month').fullDate
					this.setDate(preDate)
					this.monthSwitch()
				}
			},
			preweek(){
				console.log(this.nowDate.fullDate);
				const preDate = this.cale.getDate(this.nowDate.fullDate, -7).fullDate
				this.setDate(preDate)
				this.calendar=this.nowDate;
				this.sendcalendar();
				this.sendweeks();
			},
			/**
			 * 下个月
			 */
			next() {
				if(this.ishidden){
					this.nextweek()
				}else{
					const nextDate = this.cale.getDate(this.nowDate.fullDate, +1, 'month').fullDate
					this.setDate(nextDate)
					this.monthSwitch()
					}
			},
			nextweek(){
				const nextDate = this.cale.getDate(this.nowDate.fullDate, +7).fullDate
				this.setDate(nextDate)
				this.calendar=this.nowDate;
				this.sendcalendar();
				this.sendweeks();
			},
			/**
			 * 设置日期
			 * @param {Object} date
			 */
			setDate(date) {
				this.cale.setDate(date)
				this.weeks = this.cale.weeks
				this.nowDate = this.cale.getInfo(date)
			}
		}
	}
</script>

<style lang="scss" scoped>
	$uni-bg-color-mask: rgba($color: #000000, $alpha: 0.4);
	$uni-border-color: #EDEDED;
	$uni-text-color: #333;
	$uni-bg-color-hover:#f1f1f1;
	$uni-font-size-base:14px;
	$uni-text-color-placeholder: #808080;
	$uni-color-subtitle: #555555;
	$uni-text-color-grey:#999;
	.uni-calendar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.uni-calendar__mask {
		position: fixed;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		background-color: $uni-bg-color-mask;
		transition-property: opacity;
		transition-duration: 0.3s;
		opacity: 0;
		/* #ifndef APP-NVUE */
		z-index: 99;
		/* #endif */
	}

	.uni-calendar--mask-show {
		opacity: 1
	}

	.uni-calendar--fixed {
		position: fixed;
		/* #ifdef APP-NVUE */
		bottom: 0;
		/* #endif */
		left: 0;
		right: 0;
		transition-property: transform;
		transition-duration: 0.3s;
		transform: translateY(460px);
		/* #ifndef APP-NVUE */
		bottom: calc(var(--window-bottom));
		z-index: 99;
		/* #endif */
	}

	.uni-calendar--ani-show {
		transform: translateY(0);
	}

	.uni-calendar__content {
		background-color: #fff;
	}

	.uni-calendar__header {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 50px;
		border-bottom-color: $uni-border-color;
		border-bottom-style: solid;
		border-bottom-width: 1px;
	}

	.uni-calendar--fixed-top {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		border-top-color: $uni-border-color;
		border-top-style: solid;
		border-top-width: 1px;
	}

	.uni-calendar--fixed-width {
		width: 50px;
	}

	.uni-calendar__backtoday {
		position: absolute;
		right: 0;
		top: 25rpx;
		padding: 0 5px;
		padding-left: 10px;
		height: 25px;
		line-height: 25px;
		font-size: 12px;
		border-top-left-radius: 25px;
		border-bottom-left-radius: 25px;
		color: $uni-text-color;
		background-color: $uni-bg-color-hover;
	}

	.uni-calendar__header-text {
		text-align: center;
		width: 100px;
		font-size: $uni-font-size-base;
		color: $uni-text-color;
	}

	.uni-calendar__header-btn-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
	}

	.uni-calendar__header-btn {
		width: 10px;
		height: 10px;
		border-left-color: $uni-text-color-placeholder;
		border-left-style: solid;
		border-left-width: 2px;
		border-top-color: $uni-color-subtitle;
		border-top-style: solid;
		border-top-width: 2px;
	}

	.uni-calendar--left {
		transform: rotate(-45deg);
	}

	.uni-calendar--right {
		transform: rotate(135deg);
	}


	.uni-calendar__weeks {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.uni-calendar__weeks-item {
		flex: 1;
	}

	.uni-calendar__weeks-day {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 45px;
		border-bottom-color: #F5F5F5;
		border-bottom-style: solid;
		border-bottom-width: 1px;
	}

	.uni-calendar__weeks-day-text {
		font-size: 14px;
	}

	.uni-calendar__box {
		position: relative;
	}

	.uni-calendar__box-bg {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.uni-calendar__box-bg-text {
		font-size: 200px;
		font-weight: bold;
		color: $uni-text-color-grey;
		opacity: 0.1;
		text-align: center;
		/* #ifndef APP-NVUE */
		line-height: 1;
		/* #endif */
	}
</style>
