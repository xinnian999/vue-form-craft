import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    componentProps: {
      action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
      name: 'file',
      multiple: true,
      btnText: '点击上传',
      limit: 3,
      showFileList: true,
      withCredentials: true,
      listType: 'text'
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
              label: '禁用',
              name: 'componentProps.disabled',
              component: 'Switch'
      },
            {
              label: '上传地址',
              name: 'componentProps.action',
              component: 'Input',
              componentProps: {
                placeholder: '上传文件的接口地址'
              }
      },
            {
              label: '文件字段名',
              name: 'componentProps.name',
              component: 'Input',
              componentProps: {
                placeholder: '上传的文件字段名'
              },
              help: '上传时文件对应的字段名'
            },
            {
              label: '请求头',
              name: 'componentProps.headers',
              component: 'JsonEditor',
              componentProps: {
                toolBar: false
              },
              labelAlign: 'top',
              help: '上传时的请求头'
            },
            {
              label: '额外数据',
              name: 'componentProps.data',
              component: 'JsonEditor',
              componentProps: {
                toolBar: false
              },
              labelAlign: 'top',
              help: '上传时附带的额外参数'
            },
            {
              label: '携带Cookie',
              name: 'componentProps.withCredentials',
              component: 'Switch',
              help: '上传时是否携带cookie'
            },
            {
              label: '支持多选',
              name: 'componentProps.multiple',
              component: 'Switch'
      },
            {
              label: '按钮文本',
              name: 'componentProps.btnText',
              component: 'Input',
              componentProps: {
                placeholder: '点击上传'
              }
      },
            {
              label: '上传提示',
              name: 'componentProps.tip',
              component: 'Input',
              componentProps: {
                placeholder: '提示文字'
              }
      },
            {
              label: '最大数量',
              name: 'componentProps.limit',
              component: 'InputNumber',
              componentProps: {
                min: 0
              },
              help: '最大允许上传个数'
            },
            {
              label: '拖拽上传',
              name: 'componentProps.drag',
              component: 'Switch'
      },
            {
              label: '显示文件列表',
              name: 'componentProps.showFileList',
              component: 'Switch'
      },
            {
              label: '列表类型',
              name: 'componentProps.listType',
              component: 'Radio',
              componentProps: {
                mode: 'static',
                options: [
                  { label: '文本', value: 'text' },
                  { label: '图片', value: 'picture' },
                  { label: '图片墙', value: 'picture-card' }
                ]
              }
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
