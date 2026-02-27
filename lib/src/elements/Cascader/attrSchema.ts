import type { FormSchema } from 'vue-form-craft'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    componentProps: {
      mode: 'static',
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
            }
          ]
        }
      ]
    }
  },
  items: [
    {
      name: 'form-tabs',
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
              label: '占位提示',
              name: 'componentProps.placeholder',
              component: 'Input',
              componentProps: {
                autocomplete: 'new-password'
              }
            },
            {
              label: '禁用',
              name: 'componentProps.disabled',
              component: 'Switch'
            },
            {
              label: '选择模式',
              name: 'componentProps.multiple',
              component: 'Switch',
              componentProps: {
                activeText: '多选',
                inactiveText: '单选'
              }
            },
            {
              label: '显示完整路径',
              name: 'componentProps.showAllLevels',
              component: 'Switch',
              defaultValue: true,
              help: '是否显示选中值的完整路径'
            },
            {
              label: '显示清除按钮',
              name: 'componentProps.clearable',
              component: 'Switch'
            }
          ]
        },
        {
          label: '选项',
          name: 'optionSetting',
          component: 'TabPane',
          items: [
            {
              name: '.',
              component: 'Custom',
              componentProps: {
                componentName: 'FormDesign-Options'
              },
              labelWidth: 0
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
              label: '数据改变时 (change)',
              name: 'componentProps.onChange',
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
