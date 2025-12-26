import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import CodeEditor from './CodeEditor.vue'

export default {
  title: '代码编辑器',
  component: 'CodeEditor',
  icon: 'code',
  type: 'high',
  order: 29,
  attrSchema,
  render: CodeEditor
} satisfies FormElement
