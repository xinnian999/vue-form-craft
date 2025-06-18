import type { Lang } from '@form-magic/core'
import { $options } from '@form-magic/core'
import { inject, ref } from 'vue'

export default function useLang() {
  // 用户可能从入口注入 静态的
  const options = inject($options)!

  // 用户可能自行通过provide注入 动态的
  const lang = inject<Lang>('vfc-lang', ref('zh'))

  // 静态的 优先级更高
  return options?.lang ? ref(options.lang) : lang
}
