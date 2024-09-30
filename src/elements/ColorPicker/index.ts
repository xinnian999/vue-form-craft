import { h } from 'vue'
import IconRender from '@vue-form-craft/components/IconRender.vue'
import type { FormElement } from '@vue-form-craft/release'
import attrSchema from './attrSchema'

export default {
  name: '颜色选择器',
  component: 'ElColorPicker',
  icon: h(IconRender, { name: 'colorPicker' }),
  type: 'basic',
  order: 9,
  initialValues: {
    label: '颜色选择器',
    component: 'ColorPicker'
  },
  attrSchema
} satisfies FormElement
