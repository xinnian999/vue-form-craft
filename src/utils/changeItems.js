import getRandomId from './getRandomId'

const changeItems = (items) => {
  return items.map((item) => {
    const config = item.initialValues || item

    const data = {
      ...config,
      onlyId: config.onlyId || `id-${getRandomId(4)}`,
      name: config.name || `form-${getRandomId(4)}`
    }

    if (!data.hidden) {
      delete data.hidden
    }

    if (config.children) {
      data.children = changeItems(config.children)
    }

    return data
  })
}

export default changeItems
