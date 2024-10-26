import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueFormCraft from '@vue-form-craft/entry'

const app = createApp(App)

app.use(router)
app.use(VueFormCraft)

app.mount('#app')
