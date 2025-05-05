import type { Locale } from '@vue-form-craft/element-plus/types'
import { locales } from '@vue-form-craft/element-plus/config'
import { computed } from 'vue'
import useLang from './useLang'

export default function useLocale() {
  const lang = useLang()

  const locale = computed<Locale>(() => locales[lang.value])

  return locale
}
