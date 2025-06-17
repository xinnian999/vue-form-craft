# Internationalization

Since `form-magic` is developed based on `element-plus`, please follow the official documentation of `element-plus` to internationalize its components.

[How to internationalize element-plus?](https://element-plus.org/guide/i18n.html)

Then, we also need to internationalize the designer components of `form-magic`, which is also simple, just pass a configuration!

```ts
import { createApp } from 'vue'
import FormMagic from '@form-magic/element-plus'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(FormMagic, {
  lang: 'zh', // zh-Chinese, en-English
})
app.mount('#app')
```

## Dynamic Setting

If you need to dynamically switch the language for internationalization, you cannot set it directly in `main.ts`, but need to inject it in the top-level component of your project!

`element-plus` also provides a dynamic approach on their official website!

```vue
//App.vue

<script setup lang="ts">
import { provide, ref } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import Layout from './Layout'

const lang  = ref('zh')

provide('vfc-lang',lang)

</script>

<template>
  <el-config-provider :locale="lang === 'en' ? en : zhCn">
    <Layout />
  </el-config-provider>
</template>

```

