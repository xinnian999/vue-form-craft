import getRandomId from './getRandomId'

const changeItems = (items, path) => {
  return items.map((item) => {
    const config = item.initialValues || item

    const data = {
      ...config,
      onlyId: config.onlyId || `form-${getRandomId(4)}`,
      name: config.name || getRandomId(6)
    }

    data.dataPath = path ? `${path}.${data.name}` : data.name
    if (!data.hidden) {
      delete data.hidden
    }

    if (config.children) {
      if (item.component === 'ItemGroup') {
        data.children = changeItems(config.children, data.dataPath)
      } else if (item.component === 'FormList') {
        data.children = changeItems(config.children, `${data.dataPath}.[]`)
      } else {
        data.children = changeItems(config.children, path)
      }
    }

    return data
  })
}

export default changeItems
