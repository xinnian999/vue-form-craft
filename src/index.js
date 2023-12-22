import { SchemaForm, FormDesign } from '@/components/FormPlus' // 引入封装好的组件
export { SchemaForm, FormDesign } //实现按需引入*

const components = [SchemaForm, FormDesign] // 将来如果有其它组件,都可以写到这个数组里

const install = function (App) {
  components.forEach((component) => {
    App.component(component.name, component)
  })
}
export default { install }
