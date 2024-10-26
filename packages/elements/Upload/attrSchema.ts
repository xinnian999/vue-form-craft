import type { FormSchema } from '@vue-form-craft/release'

export default {
  size: 'small',
  labelAlign: 'top',
  items: [
    { label: '标签', component: 'Input', name: 'label' },
    {
      label: '唯一标识',
      component: 'Input',
      name: 'name',
      help: "既是唯一标识，也是数据路径。比如输入【props.name】，数据就会保存为 { props: { name:'xxx' } }"
    },
    { label: '字段说明', component: 'Textarea', name: 'help' },
    // { label: '初始值', component: 'Input', name: 'initialValue' },
    {
      component: 'Grid',
      children: [
        { label: '是否必填', component: 'Switch', name: 'required' },
        { label: '是否禁用', component: 'Switch', name: 'props.disabled' },
        { label: '隐藏字段', component: 'Switch', name: 'hidden' },
        { label: '隐藏标签', component: 'Switch', name: 'hideLabel' }
      ],
      props: {
        columns: 3,
        'row-gap': 0,
        'column-gap': 20
      },
      designKey: 'form-R003',
      name: 'cNmCuu',
      style: {
        marginBottom: 0
      }
    },
    { label: '上传地址', component: 'Input', name: 'props.action' },
    { label: '上传的文件字段名', component: 'Input', name: 'props.name' },
    { label: '上传时的请求头', component: 'JsonEdit', name: 'props.headers', dialog: true },
    { label: '上传时的额外数据', component: 'JsonEdit', name: 'props.data', dialog: true },
    { label: '上传时携带cookie', component: 'Switch', name: 'props.withCredentials' },
    { label: '支持多选文件', component: 'Switch', name: 'props.multiple' },
    { label: '上传按钮文本', component: 'Input', name: 'props.btnText' },
    { label: '上传提示', component: 'Input', name: 'props.tip' },
    { label: '最大上传数量', component: 'InputNumber', name: 'props.limit' },
    { label: '开启拖拽上传', component: 'Switch', name: 'props.drag' },
    { label: '是否显示已上传文件列表', component: 'Switch', name: 'props.showFileList' },
    {
      label: '上传文件列表类型',
      component: 'Radio',
      name: 'props.listType',
      props: {
        mode: 'static',
        options: [
          { label: '文本', value: 'text' },
          { label: '图片墙', value: 'picture-card' },
        ]
      }
    },
  ]
} satisfies FormSchema
