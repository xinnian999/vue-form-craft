import { mount, config, flushPromises } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ElementPlus from 'element-plus'
import FormRender from '@vue-form-craft/form-render'
import type { FormSchema } from '@vue-form-craft/types'
import { $options } from '@vue-form-craft/config'

config.global.plugins = [ElementPlus]
config.global.provide = {
  [$options]: {
    lang: 'zh'
  }
}

describe('FormRender Schema Test', () => {

  it('item initialValue', async () => {
    const schema = {
      labelWidth: 150,
      labelAlign: 'right',
      size: 'default',
      scrollToError: true,
      items: [
        {
          label: '用户名',
          component: 'Input',
          props: {
            placeholder: '请输入用户名',
            clearable: true
          },
          designKey: 'form-eNR0',
          name: 'username',
          required: true,
          initialValue: 'huyilin'
        }
      ]
    } satisfies FormSchema
    const wrapper = mount(FormRender, {
      props: {
        modelValue: {},
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
        schema: schema
      }
    })
    await flushPromises()
    expect(wrapper.props('modelValue')).toStrictEqual({ username: 'huyilin' })
  })
})
