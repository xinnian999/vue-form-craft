import { useGlobals } from '@/hooks'
import { inject, ref } from 'vue'
import type { Lang } from '@vue-form-craft/core'

export default function useLang() {
  // 用户可能从入口注入 静态的
  const globals = useGlobals()

  // 用户可能自行通过provide注入 动态的
  const lang = inject<Lang>('vfc-lang', ref('zh'))

  // 静态的 优先级更高
  return globals?.lang ? ref(globals.lang) : lang
}
