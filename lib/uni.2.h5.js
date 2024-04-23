import utils from "../lib/utils.js";

function getOptions(){
	var params = {};
	if(window.location.href && window.location.href.indexOf("?")>-1){
		var url = window.location.href.split("?")[1]
		if(url.indexOf("#")>-1){
			params["#"]=url.substring(url.indexOf("#")+1);
			url=url.substring(0, url.indexOf("#"));
		}
		if(url){
			const kv = url.split("&")
			for(var i=0;i<kv.length;i++){
				params[kv[i].split("=")[0]] = kv[i].split("=")[1];
			}
		}
	}
	return params;
}

if(uni.getStorageSync('DEBUG')=="TRUE"){
	window.onerror=(errorMessage, scriptURI, lineNumber, columnNumber, errorObj)=>{
		var strScript = scriptURI.substring(scriptURI.lastIndexOf("/")+1);
		if(strScript.indexOf("?")>-1)strScript=strScript.substring(0,strScript.indexOf("?"));
		if(strScript.indexOf("#")>-1)strScript=strScript.substring(0,strScript.indexOf("#"));
		uni.showToast({
			title:(strScript+":"+lineNumber+":"+errorMessage)
		});
	}
}

window.files = {};//H5页面列表
window.stacks = uni.getStorageSync("STACKS")||{};//当前打开的页面列表
window.getH5Frame=function(){
	var names = ["a","b","c","d","e","f","g"];
	for(var o in names){
		var name = names[o];
		var h5Frame = "/pages/frm/"+name;
		if(!window.stacks[h5Frame]){
			return h5Frame;
		}
	}
	return null;
}
$(function(){
	var options = getOptions();
	if(options.FRM){
		var h5Frame = "/pages/frm/"+options.FRM;
		window.stacks[h5Frame] = options.pathPath;
		uni.setStorageSync("STACKS",window.stacks);
	}
});
window.onunload=function(){
	var options = getOptions();
	if(options.FRM){
		var h5Frame = "/pages/frm/"+options.FRM;
		delete window.stacks[h5Frame];
		uni.setStorageSync("STACKS",window.stacks);
	}
}


