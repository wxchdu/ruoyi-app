import App from './App'


import status from './components/status.vue'
Vue.component('status',status)

import combox from './components/combox.vue'
Vue.component('combox',combox)

import place from './components/place.vue'
Vue.component('place',place)

import datetime from './components/datetime.vue'
Vue.component('datetime',datetime)

import upload from './components/upload.vue'
Vue.component('upload',upload)

import score from './components/score.vue'
Vue.component('score',score)

import toggle from './components/toggle.vue'
Vue.component('toggle',toggle)

import popup from './components/popup.vue'
Vue.component('popup',popup)

import coupon from './components/coupon.vue'
Vue.component('coupon',coupon)

import network from './components/network.vue'
Vue.component('network',network)

import slither from './components/slither.vue'
Vue.component('slither',slither)

import i18n from './components/i18n.vue'
Vue.component('i18n',i18n)

import dynamic from './components/dynamic.vue'
Vue.component('dynamic',dynamic)


Vue.prototype.$session = {
	version:0
};
Vue.prototype.setSession = function(session){
	for(var o in session||{}){
		Vue.prototype.$session[o] = session[o];
	}
	console.log("#####",session,Vue.prototype.$session);
}

import utils from "./lib/utils.js";

Vue.prototype.resetting=function(callback){
	callback();
}

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif