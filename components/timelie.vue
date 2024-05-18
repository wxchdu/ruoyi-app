<template>
  <view :style="{top:currentTimeTop}" style="z-index: 10;position: absolute;height: 0px;left:66px;right:5px;" class="ux-flex e">
  	<view style="min-height:100%;height:0px;" class="e">
  		<view style="width:12px;height:12px;background-color:#000000;border-radius:90px;">
          <text></text>
  		</view>
  	</view>
  	<view class="fixe e" style="flex:1;min-height:100%;overflow:visible;">
  		<view style="width:100%;height:2px;background-color:#000000;">
          <text></text>
  		</view>
  		<view style="position:absolute;height:22px;left:5px;top:-25px;z-index:1;padding:0px 10px;background-color:rgba(0,0,0,0.30);border-radius:90px;" class="e">
          <span style="font-size:14px;color:#f7f7f7;">{{currentTime}}</span>
  		</view>
  	</view>
  </view>
</template>

<script type="module">
import utils from "../lib/utils.js";

export default{
  name:"timeline",
  data(){
  	return {
      currentTime:utils.date(new Date()),//当前时间
      currentTimeTop:"10px",
      timer:null,
    }
  },
  created() {
    this.timer = setInterval(()=>{
        this.currentTime = utils.date(new Date(),"HH:mm");
        let hour8 = new Date();
        hour8.setHours(8);
        hour8.setMinutes(0);
        hour8.setSeconds(0);
        this.currentTimeTop = parseInt((new Date().getTime()-hour8.getTime()) / 1000 / 60)/3*2 + "px";
    },1000);
  },
  destroyed() {
      if(this.timer){
          clearInterval(this.timer);
          this.timer = null;
      }
  },
}
</script>

<style>
</style>
