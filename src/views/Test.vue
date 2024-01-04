<template>
  <schema-form v-model="form" :schema="schema" @submit="handleSubmit" />
</template>

<script setup>
import { ref } from 'vue'

const schema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '用户名',
      component: 'input',
      props: {
        placeholder: '请输入...'
      },
      required: true,
      onlyId: 'form-0lHT',
      name: 'username'
    },
    {
      label: '密码',
      component: 'password',
      props: {
        placeholder: '请输入...'
      },
      required: true,
      onlyId: 'form-xiFZ',
      name: 'password'
    },
    {
      component: 'submitButton',
      props: {
        title: '提交'
      },
      onlyId: 'form-xiFZsss'
    }
  ]
}

const form = ref({})

const handleSubmit = (values) => {
  alert(JSON.stringify(values))
}
</script>
