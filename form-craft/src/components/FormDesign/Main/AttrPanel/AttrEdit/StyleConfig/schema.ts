import type { FormSchema } from '@/types'

const schema: FormSchema = {
  labelWidth: 60,
  labelAlign: 'top',
  size: 'small',
  items: [
    {
      label: 'ID',
      component: 'Input',
      props: {
        placeholder: ''
      },
      name: 'id'
    },
    {
      label: 'class',
      component: 'Input',
      props: {
        placeholder: ''
      },
      name: 'class'
    },
    {
      label: '宽度',
      component: 'SelectInput',
      props: {
        selectPosition: 'append',
        selectWidth: 50,
        selectInitialValue: '%',
        placeholder: '100',
        options: [
          {
            label: '%',
            value: '%'
          },
          {
            label: 'px',
            value: 'px'
          },
          {
            label: 'vw',
            value: 'vw'
          },
          {
            label: 'rem',
            value: 'rem'
          }
        ],
        clearable: true
      },
      name: 'style.width'
    },
    {
      label: '高度',
      component: 'SelectInput',
      props: {
        selectPosition: 'append',
        selectWidth: 50,
        selectInitialValue: 'px',
        placeholder: 'auto',
        options: [
          {
            label: '%',
            value: '%'
          },
          {
            label: 'px',
            value: 'px'
          },
          {
            label: 'vh',
            value: 'vh'
          },
          {
            label: 'rem',
            value: 'rem'
          }
        ],
        clearable: true
      },
      name: 'style.height'
    },
    {
      label: '背景色',
      component: 'ColorInput',
      name: 'style.backgroundColor'
    },
    {
      label: '文字颜色',
      component: 'ColorInput',
      name: 'style.color'
    },
    {
      label: '缩放',
      component: 'Slider',
      name: 'style.transform',
      props: {
        min: 50,
        max: 150
      },
      initialValue: 100,
      designKey: 'design-transform',
      linkages: [
        {
          target: 'style.transform',
          type: 'data',
          value: '{{ `scale(${$values.style.transform / 100 })`  }}'
        }
      ]
    },
    {
      children: [
        {
          label: '外间距',
          name: 'margin',
          component: 'TabsItem',
          children: [
            {
              props: {
                columns: 2,
                columnGap: 20,
                rowGap: 20
              },
              component: 'Grid',
              name: 'form-3eBs',
              children: [
                {
                  label: '上',
                  props: {
                    placeholder: '0',
                    selectPosition: 'append',
                    selectWidth: 60,
                    selectInitialValue: 'px',
                    options: [
                      {
                        label: 'px',
                        value: 'px'
                      },
                      {
                        label: '%',
                        value: '%'
                      },
                      {
                        label: 'em',
                        value: 'em'
                      },
                      {
                        label: 'rem',
                        value: 'rem'
                      },
                      {
                        label: 'vw',
                        value: 'vw'
                      },
                      {
                        label: 'vh',
                        value: 'vh'
                      }
                    ]
                  },
                  component: 'SelectInput',
                  name: 'style.marginTop'
                },
                {
                  label: '下',
                  props: {
                    placeholder: '0',
                    selectPosition: 'append',
                    selectWidth: 60,
                    selectInitialValue: 'px',
                    options: [
                      {
                        label: 'px',
                        value: 'px'
                      },
                      {
                        label: '%',
                        value: '%'
                      },
                      {
                        label: 'em',
                        value: 'em'
                      },
                      {
                        label: 'rem',
                        value: 'rem'
                      },
                      {
                        label: 'vw',
                        value: 'vw'
                      },
                      {
                        label: 'vh',
                        value: 'vh'
                      }
                    ]
                  },
                  component: 'SelectInput',
                  name: 'style.marginBottom'
                },
                {
                  label: '左',
                  props: {
                    placeholder: '0',
                    selectPosition: 'append',
                    selectWidth: 60,
                    selectInitialValue: 'px',
                    options: [
                      {
                        label: 'px',
                        value: 'px'
                      },
                      {
                        label: '%',
                        value: '%'
                      },
                      {
                        label: 'em',
                        value: 'em'
                      },
                      {
                        label: 'rem',
                        value: 'rem'
                      },
                      {
                        label: 'vw',
                        value: 'vw'
                      },
                      {
                        label: 'vh',
                        value: 'vh'
                      }
                    ]
                  },
                  component: 'SelectInput',
                  name: 'style.marginLeft'
                },
                {
                  label: '右',
                  props: {
                    placeholder: '0',
                    selectPosition: 'append',
                    selectWidth: 60,
                    selectInitialValue: 'px',
                    options: [
                      {
                        label: 'px',
                        value: 'px'
                      },
                      {
                        label: '%',
                        value: '%'
                      },
                      {
                        label: 'em',
                        value: 'em'
                      },
                      {
                        label: 'rem',
                        value: 'rem'
                      },
                      {
                        label: 'vw',
                        value: 'vw'
                      },
                      {
                        label: 'vh',
                        value: 'vh'
                      }
                    ]
                  },
                  component: 'SelectInput',
                  name: 'style.marginRight'
                }
              ]
            }
          ]
        },
        {
          label: '内间距',
          name: 'padding',
          component: 'TabsItem',
          children: [
            {
              props: {
                columns: 2,
                columnGap: 20,
                rowGap: 20
              },
              component: 'Grid',
              name: 'form-3eBs',
              children: [
                {
                  label: '上',
                  props: {
                    placeholder: '0',
                    selectPosition: 'append',
                    selectWidth: 60,
                    selectInitialValue: 'px',
                    options: [
                      {
                        label: 'px',
                        value: 'px'
                      },
                      {
                        label: '%',
                        value: '%'
                      },
                      {
                        label: 'em',
                        value: 'em'
                      },
                      {
                        label: 'rem',
                        value: 'rem'
                      },
                      {
                        label: 'vw',
                        value: 'vw'
                      },
                      {
                        label: 'vh',
                        value: 'vh'
                      }
                    ]
                  },
                  component: 'SelectInput',
                  name: 'style.paddingTop'
                },
                {
                  label: '下',
                  props: {
                    placeholder: '0',
                    selectPosition: 'append',
                    selectWidth: 60,
                    selectInitialValue: 'px',
                    options: [
                      {
                        label: 'px',
                        value: 'px'
                      },
                      {
                        label: '%',
                        value: '%'
                      },
                      {
                        label: 'em',
                        value: 'em'
                      },
                      {
                        label: 'rem',
                        value: 'rem'
                      },
                      {
                        label: 'vw',
                        value: 'vw'
                      },
                      {
                        label: 'vh',
                        value: 'vh'
                      }
                    ]
                  },
                  component: 'SelectInput',
                  name: 'style.paddingBottom'
                },
                {
                  label: '左',
                  props: {
                    placeholder: '0',
                    selectPosition: 'append',
                    selectWidth: 60,
                    selectInitialValue: 'px',
                    options: [
                      {
                        label: 'px',
                        value: 'px'
                      },
                      {
                        label: '%',
                        value: '%'
                      },
                      {
                        label: 'em',
                        value: 'em'
                      },
                      {
                        label: 'rem',
                        value: 'rem'
                      },
                      {
                        label: 'vw',
                        value: 'vw'
                      },
                      {
                        label: 'vh',
                        value: 'vh'
                      }
                    ]
                  },
                  component: 'SelectInput',
                  name: 'style.paddingLeft'
                },
                {
                  label: '右',
                  props: {
                    placeholder: '0',
                    selectPosition: 'append',
                    selectWidth: 60,
                    selectInitialValue: 'px',
                    options: [
                      {
                        label: 'px',
                        value: 'px'
                      },
                      {
                        label: '%',
                        value: '%'
                      },
                      {
                        label: 'em',
                        value: 'em'
                      },
                      {
                        label: 'rem',
                        value: 'rem'
                      },
                      {
                        label: 'vw',
                        value: 'vw'
                      },
                      {
                        label: 'vh',
                        value: 'vh'
                      }
                    ]
                  },
                  component: 'SelectInput',
                  name: 'style.paddingRight'
                }
              ]
            }
          ]
        }
      ],
      props: {
        defaultKey: 'margin',
        tabPosition: 'top'
      },
      component: 'Tabs',
      name: 'form-e9YD'
    },
    {
      label: '自定义',
      component: 'JsonEdit',
      name: 'style'
    }
  ]
}

export default schema
