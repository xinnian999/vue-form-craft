import { expect, describe, it } from 'vitest'
import { configTest, wait } from '@/utils'
import { mount } from '@vue/test-utils'
import formRender from '@/form-render'
import schema from '../valueLinkage'

configTest()

describe('template valueLinkage', async () => {
  it('linkage: satisfaction.value > 3 && improvementSuggestions hidden', async () => {
    const wrapper = mount(formRender, {
      props: {
        schema
      }
    })

    await wait()

    const satisfactionEl = wrapper.find('.Input-item1 input')

    await satisfactionEl.setValue('111')

    expect(wrapper.vm.formValues).toStrictEqual({
      item1: '111',
      item2: 222,
      item3: '111元'
    })
  })
})
