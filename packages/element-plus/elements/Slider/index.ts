import { Icon } from '@form-magic/core'
import type { FormElement } from '@/types/index'
import { h } from 'vue'

export default {
  title: '滑块',
  render: 'ElSlider',
  component: 'Slider',
  icon: h(Icon, { name: 'slider' }),
  type: 'basic',
  order: 12,
  attrSchema: {
    size: 'small',
    labelAlign: 'top',
    initialValues: { label: '滑块' },
    items: [
      { label: '标签', component: 'Input', name: 'label' },
      {
        label: '唯一标识',
        component: 'Input',
        name: 'name',
        help: "既是唯一标识，也是数据路径。比如输入【props.name】，数据就会保存为 { props: { name:'xxx' } }"
      },
      { label: '字段说明', component: 'TextArea', name: 'help' },
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
          'row-gap': 20,
          'column-gap': 20
        },
        designKey: 'form-R003',
        name: 'cNmCuu',
        style: {
          marginBottom: 0
        }
      },
      { label: '初始值', component: 'InputNumber', name: 'initialValue' },
      { label: '开启选择范围', component: 'Switch', name: 'props.range' },
      { label: '步长', component: 'InputNumber', name: 'props.step', initialValue: 1 },
      { label: '最小值', component: 'InputNumber', name: 'props.min', initialValue: 0 }
    ]
  }
} satisfies FormElement
