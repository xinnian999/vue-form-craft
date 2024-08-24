import type { FormElement } from '@/release'
import attrSchema from './attrSchema'
import Divider from './Divider.vue'
import { IconRender } from '@/components'
import { h } from 'vue'

export default {
  name: '分割线',
  component: Divider,
  icon: h(IconRender, { name: 'divider' }),
  type: 'assist',
  order: 6,
  attrSchema,
  initialValues: {
    component: 'Divider',
    props: {
      title: '分割线'
    }
  }
} as FormElement
