# 简介

vue-form-craft是一款基于Vue 3.+的低代码表单工具，基于Element Plus UI库。

目的是为前端开发同学提供快速搭建表单、实现表单交互和数据收集的功能😄。

## 核心

vue-form-craft主要由 **表单设计器FormDesign** 、 **表单渲染器FormRender**两部分构成。

- FormDesign通过拖拽生成JsonSchema

- FormRender负责将JsonSchema渲染为表单

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