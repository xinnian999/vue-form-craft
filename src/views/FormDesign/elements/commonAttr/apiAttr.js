export default {
  component: 'itemGroup',
  name: 'api',
  hidden: '{{$form.props.mode==="static"}}',
  children: [
    {
      label: 'url',
      component: 'input',
      name: 'url',
      initialValue: '/current/query/article',
      onlyId: 'form-UrE8'
    },
    {
      label: '请求方式',
      component: 'radio',
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
      component: 'jsonEdit',
      name: 'params',
      hidden: '{{$form.props.api.method==="POST"||$form.props.api.method==="PUT"}}',
      initialValue: {}
    },
    {
      label: '请求参数',
      component: 'jsonEdit',
      name: 'data',
      hidden: '{{$form.props.api.method==="GET"||$form.props.api.method==="DELETE"}}',
      initialValue: {}
    },
    {
      label: '数据路径',
      component: 'input',
      name: 'dataPath',
      initialValue: 'data',
      onlyId: 'form-UrE8'
    }
  ],
  onlyId: 'form-O8yj'
}
