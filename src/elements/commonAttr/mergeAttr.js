const mergeAttr = (attrConfig) => {
  const { basic = [], high = [], linkage = [], option } = attrConfig

  const attrs = [
    {
      component: 'Collapse',
      name: 'mergeAttr',
      children: [
        {
          title: '常用属性',
          name: 'basic',
          checked: true,
          children: basic
        },
        {
          title: '高级属性',
          name: 'high',
          children: high
        },
        {
          title: '联动规则',
          name: 'linkage',
          children: linkage
        }
      ]
    }
  ]

  if (option) {
    attrs[0].children.splice(1, 0, {
      title: '选项设置',
      name: 'option',
      checked: true,
      children: option
    })
  }

  return attrs
}

export default mergeAttr
