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
      component: 'input',
      name: 'initialValue'
    },

    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [
        {
          label: '自定义组件名称',
          component: 'input',
          name: 'componentName',
          props: { placeholder: '全局组件名称' }
        }
      ]
    },

    ...linkageAttr
  ]
}
