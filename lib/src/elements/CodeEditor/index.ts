import type { FormElement } from '@/types'
import attrSchema from './attrSchema'
import CodeEditor from './CodeEditor.vue'

export default {
  title: '代码编辑器',
  component: 'CodeEditor',
  icon: 'code',
  type: 'basic',
  order: 3,
  attrSchema,
  render: CodeEditor
} satisfies FormElement
