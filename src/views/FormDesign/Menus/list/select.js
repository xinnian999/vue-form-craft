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
      ],
      columns: [
        { title: 'label', dataIndex: 'label' },
        { title: 'value', dataIndex: 'value' }
      ]
    }
  }
}
