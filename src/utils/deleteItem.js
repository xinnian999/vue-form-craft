const deleteItem = (items, elementId) => {
  const data = items.filter((item) => {
    return item.onlyId !== elementId
  })

  return data.map((item) => {
    if (item.children) {
      return {
        ...item,
        children: deleteItem(item.children, elementId)
      }
    }
    return item
  })
}

export default deleteItem
