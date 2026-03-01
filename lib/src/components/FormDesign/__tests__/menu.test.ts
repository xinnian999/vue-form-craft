import { describe, expect, it } from 'vitest'
import { FormDesignTest } from '@/utils'

describe('《表单设计器》元素菜单测试', async () => {
  it('双击添加元素', async () => {
    const { itemsLength, dblclickAdd } = FormDesignTest()

    expect(itemsLength.value).toBe(0)

    await dblclickAdd('Input')

    expect(itemsLength.value).toBe(1)

    await dblclickAdd('Input')

    expect(itemsLength.value).toBe(2)
  })
})
