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
      componentProps: {
        columns: 2,
        columnGap: 20,
        rowGap: 20
      },
      items: []
    },
    items: [
      { label: '唯一标识', component: 'Input', name: 'name' },
      { label: '列数', component: 'InputNumber', name: 'componentProps.columns' },
      {
        label: '列间距',
        component: 'InputNumber',
        name: 'componentProps.columnGap',
        componentProps: { unit: 'px' }
      },
      { label: '行间距', component: 'InputNumber', name: 'componentProps.rowGap', componentProps: { unit: 'px' } }
    ]
  }
} satisfies FormElement
