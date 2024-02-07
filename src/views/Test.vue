<template>
  <schema-form :schema="schema" @onSubmit="onSubmit" />
</template>

<script setup>
const schema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '用户名',
      component: 'Input',
      props: {
        placeholder: '请输入用户名'
      },
      name: 'username'
    },
    {
      label: '密码',
      component: 'Password',
      props: {
        placeholder: '请输入密码'
      },
      name: 'password'
    },
    {
      component: 'Button',
      props: {
        name: '提交',
        clickEvent: 'submitForm'
      }
    }
  ]
}

const onSubmit = (values) => {
  alert(JSON.stringify(values))
}
</script>
