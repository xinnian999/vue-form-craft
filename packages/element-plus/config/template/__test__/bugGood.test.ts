import { expect, describe, it } from 'vitest'
import { configTest, wait } from '@/utils'
import { mount } from '@vue/test-utils'
import formRender from '@/form-render'
import schema from '../bugGood'

configTest()

describe('template bugGood', async () => {
  it('linkage: product selected && price visible', async () => {
    const wrapper = mount(formRender, {
      props: {
        schema
      }
    })

    await wait(100)
    
    expect(wrapper.find('.Text-price').html()).toContain('请选择商品')

    const productEl = wrapper.findAll('.Radio-product .el-radio__original')

    await productEl[0].setValue(true)

    expect(wrapper.find('.Text-price').html()).toContain('25元')

    await productEl[1].setValue(true)

    expect(wrapper.find('.Text-price').html()).toContain('15元')
  })
})
