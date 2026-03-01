<template>
  <FormRender :schema="schema" :schemaContext="{ getTomorrow, getNextMonday }" @finish="onFinish" />
</template>

<script setup lang="ts">
import type { FormSchema } from 'vue-form-craft'

// 通过函数生成快捷日期
const getTomorrow = () => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  d.setHours(0, 0, 0, 0)
  return d
}

const getNextMonday = () => {
  const d = new Date()
  const day = d.getDay() || 7 // 将周日视为7
  const delta = 8 - day // 距离下周一的天数
  d.setDate(d.getDate() + delta)
  d.setHours(0, 0, 0, 0)
  return d
}

const schema: FormSchema = {
  labelWidth: 120,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
  items: [
    {
      label: '选择日期',
      name: 'date',
      component: 'DatePicker',
      componentProps: {
        type: 'date',
        placeholder: '请选择日期',
        shortcuts: [
          { text: '明天', value: '{{ getTomorrow }}' },
          { text: '下周一', value: '{{ getNextMonday }}' }
        ]
      }
    }
  ]
}

const onFinish = (values: any) => {
  alert(JSON.stringify(values, null, 2))
}
</script>
