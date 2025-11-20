import type { FormElement } from '@/types'
import TextArea from './TextArea.vue'
import attrSchema from './textAreaAttrSchema'

export default {
  title: '多行文本',
  component: 'TextArea',
  icon: 'textarea',
  type: 'basic',
  order: 2,
  attrSchema,
  render: TextArea
} satisfies FormElement
