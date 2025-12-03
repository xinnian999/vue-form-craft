import { ElCard, ElInput } from 'element-plus'
import { defineComponent, h } from 'vue'
import type { UIAdapter } from '@/types/uiAdapter'

/**
 * Element-Plus UI适配器
 */
const ElementPlusAdapter: UIAdapter = {
  Input: defineComponent((_, { slots, attrs }) => {
    return () => h(ElInput, attrs, slots)
  }),

  Textarea: defineComponent((_, { slots, attrs }) => {
    return () => h(ElInput, { ...attrs, type: 'textarea' }, slots)
  }),

  Card: defineComponent((_, { slots, attrs }) => {
    return () => h(ElCard, attrs, slots)
  })
}

export default ElementPlusAdapter
