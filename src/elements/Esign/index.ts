import { h } from 'vue'
import IconRender from '@vue-form-craft/components/IconRender.vue'
import attrSchema from './attrSchema'
import type { FormElement } from '@vue-form-craft/config/commonType'
import component from './Component.vue'

export default {
  name: '电子签名',
  component,
  icon: h(IconRender, { name: 'input' }),
  type: 'basic',
  order: 11,
  initialValues: {
    label: '电子签名',
    component: 'Esign',
    props: {
      width: 700,
      height: 300,
      lineWidth: 6,
      lineColor: '#000000',
      bgColor: '#eeeeee',
      format: 'image/png'
    }
  },
  attrSchema
} satisfies FormElement
