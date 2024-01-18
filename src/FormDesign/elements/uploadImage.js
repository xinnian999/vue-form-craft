export default {
  name: '图片上传',
  initialValues: {
    label: '图片上传',
    component: 'uploadImage',
    props: {
      width: 150,
      height: 150,
      uploadKey: 'image',
      action: 'https://hyl999.co/api/upload/image',
      fileTypes: ['jpeg', 'png'],
      size: 5
    }
  },
  attr: [
    { label: '字段label', component: 'input', name: 'label' },
    { label: '字段标识', component: 'input', name: 'name' },
    { label: '隐藏字段', component: 'switch', name: 'hidden' },
    {
      label: 'props',
      component: 'itemGroup',
      name: 'props',
      children: [
        { label: '上传Key', component: 'input', name: 'uploadKey' },
        { label: '上传地址', component: 'input', name: 'action' },
        { label: '图片宽度', component: 'inputNumber', name: 'width', props: { unit: 'px' } },
        { label: '图片高度', component: 'inputNumber', name: 'height', props: { unit: 'px' } },
        {
          label: '允许图片格式',
          component: 'checkbox',
          name: 'fileTypes',
          props: {
            mode: 'static',
            options: [
              { label: 'JPG', value: 'jpeg' },
              { label: 'PNG', value: 'png' },
              { label: 'WebP', value: 'webp' },
              { label: 'SVG', value: 'svg+xml' }
            ]
          }
        },
        { label: '上传大小限制', component: 'inputNumber', name: 'size', props: { unit: 'MB' } },
        {
          label: '数据路径',
          component: 'input',
          name: 'dataPath',
          help: '用于上传成功后，可以在回参里取一个值保存到字段值。(比如图片存储在服务器的地址)'
        }
        // {
        //   label: '回显路径',
        //   component: 'input',
        //   name: 'dataPath',
        //   help: '用于表单回显时，此路径 + 图片名称（此字段的值）组成回显图片路径'
        // }
      ]
    }
  ]
}
