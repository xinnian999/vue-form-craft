import type { FormItemType } from '@vue-form-craft/types'
import { isArray, isPlainObject, isString } from 'lodash'
import { h } from 'vue'

export type Condition = {
  compare: string
  variable: any
  value: any
  with: string
}

export type ConfigLinkage = {
  name: string
  conditions: Condition[]
  trueReturn: any
  falseReturn: any
}

export const renderTreeNode = (_: any, { node, data, store }: any) => {
  // console.log(node, data, store)

  return h(
    'div',
    {
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    },
    {
      default: () => {
        return [
          h('span', null, data.label),
          h(
            'span',
            {
              style: {
                fontSize: '12px',
                marginLeft: '100px'
              }
            },
            data.value
          )
        ]
      }
    }
  )
}

export const generateCondition = (conditions: Condition[]) => {
  const value = conditions.reduce((all, cur, index) => {
    const { compare, variable, value, with: _with } = cur

    // 条件拼接
    if (index !== 0) {
      all += ` ${_with} `
    }

    if (['true', 'false'].includes(compare)) {
      const parseBoolean = compare.replaceAll('true', '!!').replaceAll('false', '!')

      all += `${parseBoolean}${variable}`
    } else {
      all += variable

      const computeParse = compare
        .replaceAll('greater', '>')
        .replaceAll('equal', '===')
        .replaceAll('less', '<')

      all += computeParse

      all += value
    }

    return all
  }, '')

  return value
}

const deepFetchLinkages = (data: FormItemType) => {
  return Object.entries(data).reduce<Record<string, any>>((acc, [key, value]) => {
    const isTemplate = isString(value) && /^{{\s*(.*?)\s*}}$/.test(value)
    if (isTemplate) {
      acc[key] = value
    }

    if (isPlainObject(value)) {
      acc = { ...acc, ...deepFetchLinkages(value) }
    }

    if (isArray(value)) {
      value.forEach((item) => {
        acc = { ...acc, ...deepFetchLinkages(item) }
      })
    }

    return acc
  }, {})
}

export const parseQuick = (data: FormItemType) => {
  const parse = deepFetchLinkages(data)
  // console.log(parse)

  return Object.entries(parse).reduce<ConfigLinkage[]>((acc, [key, value]) => {
    const [, condition] = value.match(/{{(.+?)}}/)

    const [conStr, resStr] = condition.trim().split(' ? ')

    const conArr: any[] = conStr.split(' ')

    const conditions = conArr.reduce((all, con, index) => {
      if (['||', '&&'].includes(con)) {
        return all
      }

      const source = {
        compare: '',
        variable: con,
        value: con,
        with: ''
      }

      if (con.startsWith('!!')) {
        source.compare = 'true'
        source.variable = con.replace('!!', '')
      }

      if (con.startsWith('!')) {
        source.compare = 'false'
        source.variable = con.replace('!', '')
      }

      if (con.split('>').length > 1) {
        source.compare = 'greater'
        source.variable = con.split('>')[0]
        source.value = con.split('>')[1]
      }

      if (index !== 0 && index % 2 === 0) {
        source.with = all[index - 1]
      }

      all.push(source)

      return all
    }, [])

    console.log(conditions)

    const [trueReturn, falseReturn] = resStr?.trim().split(':') || []

    acc.push({
      name: key,
      conditions: conditions,
      trueReturn,
      falseReturn
    })

    return acc
  }, [])
}
