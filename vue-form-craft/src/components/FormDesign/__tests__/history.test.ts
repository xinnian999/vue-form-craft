import { describe, expect, it } from 'vitest'
import { FormDesignTest } from '@/utils'

describe('《表单设计器》历史记录测试', async () => {
  it('（后退/前进）按钮初始化 - 全部禁用', async () => {
    const { backBtn, forwardBtn } = FormDesignTest()

    expect(backBtn.attributes('disabled')).toBeDefined()

    expect(forwardBtn.attributes('disabled')).toBeDefined()
  })

  it('双击添加 - 历史', async () => {
    const { backBtn, forwardBtn, itemsLength, dblclickAdd } = FormDesignTest()

    await dblclickAdd('Input')

    await dblclickAdd('Input')

    expect(itemsLength.value).toBe(2) // 添加2次

    await backBtn.trigger('click')

    expect(itemsLength.value).toBe(1) // 后退1次

    await forwardBtn.trigger('click')

    expect(itemsLength.value).toBe(2) // 前进1次
  })

  it('清空设计 - 历史', async () => {
    const { backBtn, forwardBtn, itemsLength, dblclickAdd, clearDesign } = FormDesignTest()

    await dblclickAdd('Input')

    await dblclickAdd('Input')

    expect(itemsLength.value).toBe(2) // 添加2次

    // 清空设计
    await clearDesign()

    expect(itemsLength.value).toBe(0) // 清空设计

    await backBtn.trigger('click')

    expect(itemsLength.value).toBe(2) // 后退1次

    await forwardBtn.trigger('click')

    expect(itemsLength.value).toBe(0) // 前进1次
  })
})
