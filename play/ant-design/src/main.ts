import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import FormMagic from '@form-magic/ant-design/dev'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)

app.use(router)
app.use(FormMagic)
app.use(Antd)

app.mount('#app')
