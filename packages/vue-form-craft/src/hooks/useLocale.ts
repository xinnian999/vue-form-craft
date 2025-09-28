import type { Locale } from '@/types'
import locales from '@/locales'
import { computed } from 'vue'
import useLang from './useLang'

export default function useLocale() {
  const lang = useLang()

  const locale = computed<Locale>(() => locales[lang.value])

  return locale
}
