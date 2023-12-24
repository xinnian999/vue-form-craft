export default {
  labelWidth: 150,
  labelAlign: 'right',
  items: [
    {
      label: '字段label',
      component: 'input',
      name: 'label',
      onlyId: 'form-AC1d'
    },
    {
      label: '字段标识',
      component: 'input',
      name: 'name',
      onlyId: 'form-mb7V'
    },
    {
      label: '初始值',
      component: 'input',
      name: 'initialValue',
      onlyId: 'form-4MUd'
    },
    {
      label: '是否必填',
      component: 'switch',
      name: 'required',
      onlyId: 'form-iXcI'
    },
    {
      component: 'itemGroup',
      name: 'props',
      children: [
        {
          label: '是否禁用',
          component: 'switch',
          name: 'disabled',
          onlyId: 'form-kJ7K'
        },
        {
          label: '占位提示',
          component: 'input',
          name: 'placeholder',
          initialValue: '请选择...',
          onlyId: 'form-ekRL'
        },
        {
          label: '选择模式',
          component: 'switch',
          name: 'multiple',
          props: {
            'active-text': '多选',
            'inactive-text': '单选'
          },
          onlyId: 'form-eTxc'
        },
        {
          label: '自动选中第一项',
          component: 'switch',
          name: 'autoSelectedFirst',
          onlyId: 'form-LPpx'
        },
        {
          label: '标签key',
          component: 'input',
          name: 'labelKey',
          initialValue: 'label',
          onlyId: 'form-X6hs'
        },
        {
          label: '值Key',
          component: 'input',
          name: 'valueKey',
          initialValue: 'value',
          onlyId: 'form-STkl'
        },
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
          label: '',
          component: 'itemGroup',
          name: 'api',
          hidden: '{{$form.props.mode==="static"}}',
          children: [
            {
              label: 'url',
              component: 'input',
              name: 'url',
              initialValue: 'https://hyl999.co/api/current/query/article',
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
              initialValue: 'data.data',
              onlyId: 'form-UrE8'
            }
          ],
          onlyId: 'form-O8yj'
        }
      ],
      onlyId: 'form-qYXT'
    }
  ],
  size: 'default'
}
