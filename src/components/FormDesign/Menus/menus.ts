import locales from '@vue-form-craft/config/locales'
import type { FormElement } from '@vue-form-craft/release'

type Params = {
  elements: Record<string, FormElement>
  lang: 'zh' | 'en'
  omits: string[]
}

export default ({ elements, lang, omits }: Params) => {
  const getChildren = (type: string) => {
    return Object.values(elements)
      .filter((item) => item.type === type && !omits.includes(item.initialValues.component))
      .sort((a, b) => {
        return a.order - b.order
      })
      .map((item) => {
        return {
          ...item,
          name: lang === 'zh' ? item.name : item.initialValues.component
        }
      })
  }

  const locale = locales[lang]

  const menus = [
    {
      title: locale.menus.basicTitle,
      children: getChildren('basic')
    },
    {
      title: locale.menus.highBasicTitle,
      children: getChildren('highBasic')
    },
    {
      title: locale.menus.layoutTitle,
      children: getChildren('layout')
    },
    {
      title: locale.menus.assistTitle,
      children: getChildren('assist')
    }
  ]

  return menus
}
