import linkageAttr from './commonAttr/linkageAttr'
import basic from './commonAttr/basic'
import props from './commonAttr/props'
import { JsonEdit } from '@/components'

export default {
  name: 'JSON编辑器',
  // component: JsonEdit,
  initialValues: { label: 'JSON编辑器', component: 'jsonEdit' },
  attr: [
    ...basic,
    { label: '初始值', component: 'jsonEdit', name: 'initialValue' },
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [
        ...props,
        {
          label: '显示模式',
          component: 'Radio',
          name: 'mode',
          props: {
            mode: 'static',
            options: [
              { label: '弹窗', value: 'dialog' },
              { label: '直接显示', value: 'direct' }
            ]
          },
          initialValue: 'dialog'
        }
      ]
    },
    ...linkageAttr
  ]
}
