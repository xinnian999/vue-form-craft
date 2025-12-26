import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  items: [
    {
      name: 'form-tabs',
      component: 'Tabs',
      componentProps: {
        defaultKey: 'attrs',
        tabPosition: 'top',
        type: 'card'
      },
      children: [
        {
          label: '属性',
          name: 'attrs',
          component: 'TabPane',
          componentProps: {
            lazy: true
          },
          children: [
            {
              name: '.',
              component: 'Custom',
              componentProps: {
                componentName: 'FormDesign-Basic'
              },
              labelWidth: 0
            },
            {
              label: '禁用',
              name: 'componentProps.disabled',
              component: 'Switch'
      },
            {
              label: '显示Alpha通道',
              name: 'componentProps.showAlpha',
              component: 'Switch',
              help: '是否支持透明度选择'
            },
            {
              label: '颜色格式',
              name: 'componentProps.colorFormat',
              component: 'Select',
              componentProps: {
                mode: 'static',
                options: [
                  { label: 'hex', value: 'hex' },
                  { label: 'rgb', value: 'rgb' },
                  { label: 'hsl', value: 'hsl' },
                  { label: 'hsv', value: 'hsv' }
                ]
              },
              help: '写入 v-model 的颜色的格式'
            }
          ]
        },
        {
          label: '校验',
          name: 'rules',
          component: 'TabPane',
          componentProps: {
            lazy: true
          },
          children: [
            {
              name: '.',
              component: 'Custom',
              componentProps: {
                componentName: 'FormDesign-Rules'
              },
              labelWidth: 0
            }
          ]
        },
        {
          label: '联动',
          name: 'linkages',
          component: 'TabPane',
          componentProps: {
            lazy: true
          },
          children: [
            {
              name: '.',
              component: 'Custom',
              componentProps: {
                componentName: 'FormDesign-Linkages'
              },
              labelWidth: 0
            }
          ]
        },
        {
          label: '事件',
          name: 'events',
          component: 'TabPane',
          componentProps: {
            lazy: true
          },
          children: [
            {
              label: '数据改变时 (change)',
              labelAlign: 'top',
              name: 'componentProps.onChange',
              component: 'FunctionEditor'
      },
            {
              label: '面板打开时 (activeChange)',
              labelAlign: 'top',
              name: 'componentProps.onActiveChange',
              component: 'FunctionEditor'
      }
          ]
        },
        {
          label: '样式',
          name: 'style',
          component: 'TabPane',
          componentProps: {
            lazy: true
          },
          children: [
            {
              label: '',
              name: 'componentProps.style',
              component: 'Custom',
              componentProps: {
                componentName: 'FormDesign-StyleEditor'
              },
              labelWidth: 0
            }
          ]
        }
      ]
    }
  ]
} satisfies FormSchema
