<template>
  <FormRender v-model="formValues" :schema="schema" @finish="finish" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormSchema } from 'vue-form-craft'

const formValues = ref({})

const schema: FormSchema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
  items: [
    {
      label: '用户名',
      name: 'username',
      component: 'Input',
      props: {
        placeholder: '请输入用户名'
      },
      required: true,
      designKey: 'design-usrn'
    },
    {
      label: '密码',
      name: 'password',
      component: 'Password',
      required: true,
      props: {
        placeholder: '请输入密码'
      },
      rules: [
        {
          expr: '/^(?=(?:.*[a-z]){0,})(?=(?:.*[A-Z]){0,})(?=(?:.*\\d){0,})(?=(?:.*[^a-zA-Z\\d]){0,})(?:(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\\d])|(?=.*[a-z])(?=.*\\d)(?=.*[^a-zA-Z\\d])|(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d]))/',
          message: '密码至少包含大小写字母、数字、特殊符号中的三种',
          trigger: 'blur'
        },
        {
          expr: '/^.{8,20}$/',
          message: '密码长度必须为8-20位',
          trigger: 'blur'
        }
      ],
      designKey: 'design-pssw'
    },
    {
      label: '确认密码',
      props: {
        placeholder: '请再次输入密码'
      },
      name: 'confirmPassword',
      component: 'Password',
      required: true,
      rules: [
        {
          expr: '{{ $values.password === $values.confirmPassword }}',
          message: '两次输入的密码不一致',
          trigger: 'blur'
        }
      ],
      designKey: 'design-cnfp'
    },
    {
      label: '手机号',
      name: 'phone',
      component: 'Input',
      props: {
        placeholder: '请输入手机号',
        maxlength: 11
      },
      rules: [
        {
          expr: '/^1[3-9]\\d{9}$/',
          message: '请输入有效的手机号',
          trigger: 'blur'
        }
      ],
      designKey: 'design-phne',
      required: true
    },
    {
      label: '邮箱',
      name: 'email',
      component: 'Input',
      props: {
        placeholder: '请输入邮箱'
      },
      rules: [
        {
          expr: '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/',
          message: '请输入有效的邮箱',
          trigger: 'blur'
        }
      ],
      designKey: 'design-emal'
    }
  ]
}

const finish = (values: Record<string, any>) => {
  const data = JSON.stringify(values, null, 2)

  alert(data)
}
</script>
