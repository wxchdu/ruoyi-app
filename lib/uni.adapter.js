var uni = window.uni||{};
uni.getStorageSync = function(name){
	var strValue = window.localStorage.getItem(name);
	if(!strValue)return null;
	if(strValue.startsWith("{")){
		var storage = JSON.parse(window.localStorage.getItem(name)||"{}");
		return storage.value;
	}else{
		return strValue;
	}
}
uni.setStorageSync = function(name,value){
	var storage = {name:name,value:value||""};
	return window.localStorage.setItem(name,JSON.stringify(storage));
}
uni.removeStorageSync=function(name){
	window.localStorage.removeItem(name);
}
uni.showLoading = function(){
	$(".loadding").remove();
	var $div = $('<div class="loadding" style="background-color:rgba(0,0,0,0.3);z-index:999999;position:fixed;top:0px;left:0px;width:100%;height:100%;display:flex;align-items: center;justify-content: center;"><div style="background-color:rgba(0,0,0,0.7);padding:20px 50px;"><text style="color:#ffffff;">正在加载，请稍候...</text></div></div>');
	$div.appendTo("body");
}
uni.hideLoading = function(){
	$(".loadding").fadeOut(200,function(){
		$(".loadding").remove();
	});
}
uni.request=function($params){
	if($params.method=="post"||$params.method=="POST"){
		$params.data = JSON.stringify($params.data||{});
		$params.contentType = "application/json; charset=utf-8";
	}
	return $.ajax($params)
}
uni.showModal = function($params){
	$params.success({confirm:true});
}
uni.showToast = function($params){
	var $div = $('<div style="z-index:999999;position:fixed;top:50%;left:50%;width:0%;height:0%;" class="e c"><div style="max-width:250px;min-width:200px; background-color:#000000;color:#ffffff;padding:10px 20px;word-break:break-all;word-wrap:break-word;white-space: pre-line !important;word-break: break-all !important;word-wrap: break-word !important;">'+$params.title+'</div></div>');
	$div.appendTo("body");
	setTimeout(()=>{
		$div.fadeOut($params.duration||500);
	},1000);
}
uni.getSystemInfoSync=function(){
	return {
		uniPlatform:"DUTE"
	}
}
uni.getProvider=function(params){
	if(params.service=="payment"){
		params.success({
			provider:["wxpay","alipay"]
		});
	}
}
uni.showActionSheet=function(params,combox){
	combox.type="popup";
	combox.showOptions = true;
}
uni.setNavigationBarColor=function(){

}
uni.setNavigationBarTitle=function(){

}
uni.setTabBarStyle=function(style){
	try{
		if(window.top && window.top.page && window.top.onFrameworkMessage){
			window.top.page.setData({
				style:style
			});
		}
	}catch(e){
		//console.error(e)
	}
	
}
uni.setTabBarItem=function(item){
	try{
		if(window.top && window.top.page && window.top.page.data && window.top.page.data.tabar && window.top.onFrameworkMessage){
			var tabar = window.top.page.data.tabar;
			if(tabar[item.index]){
				for(var o in item){
					if(item[o]){
						tabar[item.index][o] = item[o];
					}
				}
				console.log("##",item.index,tabar[item.index]);
			}else{
				console.log("###############",item);
				tabar[item.index] = item;
			}
			window.top.page.setData({
				tabar:tabar
			});
		}
	}catch(e){
		//console.error(e)
	}
}
uni.redirectToEx = uni.redirectTo||function(){};
uni.redirectTo = function(params){
	var jsBridge = window.uni;
	if(window.jWeixin && !window.top.onFrameworkMessage){
		jsBridge = jWeixin.miniProgram;
		console.log("#### redirectTo ####",params);
		return jsBridge.redirectTo(params);
	}else{
		return uni.redirectToEx(params);
	}
}
uni.navigateToEx = uni.navigateTo||function(){};
uni.navigateTo = function(params){
	var jsBridge = window.uni;
	if(window.jWeixin && !window.top.onFrameworkMessage){
		jsBridge = jWeixin.miniProgram;
		console.log("#### navigateTo ####",params);
		return jsBridge.navigateTo(params);
	}else{
		return uni.navigateToEx(params);
	}
}
uni.switchTabEx = uni.switchTab||function(){};
uni.switchTab = function(params){
	var jsBridge = window.uni;
	if(window.jWeixin && !window.top.onFrameworkMessage){
		jsBridge = jWeixin.miniProgram;
		console.log("#### switchTab ####",params);
		return jsBridge.switchTab(params);
	}else{
		return uni.switchTabEx(params);
	}
}
uni.reLaunchEx = uni.reLaunch||function(){};
uni.reLaunch = function(params){
	var jsBridge = window.uni;
	if(window.jWeixin && !window.top.onFrameworkMessage){
		jsBridge = jWeixin.miniProgram;
		console.log("#### reLaunch ####",params);
		return jsBridge.reLaunch(params);
	}else{
		return uni.reLaunchEx(params);
	}
}