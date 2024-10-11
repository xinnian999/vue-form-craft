import type { Lang, Locale } from '@vue-form-craft/config/commonType'
import locales from '@vue-form-craft/config/locales'
import { computed, inject, toValue } from 'vue'

export default function useLocale() {
  const lang = inject<Lang>('vfc-lang')!

  const locale = computed<Locale>(() => locales[lang.value])

  return toValue(locale)
}
