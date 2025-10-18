export default [
  {
    label: '文本校验规则',
    component: 'FormList',
    name: 'rules',
    children: [
      {
        label: '表达式',
        component: 'Autocomplete',
        props: {
          options: [
            { label: '邮箱', value: '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/' },
            { label: '手机号', value: '/^1[3-9]\\d{9}$/' },
            { label: 'QQ号', value: '/^[1-9][0-9]{4,10}$/' },
            {
              label: '身份证号',
              value:
                '/^[1-9]\\d{5}(?:18|19|20)\\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\\d|30|31)\\d{3}[\\dxX]$/'
            },
            { label: '中文', value: '/^[\u4e00-\u9fa5]+$/' },
            {
              label: '网址',
              value: '/^http(s)?:\\/\\/(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(?:\\/[^\\s]*)?/'
            },
            {
              label: 'IP地址',
              value:
                '/^(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$/'
            },
            {
              label: '邮政编码',
              value: '/^[1-9]\\d{5}$/'
            },
            {
              label: '字母 + 数字',
              value: '/^[a-zA-Z0-9]+$/'
            }
          ]
        },
        help: '<pre>可设置为【正则表达式】或【】。\n【正则表达式】应该将\\转义成\\\\。\n【】最终应返回一个布尔值。</pre>',
        name: 'expr'
      },
      {
        label: '校验失败提示语',
        component: 'Input',
        props: {
          placeholder: '请输入...'
        },
        name: 'message'
      },
      {
        label: '校验时机',
        component: 'Checkbox',
        props: {
          mode: 'static',
          options: [
            {
              label: '失去焦点时',
              value: 'blur'
            },
            {
              label: '输入时',
              value: 'change'
            }
          ],
          placeholder: '请选择...',
          labelKey: 'label',
          valueKey: 'value'
        },
        name: 'trigger'
      }
    ],
    props: {
      mode: 'card',
      title: '校验规则'
    }
  }
]
