import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { FormRender } from '@/components'
import { wait } from '@/utils'
import schema from '../formList'

describe('template formList', async () => {
  it('list add or reduce', async () => {
    const wrapper = mount(FormRender, {
      props: {
        schema,
        modelValue: {}
      }
    })

    await wait(500)

    const listDom = wrapper.find('.FormList-users')

    await listDom.find('.addBtn').trigger('click')

    await listDom.find('.addBtn').trigger('click')

    expect(wrapper.vm.getValues().users.length).toBe(2)

    await listDom.find('.reduceBtn').trigger('click')

    expect(wrapper.vm.getValues().users.length).toBe(1)
  })

  it('list batch set vip', async () => {
    const wrapper = mount(FormRender, {
      props: {
        schema,
        modelValue: {}
      }
    })

    await wait(500)

    const listDom = wrapper.find('.FormList-users')

    await listDom.find('.addBtn').trigger('click')

    await listDom.find('.addBtn').trigger('click') // 增加两行

    expect(wrapper.vm.getValues().users.length).toBe(2)

    expect(wrapper.vm.getValues().users.every((item: any) => item.vip === 0)).toBe(true)

    await wrapper.find('.Switch-vip input').trigger('click') // 批量设为管理员

    expect(wrapper.vm.getValues().users.every((item: any) => item.vip === 1)).toBe(true)
  })

  it('username has admin && set row vip true', async () => {
    const wrapper = mount(FormRender, {
      props: {
        schema,
        modelValue: {}
      }
    })

    await wait(500)

    const listDom = wrapper.find('.FormList-users')

    await listDom.find('.addBtn').trigger('click') // 增加一行

    expect(wrapper.vm.getValues().users[0].vip).toBe(0)

    await wrapper.find('.Input-users\\.0\\.username input').setValue('admin999') // 单行

    expect(wrapper.vm.getValues().users[0].vip).toBe(1)
  })

  it('batch disable all password - attr linkage with .*', async () => {
    const wrapper = mount(FormRender, {
      props: {
        schema,
        modelValue: {}
      }
    })

    await wait(500)

    const listDom = wrapper.find('.FormList-users')

    // 添加两行
    await listDom.find('.addBtn').trigger('click')
    await listDom.find('.addBtn').trigger('click')

    await wait(100)

    // 初始状态: 密码输入框应该是启用的
    const password0 = wrapper.find('.Input-users\\.0\\.password input')
    const password1 = wrapper.find('.Input-users\\.1\\.password input')

    expect((password0.element as HTMLInputElement).disabled).toBe(false)
    expect((password1.element as HTMLInputElement).disabled).toBe(false)

    // 触发批量禁用
    await wrapper.find('.Switch-disableAllPassword input').trigger('click')

    await wait(100)

    // 所有密码输入框应该被禁用
    expect((password0.element as HTMLInputElement).disabled).toBe(true)
    expect((password1.element as HTMLInputElement).disabled).toBe(true)

    // 再次点击,取消禁用
    await wrapper.find('.Switch-disableAllPassword input').trigger('click')

    await wait(100)

    // 所有密码输入框应该恢复启用
    expect((password0.element as HTMLInputElement).disabled).toBe(false)
    expect((password1.element as HTMLInputElement).disabled).toBe(false)
  })

  it('username length < 3 && disable row password - attr linkage with []', async () => {
    const wrapper = mount(FormRender, {
      props: {
        schema,
        modelValue: {}
      }
    })

    await wait(500)

    const listDom = wrapper.find('.FormList-users')

    // 添加一行
    await listDom.find('.addBtn').trigger('click')

    await wait(100)

    const passwordInput = wrapper.find('.Input-users\\.0\\.password input')

    // 初始状态: 密码输入框应该是启用的
    expect((passwordInput.element as HTMLInputElement).disabled).toBe(false)

    // 输入短用户名 (长度 < 3)
    await wrapper.find('.Input-users\\.0\\.username input').setValue('ab')

    await wait(100)

    // 密码输入框应该被禁用
    expect((passwordInput.element as HTMLInputElement).disabled).toBe(true)

    // 输入长用户名 (长度 >= 3)
    await wrapper.find('.Input-users\\.0\\.username input').setValue('abc')

    await wait(100)

    // 密码输入框应该被启用
    expect((passwordInput.element as HTMLInputElement).disabled).toBe(false)
  })
})
