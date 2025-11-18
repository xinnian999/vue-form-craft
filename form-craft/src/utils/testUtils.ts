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

  return {
    wrapper,
    leftWrapper,
    rightWrapper,
    backBtn,
    forwardBtn,
    schema,
    clearBtn,
    itemsLength,
    dblclickAdd,
    clearDesign,
    clickItem,
    items
  }
}
