import type { Locale } from '@/types/index'
import { locales } from '@/config'
import { computed } from 'vue'
import useLang from './useLang'

export default function useLocale() {
  const lang = useLang()

  const locale = computed<Locale>(() => locales[lang.value])

  return locale
}
