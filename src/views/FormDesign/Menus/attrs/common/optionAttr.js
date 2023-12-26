export default [
  {
    label: '数据模式',
    component: 'radio',
    name: 'mode',
    props: {
      mode: 'static',
      options: [
        {
          label: '静态',
          value: 'static'
        },
        {
          label: '远程',
          value: 'remote'
        }
      ]
    },
    initialValue: 'static',
    onlyId: 'form-PLpj'
  },
  {
    label: '静态选项',
    name: 'options',
    component: 'formList',
    hidden: '{{$form.props.mode!=="static"}}',
    children: [
      {
        label: '选项名',
        name: 'label',
        component: 'input',
        props: {
          placeholder: '请输入...'
        },
        onlyId: 'form-LnGh'
      },
      {
        label: '选项值',
        name: 'value',
        component: 'input',
        props: {},
        onlyId: 'form-HYtW'
      }
    ],
    onlyId: 'form-Iwpd',
    props: {
      mode: 'table',
      newItemDefaults: (index) => ({ label: `选项${index + 1}`, value: `value${index + 1}` })
    }
  },
  {
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
          ],
          optionType: 'button'
        },
        onlyId: 'form-nOpD'
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
]
