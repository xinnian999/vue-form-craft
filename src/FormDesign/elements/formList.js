import basic from './commonAttr/basic'
import props from './commonAttr/props'
export default {
  name: '自增容器',
  initialValues: {
    label: '自增容器',
    component: 'formList',
    children: []
  },
  attr: [
    ...basic,
    {
      label: '初始值',
      component: 'jsonEdit',
      name: 'initialValue'
    },
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [
        ...props,
        {
          label: '显示模式',
          component: 'radio',
          name: 'mode',
          props: {
            mode: 'static',
            options: [
              { label: '表格', value: 'table' },
              { label: '卡片', value: 'card' },
              { label: '行内', value: 'inline' }
            ]
          },
          initialValue: 'table'
        }
      ]
    }
  ]
}
