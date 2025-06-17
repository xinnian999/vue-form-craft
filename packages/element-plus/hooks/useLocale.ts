import type { Locale } from '@form-magic/core'
import { locales } from '@/config'
import { computed } from 'vue'
import useLang from './useLang'

export default function useLocale() {
  const lang = useLang()

  const locale = computed<Locale>(() => locales[lang.value])

  return locale
}
