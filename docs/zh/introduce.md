<script setup>
import StarAlert from '../demo/StarAlert.vue'
</script>

# 简介

《Vue Form Craft》是一款基于`Vue3`和`Element Plus`开发的低代码表单。

目的是为前端同学提供快速搭建表单、实现表单交互和数据收集的功能。

<StarAlert/>

## 核心

vue-form-craft主要由 `FormDesign` 、 `FormRender`两个组件构成。

- `FormDesign`通过拖拽生成`JsonSchema`

- `FormRender`负责将`JsonSchema`渲染为表单

## 特性

- 可视化设计表单
- 支持几十种的表单组件(el所有表单组件、内置组件)
- 支持收集Array数据（自增组件）
- 用法简单，灵活高效的表单联动
- 可预览、编辑生成的json配置
- 可预览生成的VUE组件
- 高扩展性、支持自定义组件、支持扩展表单设计器、支持扩展其他ui组件库
- 支持表单填写校验
- 组件无限深层嵌套，深层校验
- 支持二次开发
- 支持暗黑模式
- 支持国际化翻译
- 完全使用`Vue3` + `TypeScript`编写