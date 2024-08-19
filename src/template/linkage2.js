export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '分类',
      component: 'Radio',
      props: {
        mode: 'static',
        options: [
          {
            name: '前端',
            id: 1
          },
          {
            name: '后端',
            id: 2
          },
          {
            name: '运维',
            id: 3
          },
          {
            name: '其他',
            id: 4
          }
        ],
        labelKey: 'name',
        valueKey: 'name',
        optionType: 'button',
        space: 0
      },
      name: 'category',
      required: true,
      designKey: 'design-9djJ'
    },
    {
      label: '文章',
      component: 'Radio',
      props: {
        mode: 'remote',
        placeholder: '请选择文章',
        labelKey: 'title',
        valueKey: 'id',
        api: {
          url: '/current/query/article',
          method: 'GET',
          params: {
            filters: {
              category: '{{$values.category}}'
            }
          },
          dataPath: 'data'
        },
        optionType: 'circle',
        direction: 'vertical',
        space: 0
      },
      name: 'article',
      required: true,
      hidden: '{{!$values.category}}',
      designKey: 'design-gr3L'
    }
  ]
}
