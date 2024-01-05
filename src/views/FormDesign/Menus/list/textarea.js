export default {
  name: '多行文本',
  initialValues: {
    label: '多行文本',
    component: 'textarea',
    props: {
      autosize: { minRows: 4, maxRows: 999 }
    }
  }
}
