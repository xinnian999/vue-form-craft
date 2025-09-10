# vue-form-craft

基于 [vue](https://github.com/vuejs/vue) 和 [element-plus](https://github.com/ElemeFE/element) 实现的表单设计器 + 渲染器

使用了最新的前端技术栈，可以让你免去vue项目中表单的烦恼。

- [在线预览](https://xinnian999.github.io/vue-form-craft/zh/form-design)
- [官方文档](https://xinnian999.github.io/vue-form-craft/zh/)
- 作者：Elin
- 联系方式：17803000829

![ui](../../ui.png)

## 特性

- 可视化设计表单
- 支持三十多种的表单组件(el所有表单组件、内置组件)
- 支持收集Array数据（自增组件）
- 用法简单，又非常灵活高效的表单联动
- 可预览生成的json配置
- 可预览生成的VUE组件
- 高扩展性、支持自定义组件、支持各种ui组件库来替换ui
- 支持表单填写校验
- 组件无限深层嵌套，深层校验

## 第三方插件

- vuedraggable
- element-plus
- vue-form-craft
- lodash

## 使用

### 版本要求

vue@3.x

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
import VueFormCraft from 'vue-form-craft'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(VueFormCraft)
app.mount('#app')
```

### 使用

> 使用表单设计器

```vue
<template>
  <div style="width:100vw;height:100vh">
    <FormDesign />
  </div>
</template>
```

> 使用表单渲染器

```vue
<template>
  <FormRender v-model="formValues" :schema="schema" ref="formRef" />
  <el-button @click="handleSubmit">提交</el-button>
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
  alert(JSON.stringify(formValues.value,null,2))
}
</script>
```

## 捐赠 vue-form-craft 的开发

`vue-form-craft` 的文档和代码完全开源，如果该项目有帮助到你的开发工作，你可以捐赠`vue-form-craft`的研发工作，捐赠无门槛，哪怕是一杯可乐也好。

<div style="display:flex;gap:15px">
<img src="./docs/assets/wechat.png" style="height:400px" />
<img src="./docs/assets/zhifubao.png" style="height:400px" />
</div>
