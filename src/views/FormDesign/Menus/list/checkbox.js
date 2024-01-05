export default {
  name: '多选框组',
  initialValues: {
    label: '多选框组',
    component: 'checkbox',
    props: {
      mode: 'static',
      options: [
        { label: '选项1', value: 'value1' },
        { label: '选项2', value: 'value2' },
        { label: '选项3', value: 'value3' }
      ]
    }
  }
}
