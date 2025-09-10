import type { Locale } from '@vue-form-craft/core'
import { locales } from '@vue-form-craft/core'
import { computed } from 'vue'
import useLang from './useLang'

export default function useLocale() {
  const lang = useLang()

  const locale = computed<Locale>(() => locales[lang.value])

  return locale
}
