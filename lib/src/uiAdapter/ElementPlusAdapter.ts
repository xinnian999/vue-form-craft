import { ElButton, ElCard, ElDialog, ElForm, ElFormItem, ElInput } from 'element-plus'
import { defineComponent, h } from 'vue'
import type { FormProtocol, UIAdapter } from '@/types/uiAdapter'

/**
 * Element-Plus UI适配器
 */
const ElementPlusAdapter: UIAdapter = {
  Input: defineComponent(
    (_, { slots, attrs }) => {
      return () => h(ElInput, attrs, slots)
    },
    { inheritAttrs: false }
  ),

  Textarea: defineComponent(
    (_, { slots, attrs }) => {
      return () => h(ElInput, { ...attrs, type: 'textarea' }, slots)
    },
    { inheritAttrs: false }
  ),

  Card: defineComponent(
    (_, { slots, attrs }) => {
      return () => h(ElCard, attrs, slots)
    },
    { inheritAttrs: false }
  ),

  Form: defineComponent(
    (_, { slots, attrs }) => {
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
    },
    { inheritAttrs: false }
  ),

  FormItem: defineComponent(
    (_, { slots, attrs }) => {
      return () => h(ElFormItem, attrs, slots)
    },
    { inheritAttrs: false }
  ),

  Button: defineComponent(
    (_, { slots, attrs }) => {
      return () => h(ElButton, attrs, slots)
    },
    { inheritAttrs: false }
  ),

  Modal: defineComponent(
    (_, { slots, attrs }) => {
      return () => h(ElDialog, attrs, slots)
    },
    { inheritAttrs: false }
  )
}

export default ElementPlusAdapter
