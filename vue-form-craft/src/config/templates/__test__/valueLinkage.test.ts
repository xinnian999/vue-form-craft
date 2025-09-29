import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { FormRender } from '@/components'
import { configTest, wait } from '@/utils'
import schema from '../valueLinkage'

configTest()

describe('template valueLinkage', async () => {
  it('linkage: satisfaction.value > 3 && improvementSuggestions hidden', async () => {
    const wrapper = mount(FormRender, {
      props: {
        schema
      }
    })

    await wait()

    const satisfactionEl = wrapper.find('.Input-item1 input')

    await satisfactionEl.setValue('111')

    expect(wrapper.vm.formValues).toStrictEqual({
      item1: '111',
      item2: '222',
      item3: '111元'
    })
  })
})
