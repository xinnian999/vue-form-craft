import optionAttr from './common/optionAttr'
import linkageAttr from './common/linkageAttr'

export default {
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
          label: '表格模式',
          component: 'switch',
          name: 'tableDrop',
          onlyId: 'form-LPpx'
        },
        {
          label: '表格列配置',
          name: 'columns',
          component: 'jsonEdit',
          hidden: '{{!$form.props.tableDrop}}',
          onlyId: 'form-Iwpd'
        },

        ...optionAttr
      ],
      onlyId: 'form-qYXT'
    },
    ...linkageAttr
  ]
}
