import type { Lang } from '@form-magic/core'
import { $globals } from '@form-magic/core'
import { inject, ref } from 'vue'

export default function useLang() {
  // 用户可能从入口注入 静态的
  const globals = inject($globals)!

  // 用户可能自行通过provide注入 动态的
  const lang = inject<Lang>('mf-lang', ref('zh'))

  // 静态的 优先级更高
  return globals?.lang ? ref(globals.lang) : lang
}
