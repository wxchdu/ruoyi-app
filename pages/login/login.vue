<template>
<view>
<view class="login">
  <image src="/static/images/loginBg.jpg" class="bg-img"></image>
	<view class="login_title">
    <image src="/static/images/loginIcon.png" style="width:100px;height:100px"></image>
	</view>
	<view :class="'login_user ' + nameFocus">
		<input type="text" :placeholder="usePwdLogin?'请输入用户名':'请输入手机号'" placeholder-style="color:rgb(173,185,193)" @input="bindUsername" @focus="onFocusName" @blur="onBlurName">
	</view>
  
	<view :class="'login_pwd ' + psdFocus" v-if="usePwdLogin">
		<input type="text" :password="!showPassword" placeholder="请输入密码" placeholder-style="color:rgb(173,185,193)" @input="bindPassword" @focus="onFocusPsd" @blur="onBlurPsd">
    <image class="psdIcon" :src="showPassword ? '/static/images/eye.png' : '/static/images/eye-fill.png'" @tap="showPassword = !showPassword"></image>
	</view>

  <view class="login_pwd" >
    <input type="text" placeholder="请输入验证码" style="margin-left: :;" hover-class="input-hover" placeholder-style="color:rgb(173,185,193)" @input="bindCode"/>
    <!-- <view class="login_sms" @tap="getSmsCode">{{btnText}}</view> -->
	<!-- <img :src="codeUrl" @click="getCode" class="login-code-img"/> -->
	<view class="login-code">
		  <img :src="codeUrl" @click="getCode" class="login-code-img"/>
	</view>
  </view>
  
  
  

	<view class="login_btn">
		<button hover-class="btn_hover" @tap="login">登录</button>
	</view>

	<!-- <view class="login_text">
		<navigator url="../register/register" open-type="redirect">账号注册</navigator>
		<navigator url="../resetpassword/resetpassword" open-type="redirect">找回密码</navigator>
		<navigator url="../login_token/login_token" open-type="redirect" hover-class="navigator-hover">使用Token登录</navigator>
	</view> -->
</view>
</view>
</template>

