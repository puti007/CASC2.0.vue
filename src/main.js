// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import china from 'echarts/map/json/china.json'
import App from './App'
import router from './router'
import http from './request/http' //引入axios配置文件
import api from './request/api' 
import 'babel-polyfill'
Vue.use(ElementUI,{size:'small'});
Vue.prototype.$echarts = echarts;
Vue.prototype.http = http;
Vue.prototype.api = api;
Vue.config.productionTip = false;
echarts.registerMap('china',china);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h =>h(App),
  router,
  components: { App },
  template: '<App/>'
})
