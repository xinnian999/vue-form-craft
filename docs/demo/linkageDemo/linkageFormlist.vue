<template>
  <FormRender v-model="formValues" :schema="schema" ref="formRef" />
  <el-button @click="handleSubmit">提交</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormSchema, FormRenderInstance } from 'vue-form-craft'

const formRef = ref<FormRenderInstance>()

const formValues = ref({})

const schema: FormSchema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '批量设置密码',
      name: 'batchPassword',
      component: 'Password',
      designKey: 'design-kVO2111',
      change: [
        {
          target: 'users.*.password',
          value: '{{ $values.batchPassword }}'
        }
      ]
    },
    {
      label: '增添用户',
      component: 'FormList',
      children: [
        {
          label: '用户名',
          component: 'Input',
          props: {
            placeholder: '请输入文本'
          },
          designKey: 'design-M91n',
          name: 'username',
          change: [
            {
              target: 'password',
              condition: '{{ !$item.username }}',
              value: ''
            }
          ]
        },
        {
          label: '密码',
          component: 'Password',
          props: {
            placeholder: '请输入密码'
          },
          designKey: 'design-kVO2',
          name: 'password'
        }
      ],
      props: {
        mode: 'table'
      },
      designKey: 'design-pMUa',
      name: 'users'
    }
  ]
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  alert(JSON.stringify(formValues.value,null,2))
}
</script>
