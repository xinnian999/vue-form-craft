import getRandomId from './getRandomId'

const changeItems = (items) => {
  return items.map((item) => {
    const config = item.initialValues || item

    const data = {
      ...config,
      onlyId: config.onlyId || `id-${getRandomId(4)}`,
      name: config.name || `form-${getRandomId(4)}`
    }

    if (config.children) {
      data.children = changeItems(config.children)

      // if (data.component === 'FormList') {
      //   data.children = data.children.map((child) => {
      //     if (!child.name.includes('[]')) {
      //       return {
      //         ...child,
      //         name: `${data.name}.[].${child.name}`
      //       }
      //     }
      //     return child
      //   })
      // }
    }

    return data
  })
}

export default changeItems
