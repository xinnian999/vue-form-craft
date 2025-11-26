import Basic from './Basic/index.vue'
import InitialValues from './InitialValues.vue'
import JsExpr from './JsExpr.vue'
import Linkages from './Linkages/Linkages.vue'
import Rules from './Rules/Rules.vue'
import StyleEditor from './StyleEditor/index.vue'

export default (app: any) => {
  app.component('FormDesign-InitialValues', InitialValues)
  app.component('FormDesign-StyleEditor', StyleEditor)
  app.component('FormDesign-JsExpr', JsExpr)
  app.component('FormDesign-Rules', Rules)
  app.component('FormDesign-Linkages', Linkages)
  app.component('FormDesign-Basic', Basic)
}
