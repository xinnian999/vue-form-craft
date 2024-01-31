<template>
  <schema-form v-model="formValues" :schema="schema" ref="formRef" />
  <button @click="handleSubmit">提交</button>
</template>

<script setup>
import { ref } from 'vue'

const formRef = ref()

const formValues = ref({
  title: 'test',
  desc: '这是一个简单基本的描述'
})

const schema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '标题',
      component: 'Input',
      props: {
        placeholder: '请输入标题'
      },
      onlyId: 'form-eNR0',
      name: 'title',
      required: true
    },
    {
      label: '描述',
      component: 'Textarea',
      props: {
        placeholder: '请输入描述'
      },
      onlyId: 'form-D1x7',
      name: 'desc'
    }
  ]
}

const handleSubmit = () => {
  formRef.value
    .submit()
    .then((values) => {
      alert(JSON.stringify(values))
    })
    .catch((e) => console.log(e))
}
</script>
