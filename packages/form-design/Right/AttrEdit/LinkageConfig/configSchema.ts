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
      label: '选择类字段数据源-$selectData',
      value: 'value2',
      children: [
        {
          label: '选项2-1',
          value: 'value2-1'
        },
        {
          label: '选项2-2',
          value: 'value2-2'
        },
        {
          label: '选项2-3',
          value: 'value2-2'
        }
      ]
    }
  ]

  const valueOptions: CascaderOptions = [
    {
      label: '变量',
      value: 'var',
      children: varOptions
    },
    {
      label: '布尔值',
      value: 'boolean',
      children: [
        {
          label: 'true',
          value: true
        },
        {
          label: 'false',
          value: false
        }
      ]
    },
    { label: '手写值', value: 'value' }
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
    }
  ]

  const set = (list: CascaderOptions): CascaderOptions => {
    return list.map((item) => {
      if (item.children) {
        return { ...item, children: set(item.children) }
      } else {
        return {
          ...item,
          children: compareOptions
        }
      }
    })
  }

  const conditionOptions: CascaderOptions = set(varOptions)

  console.log(conditionOptions)

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
            designKey: 'design-aaa',
            name: 'name',
            width: 150
          },
          {
            label: '动态改变它的方式',
            props: {
              mode: 'static',
              options: [
                {
                  label: '直接返回值',
                  value: 'var'
                },
                {
                  label: '根据条件返回值',
                  value: 'conditionVar'
                }
              ],
              placeholder: '请选择...'
            },
            component: 'Select',
            designKey: 'design-icI8',
            name: 'type'
          },

          {
            component: 'Cascader',
            designKey: 'design-vFIl',
            name: 'variable',
            label: '返回值',
            hidden: '{{ $item.type !== "var" }}',
            props: {
              placeholder: '请选择...',
              labelKey: 'label',
              valueKey: 'value',
              mode: 'static',
              showAllLevels: false,
              options: valueOptions
            }
          },

          {
            component: 'Cascader',
            designKey: 'design-vFIl1111',
            name: 'condition',
            label: '条件',
            hidden: '{{ $item.type !== "conditionVar" }}',
            props: {
              placeholder: '请选择...',
              labelKey: 'label',
              valueKey: 'value',
              mode: 'static',
              options: conditionOptions
            }
          },

          {
            component: 'Cascader',
            designKey: 'design-vFIl',
            name: 'trueVariable',
            label: '条件满足时 - 返回值',
            hidden: '{{ $item.type !== "conditionVar" }}',
            props: {
              placeholder: '请选择...',
              labelKey: 'label',
              valueKey: 'value',
              mode: 'static',
              showAllLevels: false,
              options: valueOptions
            }
          },
          {
            component: 'Cascader',
            designKey: 'design-vFIl',
            name: 'falseVariable',
            label: '条件不满足时 - 返回值',
            hidden: '{{ $item.type !== "conditionVar" }}',
            props: {
              placeholder: '请选择...',
              labelKey: 'label',
              valueKey: 'value',
              mode: 'static',
              showAllLevels: false,
              options: valueOptions
            }
          }
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
      name: '.'
    }
  ]
} satisfies FormSchema
