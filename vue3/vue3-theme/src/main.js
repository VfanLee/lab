import { createApp } from 'vue'
import store from './store'
import router from './router'

import App from './App.vue'

import 'normalize.css'
import '@/styles/index.scss'
import '@/styles/theme/index.scss'

const app = createApp(App)

app
  .use(store)
  .use(router)

app.mount('#app')
