import { mount } from '@vue/test-utils'
import { computed } from 'vue'
import { FormDesign } from '@/components'
import { ns, wait } from '@/utils'

export function FormDesignTest() {
  const wrapper = mount(FormDesign)
  const leftWrapper = wrapper.find(`.${ns('form-design-left')}`)
  const rightWrapper = wrapper.find(`.${ns('form-design-right')}`)
  const centerWrapper = wrapper.find(`.${ns('form-design-center')}`)
  const backBtn = wrapper.find(`.el-button[name="history-back"]`)
  const forwardBtn = wrapper.find(`.el-button[name="history-forward"]`)
  const clearBtn = wrapper.find(`.el-button[name="clear-design"]`)
  const previewBtn = wrapper.find(`.el-button[name="preview-design"]`)

  const schema = computed(() => wrapper.vm.getSchema())
  const items = computed(() => wrapper.vm.getSchema().items)
  const itemsLength = computed(() => wrapper.vm.getSchema().items?.length || 0)

  // 双击添加元素
  const dblclickAdd = async (menuName: string) => {
    await leftWrapper.find(`.menu-${menuName}`).trigger('dblclick')
    await wait(1000)
  }

  // 点击清除按钮 + 确认
  const clearDesign = async () => {
    await clearBtn.trigger('click')
    const confirmBtn = document.querySelector(
      '.el-message-box__btns .el-button--primary'
    ) as HTMLButtonElement
    confirmBtn.click()
    await wait(1000)
  }

  // 选中元素并返回
  const clickItem = async () => {
    await centerWrapper.find(`.${ns('canvas-item')}`).trigger('click')

    await wait(500)

    const el = centerWrapper.find(`.${ns('canvas-item')}.active`)
    const copyBtn = el.find(`.actions-item.copy-btn`)
    const deleteBtn = el.find(`.actions-item.delete-btn`)

    return {
      el,
      copyBtn,
      deleteBtn
    }
  }

  // 获取画布容器实例（用于模拟拖拽）
  // designKey: 可选，用于获取嵌套容器。不传则获取根容器
  const getCanvasGroup = (designKey?: string) => {
    if (!designKey) {
      // 获取根容器（Main组件下的第一个CanvasGroup）
      const canvasGroup = centerWrapper.findComponent({ name: 'CanvasGroup' })
      if (!canvasGroup.exists()) {
        throw new Error('未找到CanvasGroup组件')
      }
      return canvasGroup.vm as any
    }

    // 通过designKey获取嵌套容器
    // 先找到对应的CanvasItem
    const canvasItem = centerWrapper.find(`.${designKey}`)
    if (!canvasItem.exists()) {
      throw new Error(`未找到designKey为 ${designKey} 的组件`)
    }

    // 在该CanvasItem内部查找CanvasGroup
    const canvasGroup = canvasItem.findComponent({ name: 'CanvasGroup' })
    if (!canvasGroup.exists()) {
      throw new Error(`designKey为 ${designKey} 的组件内部没有CanvasGroup容器`)
    }

    return canvasGroup.vm as any
  }

  return {
    wrapper,
    leftWrapper,
    rightWrapper,
    centerWrapper,
    backBtn,
    forwardBtn,
    previewBtn,

    schema,
    clearBtn,
    itemsLength,
    dblclickAdd,
    clearDesign,
    clickItem,
    items,
    getCanvasGroup
  }
}
