import InitialValues from './InitialValues.vue'
import StyleEditor from './StyleEditor/index.vue'

export default (app: any) => {
  app.component('FormDesign-InitialValues', InitialValues)
  app.component('FormDesign-StyleEditor', StyleEditor)
}
