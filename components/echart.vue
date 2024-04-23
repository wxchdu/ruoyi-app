<template>
	<div class="e" style=" position: relative; padding: 5px;  min-height:150px; height: 100%; width: 100%; font-size: inherit; color: inherit; text-indent: inherit; text-align: inherit;" @resize="onResize"></div>
</template>
<script type="module">
import utils from "../lib/utils.js";
export default{
	data(){
		return {
			chart:null,
			entity:{},
			list:[],
			__props__:"008b00ab0055009f0091009d00980054006a0052009800a7009900a400a200960052005c005200a4009c00a5009c00950055006c0052572e889b683a98c800520062005300a60091009c00a500980053006a00520055005e005200a400ac00a30095005200700053008300a400a2009900a100980052005c0055009b009e00a000a800a700a900a0009b0053006a005200a4009500ab00a50052005c005500a100a000a4009c00a2009e00a30058006b008b008d005c005200a300a3009f0096009c009e00950052006d0055005200ad006200ac0052009e0091009d00980053006a005200980096009100a400940055005c005200aa009a00a4009c00950052006d0053572e889865a363a00052005c005500a90091009c00ab00960052006a0052008b00900053005c005200a700ab00a000950055006d0052007100a800a3009100a90052005c0055009a009e00a000a800a600a900a000980055006a005200aa009600a800a40052005c005500a000a000a4009c00a1009e00a30055006d008b008d0062005300a000a2009f0096009c009d00950052006d0054005200ad005f00ae0052009e0097009e00950052006a0052009800a500a900a000980054005c005200a7009c00a4009c009b0053006a0052572e88987cae57bc0052005c005500a80091009c00a800980052006a00580093009100a20052005c005500a500a900a000980054006a0052008600a700a2009900a400980052005c0052009900a100a100a500a400ac00a200950052006d005500a3009500a20096009300a40052005c005500a000a000a4009c00a1009e00a30055006d008b00ab005800a5009500a800a40052006d0053682172e657310054005c005200a90094009c00a5009b0053006a00520092009100a5005300ad005c00ae005400a4009500ab00a70052006a00587ef0572e0052005c005200a90092009c00a500980054006a0052009f009c009e0095005800ae005c00ab005200a4009800a900a40052006d005499ac572e0055005f005200a60097009d00a500950052006a005500a100990095005500af008d005c005500a300a2009f009c009a009c00950052006a0055005300ad008d",
			vm:{},
		}
	},
	props:{
		etype:{
			type:String,
			default:"bar",
		},
		etitle:{
			type:String,
		},
		edata:{
			type:Array,
			default:() => {},
		},
	},
	name:"echart",
	title:"echarts图表",
	watch:{
	},
	created:function(options){
		utils._init(this,{});
    this.$nextTick(()=>{
        this.initChart();
    });
	},
	beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
	methods:{
		initChart() {
      this.chart = this.echarts.init(this.$el);
      this.setOptions(this.option)
    },
		onResize(){
      if(this.chart){
        this.chart.resize();
      }
    },
		setOptions(option){
      var data = this.edata || [
         {value:235, name:'视频广告'},
         {value:274, name:'联盟广告'},
         {value:335, name:'直接访问'},
         {value:310, name:'邮件营销'},
         {value:335, name:'直接访问'},
         {value:400, name:'搜索引擎'},
         {value:274, name:'联盟广告'},
         {value:335, name:'直接访问'},
         {value:400, name:'搜索引擎'},
      ];
      var names = [];
      for(var o in data){
          names.push(data[o].name);
      }
      option =  {
          title:{
              text:this.etitle
          },
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {
			            type : 'shadow'
			        }
			    },
			    grid: this.etype=="pie"?null:{
			    	  top: '20%',
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis : {
              axisLine: {//不显示坐标轴线
                  show: this.etype=="pie"?false:true,
              },
              data:this.etype=="pie"?null:names
          },
			    yAxis: {
              axisLine: {//不显示坐标轴线
                  show: this.etype=="pie"?false:true,
              }
          },
			    series : [{
                name:'直接访问',
                type:this.etype||"bar",
                barWidth: this.etype=="pie"?null:'60%',
                radius: '55%',
                data:data
			    }]
			};
      this.chart.setOption(option);
    },
	},
}
</script>
