import { describe, expect, it } from 'vitest'
import { FormDesignTest, wait } from '@/utils'

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

  it('复制 - 历史', async () => {
    const { itemsLength, dblclickAdd, clickItem, backBtn, forwardBtn } = FormDesignTest()

    await dblclickAdd('Input') // 0 + 1

    expect(itemsLength.value).toBe(1)

    const activeItem = await clickItem()

    await activeItem.copyBtn.trigger('click') // 1 + 1

    await wait(100)

    await activeItem.copyBtn.trigger('click') // 2 + 1

    await wait(100)

    expect(itemsLength.value).toBe(3)

    await backBtn.trigger('click') // 3 - 1

    expect(itemsLength.value).toBe(2)

    await backBtn.trigger('click') // 2 - 1

    expect(itemsLength.value).toBe(1)

    await forwardBtn.trigger('click') // 1 + 1

    expect(itemsLength.value).toBe(2)

    await forwardBtn.trigger('click') // 2 + 1

    expect(itemsLength.value).toBe(3)
  })

  it('删除 - 历史', async () => {
    const { itemsLength, dblclickAdd, clickItem, backBtn, forwardBtn } = FormDesignTest()

    await dblclickAdd('Input') // 0 + 1

    expect(itemsLength.value).toBe(1)

    const activeItem = await clickItem()

    await activeItem.deleteBtn.trigger('click') // 1 - 1

    await wait(100)

    expect(itemsLength.value).toBe(0)

    await backBtn.trigger('click')

    await wait(100)

    expect(itemsLength.value).toBe(1)

    await forwardBtn.trigger('click')

    await wait(100)

    expect(itemsLength.value).toBe(0)
  })
})
