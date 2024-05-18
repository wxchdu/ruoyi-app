<template>
    <view v-outside="onBlur"  @touchstart ="onMouseDown" :class="moving?'moving':''" :style="style" style="z-index: 10; overflow: visible !important; box-sizing: border-box;">
        <slot></slot>
		<view v-if="focus" class="ei-selecter" @touchend="onMouseUp" @touchmove="onMouseMove">
			<view cursor="e-resize" @touchstart ="mouseType=('right')" style="top:0%; height:100%; right:-3px;cursor:e-resize;"></view>
			<view cursor="n-resize" @touchstart ="mouseType=('top')" style="top:-3px;left:0%; width: 100%; cursor:n-resize;"></view>
			<view cursor="s-resize" @touchstart ="mouseType=('bottom')" style="bottom:-3px;left:0%; width: 100%; cursor:s-resize;"></view>
			<view cursor="w-resize" @touchstart ="mouseType=('left')" style="top:0%; height:100%; left:-3px;cursor:w-resize;"></view>
		</view>
    </view> 
</template>
<style> 
.ei-selecter{position:absolute;width:100%;height:100%; top:-1px; left:-1px; box-sizing: content-box; z-index:999;background:rgba(200,200,255,0.01);border:1px solid rgba(0,0,0,0.7); user-select: none; } 
.ei-selecter:after{position:absolute;content:'';top:-20px; bottom:-20px; left:-20px;right:-20px;border:0px solid rgba(0,0,0,0.7); }  
.ei-selecter view{position:absolute;width:6px;height:6px;background-color:transparent;z-index: 9;}
.ei-selecter text{position:absolute;top:-25px;left:0px;color:rgba(0,0,50,0.5);padding:5px;white-space: nowrap;}
.moving .ei-selecter:after{top:-500px; bottom:-500px; left:-500px;right:-500px;} 
</style>
<script>
export default {
    name:"XVRDiv",
    props:{
        offset:{
            type:Object,
            default:()=>{
              return {};
            }
        },
		editable:{
			type:Boolean,
			default:true
		}
    },
    data(){
        return {
            style:{},
			focus:false,
			startData:null,
			mouseType:null,
			modify:false,
        }
    },
	watch:{
		offset(newValue,oldValue){
			this.setStyle(this.offset||{});
		}
	},
	created() {
		this.setStyle(this.offset||{});
	},
    methods:{
		onChange(){
			this.$emit("update:offset",this.style);
			this.$emit("change",this.style);
		},
		setStyle(offset){			
			for(var o in offset){
				if(typeof(this.offset[o])=="undefined"){
					continue;
				}
				if(/top|left|width|height|right|bottom/g.test(o)){
					let value = parseInt(offset[o]);
					if(this.offset.min && typeof(this.offset.min[o]!="undefined") && value<this.offset.min[o]){
						value = this.offset.min[o];
					}
					if(o=="height" && (value==60||value==30)){
						value = value -1;
					}
					this.style[o] = value+"px";
				}else if(!/min|max/g.test(o)){
					this.style[o] = offset[o];
				}
			}
			if(this.offset.align){
				//垂直方向网格对齐
				if(typeof(this.style.top)!="undefined" && typeof(this.style.height)!="undefined" && this.offset.align.cy){
					let top = parseInt(this.style.top);
					let bottom =  top + parseInt(this.style.height);
					if(this.mouseType=="bottom"){//底部对齐
						let alignBottom = Math.round(bottom/this.offset.align.cy) * this.offset.align.cy;
						if( Math.abs(bottom - alignBottom) < 6 ){
							bottom = alignBottom;
							this.style.height = (bottom - top - 1) + "px";
						}
					}else if(this.mouseType=="top"){//顶部对齐
						let alignTop = Math.round(top/this.offset.align.cy) * this.offset.align.cy;
						if( Math.abs(top - alignTop) < 6 ){
							top = alignTop;
							this.style.top = top + "px";
							this.style.height = (bottom - top - 1) + "px";
						}
					}else if(this.mouseType=="move"){//顶部对齐
						let alignTop = Math.round(top/this.offset.align.cy) * this.offset.align.cy;
						if( Math.abs(top - alignTop) < 6 ){
							top = alignTop;
							this.style.top = top + "px";
						}
					}
				}
				//水平方向网格对齐
				if(typeof(this.style.left)!="undefined" && typeof(this.style.width)!="undefined" && this.offset.align.cx){
					let left = parseInt(this.style.left);
					let right =  left + parseInt(this.style.width);
					if(this.mouseType=="right"){//右部对齐
						let alignRight = Math.round(right/this.offset.align.cx) * this.offset.align.cx;
						if( Math.abs(right - alignRight) < 6 ){
							right = alignRight;
							this.style.width = (right - left - 1) + "px";
						}
					}else if(this.mouseType=="left"){//顶部对齐
						let alignLeft = Math.round(left/this.offset.align.cy) * this.offset.align.cy;
						if( Math.abs(left - alignLeft) < 6 ){
							left = alignLeft;
							this.style.left = left + "px";
							this.style.height = (bottom - left - 1) + "px";
						}
					}else if(this.mouseType=="move"){//顶部对齐
						let alignLeft = Math.round(left/this.offset.align.cy) * this.offset.align.cy;
						if( Math.abs(left - alignLeft) < 6 ){
							left = alignLeft;
							this.style.left = left + "px";
						}
					}
				}
			}
			var style = this.style;
			this.style = null;
			this.style = style;
		},
		onBlur(){ 
			this.moving = false;
			this.style.zIndex = this.offset.zIndex||0;
			if(this.focus){
				this.$emit("blur",this.style);
			}
			this.focus = false;
		},
		onMouseDown(e){
			console.log(1111)
			if(!this.editable){
				return false;
			}
			this.focus = true;
			this.$emit("focus",this.style);
			console.log(this.style)
			this.style.zIndex = (this.offset.zIndex||0)+1;
			this.startData = {
				style:{...this.style},
				event:e
			};
			if(!this.mouseType){
				
				this.mouseType="move";				
			}
		},
		onMouseMove(e){
			if(!this.editable){
				return false;
			}
			if(this.startData && this.mouseType){
				this.moving = true;
				let moveX = e.pageX - this.startData.event.pageX;
				let moveY = e.pageY - this.startData.event.pageY;
				let newStyle = {};
				if(this.mouseType=="bottom" && typeof(this.startData.style.height)!="undefined"){//修改高度
					newStyle.height = parseInt(this.startData.style.height) + moveY;
				}
				if(this.mouseType=="right" && typeof(this.startData.style.width)!="undefined"){//修改高度
					newStyle.width = parseInt(this.startData.style.width) + moveX;
				}				
				if(this.mouseType=="top"){
					if(typeof(this.startData.style.top)!="undefined"){
						newStyle.top = parseInt(this.startData.style.top) + moveY;
					}
					if(typeof(this.startData.style.height)!="undefined"){
						newStyle.height = parseInt(this.startData.style.height) - moveY;
					}
				}
				if(this.mouseType=="left"){
					if(typeof(this.startData.style.left)!="undefined"){
						newStyle.left = parseInt(this.startData.style.left) + moveY;
					}
					if(typeof(this.startData.style.width)!="undefined"){
						newStyle.width = parseInt(this.startData.style.width) - moveX;
					}
				}
				if(this.mouseType=="move"){
					if(typeof(this.startData.style.top)!="undefined"){
						newStyle.top = parseInt(this.startData.style.top) + moveY;
					}
					if(typeof(this.startData.style.left)!="undefined"){
						newStyle.left = parseInt(this.startData.style.left) + moveY;
					}
				}
				this.style.zIndex = (this.offset.zIndex||0)+2;
				this.setStyle(newStyle);
				this.modify = true;
			}
		},
		onMouseUp(e){
			this.moving = false;
			if(!this.editable){
				return false;
			}
			let modify = this.modify;
			this.startData = null;
			this.mouseType = null;
			this.modify = false;
			this.style.zIndex = (this.offset.zIndex||0)+1;
			this.setStyle(this.style);
			if(modify){
				this.onChange();
			}
		}
    }
}
</script>
