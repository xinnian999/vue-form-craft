export default {
  component: 'itemGroup',
  name: 'api',
  hidden: '{{$values.props.mode==="static"}}',
  children: [
    {
      label: 'url',
      component: 'Input',
      name: 'url',
      initialValue: '/current/query/article',
      onlyId: 'form-UrE8'
    },
    {
      label: '请求方式',
      component: 'Radio',
      name: 'method',
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
      name: 'params',
      hidden: '{{$values.props.api.method==="POST"||$values.props.api.method==="PUT"}}',
      initialValue: {}
    },
    {
      label: '请求参数',
      component: 'JsonEdit',
      name: 'data',
      hidden: '{{$values.props.api.method==="GET"||$values.props.api.method==="DELETE"}}',
      initialValue: {}
    },
    {
      label: '数据路径',
      component: 'Input',
      name: 'dataPath',
      initialValue: 'data',
      onlyId: 'form-UrE8'
    }
  ],
  onlyId: 'form-O8yj'
}