$(function(){
	window.prod=true;
	window.tabar = {};
	
	var $templates = document.getElementsByTagName("template");
	if($templates.length==1 && window.page){
		var $params = window.page;
		$params.target = $templates[0];
		var vm = window.page.vm||{};
		vm.platform="H5";
		window.Dute($params);
	}
	
	FastClick.attach(document.body);
	
	FastClick.prototype.focus = function(targetElement) {
		var length;
		//兼容处理:在iOS7中，有一些元素（如date、datetime、month等）在setSelectionRange会出现TypeError
		//这是因为这些元素并没有selectionStart和selectionEnd的整型数字属性，所以一旦引用就会报错，因此排除这些属性才使用setSelectionRange方法
		//deviceIsIOS && 
		if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
			/*修复bug ios 11.3不弹出键盘，这里加上聚焦代码，让其强制聚焦弹出键盘*/
			targetElement.focus();
		} else {
			targetElement.focus();
		}
	};
	
	$(document).on("click", "navigator", function(e) {
		if($(this).attr("open-type")=="tel"){
			window.location.href="tel:"+$(this).attr("url");
			return;
		}
		var jsBridge = window.uni;
		if(window.jWeixin && !window.top.onFrameworkMessage){
			jsBridge = jWeixin.miniProgram;
		}
		var url = $(this).attr("url");
		if(!url || url=="#"){
			if($(this).attr("open-type")!="navigateBack"){
				return false;
			}
		}
		if(!url.startsWith("/")){
			url = "/"+url;
		}
		var pagePath = url;
		if(!pagePath.startsWith("/")){
			pagePath = "/"+pagePath;
		}
		if(pagePath.indexOf("?")>-1){
			pagePath = pagePath.substring(0, pagePath.indexOf("?"));
		}
		if($(this).attr("open-type")=="reLaunch"){
			jsBridge.reLaunch({
				url:url
			});
		}else if($(this).attr("open-type")=="navigateBack"){
			jsBridge.navigateBack();
		}else if(window.tabar[pagePath]||$(this).attr("open-type")=="switchTab"){
			jsBridge.switchTab({
				url:url
			});
		}else if(window.files[pagePath]){
			var h5Frame = window.getH5Frame();
			if(h5Frame){
				var name = h5Frame.replace("/pages/frm/","");
				url+=(url.indexOf("?")>-1?"&":"?")+"FRM="+name
				jsBridge.navigateTo({
					url:h5Frame+"?pagePath="+encodeURIComponent(url)
				});
			}
		}else{
			jsBridge.navigateTo({
				url:url
			});
		}
	}); 
	
	
	/**###############################轮播图###############################**/
	$(document).on("touchstart","swiper",function(e){
		var $swiper = $(this);
		$(this).attr("touched",true);
		var currentTouches = e.originalEvent.targetTouches[0];
		$swiper.data("start",currentTouches);
		$swiper.data("offset",0);
	});
	$(document).on("touchmove","swiper",function(e){
		var $swiper = $(this);
		var currentTouches = e.originalEvent.targetTouches[0];
		var startTouches = $swiper.data("start");
		var offset = 0;
		var vertical = $swiper.attr("vertical")=="true";
		var size = vertical?$swiper.height():$swiper.width();
		if(startTouches && currentTouches){
			if(vertical){
				offset = currentTouches.clientY - startTouches.clientY;
			}else{
				offset = currentTouches.clientX - startTouches.clientX;
			}
			$swiper.data("offset",offset);
		}
		var currentIndex = Number($swiper.data("current")||"0");
		$swiper.find("swiper-item:eq(0)").css(vertical?"margin-top":"margin-left","-"+(currentIndex*(size)-offset)+"px");
	});
	$(document).on("touchend","swiper",function(e){
		var $swiper = $(this);
		$swiper.swiperSpare();
		setTimeout(()=>{
			$swiper.removeAttr("touched");
		},2000);
		var vertical = $swiper.attr("vertical")=="true";
		var size = vertical?$swiper.height():$swiper.width();
		var offset = $swiper.data("offset")||0;
		var bAnime = false;
		//如果移动距离超过1/6
		if(Math.abs(offset)>size/(vertical?10:6)){
			var currentIndex = Number($swiper.data("current")||"0");
			if(offset>0){//向后
				currentIndex=currentIndex-1;
			}else{//向前
				currentIndex=currentIndex+1;
			}
			if(currentIndex<0){
				currentIndex = 0;
			}
			$swiper.data("current",currentIndex);
			$swiper.attr("current",currentIndex);
			bAnime=true;
		}
		$swiper.swiperStopAt(bAnime);
	});
	$.fn.extend({
		swiperSpare(){
			var $swiper = $(this);
			var vertical = $swiper.attr("vertical")=="true";
			var size = vertical?$swiper.height():$swiper.width();
			if($swiper.find(".spare").size()==0){
				$swiper.find("swiper-item:eq(0)").clone().css(vertical?"margin-top":"margin-left","0px").addClass("spare").appendTo($swiper);
			}
			if(vertical){
				$swiper.css("display","block");
			}else{
				$swiper.css("display","flex");
			}
		},
		swiperNext(){
			var $swiper = $(this);
			$swiper.swiperSpare();
			var currentIndex = Number($swiper.data("current")||"0");
			currentIndex+=1;
			$swiper.data("current",currentIndex);
			$swiper.attr("current",currentIndex);
			$swiper.swiperStopAt(true);
		},
		swiperStopAt(bAnime){
			var $swiper = $(this);
			var currentIndex = Number($swiper.data("current")||"0");
			var vertical = $swiper.attr("vertical")=="true";
			var size = vertical?$swiper.height():$swiper.width();
			if(bAnime){
				var props = {};
				props[vertical?"marginTop":"marginLeft"] = "-"+(currentIndex*size)+"px";
				$swiper.find("swiper-item:eq(0)").animate(props,Number($swiper.attr("duration")||"500"),function(){
					$swiper.swiperReset();
					$swiper.swiperChange();
				});
			}else{
				$swiper.find("swiper-item:eq(0)").css(vertical?"margin-top":"margin-left","-"+(currentIndex*(size))+"px");
				$swiper.swiperReset();
				$swiper.swiperChange();
			}
		},
		swiperReset(){
			var $swiper = $(this);
			var currentIndex = Number($swiper.data("current")||"0");
			var vertical = $swiper.attr("vertical")=="true";
			var size = vertical?$swiper.height():$swiper.width();
			if(currentIndex>=$swiper.find("swiper-item").size()-1){
				currentIndex = 0;
				$swiper.find("swiper-item").css(vertical?"margin-top":"margin-left","0px");
				$swiper.data("current",currentIndex);
				$swiper.attr("current",currentIndex);
			}
		},
		swiperChange(){
			var $swiper = $(this);
			var funOnChange = $($swiper.get(0).duteNode).attr("@change");
			var currentIndex = Number($swiper.data("current")||"0");
			if(funOnChange){
				window.page[funOnChange]({
					detail:{
						current:currentIndex
					}
				});
				$swiper.swiperReset();
			}
		}
	});
	$("swiper").each(function(){
		let $swiper = $(this);
		if($swiper.attr("autoplay")=="true"||$swiper.attr("autoplay")=="autoplay"){
			setInterval(function(){
				if($swiper.attr("touched")!="true"){
					$swiper.swiperNext();
				}
			},Number($swiper.attr("interval")||"2000"));
		}
	});
	/**###############################轮播图###############################**/
	
	
	var $mapping = ["/pages/index/auto","/pages/two","/pages/tree","/pages/four","/pages/five"];
	
	var $options = getOptions();
	utils.request({
		url:'/api/trial/getsetting',
		data:{},
		method:"POST",
		headers:{APPKEY:$options.APPKEY},
		success:(protocol)=>{
			if(protocol.success){
				if(protocol.data.theme){
					uni.setStorageSync("theme",protocol.data.theme);
				}
				if(protocol.data.tabar){
					uni.setStorageSync("tabar",protocol.data.tabar);
				}
				if(protocol.data.appkey){
					uni.setStorageSync("APPKEY",protocol.data.appkey);
				}
				
				window.files = protocol.data.files||{};
				
				var $theme = protocol.data.theme;
				if($theme){
					uni.setStorageSync("theme",$theme);
					if(window.page && window.page.setTheme)window.page.setTheme($theme);
					var $style = $("scroll-view>.ux-wraper").attr("style");
					if(!$style || $style.indexOf("background")==-1){
						$("scroll-view>.ux-wraper").css("background-color","#ffffff");
					}
				}
				if(protocol.data.pltes){
					var $pltes = protocol.data.pltes||{};
					uni.setStorageSync("pltes",$pltes);
					if(window.page)(window.page.vm||{})["pltes"] = $pltes;
					if(window.page)(window.page.data.vm||{})["pltes"] = $pltes;
				}
				var data = {};
				if(protocol.data.tabar){
					data.tabar = protocol.data.tabar;
				}
				if(protocol.data.theme){
					data.theme = protocol.data.theme;
				}
				if(window.page && window.page.setData){
					window.page.setData(data);					
				}
				if(window.page && window.page.onUpdate){
					window.page.onUpdate();
				}
			}
		}
	});
	
	
	if($("scroll-view").size()){
		$("scroll-view").on("scroll", function(e) {
			if($(this).get(0).scrollTop==0){
				$(this).get(0).scrollTop = 1;
			}
		});
		setTimeout(function(){
			$("scroll-view").get(0).scrollTop = 1;
		},100);
		setTimeout(function(){
			$("scroll-view").animate({scrollTop:1},100); 
		},200);
		setTimeout(function(){
			$("scroll-view").animate({scrollTop:1},100); 
		},500);
	}	
});

