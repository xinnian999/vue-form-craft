import basic from './commonAttr/basic'
import linkageAttr from './commonAttr/linkageAttr'

export default {
  name: '自定义组件',
  initialValues: {
    label: '自定义组件',
    component: 'custom',
    props: {}
  },
  attr: [
    ...basic,

    {
      label: '初始值',
      component: 'Input',
      name: 'initialValue'
    },

    {
      label: 'props',
      component: 'ItemGroup',
      name: 'props',
      children: [
        {
          label: '自定义组件名称',
          component: 'Input',
          name: 'componentName',
          props: { placeholder: '全局组件名称' }
        }
      ]
    },

    {
      label: 'props',
      component: 'JsonEdit',
      name: 'props',
      initialValue: {}
    },

    ...linkageAttr
  ]
}
