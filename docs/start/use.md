# 快速上手

## 安装

```xml
npm i vue-form-craft
```

## 全局注册

```js
import { createApp } from 'vue'
import App from './App.vue'
import VueFormCraft from 'vue-form-craft'
const app = createApp(App)

app.use(VueFormCraft)
app.mount('#app')

```

## 使用

```vue
<template>
  <schema-form :schema="schema" footer @onFinish="onFinish" />
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
    }
  ]
}

const onFinish = (values) => {
  alert(JSON.stringify(values))
}
</script>

```


### 通过表单设计器拖拖拽拽 快速生成JsonSchema

```vue
<template>
  <form-design @onSave="(schema) => console.log(schema)" />
</template>
```
