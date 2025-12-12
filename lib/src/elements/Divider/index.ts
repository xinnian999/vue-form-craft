import { defineComponent, h } from 'vue'
import { useUI } from '@/hooks'
import type { FormElement } from '@/types'
import attrSchema from './attrSchema'

export default {
  title: '分割线',
  component: 'Divider',
  render: defineComponent((_, { attrs }) => {
    const { Divider } = useUI()
    return () =>
      h(Divider, attrs, {
        default: () => attrs.title
      })
  }),
  icon: 'divider',
  type: 'assist',
  order: 6,
  attrSchema
} satisfies FormElement
