import type { FormSchema } from '@form-magic/core'

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
      designKey: 'form-0vQJ',
      name: 'id'
    },
    {
      label: 'class',
      component: 'Input',
      props: {
        placeholder: ''
      },
      designKey: 'design-KUlI',
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
      designKey: 'design-Bvi4',
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
      designKey: 'design-Bvi44',
      name: 'style.height'
    },
    {
      label: '背景色',
      component: 'ColorInput',
      designKey: 'form-YicU',
      name: 'style.backgroundColor'
    },
    {
      label: '文字颜色',
      component: 'ColorInput',
      designKey: 'design-A2bj',
      name: 'style.color'
    },
    {
      label: '缩放',
      component: 'Slider',
      designKey: 'design-A2sf',
      name: 'style.transform',
      props: {
        min: 50,
        max: 150
      },
      initialValue: 100,
      change: [
        {
          target: 'style.transform',
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
              designKey: 'design-QqeY',
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
                  designKey: 'design-F9CI',
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
                  designKey: 'form-XHJ7',
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
                  designKey: 'form-Aeb5',
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
                  designKey: 'form-g0Ss',
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
              designKey: 'design-QqeY',
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
                  designKey: 'design-F9CI',
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
                  designKey: 'form-XHJ7',
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
                  designKey: 'form-Aeb5',
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
                  designKey: 'form-g0Ss',
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
      designKey: 'design-WK8O',
      name: 'form-e9YD'
    },
    {
      label: '自定义',
      component: 'JsonEdit',
      designKey: 'design-A2bj',
      name: 'style'
    }
  ]
}

export default schema
