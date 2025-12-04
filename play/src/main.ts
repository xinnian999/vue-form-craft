import ElementPlus from 'element-plus'
import Formora, { AntdAdapter, ElementPlusAdapter } from 'formora/dev'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { cozeAiFunction } from './utils/aiExamples'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

app.use(router)

app.use(Formora, {
  ai: cozeAiFunction,
  ui: AntdAdapter
  // ui: ElementPlusAdapter
})

app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
