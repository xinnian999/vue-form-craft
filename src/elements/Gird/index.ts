import type { FormElement } from '@vue-form-craft/release'
import Grid from './Grid.vue'
import { IconRender } from '@vue-form-craft/components'
import { h } from 'vue'

export default {
  name: '栅格布局',
  type: 'layout',
  icon: h(IconRender, { name: 'grid' }),
  component: Grid,
  order: 3,
  initialValues: {
    component: 'Grid',
    children: [],
    props: {
      columns: 2,
      'column-gap': 20,
      'row-gap': 20
    }
  },
  attrSchema:{
      size: 'small',
      labelAlign: 'top',
      items:[
        { label: '唯一标识', component: 'Input', name: 'name' },
        { label: '列数', component: 'InputNumber', name: 'props.columns', initialValue: 2 },
        { label: '列间距', component: 'InputNumber', name: 'props.column-gap', props: { unit: 'px' } },
        { label: '行间距', component: 'InputNumber', name: 'props.row-gap', props: { unit: 'px' } }
      ]
  }
} satisfies FormElement
