import type { App } from 'vue'
import Code from './Code.vue'

export default (app: App) => {
  app.component('vfc-code', Code)
}
