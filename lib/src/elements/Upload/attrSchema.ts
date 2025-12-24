import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  initialValues: {
    props: {
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
      props: {
        defaultKey: 'attrs',
        tabPosition: 'top',
        type: 'card'
      },
      children: [
        {
          label: '属性',
          name: 'attrs',
          component: 'TabPane',
          props: {
            lazy: true
          },
          children: [
            {
              name: '.',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Basic'
              },
              labelWidth: 0
            },
            {
              label: '禁用',
              name: 'props.disabled',
              component: 'Switch'
      },
            {
              label: '上传地址',
              name: 'props.action',
              component: 'Input',
              props: {
                placeholder: '上传文件的接口地址'
              }
      },
            {
              label: '文件字段名',
              name: 'props.name',
              component: 'Input',
              props: {
                placeholder: '上传的文件字段名'
              },
              help: '上传时文件对应的字段名'
            },
            {
              label: '请求头',
              name: 'props.headers',
              component: 'JsonEditor',
              props: {
                toolBar: false
              },
              labelAlign: 'top',
              help: '上传时的请求头'
            },
            {
              label: '额外数据',
              name: 'props.data',
              component: 'JsonEditor',
              props: {
                toolBar: false
              },
              labelAlign: 'top',
              help: '上传时附带的额外参数'
            },
            {
              label: '携带Cookie',
              name: 'props.withCredentials',
              component: 'Switch',
              help: '上传时是否携带cookie'
            },
            {
              label: '支持多选',
              name: 'props.multiple',
              component: 'Switch'
      },
            {
              label: '按钮文本',
              name: 'props.btnText',
              component: 'Input',
              props: {
                placeholder: '点击上传'
              }
      },
            {
              label: '上传提示',
              name: 'props.tip',
              component: 'Input',
              props: {
                placeholder: '提示文字'
              }
      },
            {
              label: '最大数量',
              name: 'props.limit',
              component: 'InputNumber',
              props: {
                min: 0
              },
              help: '最大允许上传个数'
            },
            {
              label: '拖拽上传',
              name: 'props.drag',
              component: 'Switch'
      },
            {
              label: '显示文件列表',
              name: 'props.showFileList',
              component: 'Switch'
      },
            {
              label: '列表类型',
              name: 'props.listType',
              component: 'Radio',
              props: {
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
          props: {
            lazy: true
          },
          children: [
            {
              name: '.',
              component: 'Custom',
              props: {
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
          props: {
            lazy: true
          },
          children: [
            {
              name: '.',
              component: 'Custom',
              props: {
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
          props: {
            lazy: true
          },
          children: [
            {
              label: '数据改变时 (change)',
              name: 'props.onChange',
              component: 'FunctionEditor',
              labelAlign: 'top'
            }
          ]
        },
        {
          label: '样式',
          name: 'style',
          component: 'TabPane',
          props: {
            lazy: true
          },
          children: [
            {
              label: '',
              name: 'props.style',
              component: 'Custom',
              props: {
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
