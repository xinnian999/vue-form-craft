import type { FormElement } from '@vue-form-craft/types'
import attrSchema from './attrSchema'
import Divider from './Divider.vue'
import Icon from '@vue-form-craft/icons'
import { h } from 'vue'

export default {
  name: '分割线',
  component: Divider,
  icon: h(Icon, { name: 'divider' }),
  type: 'assist',
  order: 6,
  attrSchema,
  initialValues: {
    component: 'Divider',
    props: {
      title: '分割线'
    }
  }
} satisfies FormElement
