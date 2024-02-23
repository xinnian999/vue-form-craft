export default (schema) => `<template>
    <schema-form :schema="schema" ref="formRef" />
    <ElButton @click="handleSubmit" type="primary" style="margin-left: 150px">提交</ElButton>
</template>

<script setup>
import { ref } from 'vue'
import { ElButton } from 'element-plus'

const formRef = ref()

const handleSubmit = () => {
  formRef.value
    .submit()
    .then((values) => {
      alert(JSON.stringify(values))
    })
    .catch(() => console.log('表单校验不通过'))
}

const schema = ${schema}

</script>

`
