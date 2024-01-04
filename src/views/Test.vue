<template>
  <schema-form :schema="schema" @submit="handleSubmit" ref="formRef" />
  <el-button @click="formRef.reset()"> 重置</el-button>
</template>

<script setup>
import { ref } from 'vue'

const formRef = ref(null)

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
      initialValue: 3307578337,
      onlyId: 'form-0lHT',
      name: 'username'
    },
    {
      label: '密码',
      component: 'password',
      props: {
        placeholder: '请输入...'
      },
      initialValue: 991015,
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

const handleSubmit = (values) => {
  alert(JSON.stringify(values))
}
</script>
