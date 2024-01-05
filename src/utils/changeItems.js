import getRandomId from './getRandomId'

const changeItems = (items) => {
  return items.map((item) => {
    const config = item.initialValues || item

    const data = {
      ...config,
      onlyId: config.onlyId || `form-${getRandomId(4)}`,
      name: config.name || getRandomId(6)
    }
    if (config.children) {
      data.children = changeItems(config.children)
    }
    return data
  })
}

export default changeItems
