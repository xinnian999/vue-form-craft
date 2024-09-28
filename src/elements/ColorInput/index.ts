import { h } from 'vue'
import IconRender from '@/components/IconRender.vue'
import type { FormElement } from '@/release'
import attrSchema from './attrSchema'
import component from './Component.vue'

export default {
  name: '颜色输入框',
  component,
  icon: h(IconRender, { name: 'colorPicker' }),
  type: 'highBasic',
  order: 2,
  initialValues: {
    label: '颜色输入框',
    component: 'ColorInput'
  },
  attrSchema
} satisfies FormElement
