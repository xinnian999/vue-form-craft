export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '分类',
      component: 'Radio',
      props: {
        mode: 'remote',
        options: [
          {
            label: '选项1',
            value: 'value1'
          },
          {
            label: '选项2',
            value: 'value2'
          },
          {
            label: '选项3',
            value: 'value3'
          }
        ],
        labelKey: 'name',
        valueKey: 'name',
        optionType: 'circle',
        api: {
          url: '/current/query/category',
          params: {},
          data: {},
          dataPath: 'data',
          method: 'GET'
        }
      },
      designKey: 'design-oGXW',
      name: 'category',
      required: true
    },
    {
      label: '文章',
      component: 'Select',
      props: {
        mode: 'remote',
        options: [
          {
            label: '选项1',
            value: 'value1'
          },
          {
            label: '选项2',
            value: 'value2'
          },
          {
            label: '选项3',
            value: 'value3'
          }
        ],
        placeholder: '请选择文章',
        labelKey: 'title',
        valueKey: 'id',
        api: {
          url: '/current/query/article',
          params: {
            filters: {
              category: '{{$values.category}}'
            }
          },
          data: {},
          dataPath: 'data',
          method: 'GET'
        }
      },
      designKey: 'design-ojMx',
      name: 'article',
      required: true
    }
  ]
}
