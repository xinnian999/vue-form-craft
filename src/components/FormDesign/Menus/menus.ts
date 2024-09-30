import type { Locale } from '@vue-form-craft/config/commonType'
import type { FormElement } from '@vue-form-craft/release'

type Params = {
  elements: Record<string, FormElement>
  locale: Locale
  omits: string[]
}

export default ({ elements, locale, omits }: Params) => {
  const getChildren = (type: string) => {
    return Object.values(elements)
      .filter((item) => item?.type === type)
      .filter((item) => !omits.includes(item.initialValues.component))
      .sort((a, b) => {
        return a.order - b.order
      })
  }

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
