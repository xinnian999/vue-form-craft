import type { FormSchema } from 'formora'

export default {
  labelWidth: 110,
  labelAlign: 'left',
  scrollToError: true,
  size: 'small',
  submitBtn: false,
  items: [
    {
      label: '字段标识',
      name: 'name',
      component: 'Input',
      props: {
        placeholder: '',
        autocomplete: 'new-password',
        clearable: true
      },
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
      designKey: 'design-UcmF'
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
    }
  ]
} satisfies FormSchema
