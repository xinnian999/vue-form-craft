## 快速开始

### 安装

```js
npm i vue-form-craft
//或
yarn add vue-form-craft
//或
pnpm i vue-form-craft
```

### 全局注册

```js
import { createApp } from 'vue'
import App from './App.vue'
import VueFormCraft from 'vue-form-craft'
const app = createApp(App)

app.use(VueFormCraft)
app.mount('#app')

```

### 使用

```vue
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
      component: 'button',
      props: {
        name: '提交',
        clickEvent: 'submitForm'
      },
    }
  ]
}

const onSubmit = (values) => {
  alert(JSON.stringify(values))
}
</script>

```

