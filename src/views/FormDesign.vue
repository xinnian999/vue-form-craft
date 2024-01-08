<template>
  <form-design
    v-model="schema"
    :previewSchemaContext="{ onTest: () => console.log(666) }"
    @onSave="onSave"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FormDesign } from '@/components'

const schema = ref({
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '用户名',
      component: 'input',
      props: {
        placeholder: '请输入用户名'
      },
      onlyId: 'form-eNR0',
      name: 'username'
    },
    {
      label: '密码',
      component: 'password',
      props: {
        placeholder: '请输入密码'
      },
      onlyId: 'form-D1x7',
      name: 'password'
    },
    {
      component: 'button',
      props: {
        name: '提交',
        clickEvent: 'submitForm'
      },
      onlyId: 'form-aBMY',
      name: 'submit'
    },
    {
      component: 'button',
      props: {
        name: '自定义事件按钮',
        clickEvent: 'custom',
        customEvent: '{{onTest}}'
      },
      onlyId: 'form-mtnY',
      name: 'IxjeOB'
    }
  ]
})

const onSave = (schema) => {
  console.log(schema)
}
</script>
