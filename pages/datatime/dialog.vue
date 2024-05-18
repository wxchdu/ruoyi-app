<template>  
  <view class="dialog" v-if="show">  
  <view style="width:100%;height:50px;background-color:#ffffff;z-index:999;" :style="{height:(vm.statusBarHeight)+'px'}" class="em"></view>
    <view style="width:100%;height:50px;background-color:#ffffff;z-index:999;" :style="{height:(vm.statusBarHeight)+'px'}" class="em"></view>
    <view style="height: 30px;width:100%;height:30px;background-color:#ffffff ;display: flex;justify-content: space-between;">
		<text style="font-size: 17px;margin: 0 10px;"@click="closeDialog">取消</text>
		<text style="font-size: 17px;margin: 0 10px; color: #2859cc;">保存</text>
	</view>
      <slot></slot> <!-- 插槽，用于在父组件中插入自定义内容 -->   
    </view>  
  </view>  
</template>  
  
<script>  
export default {  
  props: {  
    show: {  
      type: Boolean,  
      default: false  
    }  
  },  
  methods: {  
    closeDialog() {  
		console.log(this.show)
      this.$emit('update:show', false); // 触发事件，通知父组件更新 show 的值  
    }  
  }  
}  
</script>  
  
<style scoped>  
.dialog {  
  position: absolute;  
  top: 0;  
  left: 0;  
  width: 100%;  
  height: 100%;  
  background-color: rgba(0, 0, 0, 0.5);  
  z-index: 9999;  
}  
  
.dialog-content {  
  /* 设置弹层内容的样式 */  
  background-color: #fff;  
  padding: 20px;  
  border-radius: 10px;  
}  
</style>