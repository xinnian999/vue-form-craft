import { ref } from 'vue'
import type { AiGenerateFunction } from '@/types'
import useGlobals from './useGlobals'
import useUI from './useUI'

export default function useAi() {
  const { ai } = useGlobals()
  const { Message } = useUI()

  const controller = ref<AbortController | null>(null)

  const isAvailable = !!ai

  const request = async (prompt: string) => {
    const aiFunction = ai as AiGenerateFunction | undefined

    if (!aiFunction) {
      Message.error('AI功能未配置,请在app.use时注入ai函数')
      return
    }

    // 取消上一次请求
    if (controller.value) {
      controller.value.abort()
    }

    controller.value = new AbortController()

    try {
      const result = await aiFunction({
        prompt,
        signal: controller.value.signal
      })

      return result
    } catch (error: any) {
      // 取消类错误不提示
      if (error?.name === 'AbortError' || error?.message === '已取消生成') {
        return
      }

      Message.error(error?.message || 'AI生成失败')
      return
    } finally {
      controller.value = null
    }
  }

  const cancel = () => {
    if (controller.value) {
      controller.value.abort()
      controller.value = null
    }
  }

  return {
    isAvailable,
    request,
    cancel
  }
}
