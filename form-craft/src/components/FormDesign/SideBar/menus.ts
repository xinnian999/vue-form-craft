import locales from '@/locales'
import type { FormElement } from '@/types'

type Params = {
  elements: Record<string, FormElement>
  lang: 'zh' | 'en'
  omits: string[]
}

export default ({ elements, lang, omits }: Params) => {
  const getChildren = (type: string) => {
    return Object.values(elements)
      .filter((item) => item.type === type && item.order < 10000 && !omits.includes(item.component))
      .sort((a, b) => {
        return a.order - b.order
      })
      .map((item) => {
        return {
          ...item,
          title: lang === 'zh' ? item.title : item.component
        }
      })
  }

  const locale = locales[lang]

  const menus = [
    {
      title: locale.menus.layoutTitle,
      children: getChildren('layout')
    },
    {
      title: locale.menus.basicTitle,
      children: getChildren('basic')
    },
    {
      title: locale.menus.assistTitle,
      children: getChildren('assist')
    }
  ]

  return menus
}
