import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import VueFormCraft from 'vue-form-craft/dev'
import App from './App.vue'
import router from './router'
import { ai } from './utils/ai'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { uiConfig } from './uiConfig'
// if you just want to import css
import 'element-plus/theme-chalk/dark/css-vars.css'

// document.documentElement.classList.add('dark')

const ui = (new URLSearchParams(window.location.search).get('ui') as keyof typeof uiConfig) || 'el'

const app = createApp(App)

app.use(router)

app.use(VueFormCraft, {
  ai,
  ui: uiConfig[ui].adapter
})

app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
