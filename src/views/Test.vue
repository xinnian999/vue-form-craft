<template>
  <div class="renderForm">
    <schema-form v-model="formValues" schemaId="8" :schema="schema" ref="formRef" />
    <button @click="handleSubmit">提交</button>
  </div>
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
      component: 'input',
      props: {
        placeholder: '请输入标题'
      },
      onlyId: 'form-eNR0',
      name: 'title',
      required: true
    },
    {
      label: '描述',
      component: 'textarea',
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

<style lang="less" scoped>
.renderForm {
  border: 1px solid #eee;
  margin: 15px 0;
  padding: 20px;
}
</style>
