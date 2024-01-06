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
      component: 'input',
      props: {
        placeholder: '请输入用户名'
      },
      onlyId: 'form-eNR0',
      name: 'username'
    },
    {
      label: '密码',
      component: 'password',
      props: {
        placeholder: '请输入密码'
      },
      onlyId: 'form-D1x7',
      name: 'password'
    },
    {
      component: 'button',
      props: {
        name: '提交',
        clickEvent: 'submitForm'
      },
      onlyId: 'form-aBMY',
      name: 'submit'
    }
  ]
}

const onSubmit = (values) => {
  alert(JSON.stringify(values))
}
</script>
