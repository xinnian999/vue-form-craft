import { h } from 'vue'
import Icon from '@/Icon/index.vue'
import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import Autocomplete from './Autocomplete.vue'

export default {
  title: '自动完成',
  component: 'Autocomplete',
  icon: h(Icon, { name: 'input' }),
  type: 'basic',
  order: 5,
  attrSchema,
  render: Autocomplete
} satisfies FormElement
