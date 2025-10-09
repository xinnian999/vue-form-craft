import { mount } from '@vue/test-utils'
import { computed } from 'vue'
import { FormDesign } from '@/components'
import { ns } from '@/utils'

export function FormDesignTest() {
  const wrapper = mount(FormDesign)
  const leftWrapper = wrapper.find(`.${ns('form-design-left')}`)
  const rightWrapper = wrapper.find(`.${ns('form-design-right')}`)
  const backBtn = wrapper.find(`.el-button[name="history-back"]`)
  const forwardBtn = wrapper.find(`.el-button[name="history-forward"]`)
  const clearBtn = wrapper.find(`.el-button[name="clear-design"]`)
  const schema = computed(() => wrapper.vm.schema)

  return {
    wrapper,
    leftWrapper,
    rightWrapper,
    backBtn,
    forwardBtn,
    schema,
    clearBtn
  }
}
