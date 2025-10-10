import { mount } from '@vue/test-utils'
import { computed } from 'vue'
import { FormDesign } from '@/components'
import { ns, wait } from '@/utils'

export function FormDesignTest() {
  const wrapper = mount(FormDesign)
  const leftWrapper = wrapper.find(`.${ns('form-design-left')}`)
  const rightWrapper = wrapper.find(`.${ns('form-design-right')}`)
  const backBtn = wrapper.find(`.el-button[name="history-back"]`)
  const forwardBtn = wrapper.find(`.el-button[name="history-forward"]`)
  const clearBtn = wrapper.find(`.el-button[name="clear-design"]`)
  const schema = computed(() => wrapper.vm.schema)
  const itemsLength = computed(() => wrapper.vm.schema.items.length)
  // 双击添加元素
  const dblclickAdd = async (menuName: string) => {
    await leftWrapper.find(`.menu-${menuName}`).trigger('dblclick')
  }
  // 点击清除按钮 + 确认
  const clearDesign = async () => {
    await clearBtn.trigger('click')
    const confirmBtn = document.querySelector(
      '.el-message-box__btns .el-button--primary'
    ) as HTMLButtonElement
    confirmBtn.click()
    await wait(500)
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
    clearDesign
  }
}
