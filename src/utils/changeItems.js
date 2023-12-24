const changeItems = (items) => {
  return items.map((item) => {
    const data = {
      ...item,
      onlyId: item.onlyId || `form-${getRandomId(4)}`,
      name: item.name || getRandomId(6)
    }
    if (item.children) {
      data.children = changeItems(item.children)
    }
    return data
  })
}

export default changeItems
