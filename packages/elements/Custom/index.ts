import { h } from 'vue'
import IconRender from '@vue-form-craft/components/IconRender.vue'
import type { FormElement } from '@vue-form-craft/release'
import attrSchema from './attrSchema'
import component from './Component.vue'

export default {
  name: '自定义组件',
  component,
  icon: h(IconRender, { name: 'custom' }),
  type: 'basic',
  order: 99,
  initialValues: {
    label: '自定义组件',
    component: 'Custom'
  },
  attrSchema
} satisfies FormElement
