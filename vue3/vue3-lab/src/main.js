import { createApp } from 'vue'
import i18n from './i18n'
import store from './store'
import router from './router'

import 'element-plus/dist/index.css'
import '@/styles/var.css'

import App from './App.vue'

const app = createApp(App)

app.use(i18n)
app.use(store)
app.use(router)

app.mount('#app')
