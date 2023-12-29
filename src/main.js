import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import VueFormCraft from '../dist/vue-form-craft.mjs'
import VueFormCraft from './release'
import { request } from '@/utils'

const app = createApp(App)

app.use(router)
app.use(VueFormCraft, { request })

app.mount('#app')
