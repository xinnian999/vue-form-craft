export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '标题',
      component: 'Input',
      props: {
        placeholder: '请输入...'
      },
      onlyId: 'form-JPzT',
      name: 'title'
    },
    {
      label: '类型',
      component: 'Select',
      props: {
        mode: 'static',
        options: [
          {
            label: '存草稿',
            value: '1'
          },
          {
            label: '发布一条',
            value: '2'
          },
          {
            label: '发布多条',
            value: '3'
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
      onlyId: 'form-2ZCi',
      name: 'type',
      hidden: '{{!$values.title}}'
    },
    {
      label: '数量',
      component: 'InputNumber',
      onlyId: 'form-9R9B',
      name: 'count',
      props: {
        min: 1,
        max: 9999,
        step: 1,
        disabled: "{{$values.type!=='3'}}"
      },
      initialValue: 1
    }
  ]
}
