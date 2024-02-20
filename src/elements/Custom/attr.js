import { basicAttr } from '../commonAttr'

export default [
  ...basicAttr(['initialValue', 'props.readonly', 'props.placeholder', 'props.disabled']),

  {
    label: '初始值',
    component: 'Input',
    name: 'initialValue'
  },

  {
    label: '自定义组件名称',
    component: 'Input',
    name: 'props.componentName',
    props: { placeholder: '全局组件名称' }
  },

  {
    label: 'props',
    component: 'JsonEdit',
    name: 'props',
    initialValue: {}
  }
]
