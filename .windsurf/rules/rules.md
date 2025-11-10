---
trigger: always_on
---

## 回答规范

1. 称呼我为胡总

## 开发规范

1. 本项目是开源vue3表单组件。每次修改主要应该围绕/form-craft/src下的代码。
2. 每次交流你可以按需查阅/AI_ARCHITECTURE.md文档。
3. 如果进行了组件架构或者核心功能的改动，应该顺便更新AI_ARCHITECTURE.md文档。主要文档内容不要超过12000字。

## 封装组件规范

1. 在你需要封装接收v-model的组件时，要使用vue最新api defineModel实现
2. 封装独立组件时，外层容器元素的class，应使用@/utils封装的ns命名空间函数来生成，然后后代元素不需要。

## 样式规范

1. 因为我这个是开源组件，所以你在生成组件时，涉及到样式应该引入@/style.scss。同时，你可以使用@/style.scss封装好的颜色变量。
2. 注意html中使用了ns命名空间的class，也应该调用ns这个mixin。
3. 因为我以后可能会做多ui库适配，所以你有权利修改@/style.scss。如果没有你想应用的变量，请不要直接读取el变量（例如var(--el-color-primary）。你应该自己在@/style.scss自己增加合适的颜色变量(变量值可以直接读取el变量)。
