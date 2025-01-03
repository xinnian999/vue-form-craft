# Quick Start

## Installation

```sh
$ npm i vue-form-craft
```

## Global Registration

Register the **Form Designer** and **Form Renderer** globally in your Vue project.

(Import `element-plus` on your own)

```ts
import { createApp } from 'vue'
import VueFormCraft from 'vue-form-craft'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(VueFormCraft)
app.mount('#app')
```

## Global Component Type Hinting

Enable type hinting for global components by adding the following configuration.

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["vue-form-craft/global"]
  }
}
```

## Using the Form Designer

Use the form designer to quickly generate a JSON schema by dragging and dropping!

It is recommended to render the designer in a large container.

```vue
<template>
  <div style="width:100vw;height:100vh">
    <FormDesign />
  </div>
</template>
```

## Using the Form Renderer

Pass the JSON schema generated by the designer to the renderer to easily build a form!

::: code-group

```vue [TypeScript]
<template>
  <FormRender v-model="formValues" :schema="schema" ref="formRef" />
  <el-button @click="handleSubmit">Submit</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormSchema,FormInstance } from 'vue-form-craft'

const formRef = ref<FormInstance>()

const formValues = ref({})

const schema: FormSchema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: 'Username',
      component: 'Input',
      name: 'username',
      required: true,
      props: {
        placeholder: 'Please enter username'
      }
    },
    {
      label: 'Password',
      component: 'Password',
      name: 'password',
      required: true,
      props: {
        placeholder: 'Please enter password'
      }
    }
  ]
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  alert(JSON.stringify(formValues.value,null,2))
}
</script>
```

```vue [JavaScript]
<template>
  <FormRender v-model="formValues" :schema="schema" ref="formRef" />
  <el-button @click="handleSubmit">Submit</el-button>
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
      label: 'Username',
      component: 'Input',
      name: 'username',
      required: true,
      props: {
        placeholder: 'Please enter username'
      }
    },
    {
      label: 'Password',
      component: 'Password',
      name: 'password',
      required: true,
      props: {
        placeholder: 'Please enter password'
      }
    }
  ]
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  alert(JSON.stringify(formValues.value,null,2))
}
</script>
```

:::
