import ElementPlus from 'element-plus'
import Formora from 'formora/dev'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { cozeAiFunction } from './utils/aiExamples'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { uiConfig } from './uiConfig'

const app = createApp(App)

app.use(router)

const searchParams = new URLSearchParams(window.location.search)

app.use(Formora, {
  ai: cozeAiFunction,
  ui: uiConfig[searchParams.get('ui') as keyof typeof uiConfig].adapter
})

app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
