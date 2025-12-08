import type { FormElement } from '@/types'
import FunctionEditor from './FunctionEditor.vue'

export default {
  title: '函数编辑器',
  component: 'FunctionEditor',
  render: FunctionEditor,
  icon: 'code',
  type: 'basic',
  order: 30,
  attrSchema: {
    labelWidth: 110,
    size: 'small',
    initialValues: {
      label: '函数编辑器'
    },
    items: [
      { label: '函数', component: 'Input', name: 'label' },
      {
        label: '唯一标识',
        component: 'Input',
        name: 'name',
        help: "既是唯一标识，也是数据路径。比如输入【props.name】，数据就会保存为 { props: { name:'xxx' } }"
      },
      {
        label: '参数提示',
        name: 'props.paramTips',
        component: 'FormList',
        labelAlign: 'top',
        props: {
          mode: 'table',
          title: '参数提示'
        },
        designKey: 'design-paramTips',
        children: [
          {
            label: '参数名',
            name: 'name',
            component: 'Input',
            designKey: 'design-paramTips-target'
          },
          {
            label: '描述',
            name: 'description',
            component: 'TextArea',
            designKey: 'design-paramTips-description'
          }
        ]
      }
    ]
  }
} satisfies FormElement
