import { describe, expect, it } from 'vitest'
import type { FormItemType } from '@/types'
import { FormDesignTest, generateDesignKey, generateName, repirNode, wait } from '@/utils'

describe('《表单设计器》拖拽测试', async () => {
  it('拖拽组件到根画布', async () => {
    const { getCanvasGroup, itemsLength, items } = FormDesignTest()

    expect(itemsLength.value).toBe(0)

    // 创建一个新的表单项（模拟从菜单拖拽的组件）
    const newItem: FormItemType = repirNode({
      component: 'Input',
      designKey: generateDesignKey(),
      name: generateName()
    })

    // 获取根画布容器实例，调用其暴露的simulateAdd方法模拟拖拽
    const rootCanvas = getCanvasGroup()
    rootCanvas.simulateAdd(newItem)

    // 等待历史记录
    await wait(1000)

    // 验证组件已添加
    expect(itemsLength.value).toBe(1)
    expect(items.value?.[0].component).toBe('Input')
    expect(items.value?.[0].designKey).toBe(newItem.designKey)
  })

  it('拖拽组件到嵌套容器（Grid内部）', async () => {
    const { getCanvasGroup, itemsLength, items, dblclickAdd } = FormDesignTest()

    // 先添加一个Grid容器组件
    await dblclickAdd('Grid')

    expect(itemsLength.value).toBe(1)
    expect(items.value?.[0].component).toBe('Grid')

    const gridDesignKey = items.value?.[0].designKey!

    // 创建一个新的Input组件
    const newItem: FormItemType = repirNode({
      component: 'Input',
      designKey: generateDesignKey(),
      name: generateName()
    })

    // 获取Grid内部的CanvasGroup容器
    const gridCanvas = getCanvasGroup(gridDesignKey)
    gridCanvas.simulateAdd(newItem)

    // 等待历史记录
    await wait(1000)

    // 验证组件已添加到Grid内部
    const gridChildren = items.value?.[0].children
    expect(gridChildren).toBeDefined()
    expect(gridChildren?.length).toBe(1)
    expect(gridChildren?.[0].component).toBe('Input')
    expect(gridChildren?.[0].designKey).toBe(newItem.designKey)
  })

  it('从容器A拖拽组件到容器B', async () => {
    const { getCanvasGroup, items } = FormDesignTest()

    // 手动创建两个Grid容器（避免dblclickAdd的children共享问题）
    const gridA: FormItemType = repirNode({
      component: 'Grid',
      designKey: generateDesignKey(),
      name: generateName(),
      props: { columns: 2, columnGap: 20, rowGap: 20 },
      children: []
    })

    const gridB: FormItemType = repirNode({
      component: 'Grid',
      designKey: generateDesignKey(),
      name: generateName(),
      props: { columns: 2, columnGap: 20, rowGap: 20 },
      children: []
    })

    // 添加到根画布
    const rootCanvas = getCanvasGroup()
    rootCanvas.simulateAdd(gridA)
    await wait(1000)
    rootCanvas.simulateAdd(gridB)
    await wait(1000)

    const gridADesignKey = items.value?.[0].designKey!
    const gridBDesignKey = items.value?.[1].designKey!

    // 验证初始状态：两个Grid都应该为空
    expect(items.value?.[0].children?.length).toBe(0)
    expect(items.value?.[1].children?.length).toBe(0)

    // 在Grid A中添加一个Input组件
    const inputItem: FormItemType = repirNode({
      component: 'Input',
      designKey: generateDesignKey(),
      name: generateName()
    })

    const gridACanvas = getCanvasGroup(gridADesignKey)
    gridACanvas.simulateAdd(inputItem)
    await wait(1000)

    // 验证Grid A中有1个组件，Grid B仍为空
    expect(items.value?.[0].children?.length).toBe(1)
    expect(items.value?.[1].children?.length).toBe(0)

    // 从Grid A移除组件
    const removedItem = gridACanvas.simulateRemove(inputItem.designKey!)

    // 添加到Grid B
    const gridBCanvas = getCanvasGroup(gridBDesignKey)
    gridBCanvas.simulateAdd(removedItem)
    await wait(1000)

    // 验证Grid A为空，Grid B有1个组件
    expect(items.value?.[0].children?.length).toBe(0)
    expect(items.value?.[1].children?.length).toBe(1)

    // 验证移动的组件在Grid B中
    const movedItem = items.value?.[1].children?.find(
      (item) => item.designKey === inputItem.designKey
    )
    expect(movedItem).toBeDefined()
    expect(movedItem?.component).toBe('Input')
  })

  it('从根画布拖拽组件到子容器', async () => {
    const { getCanvasGroup, items } = FormDesignTest()

    // 先在根画布添加一个Input组件
    const inputItem: FormItemType = repirNode({
      component: 'Input',
      designKey: generateDesignKey(),
      name: generateName()
    })

    const rootCanvas = getCanvasGroup()
    rootCanvas.simulateAdd(inputItem)
    await wait(1000)

    // 验证根画布有1个组件
    expect(items.value?.length).toBe(1)
    expect(items.value?.[0].component).toBe('Input')

    // 添加一个Grid容器
    const gridItem: FormItemType = repirNode({
      component: 'Grid',
      designKey: generateDesignKey(),
      name: generateName(),
      props: { columns: 2, columnGap: 20, rowGap: 20 },
      children: []
    })

    rootCanvas.simulateAdd(gridItem)
    await wait(1000)

    // 验证根画布有2个组件
    expect(items.value?.length).toBe(2)

    const gridDesignKey = items.value?.[1].designKey!

    // 从根画布移除Input组件
    const removedInput = rootCanvas.simulateRemove(inputItem.designKey!)

    // 添加到Grid容器内部
    const gridCanvas = getCanvasGroup(gridDesignKey)
    gridCanvas.simulateAdd(removedInput)
    await wait(1000)

    // 验证根画布只剩1个组件（Grid）
    expect(items.value?.length).toBe(1)
    expect(items.value?.[0].component).toBe('Grid')

    // 验证Grid内部有1个Input组件
    expect(items.value?.[0].children?.length).toBe(1)
    expect(items.value?.[0].children?.[0].component).toBe('Input')
    expect(items.value?.[0].children?.[0].designKey).toBe(inputItem.designKey)
  })

  it('从子容器拖拽组件到根画布', async () => {
    const { getCanvasGroup, items } = FormDesignTest()

    // 先创建一个Grid容器
    const gridItem: FormItemType = repirNode({
      component: 'Grid',
      designKey: generateDesignKey(),
      name: generateName(),
      props: { columns: 2, columnGap: 20, rowGap: 20 },
      children: []
    })

    const rootCanvas = getCanvasGroup()
    rootCanvas.simulateAdd(gridItem)
    await wait(1000)

    // 验证根画布有1个Grid
    expect(items.value?.length).toBe(1)
    expect(items.value?.[0].component).toBe('Grid')

    const gridDesignKey = items.value?.[0].designKey!

    // 在Grid内部添加一个Input组件
    const inputItem: FormItemType = repirNode({
      component: 'Input',
      designKey: generateDesignKey(),
      name: generateName()
    })

    const gridCanvas = getCanvasGroup(gridDesignKey)
    gridCanvas.simulateAdd(inputItem)
    await wait(1000)

    // 验证Grid内部有1个组件
    expect(items.value?.[0].children?.length).toBe(1)
    expect(items.value?.[0].children?.[0].component).toBe('Input')

    // 从Grid内部移除Input组件
    const removedInput = gridCanvas.simulateRemove(inputItem.designKey!)

    // 添加到根画布
    rootCanvas.simulateAdd(removedInput)
    await wait(1000)

    // 验证根画布有2个组件（Grid + Input）
    expect(items.value?.length).toBe(2)
    expect(items.value?.[0].component).toBe('Grid')
    expect(items.value?.[1].component).toBe('Input')
    expect(items.value?.[1].designKey).toBe(inputItem.designKey)

    // 验证Grid内部为空
    expect(items.value?.[0].children?.length).toBe(0)
  })
})
