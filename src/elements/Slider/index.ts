import { IconRender } from '@vue-form-craft/components'
import type { FormElement } from '@vue-form-craft/release'
import { h } from 'vue'

export default {
  name: '滑块',
  component: 'ElSlider',
  icon: h(IconRender, { name: 'slider' }),
  type: 'basic',
  order: 12,
  initialValues: { label: '滑块', component: 'Slider' },
  attrSchema: {
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
      { label: '初始值', component: 'InputNumber', name: 'initialValue' },
      { label: '开启选择范围', component: 'Switch', name: 'props.range' },
      { label: '步长', component: 'InputNumber', name: 'props.step', initialValue: 1 },
      { label: '最小值', component: 'InputNumber', name: 'props.min', initialValue: 0 },
      
      {
        label: '自定义style',
        component: 'JsonEdit',
        name: 'props.style',
        help: '与vue的style对象格式一样',
        props: {
          mode: 'dialog'
        }
      }
    ]
  }
} satisfies FormElement
