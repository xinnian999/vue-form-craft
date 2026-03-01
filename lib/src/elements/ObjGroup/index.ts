import type { FormElement } from '@/types'
import ObjGroup from './ObjGroup.vue'

export default {
  title: '对象容器',
  icon: 'itemGroup',
  type: 'high',
  component: 'ObjGroup',
  render: ObjGroup,
  order: 2,
  attrSchema: {
    size: 'small',
    labelAlign: 'top',
    initialValues: {
      props: {
        align: 'left',
        gap: 20
      },
      items: []
    },
    items: [{ label: '唯一标识', component: 'Input', name: 'name' }]
  }
} satisfies FormElement
