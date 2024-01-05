export default {
  name: '单选框组',
  initialValues: {
    label: '单选框组',
    component: 'radio',
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
