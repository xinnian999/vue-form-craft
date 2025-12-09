import { describe, expect, it } from 'vitest'
import type { FormItemType } from '@/types'
import { FormDesignTest, generateDesignKey, generateName, repirNode, wait } from '@/utils'

//TODO：待修复 FormDesignTest多次创建，modelValue共享问题

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

  it('拖拽组件到嵌套容器（Card内部）', async () => {
    const { getCanvasGroup, itemsLength, items, dblclickAdd, wrapper } = FormDesignTest()

    wrapper.vm.handleClear()

    // 先添加一个Card容器组件
    await dblclickAdd('Card')

    expect(itemsLength.value).toBe(1)
    expect(items.value?.[0].component).toBe('Card')

    const cardDesignKey = items.value?.[0].designKey!

    // 创建一个新的Input组件
    const newItem: FormItemType = repirNode({
      component: 'Input',
      designKey: generateDesignKey(),
      name: generateName()
    })

    // 获取Card内部的CanvasGroup容器
    const cardCanvas = getCanvasGroup(cardDesignKey)
    cardCanvas.simulateAdd(newItem)

    // 等待历史记录
    await wait(1000)

    // 验证组件已添加到Card内部
    const cardChildren = items.value?.[0].children
    expect(cardChildren).toBeDefined()
    expect(cardChildren?.length).toBe(1)
    expect(cardChildren?.[0].component).toBe('Input')
    expect(cardChildren?.[0].designKey).toBe(newItem.designKey)
  })

  // it('从容器A拖拽组件到容器B', async () => {
  //   const { getCanvasGroup, items, wrapper } = FormDesignTest()

  //   wrapper.vm.handleClear()

  //   // 手动创建两个Card容器（避免dblclickAdd的children共享问题）
  //   const cardA: FormItemType = repirNode({
  //     component: 'Card',
  //     designKey: generateDesignKey(),
  //     name: 'Card-A',
  //     children: []
  //   })

  //   const cardB: FormItemType = repirNode({
  //     component: 'Card',
  //     designKey: generateDesignKey(),
  //     name: 'Card-B',
  //     children: []
  //   })

  //   // 添加到根画布
  //   const rootCanvas = getCanvasGroup()
  //   rootCanvas.simulateAdd(cardA)
  //   await wait(1000)
  //   rootCanvas.simulateAdd(cardB)
  //   await wait(1000)

  //   const cardADesignKey = items.value?.[0].designKey!
  //   const cardBDesignKey = items.value?.[1].designKey!

  //   // 验证初始状态：两个Card都应该为空
  //   expect(items.value?.[0].children?.length).toBe(0)
  //   expect(items.value?.[1].children?.length).toBe(0)

  //   // 在Card A中添加一个Input组件
  //   const inputItem: FormItemType = repirNode({
  //     component: 'Input',
  //     designKey: generateDesignKey(),
  //     name: generateName()
  //   })

  //   const cardACanvas = getCanvasGroup(cardADesignKey)
  //   cardACanvas.simulateAdd(inputItem)
  //   await wait(1000)

  //   // 验证Card A中有1个组件，Card B仍为空
  //   expect(items.value?.[0].children?.length).toBe(1)
  //   expect(items.value?.[1].children?.length).toBe(0)

  //   // 从Card A移除组件
  //   const removedItem = cardACanvas.simulateRemove(inputItem.designKey!)

  //   // 添加到Card B
  //   const cardBCanvas = getCanvasGroup(cardBDesignKey)
  //   cardBCanvas.simulateAdd(removedItem)
  //   await wait(1000)

  //   // 验证Card A为空，Card B有1个组件
  //   expect(items.value?.[0].children?.length).toBe(0)
  //   expect(items.value?.[1].children?.length).toBe(1)

  //   // 验证移动的组件在Card B中
  //   const movedItem = items.value?.[1].children?.find(
  //     (item) => item.designKey === inputItem.designKey
  //   )
  //   expect(movedItem).toBeDefined()
  //   expect(movedItem?.component).toBe('Input')
  // })

  // it('从根画布拖拽组件到子容器', async () => {
  //   const { getCanvasGroup, items } = FormDesignTest()

  //   // 先在根画布添加一个Input组件
  //   const inputItem: FormItemType = repirNode({
  //     component: 'Input',
  //     designKey: generateDesignKey(),
  //     name: generateName()
  //   })

  //   const rootCanvas = getCanvasGroup()
  //   rootCanvas.simulateAdd(inputItem)
  //   await wait(1000)

  //   // 验证根画布有1个组件
  //   expect(items.value?.length).toBe(1)
  //   expect(items.value?.[0].component).toBe('Input')

  //   // 添加一个Card容器
  //   const cardItem: FormItemType = repirNode({
  //     component: 'Card',
  //     designKey: generateDesignKey(),
  //     name: generateName(),
  //     children: []
  //   })

  //   rootCanvas.simulateAdd(cardItem)
  //   await wait(1000)

  //   // 验证根画布有2个组件
  //   expect(items.value?.length).toBe(2)

  //   const cardDesignKey = items.value?.[1].designKey!

  //   // 从根画布移除Input组件
  //   const removedInput = rootCanvas.simulateRemove(inputItem.designKey!)

  //   // 添加到Card容器内部
  //   const cardCanvas = getCanvasGroup(cardDesignKey)
  //   cardCanvas.simulateAdd(removedInput)
  //   await wait(1000)

  //   // 验证根画布只剩1个组件（Card）
  //   expect(items.value?.length).toBe(1)
  //   expect(items.value?.[0].component).toBe('Card')

  //   // 验证Card内部有1个Input组件
  //   expect(items.value?.[0].children?.length).toBe(1)
  //   expect(items.value?.[0].children?.[0].component).toBe('Input')
  //   expect(items.value?.[0].children?.[0].designKey).toBe(inputItem.designKey)
  // })

  // it('从子容器拖拽组件到根画布', async () => {
  //   const { getCanvasGroup, items } = FormDesignTest()

  //   // 先创建一个Card容器
  //   const cardItem: FormItemType = repirNode({
  //     component: 'Card',
  //     designKey: generateDesignKey(),
  //     name: generateName(),
  //     children: []
  //   })

  //   const rootCanvas = getCanvasGroup()
  //   rootCanvas.simulateAdd(cardItem)
  //   await wait(1000)

  //   // 验证根画布有1个Card
  //   expect(items.value?.length).toBe(1)
  //   expect(items.value?.[0].component).toBe('Card')

  //   const cardDesignKey = items.value?.[0].designKey!

  //   // 在Card内部添加一个Input组件
  //   const inputItem: FormItemType = repirNode({
  //     component: 'Input',
  //     designKey: generateDesignKey(),
  //     name: generateName()
  //   })

  //   const cardCanvas = getCanvasGroup(cardDesignKey)
  //   cardCanvas.simulateAdd(inputItem)
  //   await wait(1000)

  //   // 验证Card内部有1个组件
  //   expect(items.value?.[0].children?.length).toBe(1)
  //   expect(items.value?.[0].children?.[0].component).toBe('Input')

  //   // 从Card内部移除Input组件
  //   const removedInput = cardCanvas.simulateRemove(inputItem.designKey!)

  //   // 添加到根画布
  //   rootCanvas.simulateAdd(removedInput)
  //   await wait(1000)

  //   // 验证根画布有2个组件（Card + Input）
  //   expect(items.value?.length).toBe(2)
  //   expect(items.value?.[0].component).toBe('Card')
  //   expect(items.value?.[1].component).toBe('Input')
  //   expect(items.value?.[1].designKey).toBe(inputItem.designKey)

  //   // 验证Card内部为空
  //   expect(items.value?.[0].children?.length).toBe(0)
  // })
})
