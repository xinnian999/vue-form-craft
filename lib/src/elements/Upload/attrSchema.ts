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
      designKey: 'design-tabs',
      children: [
        {
          label: '属性',
          name: 'attrs',
          component: 'TabPane',
          props: {
            lazy: true
          },
          designKey: 'tab-attrs',
          children: [
            {
              name: '.',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Basic'
              },
              designKey: 'design-basic',
              labelWidth: 0
            },
            {
              label: '禁用',
              name: 'props.disabled',
              component: 'Switch',
              designKey: 'design-disabled'
            },
            {
              label: '上传地址',
              name: 'props.action',
              component: 'Input',
              props: {
                placeholder: '上传文件的接口地址'
              },
              designKey: 'design-action'
            },
            {
              label: '文件字段名',
              name: 'props.name',
              component: 'Input',
              props: {
                placeholder: '上传的文件字段名'
              },
              designKey: 'design-name-field',
              help: '上传时文件对应的字段名'
            },
            {
              label: '请求头',
              name: 'props.headers',
              component: 'JsonEditor',
              props: {
                toolBar: false
              },
              designKey: 'design-headers',
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
              designKey: 'design-data',
              labelAlign: 'top',
              help: '上传时附带的额外参数'
            },
            {
              label: '携带Cookie',
              name: 'props.withCredentials',
              component: 'Switch',
              designKey: 'design-withCredentials',
              help: '上传时是否携带cookie'
            },
            {
              label: '支持多选',
              name: 'props.multiple',
              component: 'Switch',
              designKey: 'design-multiple'
            },
            {
              label: '按钮文本',
              name: 'props.btnText',
              component: 'Input',
              props: {
                placeholder: '点击上传'
              },
              designKey: 'design-btnText'
            },
            {
              label: '上传提示',
              name: 'props.tip',
              component: 'Input',
              props: {
                placeholder: '提示文字'
              },
              designKey: 'design-tip'
            },
            {
              label: '最大数量',
              name: 'props.limit',
              component: 'InputNumber',
              props: {
                min: 0
              },
              designKey: 'design-limit',
              help: '最大允许上传个数'
            },
            {
              label: '拖拽上传',
              name: 'props.drag',
              component: 'Switch',
              designKey: 'design-drag'
            },
            {
              label: '显示文件列表',
              name: 'props.showFileList',
              component: 'Switch',
              designKey: 'design-showFileList'
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
              },
              designKey: 'design-listType'
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
          designKey: 'tab-rules',
          children: [
            {
              name: '.',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Rules'
              },
              designKey: 'design-KaWx11',
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
          designKey: 'tab-linkages',
          children: [
            {
              name: '.',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-Linkages'
              },
              designKey: 'design-linkages-custom',
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
          designKey: 'tab-events',
          children: [
            {
              label: '数据改变时 (change)',
              name: 'props.onChange',
              component: 'FunctionEditor',
              designKey: 'design-event-change',
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
          designKey: 'tab-style',
          children: [
            {
              label: '',
              name: 'props.style',
              component: 'Custom',
              props: {
                componentName: 'FormDesign-StyleEditor'
              },
              designKey: 'design-style',
              labelWidth: 0
            }
          ]
        }
      ]
    }
  ]
} satisfies FormSchema
