import optionAttr from './commonAttr/optionAttr'
import linkageAttr from './commonAttr/linkageAttr'
import basic from './commonAttr/basic'
import props from './commonAttr/props'

export default {
  name: '下拉选择框',
  initialValues: {
    label: '下拉选择框',
    component: 'select',
    props: {
      mode: 'static',
      options: [
        { label: '选项1', value: 'value1' },
        { label: '选项2', value: 'value2' },
        { label: '选项3', value: 'value3' }
      ]
    }
  },
  attr: [
    ...basic,
    {
      component: 'itemGroup',
      name: 'props',
      children: [
        ...props,
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
          onlyId: 'form-Iwpd',
          initialValue: [
            { title: 'label', dataIndex: 'label' },
            { title: 'value', dataIndex: 'value' }
          ]
        },

        ...optionAttr
      ],
      onlyId: 'form-qYXT'
    },
    ...linkageAttr
  ]
}
