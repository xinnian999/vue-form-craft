import { mount, config, flushPromises } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ElementPlus from 'element-plus'
import FormRender from '@vue-form-craft/form-render'
import type { FormSchema } from '@vue-form-craft/types'

config.global.plugins = [ElementPlus]

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
      required: true
    },
    {
      label: '密码',
      component: 'Password',
      props: {
        placeholder: '请输入密码'
      },
      designKey: 'form-D1x7',
      name: 'password',
      required: true
    }
  ]
} satisfies FormSchema

describe('FormRender Props Test', () => {
  it('slot', () => {
    const wrapper = mount(FormRender, {
      slots: {
        default: () => 'Hello, world!'
      }
    })
    expect(wrapper.text()).toContain('Hello, world!')
  })

  it('v-model', async () => {
    const wrapper = mount(FormRender, {
      props: {
        modelValue: {},
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
        schema: schema
      }
    })

    await wrapper.find('[name="username"]').setValue('hyl')
    await wrapper.find('[name="password"]').setValue('991015')
    expect(wrapper.props('modelValue')).toStrictEqual({ username: 'hyl', password: '991015' })
  })

  it('footer', async () => {
    const wrapper = mount(FormRender, {
      props: {
        footer: true,
        schema,
        modelValue: {},
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
      }
    })

    // 检查按钮是否存在
    expect(wrapper.find('button[name="submit-btn"]').exists()).toBe(true)
    expect(wrapper.find('button[name="reset-btn"]').exists()).toBe(true)

    await wrapper.find('[name="username"]').setValue('hyl')
    await wrapper.find('[name="password"]').setValue('991015')

    expect(wrapper.props('modelValue')).toStrictEqual({ username: 'hyl', password: '991015' })

    // 提交按钮点击事件
    await wrapper.find('button[name="submit-btn"]').trigger('click')
    
    // console.log(wrapper.emitted());
    
    expect(wrapper.emitted()).toHaveProperty('finish')

    // 重置按钮点击事件
    await wrapper.find('button[name="reset-btn"]').trigger('click')
    expect(wrapper.props('modelValue')).toStrictEqual({})
  })
})
