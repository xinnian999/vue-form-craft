const mergeAttr = (attrs) => {
  const { basic = [], high = [], linkage = [] } = attrs
  return [
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
}

export default mergeAttr
