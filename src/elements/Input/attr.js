import { linkageAttr, basicAttr, highAttr, mergeAttr } from '../commonAttr'

export default mergeAttr({
  basic: [
    ...basicAttr(),
    {
      label: '校验规则',
      component: 'FormList',
      name: 'rules',
      children: [
        {
          label: '类型',
          component: 'Select',
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
              },
              {
                label: '网址',
                value: 'url'
              },
              {
                label: '自定义正则',
                value: 'custom'
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
          label: '自定义正则',
          component: 'Input',
          props: {
            placeholder: '请输入正则表达式'
          },
          onlyId: 'form-Wdb2Reg',
          name: 'customReg',
          hidden: '{{$item.type!=="custom"}}'
          // change:[
          //   {
          //     target:'$item.'
          //   }
          // ]
        },
        {
          label: '提示语',
          component: 'Input',
          props: {
            placeholder: '请输入...'
          },
          onlyId: 'form-Wdb2',
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
          onlyId: 'form-3L0P6666',
          name: 'trigger'
        }
      ],
      onlyId: 'form-89tI',
      props: {
        mode: 'card',
        title: '校验规则'
      }
    }
  ],
  high: [
    ...highAttr(),
    { label: '显示清除按钮', component: 'Switch', name: 'props.clearable' },
    {
      label: '最长字数',
      component: 'InputNumber',
      name: 'props.maxlength'
    }
  ],
  linkage: linkageAttr
})

// export default [
//   ...basicAttr(),

//   ...highAttr(),

//   { label: '显示清除按钮', component: 'Switch', name: 'props.clearable' },
//   {
//     label: '最长字数',
//     component: 'InputNumber',
//     name: 'props.maxlength'
//   },

//   ...linkageAttr
// ]
