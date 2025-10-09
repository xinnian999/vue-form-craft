import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { FormDesign } from '@/components'
import { ns } from '@/utils'

describe('FormDesign Menu', async () => {
  it('dblclick', async () => {
    const wrapper = mount(FormDesign)

    expect(wrapper.vm.schema.items.length).toBe(0)

    const menusItem1 = wrapper.find(`.${ns('menu-list-item')}`) // 单行文本

    await menusItem1.trigger('dblclick')

    expect(wrapper.vm.schema.items.length).toBe(1)
  })
})
