import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import FormRender from '@/form-render'
import type { FormSchema } from '@form-magic/core'
import { nextTick } from 'vue'
import { configTest } from '@form-magic/core'

configTest()

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

describe('FormRender Attrs', () => {
  it('slot.default', () => {
    const wrapper = mount(FormRender, {
      slots: {
        default: () => 'Hello, world!'
      }
    })
    expect(wrapper.text()).toContain('Hello, world!')
  })

  it('v-model:modelValue', async () => {
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

  it('props.schema', async () => {
    const wrapper = mount(FormRender, {
      props: {
        schema
      }
    })

    expect(wrapper.find('input[name="username"]').exists()).toBe(true)
    expect(wrapper.find('input[name="password"]').exists()).toBe(true)
  })

  it('props.read', async () => {
    const wrapper = mount(FormRender, {
      props: {
        schema,
        read: true
      }
    })

    expect(wrapper.find('input[name="username"]').exists()).toBe(false)
    expect(wrapper.find('input[name="password"]').exists()).toBe(false)
  })

  it('props.footer', async () => {
    const wrapper = mount(FormRender, {
      props: {
        footer: true,
        schema,
        modelValue: {},
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
      }
    })

    // 检查底部按钮是否存在
    expect(wrapper.find('button[name="submit-btn"]').exists()).toBe(true)
    expect(wrapper.find('button[name="reset-btn"]').exists()).toBe(true)

    // 提交按钮点击
    // await wrapper.find('button[name="submit-btn"]').trigger('click')
    // await flushPromises()
    // await nextTick();
    // expect(wrapper.emitted()).toHaveProperty('failed') // 提交且校验失败事件 TODO: 未触发failed

    await wrapper.find('[name="username"]').setValue('hyl')
    await wrapper.find('[name="password"]').setValue('991015')
    await wrapper.find('button[name="submit-btn"]').trigger('click')
    await flushPromises()
    await nextTick()
    expect(wrapper.emitted()).toHaveProperty('finish') // 提交且校验成功 事件

    // 重置按钮点击
    await wrapper.find('button[name="reset-btn"]').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('reset')
    expect(wrapper.props('modelValue')).toStrictEqual({})
  })
})
