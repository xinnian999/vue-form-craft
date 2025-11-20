import type { FormElement } from '@/types'
import CollapseItem from './CollapseItem.vue'

export default {
  title: '折叠面板-子面板',
  component: 'CollapseItem',
  render: CollapseItem,
  icon: 'collapse',
  type: 'layout',
  order: 10002,
  attrSchema: {
    size: 'small',
    labelAlign: 'top',
    initialValues: {},
    items: [
      { label: '标题', component: 'Input', name: 'label' },
      { label: '唯一标识', component: 'Input', name: 'name' },
      { label: '默认展开', component: 'Switch', name: 'props.checked' }
    ]
  }
} satisfies FormElement
