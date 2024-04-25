import def from "./def.js"
import config from "../config.js"
const DEFAULT_APPKEY=config.APPKEY;

export default {
	__page__:null,
	caches:{},
	request($params){
		let params = {};
		for(var o in $params){
			params[o] = $params[o];
		}
		if($params.url=="" || $params.url=="{{flag}}"){
			return;
		}
		params.url = ($params.url.startsWith("http")?"":config.apiHost) + $params.url;
		params.header = $params.header||{};
		params.method = params.method || "GET";
		params.header.token = uni.getStorageSync('token');
		params.header.platform = uni.getSystemInfoSync().uniPlatform;
		params.header.REFER = uni.getStorageSync('REFER');
		params.header.APPKEY = uni.getStorageSync('APPKEY')||DEFAULT_APPKEY;
		params.header.SHOP = uni.getStorageSync('SHOP')||"0";
		params.header.SHARE = uni.getStorageSync('SHARE');
		params.headers = {
			token:uni.getStorageSync('token'),
			REFER:uni.getStorageSync('REFER'),
			APPKEY:uni.getStorageSync('APPKEY')||DEFAULT_APPKEY,
			SHOP:uni.getStorageSync('SHOP')||"0"
		};
		if(params.header.Authorization){
			delete params.header.token;
		}
		if(params.data){
			params.data.lng = uni.getStorageSync('lng');
			params.data.lat = uni.getStorageSync('lat');
		}
		for(var o in params.data){
			if(""+params.data[o]=="null"||""+params.data[o]==""||params.data[o]==undefined){
				delete params.data[o]
			}
		}
		
		params.traditional=true;
		let $this = this;
		params.success = function(response){
			var protocol = response;
			if(typeof(protocol.statusCode)!="undefined"){
				protocol = protocol.data;
			}
			if(!protocol){
				uni.showToast({
					title: '网络请求异常',icon:"none",duration:500
				})
				return;
			}
			if(protocol.data && protocol.data.SHOP){
				uni.setStorageSync("SHOP",protocol.data.SHOP);
			}
			if(protocol.data && protocol.data.pageInfo){
				var cacheList = $this.caches[$params.url]||[];
				if(!$params.data.pageNo){
					cacheList = [];
				}
				for(var o in protocol.data.list){
					cacheList.push(protocol.data.list[o]);
				}
				$this.caches[$params.url] = protocol.data.list = cacheList;
				$this.ddd = $params.url;
				
				if($this.__page__ && protocol.data.pageInfo){
					$this.__page__.__params__ = $params;
					$this.__page__.__params__.pageIndex = protocol.data.pageInfo.index;
				}
			}
			if(protocol.data && protocol.data.vm){
				var vm = protocol.data.vm;
				delete protocol.data.vm;
				if($this.__page__ && $this.__page__.vm){
					for(var o in vm){
						$this.__page__.vm[o] = vm[o];
					}
				}
				uni.setStorageSync("vm",vm);
			}
			
			if($params.success && (protocol.success || protocol.code==200)){
				if(protocol.message && $params.showModal!=false){
					setTimeout(()=>{
						uni.showToast({
							title: protocol.message,icon: "none",duration:1000
						});
					},200);
				}
				$params.success(protocol); 
			}else if(!protocol.success && protocol.error=="invalid_token" && !$params.nore){
				//uni.removeStorageSync('token');
				if(protocol.data.redirect){
					uni.redirectTo({
						url: protocol.data.redirect
					});
				}else if(config.loginPage){
					setTimeout(()=>{
						uni.redirectTo({
							url: config.loginPage,
							fail:()=>{
								uni.navigateTo({
									url: config.loginPage
								});
							}
						});
					},1000);
				}
				$params.success(protocol); 
			}else{
				if(protocol.message && $params.showModal!=false){
					setTimeout(()=>{
						uni.showToast({
							title: protocol.message,icon: "none",duration:1000
						});
					},200);
				}
			}
		}
		params.fail = $params.fail;
		params.complete = function(response){
			if(!response.data && response.responseText){
				response.data = JSON.parse(response.responseText);
			}
			uni.hideLoading({
				success: (res) => {},
			});
			if($params.showConsole!=false){
				console.log("数据请求",params.url,$params.data,params.header,response.data); 
			}
			if($params.complete){
				$params.complete(response.data);
			}
		} 
		if($params.showLoading!=false){
			uni.showLoading({
				title: $params.showLoading||'正在加载...',
			})
		}
		return uni.request(params);
	},
	subscribe(tmplFlags){
		var tmpls = uni.getStorageSync("tmpls")||{};
		var tmplIds = [];
		for(var o in tmplFlags){
			var tmplId = tmpls[tmplFlags[o]];
			if(tmplId){
				tmplIds.push(tmplId);
			}
		}
		console.log("订阅",tmplIds);
		if(tmplIds.length && wx && wx.requestSubscribeMessage){
			wx.requestSubscribeMessage({
			  tmplIds: tmplIds,
			  success (res) {
				  console.log("#",res)
			  },
			  fail(res) {
				  console.log("@",res)
			  }
			});
		}
	},
	logout($success){
		uni.showModal({
			title: '提示',
			content: '确定要退出登录吗',
			success: function (res) {
				if (res.confirm) {
					//uni.removeStorageSync('token');
					uni.setStorageSync("token","logout");
					uni.showToast({
						title: "退出登录成功",icon: "none",duration:500,
						success:()=>{}
					});
					if($success){
						$success();
					}
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
		
	},
	upload:function(params){
		console.log("文件上传",params);
		//res.tempFilePaths,'图片的本地文件路径列表'
		uni.uploadFile({
			url: config.apiHost + params.url||("/api/lib/upload.vo"),//上传图片的地址
			filePath: params.path,//这里是图片的本地文件路径列表（选择图片成功的时候可以拿到,在上边的success回调中res.tempFilePaths即可拿到）
			name: 'file',//上传的名字叫啥都行
			headers: {
				token: uni.getStorageSync('token')//可以设置你的请求头的token噢
			},
			success(response) {
				if(!response.data && response.responseText){
					response.data = JSON.parse(response.responseText);
				}
				//上传成功的回调,这个response是后端返回给你上传成功的数据里边一般会有上传之后图片的在线路径
				var protocol = response;
				if(typeof(protocol)=="string"){
					protocol = JSON.parse(protocol);
				}
				if(typeof(protocol.statusCode)!="undefined"){
					protocol = protocol.data;
				}
				if(typeof(protocol)=="string"){
					protocol = JSON.parse(protocol);
				}
				console.log("上传返回",protocol);
				if(protocol.message){
					uni.showToast({
						title: protocol.message,icon: "none",duration:1000
					});
				}
				if(!protocol.success && protocol.error=="invalid_token"){
					if(protocol.data.redirect){
						uni.redirectTo({
							url: protocol.data.redirect
						});
					}else if(config.loginPage){
						setTimeout(()=>{
							uni.redirectTo({
								url: config.loginPage 
							});
						},1000);
					}
					if(params.callback)params.callback(null);
					if(params.success)params.success(null);
				}else if(params.callback){
					params.callback(protocol); 
				}else if(params.success){
					params.success(protocol); 
				}
			}
		});
	},
	hex:function(str) {
		str = encodeURIComponent(str);
		let hex = '';
	    for (let i = 0; i < str.length; i++) {
	      let charCode = str.charCodeAt(i).toString(16);
	      hex += charCode.length < 2 ? '0' + charCode : charCode;
	    }
	    return hex;
	},
	xeh:function(hex) {
		let str = '';
		for (let i = 0; i < hex.length; i += 2) {
		  let charCode = parseInt(hex.substr(i, 2), 16);
		  str += String.fromCharCode(charCode);
		}
		return decodeURIComponent(str);
	},
	verify:function(value, type) {
	  if (type === "mobile") {
	    // 手机号验证规则
	    var reg = /^1[3456789]\d{9}$/;
	    if (!reg.test(value)) {
	      return "手机号格式不正确";
	    }
	  } else if (type === "email") {
	    // 邮箱验证规则
	    var reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
	    if (!reg.test(value)) {
	      return "邮箱格式不正确";
	    }
	  } else if (type === "username") {
	    // 用户名验证规则
	    var reg = /^[a-zA-Z0-9_-]{4,16}$/;
	    if (!reg.test(value)) {
	      return "用户名格式不正确(4到16位数字或字母)";
	    }
	  } else if (type === "password") {
	    // 密码验证规则
	    var reg = /^[a-zA-Z0-9_-]{6,16}$/;
	    if (!reg.test(value)) {
	      return "密码格式不正确(6到16位数字或字母)";
	    }
	  } else if (type === "IDNO") {
	    // 身份证号验证规则
	    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	    if (!reg.test(value)) {
	      return "身份证号格式不正确";
	    }
	  }
	  return null;
	},
	/**
	获取当前日期时间星期
	格式
	YYYY/yyyy/YY/yy 表示年份   
	MM/M 月份   
	W/w 星期   
	dd/DD/d/D 日期   
	hh/HH/h/H 时间   
	mm/m 分钟   
	ss/SS/s/S 秒
	**/
	formatDate: function(strFormat,date) {
		var dDate=date?date:new Date();
		var str = strFormat;    
		var Week = ['日','一','二','三','四','五','六'];   
	   
		str=str.replace(/yyyy|YYYY/,dDate.getFullYear());    
		str=str.replace(/yy|YY/,(dDate.getYear() % 100)>9?(dDate.getYear() % 100).toString():'0' + (dDate.getYear() % 100));    
	   
		str=str.replace(/MM/,dDate.getMonth()>8?(dDate.getMonth()+1):'0' + (dDate.getMonth()+1));    
		str=str.replace(/M/g,dDate.getMonth()+1);    
	   
		str=str.replace(/w|W/g,Week[dDate.getDay()]);    
	   
		str=str.replace(/dd|DD/,dDate.getDate()>9?dDate.getDate().toString():'0' + dDate.getDate());    
		str=str.replace(/d|D/g,dDate.getDate());    
	   
		str=str.replace(/hh|HH/,dDate.getHours()>9?dDate.getHours().toString():'0' + dDate.getHours());    
		str=str.replace(/h|H/g,dDate.getHours());    
		str=str.replace(/mm/,dDate.getMinutes()>9?dDate.getMinutes().toString():'0' + dDate.getMinutes());    
		str=str.replace(/m/g,dDate.getMinutes());    
	   
		str=str.replace(/ss|SS/,dDate.getSeconds()>9?dDate.getSeconds().toString():'0' + dDate.getSeconds());    
		str=str.replace(/s|S/g,dDate.getSeconds());    
	   
		return str;
	},
	dateFormat:function(string,format){//将字符串转换成日期时间，有默认格式
		if(format == null) format = 'yyyy-MM-dd hh:mm:ss';
		var compare = {'y+' : 'y','M+' : 'M','d+' : 'd','H+' : 'H','m+' : 'm','s+' : 's'};
		var result = {'y' : '','M' : '','d' : '','H' : '00','m' : '00','s' : '00'};
		var tmp = format;
		for (var k in compare) {		
			if (new RegExp('(' + k + ')').test(format))
				 result[compare[k]] = string.substring(tmp.indexOf(RegExp.$1), tmp.indexOf(RegExp.$1) +RegExp.$1.length);
		}
		return new Date(result['y'], result['M'] - 1, result['d'], result['H'], result['m'], result['s']);
	},
	date:function(date,format){
		if(typeof(date)=="string")
			return this.dateFormat(date,format||"yyyy-MM-dd HH:mm:dd");
		else
			return this.formatDate(format||"yyyy-MM-dd HH:mm:dd",date);
	},
	_init(page,options,bComponent){
		this.__page__ = page;
		var __options__ = page.__options__ = options||{};
		if(!page.setData){
			page.setData=(data)=>{
				for(var o in data){
					page[o] = data[o];
				}
			}
		}
		if(__options__.q){
			try{
				var strUrl = decodeURIComponent(__options__.q); 
				if(strUrl.indexOf("?")>-1){
					strUrl = strUrl.substring(strUrl.indexOf("?")+1);
					var items = strUrl.split("&");
					for(var o in items){
						var arr = items[o].split("=");
						__options__[arr[0]] = arr[1];
					}
				}
			}catch(ex){
				console.log("error",ex);
			}
		}
		
		if(__options__.SHOP){
			uni.setStorageSync("SHOP",__options__.SHOP);
		}
		if(__options__.REFER && !uni.getStorageSync("REFER")){
			uni.setStorageSync("REFER",__options__.REFER);
		}
		if(__options__.SHARE){ 
			uni.setStorageSync("SHARE",__options__.SHARE);
		}
		if(__options__.APPKEY){
			if(page.resetting && uni.getStorageSync('APPKEY') && uni.getStorageSync('APPKEY')!=__options__.APPKEY){
				page.resetting(__options__.APPKEY,()=>{
					uni.reLaunch({url:"/pages/index"});
				});
				return;
			}else{
				uni.setStorageSync("APPKEY",__options__.APPKEY);
			}
		}
		
		if(__options__.token=="none"){
			uni.removeStorageSync('token');
		}else if(__options__.token){
			uni.setStorageSync("token",__options__.token);
		}
		
		page.setData(__options__);
		page.triggered=true;
		
		var session = this.$session||{};
		page.session = session;
		page.setData({session:session});
		
		var vm = page.vm||(page.data?page.data.vm:{})||{};
		
		vm.cdnHost = config.apiHost;
		
		var optionstr = "mm="+new Date().getTime();//token="+(uni.getStorageSync('token')||"none");
		optionstr+="&REFER="+uni.getStorageSync('REFER')||"";
		optionstr+="&SHOP="+uni.getStorageSync('SHOP')||"0";
		optionstr+="&APPKEY="+uni.getStorageSync('APPKEY')||DEFAULT_APPKEY;
		for(var o in options||{}){
			optionstr+="&"+o+"="+options[o];
		}
		page.optionstr = vm.optionstr = optionstr;
		
		vm.config = config;
		vm.theme = JSON.parse(JSON.stringify(uni.getStorageSync("theme")||config.theme||{}));
		vm.system = uni.getSystemInfoSync();
		vm.platform = uni.getSystemInfoSync().uniPlatform;
		vm.pltes = uni.getStorageSync("pltes")||{};
		
		if(uni.getMenuButtonBoundingClientRect){
			try{
				const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
				vm.statusBarHeight=(menuButtonInfo.top||32)-10; 
				vm.titleBarHeight =  menuButtonInfo.height+20;
			}catch(ex){
				console.error(ex);
			}
		}
		
		if(uni.getStorageSync("vm")){
			var storageVm = uni.getStorageSync("vm");
			for(var o in storageVm){
				vm[o] = storageVm[o];
			}
		}
		
		page.vm = vm;
		page.setData({vm:vm});
		
		page.getConfig=function(){
			return config;
		}
		page.setTheme=function(theme){
			if(!theme){
				theme = uni.getStorageSync("theme")||vm.theme||config.theme;
			}else{
				uni.setStorageSync("theme",theme);
			}
			page.vm.theme = theme||page.vm.theme;
			if(!bComponent){
				var $tabar = uni.getStorageSync("tabar");
				if($tabar && uni.setTabBarItem){
					for(var i in $tabar){
						var $item = $tabar[i];
						var $iconPath = $item.iconPath;
						var $selectedIconPath = $item.selectedIconPath;
						if($item.iconfont){
							if(vm.platform=="mp-weixin"){
								$iconPath = (config.apiHost+"/api/iconfont/"+$item.iconfont+"."+theme.tabarColor.replace("#","")+".png");
								$selectedIconPath = (config.apiHost+"/api/iconfont/"+$item.iconfont+"."+theme.tabarSelColor.replace("#","")+".png");
							}else{
								$iconPath = ("/static/tabar/"+i+".png");
								$selectedIconPath = ("/static/tabar/"+i+".on.png");
							}
						}
						uni.setTabBarItem({
						  index: Number(i),
						  text: $item.text,
						  visible:true,
						  pagePath:$item.pagePath,
						  iconPath: $iconPath,
						  selectedIconPath: $selectedIconPath
						})
					}
					for(var i=$tabar.length;i<$tabar.length;i++){
						var $item = $tabar[i];
						var $iconPath = $item.iconPath;
						var $selectedIconPath = $item.selectedIconPath;
						if($item.iconfont){
							$iconPath = (config.apiHost+"/api/iconfont/"+$item.iconfont+"."+theme.tabarColor.replace("#","")+".png");
							$selectedIconPath = (config.apiHost+"/api/iconfont/"+$item.iconfont+"."+theme.tabarSelColor.replace("#","")+".png");
							if(vm.platform=="mp-toutiao"){
								$iconPath = ("/static/tabar/"+$item.iconfont+"."+theme.tabarColor.replace("#","")+".png");
								$selectedIconPath = ("/static/tabar/"+$item.iconfont+"."+theme.tabarSelColor.replace("#","")+".png");
							}
						}
						uni.setTabBarItem({
						  index: Number(i),
						  text: $item.text,
						  visible:false,
						  pagePath:$item.pagePath,
						  iconPath: $iconPath,
						  selectedIconPath: $selectedIconPath
						});
					}
				}
				if(theme.titleColor && theme.titleBgColor){
					var titleColor = theme.titleColor;
					if(titleColor=="white")titleColor="#ffffff";
					if(titleColor=="black")titleColor="#000000";
					uni.setNavigationBarColor({
						frontColor: titleColor,
						backgroundColor: theme.titleBgColor
					});
				}
				if(page.vm.themeNavigationBar){
					uni.setNavigationBarColor({
						frontColor: "#ffffff",
						backgroundColor: theme.themeColor
					});
				}else if(page.vm.style){
					if(page.vm.style.navigationBarBackgroundColor){
						uni.setNavigationBarColor({
							frontColor: page.vm.style.navigationBarTextStyle,
							backgroundColor: page.vm.style.navigationBarBackgroundColor
						});
					}
				}
				if(theme.tabarSelColor && theme.tabarColor && theme.tabarBgColor){
					uni.setTabBarStyle({
						color: theme.tabarColor,
						selectedColor: theme.tabarSelColor,
						backgroundColor: theme.tabarBgColor
					});
				}
			}
			var $vm = page.vm;
			page.vm = null;
			page.setData({vm:$vm});
		};
		
		page.setTheme();
				
		var utils = this;
		
		page._onShow=function(){
			//console.log("_onShow");
			utils.__page__ = page;
			if(!bComponent){
				page.setTheme();
			}
			if(!page.isShow){
				page.isShow = true;
			}else if(page.vm && page.vm.isForm){
				page.isShow = true;
			}else{
				page.reload();
			}
		},
		page.getTabPage = function(index,pagePath){
			var $tabar = uni.getStorageSync("tabar");
			if($tabar && $tabar.length){
				if($tabar[index].pagePath!=pagePath){
					return $tabar[index].pagePath;
				}
			}
		},
		page.onRefresh = function(){
			page.triggered = true;
			setTimeout(()=>{
				page.triggered = false;
			},300)
		}
		page.onBot = function(e){
			if(page.__params__ && typeof(page.__params__.pageIndex)!="undefined"){
				page.__params__.data.pageNo = page.__params__.pageIndex+1;
				utils.request(page.__params__);
			}
		}
		page.split = function(str,flag){
			return (str||"").split(flag||",");
		}
		page.onCopy = function(str){
			if(uni && uni.setClipboardData){
				uni.setClipboardData({
					data:str,
					success(){
						uni.showToast({
							title:"复制成功",icon:"none"
						});
					}
				})
			}else{
				var input = document.createElement('input');
				input.setAttribute('value', str);
				document.body.appendChild(input);
				input.select();
				document.execCommand('copy');
				document.body.removeChild(input);
				uni.showToast({
					title:"复制成功",icon:"none"
				});
			}			
		}
		page.getPrev = function(){
			 let pages = getCurrentPages()
			 let prevPage = pages[pages.length - 2];
			 return prevPage;
		}
		page.back=function(){
			uni.navigateBack();
		}
		page.reload = function(){
			if(page.onExecute){
				page.onExecute(page.__options__||{});
			}
		}
		if(page.onExecute){
			page.onExecute(page.__options__||{});
		}
	}
}