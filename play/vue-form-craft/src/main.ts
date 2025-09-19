import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import VueFormCraft from 'vue-form-craft/dev'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

app.use(router)
app.use(VueFormCraft, {
  ai: {
    token: import.meta.env.VITE_COZE_TOKEN
  }
})
app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
