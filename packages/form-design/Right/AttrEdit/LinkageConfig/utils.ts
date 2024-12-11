import { h } from 'vue'

export type Condition = {
  compare: string
  variable: any
  value: any
  with: string
}

export type ConfigLinkage = {
  name: string
  conditions: Condition[],
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
                fontSize: '12px'
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
        .replaceAll('greater', ' > ')
        .replaceAll('equal', ' === ')
        .replaceAll('less', ' < ')

      all += computeParse

      all += value
    }

    return all
  }, '')

  return value
}
