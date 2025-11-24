import type { FormElement } from '@/types'
import Grid from './Grid.vue'

export default {
  title: '栅格布局',
  type: 'layout',
  icon: 'grid',
  component: 'Grid',
  render: Grid,
  order: 3,
  attrSchema: {
    size: 'small',
    labelAlign: 'top',
    initialValues: {
      props: {
        columns: 2,
        columnGap: 20,
        rowGap: 20
      },
      children: []
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
