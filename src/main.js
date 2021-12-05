import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//带入全局样式表
import './assets/css/global.css'

// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8443/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
