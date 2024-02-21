import { linkageAttr, basicAttr, highAttr, mergeAttr, apiAttr } from '../commonAttr'

export default mergeAttr({
  basic: [
    ...basicAttr(['initialValue', 'props.readonly']),
    {
      label: '选择模式',
      component: 'Switch',
      name: 'props.multiple',
      props: {
        'active-text': '多选',
        'inactive-text': '单选'
      },
      designKey: 'form-eTxc'
    }
  ],

  option: [
    {
      label: '标签key',
      component: 'Input',
      name: 'props.labelKey',
      designKey: 'form-X6hs'
    },
    {
      label: '值Key',
      component: 'Input',
      name: 'props.valueKey',
      designKey: 'form-STkl'
    },
    {
      label: '数据模式',
      component: 'Radio',
      name: 'props.mode',
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
        ],
        optionType: 'button'
      },
      designKey: 'form-PLpj'
    },
    {
      label: '静态选项',
      name: 'props.options',
      component: 'JsonEdit',
      hidden: '{{$values.props.mode!=="static"}}',
      designKey: 'form-Iwpd',
      props: {
        mode: 'dialog'
      }
    },
    {
      component: 'Card',
      designKey: 'id-pGeN',
      name: 'form-6vzT',
      hidden: '{{$values.props.mode==="static"}}',
      children: apiAttr
    }
  ],

  high: [
    ...highAttr(),
    {
      label: '只取最后一级',
      component: 'Switch',
      name: 'props.takeLastLevel',
      designKey: 'form-kJ7K222',
      hidden: '{{$values.props.multiple}}'
    }
  ],

  linkage: linkageAttr
})
