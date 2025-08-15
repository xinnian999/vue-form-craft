import { expect, describe, it } from 'vitest'
import { configTest } from '@/utils'
import { mount } from '@vue/test-utils'
import { FormRender } from '@/components'
import schema from '../valueLinkage'
import { tools } from '@form-magic/core'

configTest()

describe('template valueLinkage', async () => {
  it('linkage: satisfaction.value > 3 && improvementSuggestions hidden', async () => {
    const wrapper = mount(FormRender, {
      props: {
        schema
      }
    })

    await tools.wait()

    const satisfactionEl = wrapper.find('.Input-item1 input')

    await satisfactionEl.setValue('111')

    expect(wrapper.vm.formValues).toStrictEqual({
      item1: '111',
      item2: 222,
      item3: '111元'
    })
  })
})
