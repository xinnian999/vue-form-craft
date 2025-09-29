import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { FormRender } from '@/components'
import { wait } from '@/utils'
import schema from '../satisfaction'

describe('template satisfaction', async () => {
  it('linkage: satisfaction.value > 3 && improvementSuggestions hidden', async () => {
    const wrapper = mount(FormRender, {
      props: {
        schema
      }
    })

    await wait(500)

    const satisfactionEl = wrapper.findAll('.Radio-satisfaction .el-radio__original')

    await satisfactionEl[0].setValue(true)

    await wait()

    expect(wrapper.vm.formValues).toStrictEqual({ satisfaction: 5 })

    expect(wrapper.find('.TextArea-improvementSuggestions').exists()).toBe(false)
  })

  it('linkage: satisfaction.value < 3 && improvementSuggestions visible', async () => {
    const wrapper = mount(FormRender, {
      props: {
        schema
      }
    })

    await wait()

    const satisfactionEl = wrapper.findAll('.Radio-satisfaction .el-radio__original')

    await satisfactionEl[satisfactionEl.length - 1].setValue(true)

    expect(wrapper.vm.formValues).toStrictEqual({ satisfaction: 1 })

    expect(wrapper.find('.TextArea-improvementSuggestions').exists()).toBe(true)
  })
})
