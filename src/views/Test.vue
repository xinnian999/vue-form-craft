<template>
  <schema-form :schema="schema" ref="formRef" />
  <button @click="handleSubmit">提交</button>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const formRef = ref()

const schema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '标题',
      component: 'input',
      props: {
        placeholder: '请输入标题'
      },
      onlyId: 'form-eNR0',
      name: 'title',
      initialValue: 10
    },
    {
      label: '描述',
      component: 'textarea',
      props: {
        placeholder: '请输入描述'
      },
      onlyId: 'form-D1x7',
      name: 'desc',
      required: true
    }
  ]
}

onMounted(() => {
  //模拟表单值回显
  setTimeout(() => {
    formRef.value.setFormValues({ title: '测试标题', desc: '这是一个描述' })
  }, 1000)
})

const handleSubmit = () => {
  formRef.value
    .submit()
    .then((values) => {
      alert(JSON.stringify(values))
    })
    .catch((e) => console.log(e))
}
</script>
