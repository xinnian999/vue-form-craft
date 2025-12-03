import { ElInput } from 'element-plus'
import { defineComponent, h } from 'vue'
import type { UIAdapter } from '@/types/uiAdapter'

/**
 * Element-Plus UI适配器
 */
const ElementPlusAdapter: UIAdapter = {
  Input: defineComponent((_, { slots, attrs }) => {
    return () => h(ElInput, attrs, slots)
  })
}

export default ElementPlusAdapter
