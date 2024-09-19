import type { Locale } from '@/config/commonType'
import type { FormElement } from '@/release'
import type { Ref } from 'vue'

export default (elements: Record<string, FormElement>, locale:Ref<Locale> ) => {
  const getChildren = (type: string) => {
    return Object.values(elements)
      .filter((item) => item?.type === type)
      .sort((a, b) => {
        return a.order - b.order
      })
  }

  const menus = [
    {
      title: locale.value.menus.basicTitle,
      children: getChildren('basic')
    },
    {
      title: locale.value.menus.layoutTitle,
      children: getChildren('layout')
    },
    {
      title: locale.value.menus.assistTitle,
      children: getChildren('assist')
    }
  ]

  return menus
}
