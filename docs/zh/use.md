# 快速开始

## 安装

```sh
$ npm i vue-form-craft
```

## 全局注册

将会在你的vue项目中，全局注册 **表单设计器** 、**表单渲染器**

```ts
import { createApp } from 'vue'
import App from './App.vue'
import VueFormCraft from 'vue-form-craft'

const app = createApp(App)

app.use(VueFormCraft)
app.mount('#app')
```

## 全局组件类型提示

如下配置，即可开启全局组件的类型提示

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["vue-form-craft/global"]
  }
}
```

## 使用表单设计器

通过表单设计器拖拖拽拽，快速生成JsonSchema！

建议将设计器渲染在一个大的容器里！

```vue
<template>
  <div style="width:100vw;height:100vh">
    <FormDesign />
  </div>
</template>
```

## 使用表单渲染器

将设计器生成的JsonSchema传递给渲染器，即可轻松构建出一个表单！

::: code-group

```vue [TypeScript]
<template>
  <FormRender v-model="formValues" :schema="schema" ref="formRef" />
  <el-button @click="handleSubmit">提交</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormSchema,FormRenderInstance } from 'vue-form-craft'

const formRef = ref<FormRenderInstance>()

const formValues = ref({})

const schema: FormSchema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '用户名',
      component: 'Input',
      name: 'username',
      required: true,
      props: {
        placeholder: '请输入用户名'
      }
    },
    {
      label: '密码',
      component: 'Password',
      name: 'password',
      required: true,
      props: {
        placeholder: '请输入密码'
      }
    }
  ]
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  alert(JSON.stringify(formValues.value))
}
</script>
```

```vue [JavaScript]
<template>
  <FormRender v-model="formValues" :schema="schema" ref="formRef" />
  <el-button @click="handleSubmit">提交</el-button>
</template>

<script setup>
import { ref } from 'vue'

const formRef = ref()

const formValues = ref({})

const schema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '用户名',
      component: 'Input',
      name: 'username',
      required: true,
      props: {
        placeholder: '请输入用户名'
      }
    },
    {
      label: '密码',
      component: 'Password',
      name: 'password',
      required: true,
      props: {
        placeholder: '请输入密码'
      }
    }
  ]
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  alert(JSON.stringify(formValues.value))
}
</script>
```

:::