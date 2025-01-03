import Icon from '@vue-form-craft/icons'
import type { FormElement } from '@vue-form-craft/types'
import { defineAsyncComponent, h } from 'vue'

export default {
  title: '对象容器',
  icon: h(Icon, { name: 'itemGroup' }),
  type: 'high',
  component: 'ObjGroup',
  render: defineAsyncComponent(() => import('./ObjGroup.vue')),
  order: 2,
  lbTitle: true,
  attrSchema: {
    size: 'small',
    labelAlign: 'top',
    initialValues: {
      props: {
        align: 'left',
        gap: 20,
      },
      children:[],
      hideLabel:true
    },
    items: [
      { label: '唯一标识', component: 'Input', name: 'name' },
    ]
  }
} satisfies FormElement
