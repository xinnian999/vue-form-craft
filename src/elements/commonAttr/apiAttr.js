export default [
  {
    label: 'url',
    component: 'Input',
    name: 'props.api.url',
    initialValue: '/current/query/article',
    onlyId: 'form-UrE8'
  },
  {
    label: '请求方式',
    component: 'Radio',
    name: 'props.api.method',
    props: {
      mode: 'static',
      autoSelectedFirst: true,
      options: [
        {
          label: 'GET',
          value: 'GET'
        },
        {
          label: 'POST',
          value: 'POST'
        },
        {
          label: 'PUT',
          value: 'PUT'
        },
        {
          label: 'DELETE',
          value: 'DELETE'
        }
      ]
    },
    onlyId: 'form-nOpD'
  },
  {
    label: '请求参数',
    component: 'JsonEdit',
    name: 'props.api.params',
    hidden: '{{ ["POST","PUT"].includes($parentVal.method) }}',
    initialValue: {},
    props: {
      mode: 'dialog'
    }
  },
  {
    label: '请求参数',
    component: 'JsonEdit',
    name: 'props.api.data',
    hidden: '{{ ["GET","DELETE"].includes($parentVal.method) }}',
    initialValue: {},
    props: {
      mode: 'dialog'
    }
  },
  {
    label: '数据路径',
    component: 'Input',
    name: 'props.api.dataPath',
    initialValue: 'data',
    onlyId: 'form-UrE8'
  }
]
