export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '标题',
      component: 'input',
      props: {
        placeholder: '请输入...'
      },
      onlyId: 'form-JPzT',
      name: 'title'
    },
    {
      label: '类型',
      component: 'select',
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
      hidden: '{{!$form.title}}'
    },
    {
      label: '数量',
      component: 'inputNumber',
      onlyId: 'form-9R9B',
      name: 'count',
      props: {
        min: 1,
        max: 9999,
        step: 1,
        disabled: "{{$form.type!=='3'}}"
      },
      initialValue: 1
    }
  ]
}