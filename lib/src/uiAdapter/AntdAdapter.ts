import { Button, Card, Form, Input } from 'ant-design-vue'
import { defineComponent, h } from 'vue'
import type {
  ButtonProtocol,
  CardProtocol,
  FormItemProtocol,
  FormProtocol,
  InputProtocol,
  TextareaProtocol,
  UIAdapter
} from '@/types/uiAdapter'

const { TextArea } = Input
const { Item: FormItem } = Form

/**
 * Ant Design Vue UI适配器
 */
const AntdAdapter: UIAdapter = {
  Input: defineComponent(
    (_, { slots, attrs }) => {
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
    },
    { inheritAttrs: false }
  ),

  Textarea: defineComponent(
    (_, { slots, attrs }) => {
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
    },
    { inheritAttrs: false }
  ),

  Card: defineComponent(
    (_, { slots, attrs }) => {
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
    },
    { inheritAttrs: false }
  ),

  Form: defineComponent(
    (_, { slots, attrs }) => {
      const propsAttrs = attrs as FormProtocol['props']

      return () =>
        h(
          Form,
          {
            ...attrs,
            colon: false,
            layout: propsAttrs.inline
              ? 'inline'
              : propsAttrs.labelAlign === 'top'
                ? 'vertical'
                : 'horizontal',
            labelCol: propsAttrs.labelWidth
              ? {
                  style: {
                    width:
                      typeof propsAttrs.labelWidth === 'number'
                        ? `${propsAttrs.labelWidth}px`
                        : propsAttrs.labelWidth
                  }
                }
              : undefined
          },
          slots
        )
    },
    { inheritAttrs: false }
  ),

  FormItem: defineComponent(
    (_, { slots, attrs }) => {
      const propsAttrs = attrs as FormItemProtocol['props']

      return () => {
        const { labelWidth } = propsAttrs

        // 计算 labelCol 配置
        let labelCol
        if (labelWidth && labelWidth !== 0) {
          const width = typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth
          labelCol = { style: { width } }
        }
        if (labelWidth === 0) {
          labelCol = { style: { width: 0 } }
        }

        return h(
          FormItem,
          {
            ...attrs,
            colon: false,
            name: propsAttrs.prop,
            labelCol
          },
          slots
        )
      }
    },
    { inheritAttrs: false }
  ),

  Button: defineComponent(
    (_, { slots, attrs }) => {
      const propsAttrs = attrs as ButtonProtocol['props']

      return () => {
        // type 适配: text -> link, warning -> default (Ant Design Vue 不支持 warning 和 info)
        let buttonType: 'primary' | 'dashed' | 'link' | 'text' | 'default' | undefined
        if (propsAttrs.type === 'text') {
          buttonType = 'link'
        } else if (propsAttrs.type === 'warning' || propsAttrs.type === 'info') {
          buttonType = 'default'
        } else if (propsAttrs.type === 'danger') {
          buttonType = undefined
        } else {
          buttonType = propsAttrs.type as 'primary' | 'dashed' | 'link' | 'text' | 'default'
        }

        return h(
          Button,
          {
            ...attrs,
            type: buttonType,
            danger: propsAttrs.type === 'danger',
            shape: propsAttrs.circle ? 'circle' : propsAttrs.round ? 'round' : undefined
          },
          {
            ...slots,
            icon: () => h('span', { class: 'anticon' }, slots.icon?.())
          }
        )
      }
    },
    { inheritAttrs: false }
  )
}

export default AntdAdapter
