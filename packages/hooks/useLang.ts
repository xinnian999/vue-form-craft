import type { Lang } from '@vue-form-craft/types'
import { $options } from '@vue-form-craft/config/symbol'
import { inject, ref } from 'vue'

export default function useLang() {
  // 用户可能从入口注入 静态的
  const options = inject($options)!

  // 用户可能自行通过provide注入 动态的
  const lang = inject<Lang>('vfc-lang', ref('zh'))

  // 静态的 优先级更高
  return options.lang ? ref(options.lang) : lang
}