window.Dute.registComponent("network","<view><slot></slot></view>",null,{
	data(){
		return {
			entity:{},
			list:[],
			vm:{},
			__props__:"008b00ab0055009f0091009d00980054006a00520094009600a4009900a5009f0052005c005200a4009c00a5009c00950055006c00528c276c755763577000520062005300a60091009c00a500980053006a00520055005e005200a400ac00a30095005200700053008300a400a2009900a100980052005c0055009b009e00a000a800a700a900a0009b0053006a005200a4009500ab00a50052005c005500a100a000a4009c00a2009e00a30058006b008b008d005c005200a300a3009f0096009c009e00950052006d0055005200ad006200ac0052009e0091009d00980053006a005200a9005f009d009f00970098009c00520062005300a4009900a4009c00980053006a00527f045bcc540891ff0055005f005200a60097009d00a500950052006a00550053005c005200a700ab00a000950055006d0052008300aa00a30099009e00970052005f00530099009e00a300a700a400a900a300980052006a005800a5009500a800a40052005f0053009f00a000a7009b009f009e00a60055006a008b0093005d005200a000a2009f0099009a009c00950055006c0052005200b00090",
		}
	},
	props:{
		action:{
			type:String,
		},
		title:{
			type:String,
		},
		subtit:{
			type:String,
		}
	},
	model:{
		prop:"value",
		event:"change",
	},
	name:"network",
	created:function(){
		utils._init(this,{});
		if(this.action){
			utils.request({
				url:this.action,
				success:(protocol)=>{
					if(protocol.success){
						var data = protocol.data;
						if(!data.title)
							data.title = this.title;
						if(!data.subtit)
							data.subtit = this.subtit;
						this.doChange(data);
					}
				}
			});
		}
	},
	methods:{
		doChange:function(value){
			//把当前的值，传给父类
			this.$emit("input", value);
			this.$emit("change", value);
		},
	},
});