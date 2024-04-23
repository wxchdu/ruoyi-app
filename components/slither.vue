<template>
	<view class="slither" :style="{transform:'translateX(-'+moveX+'px)'}" @click="clickEvent" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name:"slither",
		props:{
			
		},
		data() {
			return {
				startY:0,
				startX:null,
				moveX:null,
			};
		},
		mounted() {
			
		},
		methods:{
			onTouchStart(e){
				//console.log("onTouchStart",this.$el.childNodes);
				if (e.touches.length == 1) {
					//设置触摸起始点水平方向位置
					this.startX=e.touches[0].clientX;
					this.startY=e.touches[0].clientY;
					document.removeEventListener("touchstart",this.releaseEvent);
				}else{
					this.moveX = 0;
				}
			},
			onTouchMove(e){
				//console.log("onTouchMove",e);
				if (e.touches.length == 1) {
					var btnWidth = 0;
					if(this.$el){
						for(var o in this.$el.childNodes){
							var item = this.$el.childNodes[o];
							if(o>0 && item.clientWidth){
								btnWidth+=item.clientWidth;
							}
						}
					}
					var moveX = this.startX - e.touches[0].clientX;
					var moveY = this.startY - e.touches[0].clientY;
					if(moveX>10 && Math.abs(moveY)<this.$el.clientHeight/2){
						this.moveX = moveX;
						this.stopEvent(e);
					}else{
						this.moveX = 0;
					}
					if(this.moveX>btnWidth){
						this.moveX = btnWidth;
					}
				}
			},
			onTouchEnd(e){
				var btnWidth = 0;
				if(this.$el){
					for(var o in this.$el.childNodes){
						var item = this.$el.childNodes[o];
						if(o>0 && item.clientWidth){
							btnWidth+=item.clientWidth;
						}
					}
				}
				if(this.moveX>(btnWidth/3)){
					this.moveX = btnWidth;
					document.addEventListener("touchstart",this.releaseEvent);
				}else{
					this.moveX = 0;
				}
			},
			clickEvent(e){
				document.removeEventListener("touchstart",this.releaseEvent);
				this.moveX = 0;
			},
			releaseEvent(e){
				var offset = this.$el.getBoundingClientRect();
				if(!e.touches || e.touches[0].clientY<offset.top || e.touches[0].clientY>offset.top+offset.height){
					document.removeEventListener("touchstart",this.releaseEvent);
					this.moveX = 0;
				}
			},
			stopEvent: function(event) {
				if (event.stopPropagation) {
					event.stopPropagation();
				} else {
					event.cancelBubble = true;
				}
				if (event.preventDefault) {
					event.preventDefault();
				} else {
					event.returnValue = false;
				}
			},
		}
	}
</script>
