# Internationalization

Since `vue-form-craft` is developed based on `element-plus`, please follow the official documentation of `element-plus` to internationalize its components.

[How to internationalize element-plus?](https://element-plus.org/guide/i18n.html)

Then, we also need to internationalize the designer components of `vue-form-craft`, which is also simple, just pass a configuration!

```ts
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import VueFormCraft from 'vue-form-craft'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn
})
app.use(VueFormCraft, {
  lang: 'zh' // zh-Chinese, en-English
})
app.mount('#app')
```

## Dynamic Setting

If you need to dynamically switch the language for internationalization, you cannot set it directly in `main.ts`, but need to inject it in the top-level component of your project!

`element-plus` also provides a dynamic approach on their official website!

```vue
//App.vue

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { provide, ref } from 'vue'
import Layout from './Layout'

const lang = ref('zh')

provide('vfc-lang', lang)
</script>

<template>
  <el-config-provider :locale="lang === 'en' ? en : zhCn">
    <Layout />
  </el-config-provider>
</template>
```
