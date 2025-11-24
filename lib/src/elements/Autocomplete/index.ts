import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import Autocomplete from './Autocomplete.vue'

export default {
  title: '自动完成',
  component: 'Autocomplete',
  icon: 'input',
  type: 'basic',
  order: 5,
  attrSchema,
  render: Autocomplete
} satisfies FormElement
