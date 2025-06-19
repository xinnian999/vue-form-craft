import { expect, describe, it } from 'vitest'
import {  wait } from '@form-magic/core'
import { mount } from '@vue/test-utils'
import { FormRender } from '@form-magic/components'
import { configTest } from '@/config'
import schema from '../satisfaction'

configTest()

describe('template satisfaction', async () => {
  it('linkage: satisfaction.value > 3 && improvementSuggestions hidden', async () => {
    const wrapper = mount(FormRender, {
      props: {
        schema
      }
    })

    await wait(100)

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
