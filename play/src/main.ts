import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueFormCraft from 'vue-form-craft'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(VueFormCraft)
app.use(ElementPlus)

app.mount('#app')
