import type { FormSchema } from '@vue-form-craft/types'

type CascaderOptions = {
  label: string
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

const extendChildren = (list: CascaderOptions, children: CascaderOptions): CascaderOptions => {
  return list.map((item) => {
    if (item.children) {
      return { ...item, children: extendChildren(item.children, children) }
    } else {
      return {
        ...item,
        children
      }
    }
  })
}

export const quickSchema = (schema: FormSchema) => {
  const varOptions: CascaderOptions = [
    {
      label: '表单值-$values',
      value: '$values',
      children: schema.items.map((item) => ({
        label: `【${item.label}】字段值`,
        value: item.name
      }))
    },
    {
      label: '选中项数据源-$selectData',
      value: 'value2',
      children: schema.items
        .filter((item) => selectKeys.includes(item.component))
        .map((item) => ({
          label: `【${item.label}】数据源`,
          value: `$selectData.${item.name}`
        }))
    }
  ]

  const valueOptions: CascaderOptions = [
    {
      label: '变量',
      value: 'var',
      children: varOptions
    },
    { label: '手写字符串', value: 'strValue' },
    { label: '手写数字', value: 'numValue' }
  ]

  const compareOptions: CascaderOptions = [
    {
      label: '等于',
      value: 'equal',
      children: valueOptions
    },
    {
      label: '大于',
      value: 'greater',
      children: valueOptions
    },
    {
      label: '小于',
      value: 'less',
      children: valueOptions
    },
    {
      label: '为真',
      value: 'true',
      children: []
    },
    {
      label: '为假',
      value: 'false',
      children: []
    }
  ]

  // const conditionOptions: CascaderOptions = extendChildren(varOptions, compareOptions)

  // console.log(conditionOptions)

  return {
    labelWidth: 100,
    labelAlign: 'top',
    items: [
      {
        label: '快速配置',
        children: [
          {
            label: '选择一个你想动态改变的配置',
            props: {
              mode: 'static',
              options: basicField
            },
            component: 'Select',
            name: 'name',
            width: 150
          },
          {
            label: '动态改变它的方式',
            props: {
              mode: 'static',
              options: [
                {
                  label: '使用变量',
                  value: 'var'
                },
                {
                  label: '判断变量',
                  value: 'computeVar'
                }
                // {
                //   label: '条件判断',
                //   value: 'conditionVar'
                // }
              ],
              placeholder: '请选择...'
            },
            component: 'Select',
            name: 'type'
          },

          {
            component: 'Cascader',
            name: 'variable',
            label: '变量',
            hidden: '{{ $item.type !== "var" && $item.type !== "computeVar"}}',
            props: {
              placeholder: '请选择...',
              labelKey: 'label',
              valueKey: 'value',
              mode: 'static',
              showAllLevels: false,
              options: varOptions
            }
          },

          {
            component: 'Cascader',
            name: 'compute',
            label: '判断依据',
            hidden: '{{ $item.type !== "computeVar" }}',
            props: {
              placeholder: '请选择...',
              labelKey: 'label',
              valueKey: 'value',
              mode: 'static',
              options: compareOptions
            }
          },

          {
            component: 'Input',
            name: 'strValue',
            label: '手写字符串',
            hidden: '{{ !$item.compute.includes("strValue")  }}'
          },

          {
            component: 'InputNumber',
            name: 'numValue',
            label: '手写数字',
            hidden: '{{ !$item.compute.includes("numValue") }}'
          }

          // {
          //   component: 'Cascader',
          //   designKey: 'design-vFIl1111',
          //   name: 'condition',
          //   label: '条件',
          //   hidden: '{{ $item.type !== "conditionVar" }}',
          //   props: {
          //     placeholder: '请选择...',
          //     labelKey: 'label',
          //     valueKey: 'value',
          //     mode: 'static',
          //     options: conditionOptions
          //   }
          // },

          // {
          //   component: 'Cascader',
          //   designKey: 'design-vFIl',
          //   name: 'trueVariable',
          //   label: '条件满足时 - 返回值',
          //   hidden: '{{ $item.type !== "conditionVar" }}',
          //   props: {
          //     placeholder: '请选择...',
          //     labelKey: 'label',
          //     valueKey: 'value',
          //     mode: 'static',
          //     showAllLevels: false,
          //     options: valueOptions
          //   }
          // },
          // {
          //   component: 'Cascader',
          //   designKey: 'design-vFIl',
          //   name: 'falseVariable',
          //   label: '条件不满足时 - 返回值',
          //   hidden: '{{ $item.type !== "conditionVar" }}',
          //   props: {
          //     placeholder: '请选择...',
          //     labelKey: 'label',
          //     valueKey: 'value',
          //     mode: 'static',
          //     showAllLevels: false,
          //     options: valueOptions
          //   }
          // }
        ],
        props: {
          mode: 'card',
          title: '联动规则',
          minLines: 0,
          maxLines: 999,
          allowAdd: true,
          allowReduce: true
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
          height: '70vh'
        }
      }
    }
  ]
} satisfies FormSchema
