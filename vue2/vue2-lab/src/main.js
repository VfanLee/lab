import Vue from 'vue'
import i18n from './i18n'
import store from './store'
import router from './router'

import 'element-ui/lib/theme-chalk/index.css'
import 'vant/lib/index.css'
import '@/styles/var.css'

import App from './App.vue'
import ElementUI from 'element-ui'
import Vant from 'vant'

Vue.use(ElementUI, {
  // Element UI 国际化：https://element.eleme.io/#/zh-CN/component/i18n
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
