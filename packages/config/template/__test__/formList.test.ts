import { expect, describe, it } from 'vitest'
import { configTest, wait } from '@vue-form-craft/utils'
import { mount } from '@vue/test-utils'
import formRender from '@vue-form-craft/form-render'
import schema from '../formList'

configTest()

describe('template formList', async () => {
  it('list add or reduce', async () => {
    const wrapper = mount(formRender, {
      props: {
        schema,
        modelValue:{}
      }
    })

    await wait(100)

    const listDom = wrapper.find('.FormList-users')

    await listDom.find('.addBtn').trigger('click')

    await listDom.find('.addBtn').trigger('click')

    expect(wrapper.vm.formValues.users.length).toBe(2)

    await listDom.find('.reduceBtn').trigger('click')

    expect(wrapper.vm.formValues.users.length).toBe(1)
  })

  it('list batch set vip', async () => {
    const wrapper = mount(formRender, {
      props: {
        schema,
        modelValue:{}
      }
    })

    await wait(100)

    

    const listDom = wrapper.find('.FormList-users')

    await listDom.find('.addBtn').trigger('click')

    await listDom.find('.addBtn').trigger('click')

    expect(wrapper.vm.formValues.users.length).toBe(2)

    // await listDom.find('.Switch-vip').trigger('click')

    // console.log(wrapper.vm.formValues.users);
    
  })
})
