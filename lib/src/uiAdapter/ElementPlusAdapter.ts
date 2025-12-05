import {
  ElButton,
  ElCard,
  ElCollapse,
  ElCollapseItem,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElTabPane,
  ElTabs
} from 'element-plus'
import { defineComponent, h } from 'vue'
import type { FormItemProtocol, FormProtocol, UIAdapter } from '@/types/uiAdapter'

/**
 * Element-Plus UI适配器
 */
const ElementPlusAdapter: UIAdapter = {
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
      const propsAttrs = attrs as FormItemProtocol['props']

      return () =>
        h(
          ElFormItem,
          {
            ...attrs,
            labelPosition: propsAttrs.labelAlign
          },
          slots
        )
    },
    { inheritAttrs: false }
  ),
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

  Tabs: defineComponent(
    (_, { slots, attrs }) => {
      return () => h(ElTabs, attrs, slots)
    },
    { inheritAttrs: false }
  ),

  TabPane: defineComponent(
    (_, { slots, attrs }) => {
      return () => h(ElTabPane, attrs, slots)
    },
    { inheritAttrs: false }
  ),

  Collapse: defineComponent(
    (_, { slots, attrs }) => {
      return () => h(ElCollapse, attrs, slots)
    },
    { inheritAttrs: false }
  ),

  CollapseItem: defineComponent(
    (_, { slots, attrs }) => {
      return () => h(ElCollapseItem, attrs, slots)
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
      const propsAttrs = attrs as any

      return () =>
        h(
          ElDialog,
          {
            ...attrs,
            // to 参数映射到 ElDialog 的 appendTo
            appendTo: propsAttrs.to || 'body'
          },
          slots
        )
    },
    { inheritAttrs: false }
  )
}

export default ElementPlusAdapter
