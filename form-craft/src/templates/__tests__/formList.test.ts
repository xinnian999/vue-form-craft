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
})
