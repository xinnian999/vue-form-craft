import { Card, Input } from 'ant-design-vue'
import { defineComponent, h } from 'vue'
import type { CardProtocol, InputProtocol, TextareaProtocol, UIAdapter } from '@/types/uiAdapter'

const { TextArea } = Input

/**
 * Ant Design Vue UI适配器
 */
const AntdAdapter: UIAdapter = {
  Input: defineComponent((_, { slots, attrs }) => {
    const propsAttrs = attrs as InputProtocol['props']

    return () =>
      h(
        Input,
        {
          ...attrs,
          value: propsAttrs.modelValue,
          'onUpdate:value': (value: string) => {
            propsAttrs['onUpdate:modelValue']?.(value)
          },
          allowClear: propsAttrs.clearable
        },
        slots
      )
  }),

  Textarea: defineComponent((_, { slots, attrs }) => {
    const propsAttrs = attrs as TextareaProtocol['props']

    return () =>
      h(
        TextArea,
        {
          ...attrs,
          value: propsAttrs.modelValue,
          'onUpdate:value': (value: string) => {
            propsAttrs['onUpdate:modelValue']?.(value)
          },
          allowClear: propsAttrs.clearable,
          showCount: propsAttrs.showWordLimit,
          maxLength: propsAttrs.maxlength,
          autoSize: propsAttrs.autosize
        },
        slots
      )
  }),

  Card: defineComponent((_, { slots, attrs }) => {
    const propsAttrs = attrs as CardProtocol['props']

    return () =>
      h(
        Card,
        {
          ...attrs,
          title: propsAttrs.header,
          hoverable: propsAttrs.shadow === 'hover',
          bodyStyle: propsAttrs.bodyStyle
        },
        slots
      )
  })
}

export default AntdAdapter
