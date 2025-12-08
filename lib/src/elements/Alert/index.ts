import { defineComponent, h } from 'vue'
import { useUI } from '@/hooks'
import type { FormElement } from '@/types'
import attrSchema from './attrSchema'

export default {
  title: '提示框',
  component: 'Alert',
  icon: 'alert',
  type: 'assist',
  order: 2,
  attrSchema,
  render: defineComponent(() => {
    const { Alert } = useUI()
    return () => h(Alert)
  })
} satisfies FormElement
