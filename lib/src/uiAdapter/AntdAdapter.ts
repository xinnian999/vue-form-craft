import { Input } from 'ant-design-vue'
import { defineComponent, h } from 'vue'
import type { InputProtocol, UIAdapter } from '@/types/uiAdapter'

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
  })
}

export default AntdAdapter