<script>
let __test_account__, __test_psword__;
let runAnimation = true;
let times = 60;
let timer
export default {
  data() {
    return {
	  codeUrl: "",
      usePwdLogin:true, //是否用户名+手机号方式登录
      name: "",
      psd: "",
      grant_type: "password",
      psdFocus: "",
      nameFocus: "",
      showPassword:false,
      type:'text',
	  btnText: '获取验证码',
	  uuid: "",
	  code: "",
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    const me = this;
    const app = getApp().globalData;
	
    this.getCode();
    // disp.on("em.error.passwordErr", function () {
    //   uni.showToast({title: "用户名或密码错误",icon:'none'});
    // });
  },
  methods: {
	  getCode() {
	        uni.request({
	        	url: `http://digit.xinvay.com/prod-api/captchaImage`,
	        	header: {
	        		'content-type': 'application/json'
	        	},
	        	method: 'GET',
	        	data: {
	        		phoneNumber: this.name,
	        	},
	  			success: (res) => {
					this.uuid = res.data.uuid;
					this.codeUrl = "data:image/gif;base64," + res.data.img;
					console.log("#######",this.codeUrl);
					// this.codeUrl = "data:image/gif;base64," + res.img;
				 //  this.setData({
					//   loginForm.uuid : res.uuid
					// });
					},
	  			})
	      },
	 
    bindUsername: function (e) {
      this.name= e.detail.value;
    },
    bindPassword: function (e) {
      this.psd= e.detail.value;
    },
    bindCode: function (e) {
      this.code= e.detail.value;
    },
    onFocusPsd: function () {
      this.psdFocus= 'psdFocus';
    },
    onBlurPsd: function () {
      this.psdFocus= '';
    },
    onFocusName: function () {
      this.nameFocus= 'nameFocus';
    },
    onBlurName: function () {
      this.nameFocus= '';
    },
	getSmsCode: function(){
		if(this.btnText != '获取验证码') return
		if (this.name == "") {
		  return uni.showToast({title: "请输入手机号！",icon:'none'});
		} 
		const self = this
		// 发送短信验证码
		uni.request({
			url: `http://digit.xinvay.com/prod-api/captchaImage`,
			header: {
				'content-type': 'application/json'
			},
			method: 'GET',
			data: {
				phoneNumber: this.name,
			},
			success (res) {
				console.log('res', res)
				if(res.statusCode == 200){
					uni.showToast({title: "短信发送成功！",icon:'none'})
					self.countDown()
				}else if(res.statusCode == 400){
					if(res.data.errorInfo == 'phone number illegal'){
						uni.showToast({title: "请输入正确的手机号！",icon:'none'})
					}else if(res.data.errorInfo == 'Please wait a moment while trying to send.'){
						uni.showToast({title: "你的操作过于频繁，请稍后再试！",icon:'none'})
					}else if(res.data.errorInfo.includes('exceed the limit')){
						uni.showToast({title: "获取已达上限！",icon:'none'})
					}else{
						uni.showToast({title: res.data.errorInfo,icon:'none'})
					}
				}
			},
			fail(error){
				uni.showToast({title: "短信发送失败！",icon:'none'})
			}
		})
		
	},
	countDown: function(){
		timer && clearTimeout(timer)
		timer = setTimeout(() => {
			times--
			this.setData({
				btnText: times
			})
			if (times === 0) {
				times = 60
				this.setData({
					btnText: '获取验证码'
				})
				return clearTimeout(timer)
			}
			this.countDown()
		}, 1000)
	},
    login: function () {
      runAnimation = !runAnimation;
      //! 默认手机号+验证码登录,且该形式只适用于环信uni-Demo，如有相似登录形式，请更改为自有接口！
      //更改usePwdLogin配置设置使用环信ID+密码登录，或者为手机号加验证码登录
      if(this.usePwdLogin){
            if (!__test_account__ && this.name == "") {
                uni.showToast({title: "请输入手机号！",icon:'none'});
                return;
            } else if (!__test_account__ && this.psd == "") {
                uni.showToast({title: "请输入验证码！",icon:'none'});
                return;
            }  
            const that = this;
            uni.request({
                url: 'http://digit.xinvay.com/prod-api/login',
                header: {
                    'content-type': 'application/json'
                },
                method: 'POST',
                data: {
                    username: that.name,
                    password: that.psd,
					code: that.code,
					uuid: that.uuid,
                },
                success (res) {
					console.log(res);
                    if(res.data.code == 200){
						uni.setStorageSync('token', res.data.token);
						console.log(uni.getStorageSync('token'))
						const chatUserName = "admin"
						uni.switchTab({
						  url: "../im/index",
						});
                        // getApp().globalData.conn.open({
                        //     user: chatUserName,
                        //     accessToken: token,
                        // });
                        // getApp().globalData.phoneNumber = phoneNumber;
                        uni.setStorage({
                            key: "myUsername",
                            data: chatUserName,
                        });
                    }else if(res.data.code == 400){
                        if(res.data.errorInfo){
                            
                            switch (res.data.errorInfo) {
                                case "UserId password error.":
                                    uni.showToast({title: '用户名或密码错误！',icon:'none'});
                                    break;
                                case 'phone number illegal':
                                    uni.showToast({title: '请输入正确的手机号',icon:'none'});
                                    break;
                                case 'SMS verification code error.':
                                    uni.showToast({title: '验证码错误',icon:'none'});
                                    break;
                                case 'Sms code cannot be empty':
                                    uni.showToast({title: '验证码不能为空',icon:'none'});
                                    break;
                                case 'Please send SMS to get mobile phone verification code.':
                                    uni.showToast({title: '请使用短信验证码登录',icon:'none'});
                                    break;
                                default:
                                    uni.showToast({title: res.data.errorInfo,icon:'none'});
                                    break;
                            }
                        }
                    }else{
                        uni.showToast({title: '登录失败！',icon:'none'});
                    }
                },
                fail(error){
                    uni.showToast({title: '登录失败！',icon:'none'});
                }
            })
        }else{
            if (!__test_account__ && this.name == "") {
                uni.showToast({title: "请输入用户名！",icon:'none'});
                return;
            } else if (!__test_account__ && this.psd == "") {
                uni.showToast({title: "请输入密码！",icon:'none'});
                return;
            }
            uni.setStorage({
                key: "myUsername",
                data: __test_account__ || this.name.toLowerCase()
            });
            console.log(111, {
                apiUrl: WebIM.config.apiURL,
                user: __test_account__ || this.name.toLowerCase(),
                pwd: __test_psword__ || this.psd,
                grant_type: this.grant_type,
                appKey: WebIM.config.appkey
            })
            getApp().globalData.conn.open({
                apiUrl: WebIM.config.apiURL,
                user: __test_account__ || this.name.toLowerCase(),
                pwd: __test_psword__ || this.psd,
                grant_type: this.grant_type,
                appKey: WebIM.config.appkey
            });
        }
    }
  }
};
</script>
<style>
@import "./login.css";
.login-code-img {
	width: 90px;
  height: 96rpx;
}
.login-code {
	margin-top: 32rpx;
	width: 20rpx;
	height: 96rpx;
	flex:1;
 
}
</style>