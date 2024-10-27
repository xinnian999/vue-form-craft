import Inline from './Inline.vue'
import Icon from '@vue-form-craft/icons'
import type { FormElement } from '@vue-form-craft/types'
import { h } from 'vue'

export default {
  name: '行内布局',
  icon: h(Icon, { name: 'inline' }),
  type: 'layout',
  component: Inline,
  order: 2,
  initialValues: {
    component: 'Inline',
    children: [],
    props: {
      align: 'left',
      gap: 20
    }
  },
  attrSchema: {
    size: 'small',
    labelAlign: 'top',
    items: [
      { label: '唯一标识', component: 'Input', name: 'name' },
      {
        label: '对齐方式',
        component: 'Radio',
        name: 'props.align',
        props: {
          mode: 'static',
          options: [
            { label: '左对齐', value: 'left' },
            { label: '居中', value: 'center' },
            { label: '右对齐', value: 'right' }
          ]
        },
        initialValue: 'left'
      },
      { label: '间距大小', component: 'InputNumber', name: 'props.gap', props: { unit: 'px' } },
      { label: '自动换行', component: 'Switch', name: 'props.autoWrap' }
    ]
  }
}  satisfies FormElement
