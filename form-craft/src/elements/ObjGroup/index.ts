import { defineAsyncComponent, h } from 'vue'
import Icon from '@/Icon/index.vue'
import type { FormElement } from '@/types'

export default {
  title: '对象容器',
  icon: h(Icon, { name: 'itemGroup' }),
  type: 'basic',
  component: 'ObjGroup',
  render: defineAsyncComponent(() => import('./ObjGroup.vue')),
  order: 25,
  attrSchema: {
    size: 'small',
    labelAlign: 'top',
    initialValues: {
      props: {
        align: 'left',
        gap: 20
      },
      children: [],
      hideLabel: true
    },
    items: [{ label: '唯一标识', component: 'Input', name: 'name' }]
  }
} satisfies FormElement
