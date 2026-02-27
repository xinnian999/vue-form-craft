<template>
  <FormRender :schema="schema" @finish="finish" />
</template>

<script setup lang="ts">
import type { FormSchema } from 'vue-form-craft'

const schema: FormSchema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
  items: [
    {
      label: '姓名',
      component: 'Input',
      props: {
        placeholder: '请输入姓名'
      },
      name: 'name',
      required: true
    },
    {
      label: '性别',
      component: 'Radio',
      props: {
        mode: 'static',
        options: [
          {
            label: '男',
            value: 'man'
          },
          {
            label: '女',
            value: 'women'
          }
        ],
        labelKey: 'label',
        valueKey: 'value',
        type: 'circle'
      },
      name: 'gneder',
      required: true,
      initialValue: 'man',
      designKey: 'design-gneder',
      linkages: [
        {
          target: 'isHy',
          type: 'data',
          value: undefined
        },
        {
          target: 'hyWeek',
          type: 'data',
          value: undefined
        }
      ]
    },
    {
      label: '是否怀孕',
      component: 'Switch',
      props: {
        'inline-prompt': false
      },
      name: 'isHy',
      required: true,
      hidden: " {{ $values.gneder === 'man' }} "
    },
    {
      label: '怀孕周期',
      component: 'InputNumber',
      props: {
        min: 1,
        max: 999,
        step: 1,
        controlsPosition: 'right'
      },
      name: 'hyWeek',
      hidden: '{{ !$values.isHy }}'
    }
  ]
}

const finish = (values: Record<string, any>) => {
  const data = JSON.stringify(values, null, 2)

  alert(data)
}
</script>
