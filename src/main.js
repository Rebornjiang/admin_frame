import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from '@/config/axios'
import './assets/css/formatEleUi.styl'

Vue.config.productionTip = false
// 配置所有的element ui 组件的大小尺寸
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
// 所有请求方法挂载到原型上
Vue.prototype.$axios = http

console.log(Vue, '看看')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
