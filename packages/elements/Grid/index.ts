import type { FormElement } from '@vue-form-craft/types'
import Icon from '@vue-form-craft/icons'
import { defineAsyncComponent, h } from 'vue'

export default {
  title: '栅格布局',
  type: 'layout',
  icon: h(Icon, { name: 'grid' }),
  component: 'Grid',
  render: defineAsyncComponent(() => import('./Grid.vue')),
  order: 3,
  lbTitle: true,
  attrSchema: {
    size: 'small',
    labelAlign: 'top',
    initialValues: {
      props: {
        columns: 2,
        columnGap: 20,
        rowGap: 20
      }
    },
    items: [
      { label: '唯一标识', component: 'Input', name: 'name' },
      { label: '列数', component: 'InputNumber', name: 'props.columns', initialValue: 2 },
      {
        label: '列间距',
        component: 'InputNumber',
        name: 'props.columnGap',
        props: { unit: 'px' }
      },
      { label: '行间距', component: 'InputNumber', name: 'props.rowGap', props: { unit: 'px' } }
    ]
  }
} satisfies FormElement
