import { mount, config } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ElementPlus from 'element-plus'
import FormRender from './index.vue'

config.global.plugins = [ElementPlus]

import type { FormSchema } from '@vue-form-craft/types'
import { nextTick } from 'vue'

const loginSchema = {
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
    },
    {
      label: '验证码',
      component: 'VerifyCode',
      required: true,
      props: {
        placeholder: '请输入验证码'
      },
      designKey: 'design-HUBT',
      name: 'code'
    }
  ]
} satisfies FormSchema

describe('FormRender.vue', () => {
  it('render FormRender slot', () => {
    const wrapper = mount(() => <FormRender>Hello, world!</FormRender>)
    expect(wrapper.text()).toContain('Hello, world!')
  })

//   it('render FormRender schema', () => {
//     const wrapper = mount(() => <FormRender schema={loginSchema} />)
//     console.log(wrapper.findAll())

//     // expect(wrapper.getComponent()).toContain('Hello, world!')
//   })

  it('render FormRender schema',async () => {
    const wrapper = mount(() => <FormRender schema={loginSchema} />)

    await nextTick()
// console.log('wrapper.find("label")',wrapper.find('[placeholder="请输入用户名"]'));
console.log('find item username',wrapper.find('[name="username"]'));
console.log('find item password',wrapper.find('[name="password"]'));

    // expect(wrapper.find('label[for="用户名"]').text()).toBe('用户名')
    // expect(wrapper.find('label[for="lastName"]').text()).toBe('Last Name')
  })
})
