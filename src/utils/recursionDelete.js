const recursionDelete = (items, callback) => {
  const data = items.filter(callback)

  return data.map((item) => {
    if (item.children) {
      return {
        ...item,
        children: recursionDelete(item.children, callback)
      }
    }
    return item
  })
}

export default recursionDelete
