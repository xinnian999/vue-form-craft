import basic from './commonAttr/basic'
import linkageAttr from './commonAttr/linkageAttr'

export default {
  name: '单行文本',
  initialValues: {
    label: '单行文本',
    component: 'input',
    props: {}
  },
  attr: [
    ...basic,
    { label: '初始值', component: 'input', name: 'initialValue' },
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [
        { label: '是否禁用', component: 'switch', name: 'disabled' },
        { label: '显示清除按钮', component: 'switch', name: 'clearable' },
        {
          label: '占位提示',
          component: 'input',
          name: 'placeholder',
          initialValue: '请输入...'
        },
        {
          label: '最长字数',
          component: 'inputNumber',
          name: 'maxlength'
        }
      ]
    },
    ...linkageAttr,
    {
      label: '校验规则',
      component: 'formList',
      children: [
        {
          label: '类型',
          component: 'select',
          props: {
            mode: 'static',
            options: [
              {
                label: '邮箱',
                value: 'email'
              },
              {
                label: '字母+数字',
                value: '^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]+$'
              },
              {
                label: '手机号码',
                value: '^1[3456789]\\d{9}$'
              }
            ],
            columns: [
              {
                title: 'label',
                dataIndex: 'label'
              },
              {
                title: 'value',
                dataIndex: 'value'
              }
            ],
            placeholder: '请选择...',
            labelKey: 'label',
            valueKey: 'value'
          },
          onlyId: 'form-3L0P',
          name: 'type'
        },
        {
          label: '提示语',
          component: 'input',
          props: {
            placeholder: '请输入...'
          },
          onlyId: 'form-Wdb2',
          name: 'message'
        },
        {
          label: '校验时机',
          component: 'checkbox',
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
          onlyId: 'form-3L0P6666',
          name: 'trigger'
        }
      ],
      onlyId: 'form-89tI',
      name: 'rules',
      props: {
        mode: 'card'
      }
    }
  ]
}
