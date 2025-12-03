import ElementPlus from 'element-plus'
import VueFormCraft, { AntdAdapter } from 'formora/dev'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { cozeAiFunction } from './utils/aiExamples'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

app.use(router)

app.use(VueFormCraft, {
  ai: cozeAiFunction,
  ui: AntdAdapter
})

app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
