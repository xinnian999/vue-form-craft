import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueFormCraft from '@vue-form-craft/ant-design/dev'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)

app.use(router)
app.use(VueFormCraft)
app.use(Antd)

app.mount('#app')
