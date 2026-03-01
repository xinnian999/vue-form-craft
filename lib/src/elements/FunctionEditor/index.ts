import type { FormElement } from '@/types'
import FunctionEditor from './FunctionEditor.vue'

export default {
  title: '函数编辑器',
  component: 'FunctionEditor',
  render: FunctionEditor,
  icon: 'code',
  type: 'high',
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
        help: "既是唯一标识，也是数据路径。比如输入【componentProps.name】，数据就会保存为 { componentProps: { name:'xxx' } }"
      },
      {
        label: '参数提示',
        name: 'componentProps.paramTips',
        component: 'FormList',
        labelAlign: 'top',
        componentProps: {
          mode: 'table',
          title: '参数提示'
        },
        items: [
          {
            label: '参数名',
            name: 'name',
            component: 'Input'
          },
          {
            label: '描述',
            name: 'description',
            component: 'TextArea'
          }
        ]
      }
    ]
  }
} satisfies FormElement
