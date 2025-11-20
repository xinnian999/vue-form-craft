import type { FormElement } from '@/types'
import TabPane from './TabPane.vue'

export default {
  title: '选项卡面板',
  component: 'TabPane',
  render: TabPane,
  icon: 'tabs',
  type: 'layout',
  order: 10001,
  attrSchema: {
    size: 'small',
    labelAlign: 'top',
    initialValues: {},
    items: [
      { label: '标题', component: 'Input', name: 'label' },
      { label: '唯一标识', component: 'Input', name: 'name' }
    ]
  }
} satisfies FormElement
