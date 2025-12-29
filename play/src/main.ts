import ElementPlus from 'element-plus'
import Formora from 'formora/dev'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { cozeAiFunction } from './utils/cozeAi'
import { localAiFunction } from './utils/localAi'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { uiConfig } from './uiConfig'

const ui = (new URLSearchParams(window.location.search).get('ui') as keyof typeof uiConfig) || 'el'

const app = createApp(App)

app.use(router)

app.use(Formora, {
  ai: cozeAiFunction,
  ui: uiConfig[ui].adapter
})

app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
