# 扩展一个markdown输入框

下面展示一下，如何利用上篇的扩展教程，扩展一个输入框

## 安装markdown插件

可以在任意找一款开源的markdown插件，这里我选择`vue-markdown`

```xml
npm install vue-markdown
```

## 封装markdown组件

```vue
// src/extendElements/markdown/markdown.vue
<template>
  <div>
    <VueMarkdown :source="markdownText" />
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  components: { VueMarkdown },
  data() {
    return {
      markdownText: '# 这是第一个标题！'
    }
  }
}
</script>
```