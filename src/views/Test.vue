<template>
  <schema-form
    :schema="schema"
    footer
    @onFinish="onFinish"
    @onFinishFailed="onFinishFailed"
    ref="formRef"
  />
  <button @click="resetName">重置姓名</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref()

const onFinish = (values: anyObject) => {
  alert(JSON.stringify(values))
}

const onFinishFailed = (e: anyObject) => {
  console.log(e)
}

const resetName = () => {
  formRef.value.resetFields(['name'])
}

const schema: schemaType = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '姓名',
      component: 'Input',
      props: {
        placeholder: '请输入姓名'
      },
      designKey: 'design-ViXi',
      name: 'name',
      initialValue: 'hyl'
    },
    {
      label: '年龄',
      component: 'InputNumber',
      props: {
        placeholder: '输入年龄'
      },
      designKey: 'design-ViXi',
      name: 'age',
      required: true,
      initialValue: 25
    }
  ]
}
</script>
