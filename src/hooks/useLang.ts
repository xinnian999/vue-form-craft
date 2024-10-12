import type { Lang } from '@vue-form-craft/config/commonType'
import { inject, ref } from 'vue'

export default function useLang() {
  const lang = inject<Lang>('vfc-lang', ref('zh'))

  return lang
}
