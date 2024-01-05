import linkageAttr from './commonAttr/linkageAttr'
import apiAttr from './commonAttr/apiAttr'
import basic from './commonAttr/basic'

export default {
  name: '级联选择器',
  initialValues: {
    label: '级联选择器',
    component: 'cascader',
    props: {
      mode: 'static',
      options: [
        {
          label: 666,
          value: 666,
          children: [
            {
              label: '666a',
              value: '666a'
            }
          ]
        },
        {
          label: 777,
          value: 777
        }
      ]
    }
  },
  attr: [
    ...basic,
    {
      label: '初始值',
      component: 'input',
      name: 'initialValue',
      onlyId: 'form-4MUd'
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
          label: '只取最后一级',
          component: 'switch',
          name: 'takeLastLevel',
          onlyId: 'form-kJ7K222',
          hidden: '{{$form.props.multiple}}'
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
          component: 'jsonEdit',
          hidden: '{{$form.props.mode!=="static"}}',
          onlyId: 'form-Iwpd'
        },
        apiAttr
      ],
      onlyId: 'form-qYXT'
    },
    ...linkageAttr
  ]
}
