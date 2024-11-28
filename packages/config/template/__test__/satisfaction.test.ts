import { expect, describe, it } from 'vitest'
import { configTest } from '@vue-form-craft/utils'
import { flushPromises, mount } from '@vue/test-utils'
import formRender from '@vue-form-craft/form-render'
import schema from '../satisfaction'
import { nextTick } from 'vue'

configTest()

describe('template satisfaction', async () => {
  it('linkage: satisfaction.value > 3 && improvementSuggestions hidden', async () => {
    const wrapper = mount(formRender, {
      props: {
        schema
      }
    })
    await nextTick()
    await flushPromises()

    await new Promise((resolve) => setTimeout(resolve, 100))

    const satisfactionEl = wrapper.findAll('.Radio-satisfaction .el-radio__original')

    await satisfactionEl[0].setValue(true)

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(wrapper.find('.TextArea-improvementSuggestions').exists()).toBe(false)
  })

  it('linkage: satisfaction.value < 3 && improvementSuggestions visible', async () => {
    const wrapper = mount(formRender, {
      props: {
        schema
      }
    })
    await nextTick()
    await flushPromises()

    await new Promise((resolve) => setTimeout(resolve, 100))

    const satisfactionEl = wrapper.findAll('.Radio-satisfaction .el-radio__original')

    await satisfactionEl[satisfactionEl.length - 1].setValue(true)

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(wrapper.find('.TextArea-improvementSuggestions').exists()).toBe(true)
  })
})
