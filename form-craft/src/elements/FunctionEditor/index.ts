import { defineAsyncComponent, h } from 'vue'
import Icon from '@/Icon/index.vue'
import type { FormElement } from '@/types'

export default {
  title: '函数编辑器',
  component: 'FunctionEditor',
  render: defineAsyncComponent(() => import('./Component.vue')),
  icon: h(Icon, { name: 'code' }),
  type: 'basic',
  order: 100,
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
      }
    ]
  }
} satisfies FormElement
