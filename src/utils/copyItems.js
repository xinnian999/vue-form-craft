import getRandomId from './getRandomId'

const copyChildren = (children) => {
  return children.map((child) => {
    if (child.children) {
      return { ...child, onlyId: getRandomId(8), children: copyChildren(child.children) }
    }

    return { ...child, onlyId: getRandomId(8) }
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
      if (current.children) {
        all.push({
          ...current,
          children: copyChildren(current.children),
          onlyId: getRandomId(8)
        })
      } else {
        all.push({ ...current, onlyId: getRandomId(8) })
      }
    }
    return all
  }, [])
}

export default copyItems
