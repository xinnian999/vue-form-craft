<template>
  <schema-form v-model="form" :schema="schema" ref="formRef" />
  <el-button @click="handleSubmit">提交</el-button>
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
      onlyId: 'form-0lHT',
      name: 'username'
    },
    {
      label: '密码',
      component: 'password',
      props: {
        placeholder: '请输入...'
      },
      onlyId: 'form-xiFZ',
      name: 'password'
    }
  ]
}

const formRef = ref(null)

const form = ref({})

const handleSubmit = async () => {
  //校验表单
  await formRef.value.submit()
  console.log('表单值', form.value)
}
</script>
