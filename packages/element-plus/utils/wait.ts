import { flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'

const wait = async (ms: number = 50) => {
  await nextTick()
  await flushPromises()
  await new Promise((resolve) => setTimeout(resolve, ms))
}

export default wait
