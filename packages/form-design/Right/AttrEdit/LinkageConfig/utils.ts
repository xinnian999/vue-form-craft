import { h } from 'vue'

export const renderTreeNode = (_: any, { node, data, store }: any) => {
  console.log(node, data, store)

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
