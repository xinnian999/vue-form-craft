import type { FormSchema } from "@/types/index"

const schema: FormSchema = {
    labelWidth: 60,
    labelAlign: 'right',
    size: 'small',
    items: [
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
      }
    ]
  }

export default schema