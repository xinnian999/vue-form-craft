import getRandomId from './getRandomId'

const copyChildren = (children) => {
  return children.map((child) => {
    const data = { ...child, onlyId: `form-${getRandomId(4)}`, name: getRandomId(8) }

    if (child.children) {
      data.children = copyChildren(child.children)
    }

    return data
  })
}

const copyItems = (list, id) => {
  return list.reduce((all, current) => {
    if (current.children) {
      all.push({ ...current, children: copyItems(current.children, id) })
    } else {
      all.push(current)
    }

    if (current.onlyId === id) {
      const newItem = { ...current, onlyId: `form-${getRandomId(4)}`, name: getRandomId(8) }
      if (current.children) {
        newItem.children = copyChildren(current.children)
      }
      all.push(newItem)
    }

    return all
  }, [])
}

export default copyItems
