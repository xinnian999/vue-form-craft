# 快速开始

## 安装

```sh
$ npm i vue-form-craft
```

## 全局注册

将会在你的vue项目中，全局注册 **表单设计器** 、**表单渲染器**

（自行导入`element-plus`）

```ts
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import VueFormCraft from 'vue-form-craft'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(VueFormCraft)
app.mount('#app')
```

## 远程数据源与鉴权（request）

`Select`、`Cascader` 等组件的**远程模式**会按配置的 `api` 去后端拉取选项。默认情况下走的是内置 `fetch`，它**不会携带任何鉴权信息（token），也不会走你项目的请求 baseURL / 拦截器**。

如果你的后端接口需要鉴权（如若依 RuoYi 等需要请求头携带 `Authorization` token），请在全局注册时注入一个 `request` 函数，把项目里**已封装好的 axios 实例**接进来，token、baseURL、统一错误处理就都复用了：

```ts
import VueFormCraft from 'vue-form-craft'
import service from '@/utils/request' // 你项目封装的 axios（拦截器里自动带 token）

app.use(VueFormCraft, {
  request: async ({ url, method, params, headers }) => {
    const res = await service({
      url,
      method,
      headers,
      // GET 用 params 拼 query，其余用 data 放 body
      ...(method === 'GET' ? { params } : { data: params })
    })
    // 若 axios 响应拦截器已 return response.data，则这里直接回传
    return res
  }
})
```

`request` 函数收到的参数与组件 `api` 配置对应：

| 参数 | 说明 |
| --- | --- |
| `url` | 请求地址（`api.url`） |
| `method` | 请求方式（`api.method`） |
| `params` | 请求参数（`api.params`） |
| `headers` | 附加请求头 |

::: tip 数据路径要对上后端返回结构
注入后，再在组件远程配置里把 `api.dataPath` 指向选项数组所在的字段。例如若依字典接口返回 `{ code, msg, data:[...] }`，则 `dataPath` 填 `data`；列表接口返回 `{ code, msg, rows:[...] }`，则填 `rows`，并把 `labelKey` / `valueKey` 设为实际字段名。
:::

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
  <FormRender v-model="formValues" :schema="schema" @finish="onFinish" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormSchema } from 'vue-form-craft'

const formValues = ref({})

const schema: FormSchema = {
  labelWidth: 120,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
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

const onFinish = async () => {
  const data = JSON.stringify(formValues.value, null, 2)

  alert(data)
}
</script>
```

```vue [JavaScript]
<template>
  <FormRender v-model="formValues" :schema="schema" @finish="onFinish" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formValues = ref({})

const schema = {
  labelWidth: 120,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
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

const onFinish = async () => {
  const data = JSON.stringify(formValues.value, null, 2)

  alert(data)
}
</script>
```

:::
