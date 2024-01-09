<template>
  <schema-form
    :schema="schema"
    :schemaContext="{ onTest: () => console.log(666) }"
    @onSubmit="onSubmit"
  />
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
      name: 'username',
      initialValue: 10
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
      label: '',
      component: 'inline',
      children: [
        {
          component: 'button',
          props: {
            name: '提交',
            clickEvent: 'submitForm'
          },
          onlyId: 'form-aBMY',
          name: 'submit',
          hideLabel: true
        },
        {
          component: 'button',
          props: {
            name: '重置',
            clickEvent: 'resetForm',
            style: {
              marginLeft: '30px'
            }
          },
          onlyId: 'form-mtnY',
          name: 'IxjeOB',
          hideLabel: true
        }
      ],
      onlyId: 'form-0dVt',
      name: 'j0rCIj'
    }
  ]
}

const onSubmit = (values) => {
  alert(JSON.stringify(values))
}
</script>
