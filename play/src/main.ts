import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import FormMagic from '@form-magic/element-plus/dev'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

app.use(router)
app.use(FormMagic)
app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
