import InitialValues from './InitialValues.vue'
import JsExpr from './JsExpr.vue'
import StyleEditor from './StyleEditor/index.vue'

export default (app: any) => {
  app.component('FormDesign-InitialValues', InitialValues)
  app.component('FormDesign-StyleEditor', StyleEditor)
  app.component('FormDesign-JsExpr', JsExpr)
}
