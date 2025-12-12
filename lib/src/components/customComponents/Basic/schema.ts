import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  items: [
    {
      label: '组件',
      name: 'component',
      component: 'Tag',
      props: {
        text: '{{ currentElement.title }}'
      },
      designKey: 'design-component'
    },
    {
      label: '字段标识',
      name: 'name',
      component: 'Input',
      props: {
        placeholder: '',
        autocomplete: 'new-password',
        clearable: true
      },
      help: '对应表单数据对象中的 key，支持点路径（如：user.name、user.address.city）',
      designKey: 'design-njXF'
    },
    {
      label: '标签',
      name: 'label',
      component: 'Input',
      props: {
        placeholder: '',
        autocomplete: 'new-password',
        clearable: true
      },
      designKey: 'design-gfim'
    },
    {
      label: '标签宽度（px）',
      name: 'labelWidth',
      component: 'InputNumber',
      props: {
        unit: 'px',
        step: 10
      },
      designKey: 'design-UcmF',
      defaultValue: '{{ rootSchema.labelWidth }}'
    },
    {
      label: '标签位置',
      name: 'labelAlign',
      component: 'Radio',
      props: {
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
      defaultValue: '{{ rootSchema.labelAlign }}',
      designKey: 'design-EiOs'
    },
    {
      label: '尺寸',
      name: 'size',
      component: 'Radio',
      props: {
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
      defaultValue: '{{ rootSchema.size }}',
      designKey: 'design-yaZ4'
    },
    {
      label: '提示',
      name: 'alert',
      component: 'TextArea',
      designKey: 'design-alert',
      props: {
        autosize: true,
        clearable: true
      }
    },
    {
      label: '气泡提示',
      name: 'help',
      component: 'TextArea',
      props: {
        placeholder: '',
        autosize: {
          minRows: 2,
          maxRows: 999
        },
        clearable: true
      },
      designKey: 'design-Qh45'
    },
    {
      label: '隐藏',
      name: 'hidden',
      component: 'Switch',
      designKey: 'design-C5Qj'
    },
    {
      label: '默认值',
      name: 'defaultValue',
      component: '{{ currentNode.component }}',
      props: '{{currentNode.props}}' as unknown as Record<string, any>,
      help: '此默认值只是视图层的默认值，不会影响表单数据',
      designKey: 'design-defaultValue'
    }
  ]
} satisfies FormSchema
