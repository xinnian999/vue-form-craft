import { linkageAttr, basicAttr, highAttr, mergeAttr, optionAttr } from '@/config/commonAttr'

export default mergeAttr({
  basic: [...basicAttr(['props.readonly', 'props.placeholder']), ...optionAttr],
  high: [
    ...highAttr(),
    {
      label: '开启搜索',
      component: 'Switch',
      name: 'props.filterable',
      designKey: 'form-ekRL12'
    },
    {
      label: '搜索占位符',
      component: 'Input',
      name: 'props.filter-placeholder',
      designKey: 'form-ekRL123',
      initialValue: '请输入搜索关键词',
      hidden: '{{!$values.props.filterable}}'
    },
    {
      label: '左列表标题',
      component: 'Input',
      props: {
        autocomplete: 'off',
        showWordLimit: true,
        type: 'text',
        placeholder: '请输入文本'
      },
      designKey: 'form-7KcJ',
      name: 'props.titles.0'
    },
    {
      label: '右列表标题',
      component: 'Input',
      props: {
        autocomplete: 'off',
        showWordLimit: true,
        type: 'text',
        placeholder: '请输入文本'
      },
      designKey: 'form-Cp1y',
      name: 'props.titles.1'
    }
  ],

  linkage: linkageAttr
})
