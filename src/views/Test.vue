<template>
  <schema-form :schema="schema" footer @onFinish="onFinish" @onFinishFailed="onFinishFailed" />
</template>

<script setup>
const onFinish = (values) => {
  alert(JSON.stringify(values))
}

const onFinishFailed = (e) => {
  console.log(e)
}

const schema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '单行文本',
      component: 'Input',
      props: {
        placeholder: '请输入文本'
      },
      designKey: 'design-ViXi',
      name: 'form-qJMv',
      required: true
    }
  ]
}
</script>
