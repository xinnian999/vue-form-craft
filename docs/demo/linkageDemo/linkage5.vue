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
      componentProps: {
        placeholder: '请输入姓名'
      },
      name: 'name',
      required: true
    },
    {
      label: '性别',
      component: 'Radio',
      componentProps: {
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
        type: 'circle'
      },
      name: 'gneder',
      required: true,
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
      componentProps: {
        'inline-prompt': false
      },
      name: 'isHy',
      required: true,
      when: " {{ $values.gneder === 'women' }} "
    },
    {
      label: '怀孕周期',
      component: 'InputNumber',
      componentProps: {
        min: 1,
        max: 999,
        step: 1,
        controlsPosition: 'right'
      },
      name: 'hyWeek',
      when: '{{ !!$values.isHy }}'
    }
  ]
}

const finish = (values: Record<string, any>) => {
  const data = JSON.stringify(values, null, 2)

  alert(data)
}
</script>
