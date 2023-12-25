import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import VueFormCraft from '../dist/vue-form-craft.mjs'
import VueFormCraft from './release'
import request from '@/utils/request'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
// app.use(ElementPlus)
app.use(VueFormCraft, { request })

app.mount('#app')
