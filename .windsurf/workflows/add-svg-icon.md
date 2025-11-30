---
description: 根据SVG代码和中文名称添加新图标
auto_execution_mode: 1
---

# 添加SVG图标工作流

此工作流用于在 `lib/src/components/Icon/icons` 目录下添加新的SVG图标组件。

## 使用方式

用户需要提供：

1. SVG代码（完整的svg标签及内容）
2. 图标的中文名称

## 执行步骤

### 1. 将中文名称转换为合适的英文驼峰命名

根据中文语义转换为符合项目规范的驼峰命名（camelCase），例如：

- "删除" → "delete"
- "全屏" → "fullScreen"
- "返回" → "back"

### 2. 处理SVG代码

- 移除所有 `fill` 属性（包括 `fill="#xxx"` 或 `fill="xxx"` 等形式），确保图标继承父级颜色
- 保留SVG的其他属性（viewBox、xmlns等）
- 保持SVG结构完整

### 3. 创建Vue组件文件

在 `lib/src/components/Icon/icons/` 目录下创建 `[英文名称].vue` 文件，格式如下：

```vue
<template>[处理后的SVG代码]</template>
```

注意：

- 只需要 `<template>` 部分，不需要 `<script>` 和 `<style>`
- SVG代码需要正确缩进

### 4. 在index.ts中导出新图标

在 `lib/src/components/Icon/icons/index.ts` 文件中按字母顺序添加导出语句：

```typescript
export { default as [英文名称] } from './[英文名称].vue'
```

注意保持文件的字母排序。

## 示例

**用户输入：**

- 中文名称：返回
- SVG代码：

```xml
<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <path d="M1023.8592..." fill="#333333"></path>
</svg>
```

**执行结果：**

1. 英文名称：`back`
2. 创建文件：`lib/src/components/Icon/icons/back.vue`
3. 文件内容：

```vue
<template>
  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <path d="M1023.8592..."></path>
  </svg>
</template>
```

4. 在 `index.ts` 中添加：`export { default as back } from './back.vue'`
