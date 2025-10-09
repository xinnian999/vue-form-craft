import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { FormDesign } from '@/components'
import { ns } from '@/utils'

describe('FormDesign history', async () => {
  const wrapper = mount(FormDesign)

  const backBtn = wrapper.find(`.el-button[name="history-back"]`)

  const forwardBtn = wrapper.find(`.el-button[name="history-forward"]`)

  it('btn disabled', async () => {
    expect(backBtn.attributes('disabled')).toBeDefined()

    expect(forwardBtn.attributes('disabled')).toBeDefined()
  })

  it('item dblclick', async () => {
    await wrapper.find(`.${ns('menu-list-item')}`).trigger('dblclick') // 双击增添一个单行文本

    expect(wrapper.vm.schema.items.length).toBe(1)

    await backBtn.trigger('click') // 后退

    expect(wrapper.vm.schema.items.length).toBe(0)

    await forwardBtn.trigger('click') // 前进

    expect(wrapper.vm.schema.items.length).toBe(1)
  })
})
