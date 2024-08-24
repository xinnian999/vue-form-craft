import { h } from 'vue'
import IconRender from '@/components/IconRender.vue'
import Cascader from './Cascader.vue'
import attrSchema from './attrSchema'

export default {
  name: '级联选择器',
  icon: h(IconRender, { name: 'cascader' }),
  type: 'basic',
  component: Cascader,
  attrSchema,
  order: 7,
  initialValues: {
    label: '级联选择器',
    component: 'Cascader',
    props: {
      placeholder: '请选择...',
      mode: 'static',
      labelKey: 'label',
      valueKey: 'value',
      options: [
        {
          label: '选项1',
          value: 'value1',
          children: [
            {
              label: '选项1-1',
              value: 'value1-1'
            },
            {
              label: '选项1-2',
              value: 'value1-2'
            },
            {
              label: '选项1-3',
              value: 'value1-2'
            }
          ]
        },
        {
          label: '选项2',
          value: 'value2',
          children: [
            {
              label: '选项2-1',
              value: 'value2-1'
            },
            {
              label: '选项2-2',
              value: 'value2-2'
            },
            {
              label: '选项2-3',
              value: 'value2-2'
            }
          ]
        },
        {
          label: '选项3',
          value: 'value3'
        }
      ]
    }
  }
}
