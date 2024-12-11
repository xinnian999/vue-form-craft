import type { FormSchema } from '@vue-form-craft/types'
import { h } from 'vue'
import { renderTreeNode } from './utils'

type CascaderOptions = {
  label?: string
  value: any
  children?: CascaderOptions
}[]

const basicField = [
  { label: '标签', value: 'label' },
  { label: '是否隐藏', value: 'hidden' },
  { label: '是否禁用', value: 'props.disabled' },
  { label: '占位提示', value: 'props.placeholder' }
]

const selectKeys = ['Select', 'Radio', 'Checkbox']

export const quickSchema = (schema: FormSchema) => {
  const varOptions: CascaderOptions = [
    {
      label: '表单值',
      value: '$values',
      children: schema.items.map((item) => ({
        label: item.label,
        value: `$values.${item.name}`
      }))
    },
    {
      label: '选中项数据源',
      value: '$selectData',
      children: schema.items
        .filter((item) => selectKeys.includes(item.component))
        .map((item) => ({
          label: item.label,
          value: `$selectData.${item.name}`
        }))
    }
  ]

  const compareOptions: CascaderOptions = [
    {
      label: '等于',
      value: 'equal'
    },
    {
      label: '大于',
      value: 'greater'
    },
    {
      label: '小于',
      value: 'less'
    },
    {
      label: '为真',
      value: 'true'
    },
    {
      label: '为假',
      value: 'false'
    }
  ]

  return {
    labelWidth: 100,
    labelAlign: 'top',
    items: [
      {
        label: '快速配置',
        children: [
          {
            label: '选择配置',
            props: {
              mode: 'static',
              options: basicField
            },
            component: 'Select',
            name: 'name',
            width: 150,
            required: true
          },

          {
            component: 'FormList',
            name: 'conditions',
            label: '联动条件',
            dialog: '{{ `${$item.conditions?.length||0} 个` }}',
            props: {
              mode: 'table',
              title: '条件'
            },
            children: [
              {
                label: '',
                props: {
                  mode: 'static',
                  options: [
                    {
                      label: '且',
                      value: '&&'
                    },
                    {
                      label: '或',
                      value: '||'
                    }
                  ],
                  placeholder: ''
                },
                component: 'Select',
                designKey: 'design-oLXv',
                name: 'with',
                width: 100,
                initialValue: '&&',
                hidden: '{{ $index === 0 }}'
              },
              {
                label: '变量',
                props: {
                  placeholder: '请选择...',
                  mode: 'static',
                  options: varOptions,
                  labelKey: 'label',
                  valueKey: 'value',
                  showAllLevels: true,
                  renderContent: renderTreeNode,
                  props: {
                    label: 'value'
                  }
                },
                component: 'TreeSelect',
                designKey: 'design-ydGG',
                name: 'variable'
              },
              {
                label: '判断',
                width: 150,
                props: {
                  mode: 'static',
                  options: compareOptions,
                  placeholder: '请选择...'
                },
                component: 'Select',
                designKey: 'design-NAHt',
                name: 'compare'
              },
              {
                label: '值',
                width: 280,
                props: {
                  varOptions,
                  renderTreeNode,
                  initType: 'var'
                },
                component: 'CompositeInput',
                designKey: 'design-NAH1t',
                name: 'value',
                hidden: '{{ $item.compare === "true" || $item.compare === "false" }}'
              }
            ]
          },

          {
            component: 'CompositeInput',
            designKey: 'design-vFIl',
            name: 'trueReturn',
            label: '条件满足时 - 返回值',
            props: {
              varOptions,
              renderTreeNode,
              initType: '{{ $item.trueReturn? "string" : "boolean" }}'
            },
            initialValue: true
          },
          {
            component: 'CompositeInput',
            designKey: 'design-vFIl',
            name: 'falseReturn',
            label: '条件不满足时 - 返回值',
            props: {
              varOptions,
              renderTreeNode,
               initType: '{{ $item.falseReturn? "string" : "boolean" }}'
            },
            initialValue: false
          }
        ],
        props: {
          mode: 'card',
          title: '联动规则',
          minLines: 0,
          maxLines: 999,
          allowAdd: true,
          allowReduce: true,
          style: {
            // width: '50%'
          }
        },
        component: 'FormList',
        designKey: 'design-NyLz',
        name: 'quick',
        style: {
          marginBottom: '10px'
        }
      }
    ]
  } satisfies FormSchema
}

export const editSchema = {
  labelWidth: 100,
  labelAlign: 'top',
  items: [
    {
      label: '手动配置',
      component: 'JsonEdit',
      designKey: 'design-A2bj',
      name: '.',
      props: {
        style: {
          height: '75vh'
        }
      }
    }
  ]
} satisfies FormSchema
