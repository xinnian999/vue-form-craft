import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  size: 'small',
  submitBtn: false,
  items: [
    // {
    //   label: '组件',
    //   name: 'component',
    //   component: 'Tag',
    //   props: {
    //     text: '{{ currentElement.title }}'
    //   },
    //   designKey: 'design-component'
    // },
    {
      label: '字段标识',
      name: 'name',
      component: 'Input',
      componentProps: {
        placeholder: '',
        autocomplete: 'new-password',
        clearable: true
      },
      help: '对应表单数据对象中的 key，支持点路径（如：user.name、user.address.city）'
    },
    {
      label: '标签',
      name: 'label',
      component: 'Input',
      componentProps: {
        placeholder: '',
        autocomplete: 'new-password',
        clearable: true
      }
    },
    {
      label: '标签宽度（px）',
      name: 'labelWidth',
      component: 'InputNumber',
      componentProps: {
        unit: 'px',
        step: 10
      },
      defaultValue: '{{ rootSchema.labelWidth }}'
    },
    {
      label: '标签位置',
      name: 'labelAlign',
      component: 'Radio',
      componentProps: {
        mode: 'static',
        options: [
          {
            label: '居左',
            value: 'left'
          },
          {
            label: '居上',
            value: 'top'
          },
          {
            label: '居右',
            value: 'right'
          }
        ]
      },
      defaultValue: '{{ rootSchema.labelAlign }}'
    },
    {
      label: '尺寸',
      name: 'size',
      component: 'Radio',
      componentProps: {
        mode: 'static',
        options: [
          {
            label: '默认',
            value: 'default'
          },
          {
            label: '较小',
            value: 'small'
          },
          {
            label: '较大',
            value: 'large'
          }
        ]
      },
      defaultValue: '{{ rootSchema.size }}'
    },
    {
      label: '提示',
      name: 'alert',
      component: 'TextArea',
      componentProps: {
        autosize: true,
        clearable: true
      }
    },
    {
      label: '气泡提示',
      name: 'help',
      component: 'TextArea',
      componentProps: {
        placeholder: '',
        autosize: {
          minRows: 2,
          maxRows: 999
        },
        clearable: true
      }
    },
    {
      label: '渲染',
      name: 'when',
      component: 'Switch',
      defaultValue: '{{ true }}'
    },
    {
      label: '可见',
      name: 'show',
      component: 'Switch',
      defaultValue: '{{ true }}'
    },
    {
      label: 'class',
      name: 'componentProps.class',
      component: 'Input'
    },
    {
      label: 'ID',
      name: 'componentProps.id',
      component: 'Input'
    }
  ]
} satisfies FormSchema
