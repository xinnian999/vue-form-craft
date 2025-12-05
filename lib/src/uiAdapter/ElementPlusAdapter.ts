import {
  ElButton,
  ElCard,
  ElCollapse,
  ElCollapseItem,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElOption,
  ElSelect,
  ElTabPane,
  ElTabs
} from 'element-plus'
import { defineComponent, h, ref } from 'vue'
import type { FormItemProtocol, FormProtocol, UIAdapter } from '@/types/uiAdapter'

/**
 * Element-Plus UI适配器
 */
const ElementPlusAdapter: UIAdapter = {
  Form: defineComponent(
    (_, { slots, attrs, expose }) => {
      const propsAttrs = attrs as FormProtocol['props']
      const formRef = ref()

      // 暴露底层 ElForm 的所有方法
      expose({
        validate: (...args: any[]) => formRef.value?.validate(...args),
        validateField: (...args: any[]) => formRef.value?.validateField(...args),
        resetFields: (...args: any[]) => formRef.value?.resetFields(...args),
        scrollToField: (...args: any[]) => formRef.value?.scrollToField(...args),
        clearValidate: (...args: any[]) => formRef.value?.clearValidate(...args)
      })

      return () =>
        h(
          ElForm,
          {
            ref: formRef,
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

  Select: defineComponent(
    (_, { slots, attrs }) => {
      const propsAttrs = attrs as any

      return () =>
        h(
          ElSelect,
          attrs,
          propsAttrs.options
            ? {
                default: () =>
                  propsAttrs.options.map((option: any) =>
                    h(ElOption, {
                      key: option.value,
                      label: option.label,
                      value: option.value,
                      disabled: option.disabled
                    })
                  ),
                ...slots
              }
            : slots
        )
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
            appendTo: document.querySelector(propsAttrs.to) || 'body'
          },
          slots
        )
    },
    { inheritAttrs: false }
  )
}

export default ElementPlusAdapter
