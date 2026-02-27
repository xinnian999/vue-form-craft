<template>
  <FormRender :schema="schema" @finish="finish" />
</template>

<script setup lang="ts">
import type { FormSchema } from 'vue-form-craft'

const schema: FormSchema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
  items: [
    {
      label: '批量设置密码',
      name: 'batchPassword',
      component: 'Password',
      props: {
        'show-password': true
      },
      designKey: 'design-batchPassword',
      linkages: [
        {
          target: 'users.*.password',
          type: 'data',
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
            placeholder: '请输入文本',
            clearable: true
          },
          name: 'username',
          designKey: 'design-username',
          linkages: [
            {
              target: 'password',
              type: 'data',
              condition: '{{ !$item.username }}',
              value: ''
            }
          ]
        },
        {
          label: '密码',
          component: 'Password',
          props: {
            placeholder: '请输入密码',
            'show-password': true
          },
          name: 'password'
        }
      ],
      props: {
        mode: 'table'
      },
      initialValue: [{}, {}],
      name: 'users'
    }
  ]
}

const finish = (values: Record<string, any>) => {
  const data = JSON.stringify(values, null, 2)

  alert(data)
}
</script>
