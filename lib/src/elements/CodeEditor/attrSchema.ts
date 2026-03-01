import type { FormSchema } from 'vue-form-craft'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {},
  items: [
    {
      name: 'form-code-editor',
      component: 'Tabs',
      componentProps: {
        defaultKey: 'attrs',
        tabPosition: 'top',
        type: 'card'
      },
      items: [
        {
          label: '属性',
          name: 'attrs',
          component: 'TabPane',
          componentProps: {
            lazy: true
          },
          items: [
            {
              name: '.',
              component: 'Custom',
              componentProps: {
                componentName: 'FormDesign-Basic'
              },
              labelWidth: 0
            },
            {
              label: '编程语言',
              name: 'componentProps.language',
              component: 'Select',
              componentProps: {
                placeholder: '请选择编程语言',
                clearable: true,
                options: [
                  { label: 'JavaScript', value: 'javascript' },
                  { label: 'TypeScript', value: 'typescript' },
                  { label: 'JSON', value: 'json' },
                  { label: 'HTML', value: 'html' },
                  { label: 'CSS', value: 'css' },
                  { label: 'SCSS', value: 'scss' },
                  { label: 'Python', value: 'python' },
                  { label: 'Java', value: 'java' },
                  { label: 'C++', value: 'cpp' },
                  { label: 'C#', value: 'csharp' },
                  { label: 'PHP', value: 'php' },
                  { label: 'Go', value: 'go' },
                  { label: 'Rust', value: 'rust' },
                  { label: 'SQL', value: 'sql' },
                  { label: 'Markdown', value: 'markdown' },
                  { label: 'XML', value: 'xml' },
                  { label: 'YAML', value: 'yaml' }
                ]
              }
      },
            {
              label: '主题',
              name: 'componentProps.theme',
              component: 'Select',
              componentProps: {
                placeholder: '请选择主题',
                clearable: true,
                options: [
                  { label: 'VS Light', value: 'vs' },
                  { label: 'VS Dark', value: 'vs-dark' },
                  { label: 'High Contrast', value: 'hc-black' }
                ]
              }
      },
            {
              label: '高度',
              name: 'componentProps.height',
              component: 'Input',
              componentProps: {
                placeholder: '例如: 300px 或 300'
              }
      },
            {
              label: '字体大小',
              name: 'componentProps.fontSize',
              component: 'InputNumber',
              componentProps: {
                min: 12,
                max: 30,
                step: 1
              }
      },
            {
              label: 'Tab大小',
              name: 'componentProps.tabSize',
              component: 'InputNumber',
              componentProps: {
                min: 2,
                max: 8,
                step: 1
              }
      },
            {
              label: '行号',
              name: 'componentProps.lineNumbers',
              component: 'Select',
              componentProps: {
                placeholder: '请选择行号显示方式',
                options: [
                  { label: '显示', value: 'on' },
                  { label: '隐藏', value: 'off' },
                  { label: '相对行号', value: 'relative' },
                  { label: '间隔显示', value: 'interval' }
                ]
              }
      },
            {
              label: '自动换行',
              name: 'componentProps.wordWrap',
              component: 'Select',
              componentProps: {
                placeholder: '请选择换行方式',
                options: [
                  { label: '开启', value: 'on' },
                  { label: '关闭', value: 'off' },
                  { label: '按列换行', value: 'wordWrapColumn' },
                  { label: '限制换行', value: 'bounded' }
                ]
              }
      },
            {
              label: '显示小地图',
              name: 'componentProps.minimap',
              component: 'Switch'
      },
            {
              label: '只读',
              name: 'componentProps.readOnly',
              component: 'Switch'
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
          items: [
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
          items: [
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
          items: [
            {
              label: '编辑器挂载时 (mount)',
              name: 'componentProps.onMount',
              component: 'FunctionEditor',
              labelAlign: 'top'
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
          items: [
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
