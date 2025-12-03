import { ElCard, ElForm, ElFormItem, ElInput } from 'element-plus'
import { defineComponent, h } from 'vue'
import type { FormProtocol, UIAdapter } from '@/types/uiAdapter'

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
  }),

  Form: defineComponent((_, { slots, attrs }) => {
    const propsAttrs = attrs as FormProtocol['props']

    return () =>
      h(
        ElForm,
        {
          ...attrs,
          // labelAlign -> labelPosition (Element-Plus 使用 labelPosition)
          labelPosition: propsAttrs.labelAlign
        },
        slots
      )
  }),

  FormItem: defineComponent((_, { slots, attrs }) => {
    return () => h(ElFormItem, attrs, slots)
  })
}

export default ElementPlusAdapter
