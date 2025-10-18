import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { FormRender } from '@/components'
import type { FormSchema } from '@/types'

describe('FormRender Schema Test', () => {
  it('label', async () => {
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
          name: 'username'
        },
        {
          label: '密码',
          component: 'Password',
          props: {
            placeholder: '请输入密码'
          },
          name: 'password'
        }
      ]
    } satisfies FormSchema
    const wrapper = mount(FormRender, {
      props: {
        schema: schema
      }
    })

    await flushPromises()

    expect(wrapper.find('.username-label').html()).toContain('用户名')
    expect(wrapper.find('.password-label').html()).toContain('密码')
  })

  it('required', async () => {
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
          name: 'username',
          required: true
        },
        {
          label: '密码',
          component: 'Password',
          props: {
            placeholder: '请输入密码'
          },
          name: 'password',
          required: true
        }
      ]
    } satisfies FormSchema

    const values = ref({})
    const wrapper = mount(FormRender, {
      props: {
        schema: schema,
        modelValue: values
      }
    })
  })

  it('initialValue', async () => {
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
          name: 'username',
          required: true,
          initialValue: 'huyilin'
        },
        {
          label: '密码',
          component: 'Password',
          props: {
            placeholder: '请输入密码'
          },
          name: 'password',
          required: true,
          initialValue: 'qs666666'
        }
      ]
    } satisfies FormSchema
    const wrapper = mount(FormRender, {
      props: {
        modelValue: {},
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
        schema: schema
      }
    })
    await flushPromises()
    expect(wrapper.props('modelValue')).toStrictEqual({ username: 'huyilin', password: 'qs666666' })
  })
})
