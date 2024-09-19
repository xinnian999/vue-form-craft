# 国际化

由于 `vue-form-craft` 是基于`element-plus`开发的，所以请先按照 `element-plus` 官网的方式对它的组件进行国际化。


[如何将element-plus国际化？](https://element-plus.org/zh-CN/guide/i18n.html)


然后我们还需要对`vue-form-craft`的设计器组件进行国际化，也很简单，只需要传递一个配置！

```ts
import { createApp } from 'vue'
import VueFormCraft from 'vue-form-craft'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(VueFormCraft, {
  lang: 'zh', // zh-中文、en-英文
})
app.mount('#app')
```

## 动态设置

如果你需要动态切换国际化语言，就不能在`main.ts`里直接设置了，而是需要在你项目的顶层组件里注入！

`element-plus`在官网也提供了动态方式！

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
